import React, { useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import {useDocTitle} from '../components/CustomHook';
import axios from 'axios';
// import emailjs from 'emailjs-com';
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
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('submitBtn').innerHTML = 'Loading...';
        let fData = new FormData();
        fData.append('first_name', firstName)
        fData.append('last_name', lastName)
        fData.append('email', email)
        fData.append('phone_number', phone)
        fData.append('message', message)

        axios({
            method: "post",
            url: process.env.REACT_APP_CONTACT_API,
            data: fData,
            headers: {
                'Content-Type':  'multipart/form-data'
            }
        })
        .then(function (response) {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').innerHTML = 'send message';
            clearInput()
            //handle success
            Notiflix.Report.success(
                'Success',
                response.data.message,
                'Okay',
            );
        })
        .catch(function (error) {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').innerHTML = 'send message';
            //handle error
            const { response } = error;
            if(response.status === 500) {
                Notiflix.Report.failure(
                    'An error occurred',
                    response.data.message,
                    'Okay',
                );
            }
            if(response.data.errors !== null) {
                setErrors(response.data.errors)
            }
            
        });
    }
    const inputClass = "w-full border border-gray-300 text-gray-900 mt-1 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow";
    const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

    return (
        <>
            <div><NavBar /></div>
            <div id='contact' className="min-h-screen bg-gray-50">
                {/* Hero strip */}
                <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-800 text-white py-10 sm:py-14">
                    <div className="m-auto max-w-4xl px-4 text-center">
                        <p className="text-green-200 text-sm font-semibold uppercase tracking-widest">Get in touch</p>
                        <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">Contact us</h1>
                        <p className="mt-2 text-green-100 text-base sm:text-lg max-w-xl mx-auto">
                            Have a project in mind? Send a message and we’ll get back to you.
                        </p>
                    </div>
                </div>

                <div className="m-auto max-w-6xl px-3 sm:px-4 lg:px-8 -mt-6 relative z-10 pb-16">
                    <div className="grid lg:grid-cols-[1fr,22rem] gap-6 lg:gap-10 items-start" data-aos="fade-up">
                        {/* Form card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="border-l-4 border-green-900 bg-green-50/50 px-5 py-4">
                                <h2 className="text-xl font-bold text-green-900">Send a message</h2>
                                <p className="text-sm text-gray-600 mt-0.5">We usually respond within 24 hours.</p>
                            </div>
                            <form onSubmit={sendEmail} className="p-5 sm:p-6 md:p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-4">
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
                                <div className="mt-4">
                                    <label htmlFor="contact-message" className={labelClass}>Message *</label>
                                    <textarea id="contact-message" name="message" rows={5} placeholder="Tell us about your project or question..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyUp={clearErrors} className={inputClass} />
                                    {errors && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                </div>
                                <div className="mt-6">
                                    <button type="submit" id="submitBtn" className="btn-3d w-full sm:w-auto min-w-[180px] px-6 py-3.5 rounded-xl font-bold text-white bg-green-900 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg">
                                        Send message
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Sidebar: contact info + map */}
                        <div className="lg:sticky lg:top-28 space-y-4">
                            <div className="bg-green-900 rounded-2xl shadow-xl p-5 sm:p-6 text-white">
                                <h2 className="text-lg font-bold mb-4 pb-2 border-b border-green-700">Contact information</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <span className="shrink-0 w-10 h-10 rounded-xl bg-green-800 flex items-center justify-center text-green-200">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </span>
                                        <div>
                                            <h3 className="font-semibold text-white">Address</h3>
                                            <p className="text-green-200 text-sm mt-0.5">Plot 70, Handsworth,<br />Great East Road, Lusaka, Zambia.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="shrink-0 w-10 h-10 rounded-xl bg-green-800 flex items-center justify-center text-green-200">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        </span>
                                        <div>
                                            <h3 className="font-semibold text-white">Phone</h3>
                                            <a href="tel:+260966897354" className="text-green-200 text-sm mt-0.5 hover:text-white">+260 966 897 354</a>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="shrink-0 w-10 h-10 rounded-xl bg-green-800 flex items-center justify-center text-green-200">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </span>
                                        <div>
                                            <h3 className="font-semibold text-white">Email</h3>
                                            <a href="mailto:lawnirrigationtech@gmail.com" className="text-green-200 text-sm mt-0.5 hover:text-white block">lawnirrigationtech@gmail.com</a>
                                            <a href="mailto:geomulenga@gmail.com" className="text-green-200 text-sm hover:text-white block">geomulenga@gmail.com</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 pt-4 border-t border-green-700">
                                    <p className="text-green-200 text-sm italic">"Easy Life With Modern Technology"</p>
                                </div>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg h-48 sm:h-56">
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