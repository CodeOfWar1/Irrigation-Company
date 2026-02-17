import React from 'react';
import img from '../images/Services/ceo.jpg';
import { Link } from 'react-router-dom';

const Intro = () => {
    return (
        <div id="about" className="m-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="card-3d bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden" data-aos="fade-up">
                <div className="flex flex-col lg:flex-row">
                    {/* Image block – portrait ratio, centered so face/subject stays in frame */}
                    <div className="lg:w-2/5 relative shrink-0">
                        <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[380px] overflow-hidden bg-gray-100">
                            <img
                                alt="George Kabwe Mulenga – Director & Lead Irrigation Designer"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: '50% 40%' }}
                                src={img}
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-28 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" aria-hidden="true" />
                        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white drop-shadow-md">
                            <p className="text-sm font-semibold">George Kabwe Mulenga</p>
                            <p className="text-xs text-white/90">Director & Lead Irrigation Designer</p>
                        </div>
                    </div>

                    {/* Content block */}
                    <div className="lg:w-3/5 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                        <p className="text-green-600 font-semibold uppercase tracking-widest text-sm mb-2">Leadership</p>
                        <h2 className="text-xl sm:text-2xl md:text-3xl text-green-900 font-bold leading-tight mb-5">
                            About Us: George Kabwe Mulenga &amp; our irrigation practice
                        </h2>

                        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                            Our work is led by <span className="font-semibold text-green-900">George Kabwe Mulenga</span>,
                            Director and Lead Irrigation Designer, with over 14 years of specialised experience in
                            irrigation hydraulics across residential, commercial and institutional landscapes.
                        </p>

                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-green-900 uppercase tracking-wider mb-3">Professional qualifications</h3>
                            <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                                <li className="flex gap-3 items-start">
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-green-600 mt-1.5" />
                                    M.Eng Agricultural Engineering (Candidate) — University of Zambia (UNZA)
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-green-600 mt-1.5" />
                                    B.Sc Agricultural Science, Major: Soil Science — UNZA
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-green-600 mt-1.5" />
                                    Diploma in Agricultural Engineering — NRDC
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-green-600 mt-1.5" />
                                    14+ years of hands‑on experience in irrigation system design and hydraulics
                                </li>
                            </ul>
                        </div>

                        <div className="border-l-4 border-green-200 pl-4 py-2 mb-8 bg-green-50/50 rounded-r-lg">
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed italic">
                                From early projects focused on smallholder fields to large commercial estates and
                                institutional campuses, our company has grown around one principle:{" "}
                                <span className="font-semibold text-green-900 not-italic">precision-engineered irrigation that protects both your
                                landscape and your water resources</span>. Every design is tailored to the site, backed
                                by soil science, hydraulics and long-term maintainability.
                            </p>
                        </div>

                        <Link
                            to="/contact"
                            className="btn-3d inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-white bg-green-900 hover:bg-green-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Talk to George
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
