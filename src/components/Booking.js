import React, { useState } from 'react';

const BOOKING_EVENT = 'open-booking';

const COMPANY_NAME = 'Lawn Irrigation Technologies';

const SERVICE_LABELS = {
  'irrigation-design': 'Irrigation design & consultancy',
  'installation': 'Installation & supply',
  'maintenance': 'Maintenance & after-sales',
};

const INITIAL_FORM_VALUES = {
  name: '',
  email: '',
  service: '',
  date: '',
  notes: '',
  paymentMethod: 'card',
  payerName: '',
  amount: '',
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
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    const openPanel = () => setOpen(true);
    window.addEventListener(BOOKING_EVENT, openPanel);
    return () => window.removeEventListener(BOOKING_EVENT, openPanel);
  }, []);

  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({ ...INITIAL_FORM_VALUES });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [receipt, setReceipt] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setStatusMessage('');
    if (!formValues.name || !formValues.email || !formValues.service || !formValues.date) {
      setStatusMessage('Please fill in all required fields before continuing.');
      return;
    }
    setStep(2);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const amount = formValues.amount ? parseFloat(formValues.amount) : 0;
    if (!formValues.payerName || !amount || amount < 1) {
      setStatusMessage('Please enter payer name and a valid amount.');
      return;
    }
    setIsSubmitting(true);
    setStatusMessage('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const paidAt = new Date();
      setReceipt({
        transactionId: generateTransactionId(),
        paidAt: paidAt.toISOString(),
        ...formValues,
        amount: amount,
        serviceLabel: SERVICE_LABELS[formValues.service] || formValues.service,
      });
      setStep(3);
    } catch (error) {
      setStatusMessage('Something went wrong while processing the payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setFormValues({ ...INITIAL_FORM_VALUES });
    setStatusMessage('');
    setReceipt(null);
  };

  const getReceiptHtml = () => {
    if (!receipt) return '';
    const paidDate = new Date(receipt.paidAt || receipt.date);
    const dateStr = paidDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = paidDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const preferredDateStr = receipt.date ? new Date(receipt.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Receipt - ${receipt.transactionId}</title>
  <style>
    body { font-family: 'Segoe UI', system-ui, sans-serif; max-width: 400px; margin: 2rem auto; padding: 1.5rem; color: #111; }
    .header { border-bottom: 2px solid #0F4C75; padding-bottom: 0.75rem; margin-bottom: 1rem; }
    .company { font-size: 1.25rem; font-weight: 700; color: #0F4C75; }
    .title { font-size: 0.9rem; color: #666; margin-top: 0.25rem; }
    .meta { font-size: 0.85rem; color: #555; margin-bottom: 1rem; }
    table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    tr:not(:last-child) td { border-bottom: 1px solid #eee; padding: 0.4rem 0; }
    .label { color: #666; }
    .total { font-weight: 700; font-size: 1.1rem; padding-top: 0.5rem; }
    .status { display: inline-block; background: #22A06B; color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; margin-top: 1rem; }
    .footer { margin-top: 1.5rem; font-size: 0.8rem; color: #888; }
  </style>
</head>
<body>
  <div class="header">
    <div class="company">${COMPANY_NAME}</div>
    <div class="title">PAYMENT RECEIPT</div>
  </div>
  <div class="meta">
    Transaction ID: <strong>${receipt.transactionId}</strong><br>
    Paid: ${dateStr} at ${timeStr}
  </div>
  <table>
    <tr><td class="label">Customer</td><td>${receipt.name}</td></tr>
    <tr><td class="label">Email</td><td>${receipt.email}</td></tr>
    <tr><td class="label">Service</td><td>${receipt.serviceLabel}</td></tr>
    <tr><td class="label">Preferred date</td><td>${preferredDateStr}</td></tr>
    <tr><td class="label">Payment method</td><td>${receipt.paymentMethod === 'card' ? 'Credit / Debit Card' : 'Mobile Money'}</td></tr>
    <tr><td class="label">Payer</td><td>${receipt.payerName}</td></tr>
    <tr class="total"><td>Amount paid</td><td>ZMW ${Number(receipt.amount).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr>
  </table>
  <div class="status">PAID</div>
  <div class="footer">Thank you for your booking. We will contact you shortly regarding next steps.</div>
</body>
</html>`;
  };

  const handleDownloadReceipt = () => {
    if (!receipt) return;
    const html = getReceiptHtml();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lawn-Irrigation-Receipt-${receipt.transactionId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div id="booking" className="fixed bottom-6 right-6 z-50" aria-hidden={open}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold shadow-xl rounded-full px-5 py-3 text-base transition-all hover:scale-105"
          aria-label="Open booking form"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book a project
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out overflow-hidden flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'
          }`}
        aria-modal="true"
        aria-labelledby="booking-panel-title"
        role="dialog"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-900 text-white">
          <h2 id="booking-panel-title" className="text-lg font-bold">
            Book a project
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close booking"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-gray-600 text-base mb-6">
            Share your project details, pick a date, and confirm your booking.
          </p>

          {step !== 3 && (
            <div className="flex items-center justify-center mb-6 space-x-4 text-sm font-semibold">
              <div className="flex items-center">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${step === 1 ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-900'}`}>1</span>
                <span className={step === 1 ? 'text-blue-900' : 'text-gray-500'}>Details</span>
              </div>
              <div className="w-8 h-px bg-gray-300" />
              <div className="flex items-center">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${step === 2 ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-900'}`}>2</span>
                <span className={step === 2 ? 'text-blue-900' : 'text-gray-500'}>Payment</span>
              </div>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Full name<span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formValues.name} onChange={handleChange} className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Email<span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formValues.email} onChange={handleChange} className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Service<span className="text-red-500">*</span></label>
                <select name="service" value={formValues.service} onChange={handleChange} className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Select a service</option>
                  <option value="irrigation-design">Irrigation design & consultancy</option>
                  <option value="installation">Installation & supply</option>
                  <option value="maintenance">Maintenance & after-sales</option>
                </select>
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Preferred date<span className="text-red-500">*</span></label>
                <input type="date" name="date" value={formValues.date} onChange={handleChange} className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Project summary / notes</label>
                <textarea name="notes" rows="3" value={formValues.notes} onChange={handleChange} className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Brief project description..." />
              </div>
              {statusMessage && <p className="text-base text-red-600">{statusMessage}</p>}
              <button type="submit" className="w-full text-white bg-blue-900 hover:bg-blue-800 font-semibold py-3 text-base rounded-xl shadow-lg">
                Continue to payment →
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePayment} className="space-y-5">
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Order summary</p>
                <div className="space-y-1.5 text-base text-gray-700">
                  <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-medium text-gray-900">{SERVICE_LABELS[formValues.service] || formValues.service}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Client</span><span className="font-medium text-gray-900">{formValues.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Preferred date</span><span className="font-medium text-gray-900">{formValues.date || '—'}</span></div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Payment method</p>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${formValues.paymentMethod === 'card' ? 'border-blue-900 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="paymentMethod" value="card" checked={formValues.paymentMethod === 'card'} onChange={handleChange} className="sr-only" />
                    <span className="text-lg">💳</span>
                    <span className="text-sm font-medium text-gray-800">Card</span>
                  </label>
                  <label className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${formValues.paymentMethod === 'mobile-money' ? 'border-blue-900 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="paymentMethod" value="mobile-money" checked={formValues.paymentMethod === 'mobile-money'} onChange={handleChange} className="sr-only" />
                    <span className="text-lg">📱</span>
                    <span className="text-sm font-medium text-gray-800">Mobile Money</span>
                  </label>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name on card / account</label>
                  <input type="text" name="payerName" value={formValues.payerName} onChange={handleChange} className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="As it appears on card or account" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (ZMW)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">K</span>
                    <input type="number" name="amount" value={formValues.amount} onChange={handleChange} min="1" step="0.01" className="w-full pl-8 pr-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="0.00" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 14.67 2 10.225 2 5c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure payment. Your details are protected.</span>
              </div>

              {statusMessage && <p className="text-base text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{statusMessage}</p>}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => { setStep(1); setStatusMessage(''); }} className="flex-1 text-blue-900 border-2 border-blue-200 hover:bg-blue-50 font-semibold py-3 text-base rounded-xl transition-colors">
                  Back
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 text-white bg-blue-900 hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed font-semibold py-3 text-base rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing…
                    </>
                  ) : (
                    'Confirm & pay'
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && receipt && (
            <div className="space-y-5">
              <div className="text-center py-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 mb-3">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Payment successful</h3>
                <p className="text-gray-600 text-base mt-1">Your booking has been confirmed.</p>
              </div>

              <div className="rounded-xl border-2 border-gray-200 overflow-hidden">
                <div className="bg-blue-900 text-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Payment receipt</p>
                  <p className="font-mono font-bold text-lg tracking-tight">{receipt.transactionId}</p>
                  <p className="text-sm text-blue-200 mt-0.5">
                    {new Date(receipt.paidAt || receipt.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="p-4 bg-white space-y-2 text-base">
                  <div className="flex justify-between text-gray-600"><span>Service</span><span className="text-gray-900 font-medium">{receipt.serviceLabel}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Client</span><span className="text-gray-900 font-medium">{receipt.name}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Payment method</span><span className="text-gray-900 font-medium">{receipt.paymentMethod === 'card' ? 'Card' : 'Mobile Money'}</span></div>
                  <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
                    <span className="font-semibold text-gray-900">Amount paid</span>
                    <span className="font-bold text-lg text-blue-900">ZMW {Number(receipt.amount).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500" /> PAID
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-500 text-center">We will contact you at <strong className="text-gray-700">{receipt.email}</strong> regarding next steps.</p>

              <div className="flex flex-col gap-2">
                <button type="button" onClick={handleDownloadReceipt} className="w-full flex items-center justify-center gap-2 text-blue-900 border-2 border-blue-900 hover:bg-blue-50 font-semibold py-3 text-base rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download receipt
                </button>
                <button type="button" onClick={handleClose} className="w-full text-white bg-blue-900 hover:bg-blue-800 font-semibold py-3 text-base rounded-xl shadow-lg transition-colors">
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Booking;
