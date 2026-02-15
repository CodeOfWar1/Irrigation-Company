import React from 'react';
import img from '../images/Services/ceo.jpg';
import { Link } from 'react-router-dom';

const Intro = () => {
    return (
        <>
            <div className="m-auto max-w-6xl p-3 sm:p-4 md:p-8 lg:p-12 min-h-[50vh]" id='about'>
                <div className="flex flex-col-reverse lg:flex-row py-6 sm:py-8 justify-between items-stretch lg:text-left" data-aos="fade-up">
                    <div className="lg:w-1/2 flex lg:mx-4 justify-center lg:justify-end mb-4 sm:mb-6 lg:mb-0">
                        <img
                            alt="George Kabwe Mulenga"
                            className="rounded-xl sm:rounded-2xl shadow-xl object-cover h-56 w-44 sm:h-72 sm:w-56 lg:h-96 lg:w-72 border-2 sm:border-4 border-white bg-gray-100"
                            src={img}
                        />
                    </div>
                    <div className="flex flex-col justify-center my-3 sm:my-4 text-center lg:text-left lg:my-0 w-full lg:w-1/2 px-4 sm:px-6 md:px-8" data-aos="zoom-in" data-aos-delay="500">
                        <h3 className="text-xl sm:text-2xl md:text-3xl text-blue-900 font-bold leading-tight">
                            About Us: George Kabwe Mulenga &amp; our irrigation practice
                        </h3>

                        <div>
                            <p className='my-3 text-lg md:text-xl text-gray-600 font-semibold'>
                                Our work is led by <span className="font-bold text-blue-900">George Kabwe Mulenga</span>,
                                Director and Lead Irrigation Designer, with over 14 years of specialised experience in
                                irrigation hydraulics across residential, commercial and institutional landscapes.
                            </p>
                        </div>

                        <div className="my-3 text-left text-gray-700 text-sm md:text-base">
                            <p className="font-semibold text-gray-800 mb-1">Professional qualifications:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>M.Eng Agricultural Engineering (Candidate) &mdash; University of Zambia (UNZA)</li>
                                <li>B.Sc Agricultural Science, Major: Soil Science &mdash; UNZA</li>
                                <li>Diploma in Agricultural Engineering &mdash; NRDC</li>
                                <li>14+ years of hands‑on experience in irrigation system design and hydraulics</li>
                            </ul>
                        </div>

                        <div className="my-3 text-left text-gray-700 text-sm md:text-base">
                            <p>
                                From early projects focused on smallholder fields to large commercial estates and
                                institutional campuses, our company has grown around one principle:{" "}
                                <span className="font-semibold">precision-engineered irrigation that protects both your
                                landscape and your water resources</span>. Every design is tailored to the site, backed
                                by soil science, hydraulics and long-term maintainability.
                            </p>
                        </div>

                        <Link to="/contact" className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-2 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0 group">
                            Talk to George
                            <svg className="w-4 h-4 ml-1 group-hover: translate-x-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Intro;