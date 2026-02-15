import React, { useState } from 'react';
import installationImg from '../images/Services/installation.jpg';
import supplyImg from '../images/Services/Supply.jpg';
import maintenanceImg from '../images/Services/maintance.webp';
import consultationImg from '../images/Services/consultation.webp';

const PROCESS_STEPS = [
    {
        id: 1,
        title: 'Step 1: The Scientific Audit',
        investment: 'ZMW 1,000',
        sub: null,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
        ),
        deliverables: ['On-site evaluation of soil texture and topography.', 'Measurement of water flow rates and static pressure.', 'Identification of hydro-zones and specific water needs.'],
        timeline: 'Initial consultation on site. Cancellations < 24 hours or no-shows forfeit the fee.',
        investmentDetail: 'ZMW 1,000 commitment fee. 100% deductible from the final installation cost.',
    },
    {
        id: '2a',
        title: 'Step 2 (Path A): Scoping — Standard residential',
        investment: 'Complimentary',
        investmentHighlight: true,
        sub: 'For properties up to approximately 4,200 m².',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        ),
        deliverables: ['Complimentary preliminary quote based on more than 14 years of irrigation experience.'],
        timeline: 'Prepared following completion of the scientific audit.',
        investmentDetail: 'Complimentary (no charge).',
    },
    {
        id: '2b',
        title: 'Step 2 (Path B): Scoping — Estate & commercial',
        investment: 'ZMW 3,000',
        sub: 'For properties roughly between 4,200 m² and 10,000 m².',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        ),
        deliverables: ['Advanced hydraulic quantification.', 'Technical CAD blueprints for precise sprinkler placement.', 'Comprehensive installation guide.'],
        timeline: 'Work starts after deposit; drafting begins immediately.',
        investmentDetail: 'ZMW 3,000 (ZMW 1,500 deposit required to start). Arrangements for larger or more complex sites can be discussed separately.',
    },
    {
        id: 3,
        title: 'Step 3: 3D visualisation & CAD design',
        investment: 'ZMW 4,000',
        sub: 'Typically for properties up to around 4,200 m².',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2m0 10V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
        ),
        deliverables: ['Professional 3D landscape rendering.', 'Virtual walkthrough of the garden layout.', 'Full material list and high‑resolution renders.'],
        timeline: 'Completed before any trenching or digging begins.',
        investmentDetail: 'ZMW 4,000 for standard property sizes. Larger or more complex properties can be quoted individually.',
    },
    {
        id: '4-5',
        title: 'Steps 4 & 5: Precision installation & handover',
        investment: 'from 25% of total material cost',
        sub: null,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        ),
        deliverables: ['Trenching, piping and sprinkler installation.', 'Smart setup of Wi‑Fi controllers and rain sensors.', 'Training on how to control the lawn from your phone.', 'Handover of a fully operational, precision‑engineered system.'],
        timeline: 'Mobilisation after design approval and contract signing.',
        investmentDetail: 'Typically from 25% of the total material cost. Detailed installation pricing is confirmed with your final design and bill of quantities.',
    },
];

