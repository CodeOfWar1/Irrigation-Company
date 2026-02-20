import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { supabase } from '../supabase/client';
const BOOKING_EVENT = 'open-booking';
const COMPANY_NAME = 'Lawn Irrigation Technologies';
const LENCO_PUBLIC_KEY = import.meta.env.VITE_LENCO_PUBLIC_KEY;

const SERVICE_LABELS = {
  'irrigation-design': 'Irrigation design & consultancy',
  'installation': 'Installation & supply',
  'maintenance': 'Maintenance & after-sales',
};

const INITIAL_FORM_VALUES = {
  name: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  notes: '',
  paymentMethod: 'card',
  payerName: '',
  amount: 2.5,
};

function generateTransactionId() {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `MLD-${y}${m}${d}-${random}`;
}

const Booking = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/appointments';
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({ ...INITIAL_FORM_VALUES });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [receipt, setReceipt] = useState(null);

  const [scriptReady, setScriptReady] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchBookedDates = async () => {
        const { data } = await supabase.from('bookings').select('preferred_date');
        if (data) {
          const dates = [...new Set(data.map((r) => r.preferred_date).filter(Boolean))];
          setBookedDates(dates);
        }
      };
      fetchBookedDates();
    }
  }, [open]);

  useEffect(() => {
    if (window.LencoPay) {
      setScriptReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = "https://pay.lenco.co/js/v1/inline.js";
    script.async = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => setScriptReady(false);
    document.body.appendChild(script);

    const openPanel = () => setOpen(true);
    window.addEventListener(BOOKING_EVENT, openPanel);
    return () => {
      window.removeEventListener(BOOKING_EVENT, openPanel);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (name === 'date') setStatusMessage('');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setStatusMessage('');
    if (!formValues.name || !formValues.email || !formValues.service || !formValues.date || !formValues.phone) {
      setStatusMessage('Please fill in all required fields.');
      return;
    }
    if (bookedDates.includes(formValues.date)) {
      setStatusMessage('This date is already booked. Please choose another date.');
      return;
    }
    setStep(2);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const amount = parseFloat(formValues.amount);
    
    if (!formValues.payerName || isNaN(amount) || amount < 1) {
      setStatusMessage('Please enter the payer name and a valid amount.');
      return;
    }

    if (!window.LencoPay) {
      setStatusMessage('Payment gateway is still loading. Please wait a moment and try again.');
      return;
    }

    if (!LENCO_PUBLIC_KEY) {
      setStatusMessage('Payment is not configured. Please add VITE_LENCO_PUBLIC_KEY to your environment.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('');

    // Safety: unstick button if Lenco never calls back (e.g. 504, popup blocked)
    const timeout = setTimeout(() => {
      setIsSubmitting((prev) => {
        if (prev) {
          setStatusMessage('Payment gateway is not responding (504). Lenco\'s servers may be temporarily down. Please try again in a few minutes, or contact us at lawnirrigationtech@gmail.com to complete your booking.');
          return false;
        }
        return prev;
      });
    }, 60000);
    const nameParts = formValues.payerName.split(' ');

    try {
    window.LencoPay.getPaid({
      key: LENCO_PUBLIC_KEY,
      reference: generateTransactionId(),
      email: formValues.email,
      amount: amount,
      currency: "ZMW",
      channels: ["card", "mobile-money"],
      customer: { 
        firstName: nameParts[0] || 'Customer', 
        lastName: nameParts.slice(1).join(' ') || 'Client', 
        phone: formValues.phone 
      },
      onSuccess: async (res) => {
        clearTimeout(timeout);
        try {
          // --- INSERT INTO SUPABASE ---
          const { error } = await supabase.from('bookings').insert([{
            transaction_id: res.reference,
            customer_name: formValues.name,
            email: formValues.email,
            phone: formValues.phone,
            service_type: formValues.service,
            preferred_date: formValues.date,
            notes: formValues.notes,
            amount: amount,
            payment_method: formValues.paymentMethod
          }]);

          setReceipt({
            transactionId: res.reference,
            paidAt: new Date().toISOString(),
            ...formValues,
            amount: amount,
            serviceLabel: SERVICE_LABELS[formValues.service],
          });
          setStep(3);
          
          if (error) throw error;
        } catch (dbError) {
          console.error("Database Error:", dbError);
          setStatusMessage("Payment successful, but failed to save to database. Please download your receipt.");
          setStep(3); // Still show receipt so they have proof
        } finally {
          setIsSubmitting(false);
        }
      },
      onClose: () => {
        clearTimeout(timeout);
        setIsSubmitting(false);
      },
      onError: (err) => {
        clearTimeout(timeout);
        setIsSubmitting(false);
        setStatusMessage(err?.message || 'Payment failed. Please try again.');
        console.error('Lenco onError:', err);
      }
    });
    } catch (err) {
      clearTimeout(timeout);
      setIsSubmitting(false);
      setStatusMessage(err?.message || 'Could not open payment. Check console for details.');
      console.error('Lenco getPaid error:', err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setFormValues({ ...INITIAL_FORM_VALUES });
    setStatusMessage('');
    setReceipt(null);
  };

  const handleDownloadReceipt = () => {
    if (!receipt) return;
    const doc = new jsPDF({ format: 'a4', unit: 'mm' });
    const pageW = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(15, 76, 117); 
    doc.rect(0, 0, pageW, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text(COMPANY_NAME, 14, 20);
    doc.setFontSize(12);
    doc.text('OFFICIAL PAYMENT RECEIPT', 14, 30);

    // Body
    doc.setTextColor(0, 0, 0);
    let y = 55;
    doc.setFontSize(10);
    doc.text(`Transaction ID: ${receipt.transactionId}`, 14, y);
    y += 10;

    const data = [
      ['Customer Name', receipt.name],
      ['Service', receipt.serviceLabel],
      ['Phone', receipt.phone],
      ['Booking Date', receipt.date],
      ['Amount Paid', `ZMW ${Number(receipt.amount).toFixed(2)}`],
    ];

    data.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.text(String(value), 60, y);
      y += 8;
    });

    doc.save(`Receipt-${receipt.transactionId}.pdf`);
  };

  return (
    <>
      {/* Floating Book button - hidden on admin dashboard */}
      {!isAdminPage && (
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent(BOOKING_EVENT))}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 bg-green-900 hover:bg-green-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        aria-label="Book a project"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="hidden sm:inline">Book a Project</span>
      </button>
      )}

      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={handleClose} />}

      <div className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 bg-green-900 text-white">
          <h2 className="text-lg font-bold">Book a Project</h2>
          <button onClick={handleClose} className="p-2 text-xl">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <h3 className="text-gray-800 font-bold text-lg">Project Details</h3>
              <div className="space-y-3">
                <input type="text" name="name" placeholder="Full Name" value={formValues.name} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" required />
                <input type="tel" name="phone" placeholder="Phone (e.g. 097...)" value={formValues.phone} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" required />
                <input type="email" name="email" placeholder="Email Address" value={formValues.email} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" required />
                <select name="service" value={formValues.service} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" required>
                  <option value="">Select Service</option>
                  {Object.entries(SERVICE_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="date"
                    name="date"
                    value={formValues.date}
                    onChange={handleChange}
                    placeholder="Select date"
                    min={new Date().toISOString().slice(0, 10)}
                    className="w-full pl-12 pr-4 py-3 border rounded-xl [color-scheme:light]"
                    required
                  />
                </div>
                {statusMessage && step === 1 && <p className="text-red-500 text-sm">{statusMessage}</p>}
                <textarea name="notes" placeholder="Notes (Optional)" value={formValues.notes} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" rows="3" />
              </div>
              <button type="submit" className="w-full bg-green-900 text-white font-bold py-4 rounded-xl hover:bg-green-800 transition-colors">
                Review Summary & Pay →
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="bg-gray-50 border rounded-2xl p-5 space-y-4">
                <h3 className="font-bold text-gray-900 border-b pb-2">Order Summary</h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Client:</span>
                    <span className="font-medium">{formValues.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service:</span>
                    <span className="font-medium text-right ml-4">{SERVICE_LABELS[formValues.service]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scheduled:</span>
                    <span className="font-medium">{formValues.date}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">Payment Information</label>
                <input type="text" name="payerName" placeholder="Name on Account/Card" value={formValues.payerName} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl" required />
                <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-500">K</span>
                    <input type="number" name="amount" readOnly placeholder="Amount (ZMW)" value={formValues.amount} onChange={handleChange} className="w-full pl-8 pr-4 py-3 border rounded-xl" required min="1" />
                </div>
              </div>

              {statusMessage && <p className={`text-sm p-3 rounded-lg ${statusMessage.includes('504') || statusMessage.includes('not responding') ? 'text-amber-800 bg-amber-50' : 'text-red-500 bg-red-50'}`}>{statusMessage}</p>}
              {!scriptReady && <p className="text-amber-600 text-sm">Loading payment gateway...</p>}

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border-2 border-gray-200 py-4 rounded-xl font-bold">Back</button>
                <button type="submit" disabled={isSubmitting || !scriptReady} className="flex-[2] bg-green-900 text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50">
                  {isSubmitting ? 'Opening payment window...' : scriptReady ? `Pay ZMW ${formValues.amount || '0.00'}` : 'Loading...'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && receipt && (
            <div className="space-y-6 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">Payment Complete</h3>
                <p className="text-gray-500">Your irrigation project is now booked.</p>
              </div>

              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-5 text-left space-y-3">
                <div className="flex justify-between text-xs text-gray-400 font-mono">
                  <span>REF: {receipt.transactionId}</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm"><span>Service:</span><span className="font-bold">{receipt.serviceLabel}</span></div>
                    <div className="flex justify-between text-sm"><span>Paid by:</span><span className="font-bold">{receipt.payerName}</span></div>
                    <div className="flex justify-between text-lg pt-2 border-t">
                        <span className="font-bold">Total:</span>
                        <span className="font-black text-green-900">ZMW {Number(receipt.amount).toFixed(2)}</span>
                    </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button onClick={handleDownloadReceipt} className="w-full flex items-center justify-center gap-2 border-2 border-green-900 text-green-900 py-4 rounded-xl font-bold hover:bg-green-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Download PDF Receipt
                </button>
                <button onClick={handleClose} className="w-full bg-green-900 text-white py-4 rounded-xl font-bold">Return to Home</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Booking;