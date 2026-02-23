import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { supabase } from '../supabase/client';
const BOOKING_EVENT = 'open-booking';
const COMPANY_NAME = 'Lawn Irrigation Technologies';
const LENCO_PUBLIC_KEY = import.meta.env.VITE_LENCO_PUBLIC_KEY;

const SERVICE_LABELS = {
  'step-1-consultation': 'Step 1: Initial Consultation & Site Assessment',
  'step-2-budget': 'Step 2 (Path A): Scoping – Standard Residential (< 4,200m²)',
  'step-2b-estate-commercial': 'Step 2 (Path B): Scoping – Estate & Commercial (4,200–10,000m²)',
  'step-3-design': 'Step 3: 3D Visualisation',
  'step-4-final-design': 'Step 4: Existing System Diagnosis',
  'step-5-installation': 'Step 5: Precision Installation & Handover',
  'full-service': 'Full Service Pathway (All Steps)',
};

const SERVICE_PRICING = {
  'step-1-consultation': 1000,
  'step-2-budget': 0,
  'step-2b-estate-commercial': 3000,
  'step-3-design': 4000,
  'step-4-final-design': 1500,
  'step-5-installation': null, // 25% of total material cost – handled at quotation stage
  'full-service': null,
};

const INITIAL_FORM_VALUES = {
  name: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  time: '',
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
  const [bookedSlots, setBookedSlots] = useState({}); // { date: [time1, time2, ...] }

  useEffect(() => {
    if (open) {
      const fetchBookedDates = async () => {
        const { data } = await supabase.from('bookings').select('preferred_date, preferred_time');
        if (data) {
          const dates = [...new Set(data.map((r) => r.preferred_date).filter(Boolean))];
          setBookedDates(dates);
          
          // Group bookings by date and time
          const slotsByDate = {};
          data.forEach((booking) => {
            if (booking.preferred_date && booking.preferred_time) {
              if (!slotsByDate[booking.preferred_date]) {
                slotsByDate[booking.preferred_date] = [];
              }
              slotsByDate[booking.preferred_date].push(booking.preferred_time);
            }
          });
          setBookedSlots(slotsByDate);
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
    if (name === 'date' || name === 'time') setStatusMessage('');
  };

  const isTimeSlotAvailable = (date, time) => {
    if (!time) return true;
    const slots = bookedSlots[date] || [];
    if (slots.length === 0) return true;
    
    // Check if any existing booking is within 3 hours of the requested time
    const requestedTime = new Date(`${date}T${time}`);
    return !slots.some((bookedTime) => {
      const booked = new Date(`${date}T${bookedTime}`);
      const diffHours = Math.abs(requestedTime - booked) / (1000 * 60 * 60);
      return diffHours < 3;
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setStatusMessage('');
    if (!formValues.name || !formValues.email || !formValues.service || !formValues.date || !formValues.phone || !formValues.time) {
      setStatusMessage('Please fill in all required fields including time.');
      return;
    }
    if (!isTimeSlotAvailable(formValues.date, formValues.time)) {
      setStatusMessage('This time slot conflicts with an existing booking. Please choose a time at least 3 hours apart from other appointments.');
      return;
    }

    // Set suggested amount based on selected service (for payment + summary)
    const base = SERVICE_PRICING[formValues.service];
    const nextAmount =
      typeof base === 'number'
        ? base
        : formValues.amount || 2.5;

    setFormValues((prev) => ({
      ...prev,
      amount: nextAmount,
    }));

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
            preferred_time: formValues.time,
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
            time: formValues.time,
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
      ['Time', receipt.time || 'TBD'],
      ['Amount Paid', `ZMW ${Number(receipt.amount).toFixed(2)}`],
    ];

    data.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.text(String(value), 60, y);
      y += 8;
    });

    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Terms & Conditions (summary)', 14, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const termsLines = [
      'This receipt is subject to Lawn Irrigation Technologies\' full Terms & Conditions.',
      'The site audit fee (where applicable) is non-refundable but 100% deductible from the',
      'final installation cost upon award of contract. Large properties may have additional',
      'design fees. 3D visualisation and design rights are as per our published terms.',
      'Full terms: please see our website or request a copy from us.',
    ];
    termsLines.forEach((line) => {
      doc.text(line, 14, y, { maxWidth: pageW - 28 });
      y += 4;
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
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-3 bg-green-900 hover:bg-green-800 text-white font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
        aria-label="Book a project"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="hidden sm:inline">Book a Project</span>
        <span className="sm:hidden">Book</span>
      </button>
      )}

      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={handleClose} />}

      <div className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-4 bg-green-900 text-white shadow-lg">
          <h2 className="text-lg font-bold tracking-tight">Book a Project</h2>
          <button onClick={handleClose} className="p-2 -m-2 rounded-lg hover:bg-white/10 text-xl transition-colors" aria-label="Close">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-gray-50/50">
          {step === 1 && (
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <h3 className="text-gray-900 font-bold text-lg border-b border-green-200 pb-2">Project Details</h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1">Full Name</span>
                  <input type="text" name="name" value={formValues.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" required />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1">Phone</span>
                  <input type="tel" name="phone" placeholder="e.g. 097..." value={formValues.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" required />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1">Email</span>
                  <input type="email" name="email" value={formValues.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" required />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1">Service</span>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </span>
                    <select
                      name="service"
                      value={formValues.service}
                      onChange={handleChange}
                      className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white appearance-none cursor-pointer text-gray-800 font-medium"
                      required
                    >
                      <option value="">Select a service</option>
                      {Object.entries(SERVICE_LABELS).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </div>
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1">Preferred date</span>
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
                      min={new Date().toISOString().slice(0, 10)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white [color-scheme:light]"
                      required
                    />
                  </div>
                </label>
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </span>
                    <span className="text-sm font-semibold text-gray-800">Preferred time</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Tap a time slot or pick a custom time below</p>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormValues((prev) => ({ ...prev, time: slot }))}
                        className={`py-2.5 rounded-lg text-sm font-semibold border-2 transition-all ${
                          formValues.time === slot
                            ? 'border-green-600 bg-green-600 text-white shadow-md'
                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-green-400 hover:bg-green-50/50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </span>
                    <input
                      type="time"
                      name="time"
                      value={formValues.time}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white [color-scheme:light]"
                      required
                    />
                  </div>
                </div>
                {statusMessage && step === 1 && <p className="text-red-500 text-sm">{statusMessage}</p>}
                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</span>
                  <textarea name="notes" value={formValues.notes} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white resize-none" rows="3" placeholder="Any special requests or details..." />
                </label>
              </div>
              <button type="submit" className="w-full bg-green-900 text-white font-bold py-3.5 rounded-xl hover:bg-green-800 transition-colors shadow-md hover:shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Review Summary & Pay →
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-gray-900 border-b border-green-200 pb-2">Order Summary</h3>
                <div className="text-sm space-y-2.5">
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
                    <span className="font-medium">{formValues.date} at {formValues.time || 'TBD'}</span>
                  </div>
                  <div className="h-px bg-gray-100 my-1" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Service fee:</span>
                    <span className="font-semibold text-green-900">
                      {SERVICE_PRICING[formValues.service] === 0 && 'Complimentary'}
                      {SERVICE_PRICING[formValues.service] > 0 && `ZMW ${SERVICE_PRICING[formValues.service].toLocaleString()}`}
                      {SERVICE_PRICING[formValues.service] == null && 'See quotation (varies)'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">Payment Information</label>
                <input
                  type="text"
                  name="payerName"
                  placeholder="Name on Account/Card"
                  value={formValues.payerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                  required
                />
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-500">K</span>
                  <input
                    type="number"
                    name="amount"
                    placeholder={
                      SERVICE_PRICING[formValues.service] != null && SERVICE_PRICING[formValues.service] > 0
                        ? SERVICE_PRICING[formValues.service]
                        : 'Enter agreed amount'
                    }
                    value={formValues.amount}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                    min="1"
                  />
                </div>
                {formValues.service === 'step-1-consultation' && (
                  <p className="text-xs text-gray-500">
                    You may pay the full consultation fee (ZMW 1,000) or a minimum of ZMW 500 as a commitment deposit.
                  </p>
                )}
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
                  <div className="flex justify-between text-sm"><span>Date:</span><span className="font-bold">{receipt.date || '—'}</span></div>
                  <div className="flex justify-between text-sm"><span>Time:</span><span className="font-bold">{receipt.time || '—'}</span></div>
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