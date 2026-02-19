import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom'; 

const COMPANY_NAME = 'Lawn Irrigation Technologies';

const SERVICE_LABELS = {
  'irrigation-design': 'Irrigation design & consultancy',
  'installation': 'Installation & supply',
  'maintenance': 'Maintenance & after-sales',
};

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewStatus, setViewStatus] = useState('open'); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

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

  const handleUpdateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('bookings')
      .update({ appointment_status: newStatus })
      .eq('id', id);

    if (error) {
      alert("Error updating status");
    } else {
      setSelectedAppt(null);
      fetchAppointments();
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
    
    doc.setFillColor(15, 76, 117); 
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-8">
      {/* Admin Navbar */}
      <div className="max-w-7xl mx-auto mb-6 md:mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              Admin Dashboard
              <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase">Appointments</span>
            </h1>
            <p className="text-gray-500 text-xs md:text-sm mt-1">{COMPANY_NAME}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-white text-red-600 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-50 transition-all border border-red-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats and Status Toggle */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-5 md:p-6">
            <span className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider block mb-1">Total Pool</span>
            <span className="text-2xl md:text-3xl font-black text-green-900">{appointments.length}</span>
          </div>
          
          <div className="md:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-200/50 p-2 flex flex-col sm:flex-row items-center gap-2">
            <button 
              onClick={() => setViewStatus('open')} 
              className={`w-full sm:flex-1 py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wide transition-all ${
                viewStatus === 'open' 
                  ? 'bg-green-900 text-white shadow-lg shadow-green-900/25' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className={`w-2 h-2 rounded-full ${viewStatus === 'open' ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                Open Appointments
              </span>
            </button>
            <button 
              onClick={() => setViewStatus('closed')} 
              className={`w-full sm:flex-1 py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wide transition-all ${
                viewStatus === 'closed' 
                  ? 'bg-green-900 text-white shadow-lg shadow-green-900/25' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className={`w-2 h-2 rounded-full ${viewStatus === 'closed' ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                Closed Records
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-3 md:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="w-full bg-gray-50 border-0 p-3.5 pl-11 rounded-xl text-sm focus:ring-2 focus:ring-green-900 outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          
          <select 
            className="bg-gray-50 border-0 p-3.5 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-green-900 outline-none"
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
            className="sm:col-span-2 md:col-span-1 bg-green-900 text-white font-bold rounded-xl py-3.5 hover:bg-green-800 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Sync Database
          </button>
        </div>
      </div>

      {/* Appointment List */}
      <div className="max-w-7xl mx-auto pb-10">
        {loading ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200/50 p-12 text-center">
            <div className="w-10 h-10 border-4 border-green-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Updating View...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200/50 p-12 text-center">
            <p className="text-gray-400 uppercase text-xs font-bold tracking-widest">No matching records found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filteredData.map((appt) => (
              <div 
                key={appt.id} 
                onClick={() => setSelectedAppt(appt)}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200/50 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:border-green-900 transition-all gap-4"
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
                      {appt.preferred_date}
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
        )}
      </div>

      {/* Detail Modal */}
      {selectedAppt && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedAppt(null)} />
          
          <div className="relative bg-white w-full max-w-lg md:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300 max-h-[95vh]">
            {/* Modal Header */}
            <div className="bg-green-900 p-5 md:p-6 text-white shrink-0">
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
                <p className="text-xs font-bold text-green-700 mt-1">Date: {selectedAppt.preferred_date}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="text-gray-400 text-[9px] uppercase font-black block mb-1">Special Requirements</label>
                <p className="text-xs md:text-sm text-gray-600 italic">
                  "{selectedAppt.notes || "No extra instructions provided."}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4">
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
    </div>
  );
};

export default AdminAppointments;