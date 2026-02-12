import React, { useState } from 'react';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    service: '',
    date: '',
    notes: '',
    paymentMethod: 'card',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      /**
       * In a real application, you would:
       * 1. Send `formValues` to your backend to create the booking.
       * 2. Create a payment session (e.g. Stripe, PayPal, mobile money, etc.).
       * 3. Redirect the client to the provider or confirm payment.
       */

      // Simulate a network call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setStatusMessage('Your booking and payment were recorded successfully (demo). We will contact you shortly.');
      setIsSubmitting(false);
    } catch (error) {
      setStatusMessage('Something went wrong while processing the payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="bg-gray-50 py-16">
      <div className="m-auto max-w-6xl px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
            Book a project with us
          </h2>
          <p className="text-lg text-gray-600 font-semibold">
            Share your project details, pick a suitable date, and confirm your booking with a secure payment.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <div className="flex items-center justify-center mb-8 space-x-6 text-sm font-semibold">
            <div className="flex items-center">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${
                  step === 1 ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-900'
                }`}
              >
                1
              </span>
              <span className={step === 1 ? 'text-blue-900' : 'text-gray-500'}>
                Booking details
              </span>
            </div>
            <div className="w-10 h-px bg-gray-300" />
            <div className="flex items-center">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${
                  step === 2 ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-900'
                }`}
              >
                2
              </span>
              <span className={step === 2 ? 'text-blue-900' : 'text-gray-500'}>
                Payment
              </span>
            </div>
          </div>

          {step === 1 && (
            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Service<span className="text-red-500">*</span>
                </label>
                <select
                  name="service"
                  value={formValues.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="web-development">Web application development</option>
                  <option value="mobile-development">Mobile application development</option>
                  <option value="automation">Business process automation</option>
                  <option value="consulting">Consulting & technical audit</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred start date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Project summary / notes
                </label>
                <textarea
                  name="notes"
                  rows="4"
                  value={formValues.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us briefly about your project, goals and any timelines."
                />
              </div>

              {statusMessage && (
                <div className="md:col-span-2">
                  <p className="text-sm text-red-600">{statusMessage}</p>
                </div>
              )}

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center px-6 py-3 text-lg shadow-xl rounded-2xl"
                >
                  Continue to payment
                  <svg
                    className="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Booking summary</p>
                  <p><span className="font-semibold">Name:</span> {formValues.name}</p>
                  <p><span className="font-semibold">Email:</span> {formValues.email}</p>
                  <p><span className="font-semibold">Service:</span> {formValues.service || '-'}</p>
                  <p><span className="font-semibold">Preferred date:</span> {formValues.date || '-'}</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Notes</p>
                  <p className="whitespace-pre-line text-gray-700 text-sm">
                    {formValues.notes || 'No additional notes provided.'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Payment method
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formValues.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="text-blue-900 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Credit / Debit Card</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mobile-money"
                      checked={formValues.paymentMethod === 'mobile-money'}
                      onChange={handleChange}
                      className="text-blue-900 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Mobile Money</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Name on card / account
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the payer&apos;s name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Amount (USD)
                  </label>
                  <input
                    type="number"
                    min="10"
                    step="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="E.g. 500"
                  />
                </div>
              </div>

              {statusMessage && (
                <p className="text-sm text-blue-700 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                  {statusMessage}
                </p>
              )}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setStatusMessage('');
                  }}
                  className="text-blue-900 border border-blue-200 hover:bg-blue-50 inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-2xl"
                >
                  Back to details
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white bg-blue-900 hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center px-6 py-3 text-lg shadow-xl rounded-2xl"
                >
                  {isSubmitting ? 'Processing payment...' : 'Confirm & pay'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;

