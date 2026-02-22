import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import { jsPDF } from 'jspdf';
import { useNavigate, Link } from 'react-router-dom';
import { useDocTitle } from '../components/CustomHook';

const COMPANY_NAME = 'Lawn Irrigation Technologies';

const SERVICE_LABELS = {
  'irrigation-design': 'Irrigation design & consultancy',
  'installation': 'Installation & supply',
  'maintenance': 'Maintenance & after-sales',
};

const AdminAppointments = () => {
  useDocTitle('Admin Dashboard | Lawn Irrigation Technologies');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewStatus, setViewStatus] = useState('open');
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [portfolioMessage, setPortfolioMessage] = useState(null);
  const [portfolioForm, setPortfolioForm] = useState({ name: '', sector: 'Commercial & institutional', imageUrlsText: '' });
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [portfolioUploading, setPortfolioUploading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchPortfolio = async () => {
    setPortfolioLoading(true);
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('id, name, sector, image_urls, created_at')
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('Portfolio fetch:', error.message);
      setPortfolioProjects([]);
    } else {
      setPortfolioProjects(data || []);
    }
    setPortfolioLoading(false);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleAddPortfolioProject = async (e) => {
    e.preventDefault();
    setPortfolioMessage(null);
    const name = portfolioForm.name.trim() || 'Untitled Project';

    if (portfolioFiles.length > 0) {
      setPortfolioUploading(true);
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('sector', portfolioForm.sector);
        portfolioFiles.forEach((file) => formData.append('images', file));

        const res = await fetch(`${BACKEND_URL}/createproject`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setPortfolioMessage(data.error || `Upload failed (${res.status}).`);
          setPortfolioUploading(false);
          return;
        }

        const imageUrls = data.project?.imageUrls || [];
        if (imageUrls.length === 0) {
          setPortfolioMessage('Server did not return image URLs.');
          setPortfolioUploading(false);
          return;
        }

        const { error } = await supabase.from('portfolio_projects').insert([{
          name,
          sector: portfolioForm.sector,
          image_urls: imageUrls,
        }]);
        if (error) {
          setPortfolioMessage(error.message || 'Images uploaded but failed to save to portfolio.');
          setPortfolioUploading(false);
          return;
        }
        setPortfolioMessage('Project added with uploaded images.');
        setPortfolioForm({ name: '', sector: 'Commercial & institutional', imageUrlsText: '' });
        setPortfolioFiles([]);
        fetchPortfolio();
        setTimeout(() => setPortfolioMessage(null), 4000);
      } catch (err) {
        setPortfolioMessage(err.message || 'Network error. Is the backend server running on ' + BACKEND_URL + '?');
      }
      setPortfolioUploading(false);
      return;
    }

    const urls = portfolioForm.imageUrlsText.trim().split(/\n/).map((u) => u.trim()).filter(Boolean);
    if (urls.length === 0) {
      setPortfolioMessage('Upload at least one image from your PC, or paste image URLs.');
      return;
    }
    const { error } = await supabase.from('portfolio_projects').insert([{
      name,
      sector: portfolioForm.sector,
      image_urls: urls,
    }]);
    if (error) {
      setPortfolioMessage(error.message || 'Failed to add project.');
      return;
    }
    setPortfolioMessage('Project added. It will appear on the portfolio page.');
    setPortfolioForm({ name: '', sector: 'Commercial & institutional', imageUrlsText: '' });
    fetchPortfolio();
    setTimeout(() => setPortfolioMessage(null), 4000);
  };

  const handleDeletePortfolioProject = async (id) => {
    if (!window.confirm('Remove this project from the portfolio?')) return;
    const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
    if (error) setPortfolioMessage(error.message || 'Delete failed.');
    else {
      setPortfolioMessage('Project removed.');
      fetchPortfolio();
      setTimeout(() => setPortfolioMessage(null), 3000);
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('preferred_date', { ascending: true });

    if (error) console.error('Error fetching:', error);
    else setAppointments(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error.message);
    else navigate('/'); 
  };

  const [updateMessage, setUpdateMessage] = useState(null);

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdateMessage(null);
    const { error } = await supabase
      .from('bookings')
      .update({ appointment_status: newStatus })
      .eq('id', id);

    if (error) {
      setUpdateMessage('Failed to update. Please try again.');
    } else {
      setUpdateMessage(newStatus === 'closed' ? 'Appointment closed successfully.' : 'Appointment reopened.');
      setSelectedAppt(null);
      fetchAppointments();
      setTimeout(() => setUpdateMessage(null), 3000);
    }
  };

  const filteredData = appointments.filter((item) => {
    const matchesSearch = (item.customer_name?.toLowerCase().includes(filter.toLowerCase()) || 
                          item.transaction_id?.toLowerCase().includes(filter.toLowerCase()));
    const matchesService = statusFilter === 'all' || item.service_type === statusFilter;
    const matchesAppointmentStatus = item.appointment_status === viewStatus; 
    
    return matchesSearch && matchesService && matchesAppointmentStatus;
  });

  const handleDownloadReceipt = (appt) => {
    const doc = new jsPDF({ format: 'a4', unit: 'mm' });
    const pageW = doc.internal.pageSize.getWidth();
    
    doc.setFillColor(22, 101, 52); // green-800
    doc.rect(0, 0, pageW, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text(COMPANY_NAME, 14, 20);
    doc.setFontSize(10);
    doc.text('ADMIN-GENERATED DUPLICATE RECEIPT', 14, 30);

    doc.setTextColor(0, 0, 0);
    let y = 55;
    doc.setFontSize(10);
    doc.text(`Transaction ID: ${appt.transaction_id}`, 14, y);
    y += 10;

    const data = [
      ['Customer', appt.customer_name],
      ['Email', appt.email],
      ['Service', SERVICE_LABELS[appt.service_type] || appt.service_type],
      ['Phone', appt.phone],
      ['Scheduled Date', appt.preferred_date],
      ['Time', appt.preferred_time || '—'],
      ['Amount Paid', `ZMW ${Number(appt.amount).toFixed(2)}`],
    ];

    data.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.text(String(value), 60, y);
      y += 8;
    });

    doc.save(`Admin-Receipt-${appt.transaction_id}.pdf`);
  };

  const openCount = appointments.filter(a => a.appointment_status === 'open').length;
  const closedCount = appointments.filter(a => a.appointment_status === 'closed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      {/* Admin Header */}
      <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors text-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to site
              </Link>
              <span className="hidden sm:inline text-gray-300">|</span>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-6 bg-green-600 rounded-full" />
                  Admin Dashboard
                </h1>
                <p className="text-gray-500 text-xs md:text-sm">{COMPANY_NAME}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {updateMessage && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${updateMessage.includes('Failed') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-800'}`}>
          <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${updateMessage.includes('Failed') ? 'bg-red-100' : 'bg-green-100'}`}>
            {updateMessage.includes('Failed') ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            )}
          </span>
          <span className="font-medium">{updateMessage}</span>
        </div>
      )}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{appointments.length}</p>
                <p className="text-gray-400 text-sm mt-0.5">appointments</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Open</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{openCount}</p>
                <p className="text-gray-400 text-sm mt-0.5">pending</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Closed</p>
                <p className="text-3xl font-bold text-gray-600 mt-1">{closedCount}</p>
                <p className="text-gray-400 text-sm mt-0.5">completed</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
          </div>
        </div>

      {/* Status Toggle */}
      <div className="mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex flex-col sm:flex-row gap-2">
          <button 
            onClick={() => setViewStatus('open')} 
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
              viewStatus === 'open' ? 'bg-green-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <span className={`w-2 h-2 rounded-full ${viewStatus === 'open' ? 'bg-green-400' : 'bg-gray-300'}`} />
              Open
            </span>
          </button>
          <button 
            onClick={() => setViewStatus('closed')} 
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
              viewStatus === 'closed' ? 'bg-green-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <span className={`w-2 h-2 rounded-full ${viewStatus === 'closed' ? 'bg-green-400' : 'bg-gray-300'}`} />
              Closed
            </span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by name or transaction ID..." 
              className="w-full bg-gray-50 border border-gray-100 p-3.5 pl-11 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          
          <select 
            className="bg-gray-50 border border-gray-100 p-3.5 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Service Types</option>
            {Object.entries(SERVICE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          
          <button 
            onClick={fetchAppointments} 
            disabled={loading}
            className="sm:col-span-2 lg:col-span-1 bg-green-900 text-white font-bold rounded-xl py-3.5 hover:bg-green-800 disabled:opacity-60 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            {loading ? 'Syncing...' : 'Sync'}
          </button>
        </div>
      </div>

      {/* Appointment List */}
      <div className="pb-12">
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Loading appointments...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <p className="text-gray-500 font-medium">No matching appointments</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting filters or sync the database</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-1">
              {viewStatus === 'open' ? 'Open Appointments' : 'Closed Records'} ({filteredData.length})
            </h2>
            <div className="grid grid-cols-1 gap-4">
            {filteredData.map((appt) => (
              <div 
                key={appt.id} 
                onClick={() => setSelectedAppt(appt)}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:shadow-md hover:border-green-300 hover:ring-2 hover:ring-green-100 transition-all gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 text-center sm:text-left">
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-green-900 text-base md:text-lg leading-tight">
                      {appt.customer_name}
                    </h3>
                    <p className="text-[11px] md:text-xs text-gray-500 mt-1">
                      {SERVICE_LABELS[appt.service_type] || 'Irrigation Service'}
                    </p>
                  </div>

                  <div className="h-px w-full sm:h-8 sm:w-px bg-gray-100"></div>
                  
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Schedule</span>
                    <span className="font-mono text-[11px] md:text-xs text-green-900 font-bold bg-green-50 px-2 py-1 rounded-lg mt-1">
                      {appt.preferred_date} {appt.preferred_time ? `at ${appt.preferred_time}` : ''}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 gap-2">
                  <span className="font-black text-gray-900 text-sm md:text-lg">
                    ZMW {Number(appt.amount).toFixed(2)}
                  </span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter border ${
                    appt.appointment_status === 'open' 
                      ? 'bg-blue-50 text-blue-600 border-blue-100' 
                      : 'bg-gray-50 text-gray-500 border-gray-200'
                  }`}>
                    {appt.appointment_status}
                  </span>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>

      {/* Portfolio projects – add projects to show on portfolio page */}
      <section className="mt-12 pt-10 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </span>
          Portfolio projects
        </h2>
        <p className="text-sm text-gray-500 mb-6">Projects appear on the Portfolio page (/get-demo). Upload images from your PC (recommended) or paste image URLs. Start the backend server from <code className="bg-gray-100 px-1 rounded">src/backend</code> with <code className="bg-gray-100 px-1 rounded">npm start</code> for uploads.</p>

        <form onSubmit={handleAddPortfolioProject} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="block text-sm font-semibold text-gray-700 mb-1">Project name</span>
              <input
                type="text"
                value={portfolioForm.name}
                onChange={(e) => setPortfolioForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Turkish Embassy"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-semibold text-gray-700 mb-1">Sector</span>
              <select
                value={portfolioForm.sector}
                onChange={(e) => setPortfolioForm((f) => ({ ...f, sector: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="Commercial & institutional">Commercial &amp; institutional</option>
                <option value="Residential">Residential</option>
              </select>
            </label>
          </div>
          <label className="block mb-3">
            <span className="block text-sm font-semibold text-gray-700 mb-1">Upload images from your PC</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              multiple
              onChange={(e) => setPortfolioFiles(Array.from(e.target.files || []))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-800 file:font-semibold"
            />
            {portfolioFiles.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">{portfolioFiles.length} file(s) selected</p>
            )}
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-semibold text-gray-700 mb-1">Or paste image URLs (one per line)</span>
            <textarea
              value={portfolioForm.imageUrlsText}
              onChange={(e) => setPortfolioForm((f) => ({ ...f, imageUrlsText: e.target.value }))}
              placeholder="https://example.com/image1.jpg"
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
            />
          </label>
          {portfolioMessage && (
            <p className={`mb-4 text-sm ${portfolioMessage.includes('Failed') || portfolioMessage.includes('error') || portfolioMessage.includes('required') ? 'text-red-600' : 'text-green-700'}`}>{portfolioMessage}</p>
          )}
          <button type="submit" disabled={portfolioUploading} className="bg-green-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {portfolioUploading ? 'Uploading…' : 'Add project to portfolio'}
          </button>
        </form>

        {portfolioLoading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="w-10 h-10 border-2 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Loading portfolio...</p>
          </div>
        ) : portfolioProjects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500 text-sm">
            No admin-added projects yet. Projects from your image folders still appear on the site. Add projects above to show more on the portfolio page.
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Added projects ({portfolioProjects.length})</p>
            <div className="grid gap-3">
              {portfolioProjects.map((p) => (
                <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 min-w-0">
                    {Array.isArray(p.image_urls) && p.image_urls[0] && (
                      <img src={p.image_urls[0]} alt="" className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                    )}
                    <div>
                      <p className="font-bold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.sector} · {Array.isArray(p.image_urls) ? p.image_urls.length : 0} image(s)</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeletePortfolioProject(p.id)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Detail Modal */}
      {selectedAppt && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedAppt(null)} />
          
          <div className="relative bg-white w-full max-w-lg md:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300 max-h-[95vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-900 to-green-800 p-5 md:p-6 text-white shrink-0">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg md:text-xl font-black uppercase tracking-tight">Case Overview</h2>
                  <p className="text-green-200 text-[10px] font-mono mt-0.5">{selectedAppt.transaction_id}</p>
                </div>
                <button onClick={() => setSelectedAppt(null)} className="p-2 hover:bg-white/10 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 md:p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <label className="text-gray-400 text-[9px] uppercase font-black block mb-1">Customer</label>
                  <p className="font-bold text-gray-900 text-sm md:text-base">{selectedAppt.customer_name}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <label className="text-gray-400 text-[9px] uppercase font-black block mb-1">Contact</label>
                  <p className="font-bold text-gray-900 text-sm">{selectedAppt.phone}</p>
                </div>
                <div className="col-span-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <label className="text-gray-400 text-[9px] uppercase font-black block mb-1">Email</label>
                  <p className="font-medium text-gray-700 text-sm break-all">{selectedAppt.email}</p>
                </div>
              </div>

              <div className="bg-green-50/50 border-l-4 border-green-900 p-4 rounded-r-xl">
                <label className="text-green-800 text-[9px] uppercase font-black block mb-1">Service Requested</label>
                <span className="text-sm md:text-base font-black text-green-900 block">
                  {SERVICE_LABELS[selectedAppt.service_type] || selectedAppt.service_type}
                </span>
                <p className="text-xs font-bold text-green-700 mt-1">Date: {selectedAppt.preferred_date} {selectedAppt.preferred_time ? `at ${selectedAppt.preferred_time}` : ''}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="text-gray-400 text-[9px] uppercase font-black block mb-1">Special Requirements</label>
                <p className="text-xs md:text-sm text-gray-600 italic">
                  "{selectedAppt.notes || "No extra instructions provided."}"
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <label className="text-gray-400 text-[9px] uppercase font-black block mb-1">Amount Paid</label>
                <p className="text-xl font-bold text-green-900">ZMW {Number(selectedAppt.amount).toFixed(2)}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                {selectedAppt.appointment_status === 'open' ? (
                  <button 
                    onClick={() => handleUpdateStatus(selectedAppt.id, 'closed')}
                    className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-black uppercase text-xs hover:bg-blue-700 transition-all shadow-md"
                  >
                    Close Appointment
                  </button>
                ) : (
                  <button 
                    onClick={() => handleUpdateStatus(selectedAppt.id, 'open')}
                    className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-black uppercase text-xs"
                  >
                    Re-open Appointment
                  </button>
                )}

                <button 
                  onClick={() => handleDownloadReceipt(selectedAppt)}
                  className="w-full flex items-center justify-center gap-2 bg-green-900 text-white py-3.5 rounded-xl font-black uppercase text-xs hover:bg-green-800 transition-all shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  Generate PDF
                </button>
                
                <button 
                  onClick={() => setSelectedAppt(null)}
                  className="w-full bg-gray-100 text-gray-500 py-3 rounded-xl font-bold text-xs uppercase"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
};

export default AdminAppointments;