const ProcessStepCard = ({ step, index, isExpanded, onToggle }) => {
    const isLast = index === PROCESS_STEPS.length - 1;
    const stepLabel = typeof step.id === 'number' ? step.id : step.id === '2a' ? '2A' : step.id === '2b' ? '2B' : '4-5';
    return (
        <div className="relative flex gap-3 sm:gap-4 md:gap-6">
            {/* Timeline: circle + line — hidden on very small, visible from sm */}
            <div className="hidden sm:flex flex-col items-center shrink-0 pt-1">
                <button
                    type="button"
                    onClick={onToggle}
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${isExpanded ? 'bg-blue-900 ring-2 ring-blue-300 scale-100' : 'bg-blue-700 hover:bg-blue-800'}`}
                    aria-expanded={isExpanded}
                    aria-label={`${step.title}, ${isExpanded ? 'collapse' : 'expand'} details`}
                >
                    {stepLabel}
                </button>
                {!isLast && <div className="w-0.5 flex-1 min-h-[16px] sm:min-h-[20px] bg-blue-200 my-0.5 rounded-full" aria-hidden="true" />}
            </div>

            {/* Card */}
            <div className="flex-1 min-w-0">
                <button
                    type="button"
                    onClick={onToggle}
                    className={`relative w-full text-left rounded-xl sm:rounded-2xl border transition-all duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.99] ${isExpanded
                        ? 'bg-white border-blue-900 shadow-lg shadow-blue-900/5'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                >
                    <div className="p-4 sm:p-5 md:p-6 flex flex-wrap items-center justify-between gap-3">
                        {/* Step badge on mobile when timeline hidden */}
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                            <span className="sm:hidden shrink-0 w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center text-sm font-bold">
                                {stepLabel}
                            </span>
                            <span className="hidden sm:block text-blue-900 shrink-0">{step.icon}</span>
                            <div className="min-w-0">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-900 pr-10 sm:pr-8 leading-snug">{step.title}</h3>
                                {step.sub && <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{step.sub}</p>}
                                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm">
                                    <span className="font-semibold uppercase tracking-wider text-gray-500">Investment: </span>
                                    <span className={step.investmentHighlight ? 'text-green-700 font-semibold' : 'text-gray-800 font-semibold'}>{step.investment}</span>
                                </p>
                            </div>
                        </div>
                        <span className={`absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 shrink-0 w-9 h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${isExpanded ? 'rotate-180 bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-600'}`} aria-hidden="true">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </span>
                    </div>

                    {isExpanded && (
                        <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0 border-t border-gray-100 bg-gray-50/30 animate-[fadeIn_0.2s_ease-out]">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 pt-4 text-sm text-gray-700">
                                <div className="bg-white rounded-lg sm:rounded-xl p-4 border border-blue-100">
                                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-xs uppercase tracking-wider">
                                        <span className="w-6 h-6 rounded bg-blue-900 text-white flex items-center justify-center text-xs shrink-0">1</span>
                                        Deliverables
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1.5 text-gray-700">
                                        {step.deliverables.map((item, i) => (
                                            <li key={i} className="leading-snug">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white rounded-lg sm:rounded-xl p-4 border border-gray-200">
                                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-xs uppercase tracking-wider">
                                        <span className="w-6 h-6 rounded bg-gray-600 text-white flex items-center justify-center text-xs shrink-0">2</span>
                                        Timeline
                                    </h4>
                                    <p className="leading-snug">{step.timeline}</p>
                                </div>
                                <div className="bg-white rounded-lg sm:rounded-xl p-4 border border-green-200">
                                    <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2 text-xs uppercase tracking-wider">
                                        <span className="w-6 h-6 rounded bg-green-700 text-white flex items-center justify-center text-xs shrink-0">3</span>
                                        Investment
                                    </h4>
                                    <p className="leading-snug">{step.investmentDetail}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
};

const Services = () => {
    const [expandedStep, setExpandedStep] = useState(0); // first step expanded by default

    return (
        <div id="services" className="bg-gray-100 py-12" >
            <section data-aos="zoom-in-down">
                <div className="my-4 py-4">
                    <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">services</h2>

                    <div className='flex justify-center'>
                        <div className='w-24 border-b-4 border-blue-900'></div>
                    </div>
                    <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">We are deeply committed to the growth and success of our clients.</h2>
                </div>

                <div className="px-12" data-aos="fade-down" data-aos-delay="600">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                            <div className="m-2 text-justify text-sm">
                                <img alt="Irrigation supply" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-full h-40 object-cover" src={supplyImg} />
                                <h2 className="font-semibold my-4 text-2xl text-center">Supply of irrigation equipment</h2>
                                <p className="text-md font-medium">
                                    We source and supply quality irrigation components including sprinklers, drip lines, controllers, pumps and fittings, ensuring every project is built on reliable hardware.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                            <div className="m-2 text-justify text-sm">
                                <img alt="Irrigation installation" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-full h-40 object-cover" src={installationImg} />
                                <h2 className="font-semibold my-4 text-2xl text-center">Soil Engineering & Consulting</h2>
                                <p className="text-md font-medium">
                                    pH testing, nutrient analysis, and "Green-Lawn
                                    Guarantee" based on soil types.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                            <div className="m-2 text-justify text-sm">
                                <img alt="Irrigation maintenance" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-full h-40 object-cover" src={maintenanceImg} />
                                <h2 className="font-semibold my-4 text-2xl text-center ">Water-Tech & Irrigation</h2>
                                <p className="text-md font-medium">
                                    Smart, automated, and solar-powered systems designed for
                                    Zambian water pressures.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                            <div className="m-2 text-justify text-sm">
                                <img alt="Irrigation consultation" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-full h-40 object-cover" src={consultationImg} />
                                <h2 className="font-semibold my-4 text-2xl text-center ">3D Landscape Design & Development</h2>
                                <p className="text-md font-medium">
                                    Professional visualization, spatial planning, and
                                    "unqualified-proof" blueprints.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-20 overflow-hidden">
                <div className="m-auto max-w-6xl px-4 sm:px-6 md:px-12">
                    <div className="text-center mb-10 md:mb-14" data-aos="fade-down">
                        <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">Our approach</p>
                        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">Design. Then deliver.</h2>
                        <div className="w-16 h-0.5 bg-blue-900 rounded-full mx-auto mt-3" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-12">
                        {/* We Design */}
                        <div
                            className="group relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
                            data-aos="fade-right"
                        >
                            <div className="relative h-52 sm:h-64 overflow-hidden">
                                <img
                                    src={consultationImg}
                                    alt="Irrigation design and consultancy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/95 text-blue-900 shadow-lg">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm18.71-11.04c.39-.39.39-1.02 0-1.41l-2.5-2.5a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.99-1.67z" /></svg>
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">We <span className="font-black">Design</span></h3>
                                </div>
                            </div>
                            <div className="p-5 sm:p-6">
                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                                    We design precision irrigation systems engineered for efficiency, durability and optimal water distribution across residential, commercial and agricultural landscapes.
                                </p>
                                <ul className="mt-4 space-y-2 text-sm sm:text-base text-gray-700">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-900" /> Soil & site analysis</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-900" /> 3D visualisation & CAD</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-900" /> Bill of quantities</li>
                                </ul>
                            </div>
                        </div>
                        {/* We Implement */}
                        <div
                            className="group relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
                            data-aos="fade-left"
                        >
                            <div className="relative h-52 sm:h-64 overflow-hidden">
                                <img
                                    src={installationImg}
                                    alt="Irrigation installation and implementation"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/95 text-blue-900 shadow-lg">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14,12.94c0-.31.03-.63.08-.94l2.03-1.58-2-3.46-2.38.95c-.5-.38-1.04-.7-1.62-.94L14.5,2h-5l-.72,2.97c-.58.24-1.12.56-1.62.94L4.76,6.96l-2,3.46,2.03,1.58c-.05.31-.08.63-.08.94s.03.63.08.94L2.76,15.54l2,3.46,2.38-.95c.5.38 1.04.7 1.62.94L9.5,22h5l.72-2.97c.58-.24 1.12-.56 1.62-.94l2.38.95 2-3.46-2.03-1.58c.05-.31.08-.63.08-.94ZM12,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5,1.57 3.5,3.5-1.57,3.5-3.5,3.5Z" /></svg>
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">We <span className="font-black">Implement</span></h3>
                                </div>
                            </div>
                            <div className="p-5 sm:p-6">
                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                                    From system installation to testing and maintenance planning, we ensure every project delivers efficiency, water conservation and healthy landscape growth.
                                </p>
                                <ul className="mt-4 space-y-2 text-sm sm:text-base text-gray-700">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-900" /> Turnkey installation</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-900" /> Smart controllers & sensors</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-900" /> Handover & training</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="process" className="bg-white scroll-mt-24">
                <div className="m-auto max-w-4xl lg:max-w-5xl px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16" data-aos="fade-up">
                    <div className="mb-8 sm:mb-10 text-center">
                        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-600">How we work</p>
                        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl text-blue-900 font-bold tracking-tight">The process</h2>
                        <div className="flex justify-center mt-3">
                            <div className="w-16 sm:w-20 h-0.5 bg-blue-900 rounded-full" />
                        </div>
                        <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">
                            From scientific audit to handover. Tap any step for details.
                        </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        {PROCESS_STEPS.map((step, index) => (
                            <ProcessStepCard
                                key={step.id}
                                step={step}
                                index={index}
                                isExpanded={expandedStep === index}
                                onToggle={() => setExpandedStep((prev) => (prev === index ? -1 : index))}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services;