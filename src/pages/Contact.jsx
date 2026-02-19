import React, { useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import {useDocTitle} from '../components/CustomHook';
import axios from 'axios';
import Notiflix from 'notiflix';

const Contact = () => {
    useDocTitle('Contact | Lawn Irrigation Technologies')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState([])

    const clearErrors = () => {
        setErrors([])
    }

    const clearInput = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setMessage('')
    }

    const sendEmail = (e) => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        if (btn) { btn.disabled = true; btn.innerHTML = 'Loading...'; }

        const formId = import.meta.env?.VITE_FORMSPREE_FORM_ID || process.env.REACT_APP_FORMSPREE_FORM_ID;
        const apiUrl = formId ? `https://formspree.io/f/${formId}` : null;

        if (!apiUrl) {
            if (btn) { btn.disabled = false; btn.innerHTML = 'send message'; }
            Notiflix.Report.failure(
                'Configuration required',
                'Add VITE_FORMSPREE_FORM_ID to your .env file. Get a free form at https://formspree.io',
                'Okay',
            );
            return;
        }

        const payload = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone_number: phone,
            message,
        };

        axios({
            method: 'post',
            url: apiUrl,
            data: payload,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (res) {
                if (btn) { btn.disabled = false; btn.innerHTML = 'send message'; }
                clearInput();
                setErrors([]);
                Notiflix.Report.success('Message sent', 'We\'ll get back to you soon.', 'Okay');
            })
            .catch(function (error) {
                if (btn) { btn.disabled = false; btn.innerHTML = 'send message'; }
                const { response } = error || {};
                if (response?.data?.errors) {
                    setErrors(response.data.errors);
                }
                const msg = response?.data?.message || response?.statusText || error?.message || 'Failed to send. Please try again.';
                Notiflix.Report.failure('Unable to send', msg, 'Okay');
            });
    }
    const inputClass = "w-full border border-gray-300 text-gray-900 mt-1 px-3 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow text-sm sm:text-base";
    const labelClass = "block text-xs sm:text-sm font-semibold text-gray-700 mb-1";

    return (
        <>
            <div><NavBar /></div>
            <div id='contact' className="min-h-screen bg-gray-50">
                {/* Hero strip */}
                <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-800 text-white py-8 sm:py-10 md:py-14">
                    <div className="m-auto max-w-4xl px-4 text-center">
                        <p className="text-green-200 text-xs sm:text-sm font-semibold uppercase tracking-widest">Get in touch</p>
                        <h1 className="mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">Contact us</h1>
                        <p className="mt-2 text-green-100 text-sm sm:text-lg max-w-xl mx-auto">
                            Have a project in mind? Send a message and we’ll get back to you.
                        </p>
                    </div>
                </div>

                <div className="m-auto max-w-6xl px-3 sm:px-4 lg:px-8 -mt-6 relative z-10 pb-14 sm:pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)] gap-5 sm:gap-6 lg:gap-8 items-start" data-aos="fade-up">
                        {/* Form card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="border-l-4 border-green-900 bg-green-50/60 px-4 sm:px-5 py-3 sm:py-4">
                                <h2 className="text-lg sm:text-xl font-bold text-green-900">Send a message</h2>
                                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">We usually respond within 24 hours.</p>
                            </div>
                            <form onSubmit={sendEmail} className="p-4 sm:p-6 md:p-7 space-y-4 sm:space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label htmlFor="contact-first" className={labelClass}>First name *</label>
                                        <input id="contact-first" name="first_name" type="text" placeholder="e.g. John" value={firstName} onChange={(e) => setFirstName(e.target.value)} onKeyUp={clearErrors} className={inputClass} />
                                        {errors && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="contact-last" className={labelClass}>Last name *</label>
                                        <input id="contact-last" name="last_name" type="text" placeholder="e.g. Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} onKeyUp={clearErrors} className={inputClass} />
                                        {errors && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label htmlFor="contact-email" className={labelClass}>Email *</label>
                                        <input id="contact-email" name="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyUp={clearErrors} className={inputClass} />
                                        {errors && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="contact-phone" className={labelClass}>Phone *</label>
                                        <input id="contact-phone" name="phone_number" type="tel" placeholder="e.g. +260 966 897 354" value={phone} onChange={(e) => setPhone(e.target.value)} onKeyUp={clearErrors} className={inputClass} />
                                        {errors && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="contact-message" className={labelClass}>Message *</label>
                                    <textarea id="contact-message" name="message" rows={5} placeholder="Tell us about your project or question..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyUp={clearErrors} className={inputClass} />
                                    {errors && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                </div>
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        id="submitBtn"
                                        className="btn-3d w-full sm:w-auto min-w-[180px] px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-white bg-green-900 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg text-sm sm:text-base"
                                    >
                                        Send message
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Sidebar: contact info + map */}
                        <div className="lg:sticky lg:top-28 space-y-4 mt-6 lg:mt-0">
                            <div className="bg-green-900 rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 text-white">
                                <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 pb-2 border-b border-green-700">Contact information</h2>
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start gap-3">
                                        <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-green-800 flex items-center justify-center text-green-200">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </span>
                                        <div className="text-sm">
                                            <h3 className="font-semibold text-white">Address</h3>
                                            <p className="text-green-200 mt-0.5 leading-snug">Plot 70, Handsworth,<br />Great East Road, Lusaka, Zambia.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-green-800 flex items-center justify-center text-green-200">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        </span>
                                        <div className="text-sm">
                                            <h3 className="font-semibold text-white">Phone</h3>
                                            <a href="tel:+260966897354" className="text-green-200 mt-0.5 hover:text-white block">+260 966 897 354</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-green-800 flex items-center justify-center text-green-200">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </span>
                                        <div className="text-sm">
                                            <h3 className="font-semibold text-white">Email</h3>
                                            <a href="mailto:lawnirrigationtech@gmail.com" className="text-green-200 mt-0.5 hover:text-white block break-words">lawnirrigationtech@gmail.com</a>
                                            <a href="mailto:geomulenga@gmail.com" className="text-green-200 hover:text-white block break-words">geomulenga@gmail.com</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-green-700">
                                    <p className="text-green-200 text-xs sm:text-sm italic text-center sm:text-left">"Easy Life With Modern Technology"</p>
                                </div>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg h-44 sm:h-52 md:h-56">
                                <iframe title="Lawn Irrigation Technologies location" src={`https://www.google.com/maps?q=${encodeURIComponent('Plot 70, Handsworth, Great East Road, Lusaka, Zambia')}&z=15&output=embed`} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>


    )
}

export default Contact;

