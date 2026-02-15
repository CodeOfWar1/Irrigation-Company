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
    return (
        <div className="relative flex gap-4 md:gap-6">
            {/* Timeline: circle + line */}
            <div className="flex flex-col items-center shrink-0">
                <button
                    type="button"
                    onClick={onToggle}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 ${isExpanded ? 'bg-blue-900 ring-4 ring-blue-200 scale-105' : 'bg-blue-700 hover:bg-blue-800'
                        }`}
                    aria-expanded={isExpanded}
                >
                    {typeof step.id === 'number' ? step.id : step.id === '2a' ? '2A' : step.id === '2b' ? '2B' : '4-5'}
                </button>
                {!isLast && <div className="w-0.5 flex-1 min-h-[24px] bg-blue-200 my-1 rounded-full" />}
            </div>

            {/* Card */}
            <div className="flex-1 min-w-0 pb-2">
                <button
                    type="button"
                    onClick={onToggle}
                    className={`w-full text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isExpanded
                            ? 'bg-white border-blue-900 shadow-xl shadow-blue-900/10'
                            : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md'
                        }`}
                >
                    <div className="p-4 md:p-6 flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            <span className="text-blue-900 shrink-0 mt-0.5">{step.icon}</span>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-blue-900 pr-8">{step.title}</h3>
                                {step.sub && <p className="text-sm text-gray-500 mt-1">{step.sub}</p>}
                                <p className="mt-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Investment: </span>
                                    <span className={step.investmentHighlight ? 'text-green-700 font-semibold' : 'text-gray-800 font-semibold'}>{step.investment}</span>
                                </p>
                            </div>
                        </div>
                        <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-blue-100' : 'bg-gray-200'}`}>
                            <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </span>
                    </div>

                    {isExpanded && (
                        <div className="px-4 md:px-6 pb-5 md:pb-6 pt-0 border-t border-gray-100 animate-[fadeIn_0.25s_ease-out]">
                            <div className="grid md:grid-cols-3 gap-6 pt-4 text-sm text-gray-700">
                                <div className="bg-blue-50/50 rounded-xl p-4">
                                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded bg-blue-900 text-white flex items-center justify-center text-xs">1</span>
                                        Deliverables
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {step.deliverables.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded bg-gray-600 text-white flex items-center justify-center text-xs">2</span>
                                        Timeline
                                    </h4>
                                    <p>{step.timeline}</p>
                                </div>
                                <div className="bg-green-50/50 rounded-xl p-4">
                                    <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded bg-green-700 text-white flex items-center justify-center text-xs">3</span>
                                        Investment
                                    </h4>
                                    <p>{step.investmentDetail}</p>
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

            <section>
                <div className="m-auto max-w-6xl p-2 md:p-12 h-5/6">
                    <div className="flex flex-col-reverse lg:flex-row py-8 justify-between lg:text-left" data-aos="zoom-out">
                        <div className="lg:w-1/2 flex flex-col lg:mx-4 justify-center">
                            <div className='text-blue-900 mb-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" className='fill-current'>
                                    <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm18.71-11.04c.39-.39.39-1.02 0-1.41l-2.5-2.5a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.99-1.67z"></path>
                                </svg>
                            </div>
                            <h3 className="text-3xl  text-blue-900 
                            font-bold">We <span className='font-black'>Design</span></h3>
                            <div>
                                <p className='my-3 text-xl text-gray-600 font-semibold'>
                                    We design precision irrigation systems engineered for efficiency, durability and optimal water distribution across residential, commercial and agricultural landscapes.
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex flex-col lg:mx-4 justify-center">
                            <div className='text-blue-900 mb-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" className='fill-current'>
                                    <path d="M19.14,12.94c0-.31.03-.63.08-.94l2.03-1.58-2-3.46-2.38.95c-.5-.38-1.04-.7-1.62-.94L14.5,2h-5l-.72,2.97c-.58.24-1.12.56-1.62.94L4.76,6.96l-2,3.46,2.03,1.58c-.05.31-.08.63-.08.94s.03.63.08.94L2.76,15.54l2,3.46,2.38-.95c.5.38 1.04.7 1.62.94L9.5,22h5l.72-2.97c.58-.24 1.12-.56 1.62-.94l2.38.95 2-3.46-2.03-1.58c.05-.31.08-.63.08-.94ZM12,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5,1.57 3.5,3.5-1.57,3.5-3.5,3.5Z"></path>
                                </svg>
                            </div>
                            <h3 className="text-3xl  text-blue-900 font-bold">We <span className='font-black'>Implement</span></h3>
                            <div>
                                <p className='my-3 text-xl text-gray-600 font-semibold'>  From system installation to testing and maintenance planning, we ensure every project delivers efficiency, water conservation and healthy landscape growth.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="m-auto max-w-6xl px-4 md:px-8 py-12" data-aos="fade-up">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl md:text-4xl text-blue-900 font-bold uppercase tracking-tight">The process</h2>
                        <div className="flex justify-center mt-3">
                            <div className="w-20 border-b-4 border-blue-900 rounded-full" />
                        </div>
                        <p className="mt-4 text-gray-600 font-semibold text-base md:text-lg max-w-2xl mx-auto">
                            From the initial scientific audit to final handover — click any step to view details.
                        </p>
                    </div>

                    <div className="space-y-2">
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