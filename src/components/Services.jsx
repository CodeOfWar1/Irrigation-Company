import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import installationImg from '../images/Services/installation.jpg';
import supplyImg from '../images/Services/Supply.jpg';
import maintenanceImg from '../images/Services/maintance.jpeg';
import consultationImg from '../images/Services/consultation.jpeg';
import DesignImg from '../images/Services/Design.jpeg';

const PROCESS_STEPS = [
    {
        id: 1,
        title: 'Step 1: Initial Site Consultation & Assessment',
        investment: 'ZMW 1,000',
        sub: 'Step 1.2: Preliminary Budget Estimate – Complimentary',
        subStep: {
            title: 'Step 1.2: Preliminary Budget Estimate',
            investment: 'Complimentary',
            deliverables: [
                'A clear, itemized preliminary estimate covering key components: Storage/Tanks, Pumping Unit, Automation, Pipes & Fittings, Labour, and Contingency.',
                'Understand the potential project scope and cost.'
            ],
            timeline: 'Within 1 week after assessment',
            investmentDetail: 'Complimentary',
        },
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
        ),
        deliverables: [
            'On-site evaluation of your lawn, garden beds, walkways, etc.',
            'Identification of factors affecting irrigation performance.',
            'Analysis of water availability, pressure, and needs.',
            'Discussion of your vision and tailored solutions.'
        ],
        timeline: 'By appointment',
        investmentDetail: 'ZMW 1,000 (Paid on site at consultation)',
    },
    {
        id: 2,
        title: 'Step 2: Detailed Irrigation Design & Formal Quotation',
        investment: 'ZMW 1,000',
        sub: null,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2m0 10V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
        ),
        deliverables: [
            'Professional Computer-Aided Design (CAD) drawing showing: Site layout, house boundaries, lawn/driveway areas.',
            'Optimized sprinkler selection & placement.',
            'Pump and pipe sizing.',
            'Efficient water zoning.',
            'Precise quantification of all materials required.',
            'A firm, detailed quotation for the complete system.'
        ],
        timeline: '1-2 weeks after assessment (or go-ahead from preliminary estimate)',
        investmentDetail: 'ZMW 1,000 (ZMW 700 deposit, ZMW 300 upon design submission)',
    },
    {
        id: 4,
        title: 'Step 3: Final Design Package & Technical Plan',
        investment: 'ZMW 2,000',
        sub: null,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        ),
        deliverables: [
            'A comprehensive PDF document ready for installation, including:',
            'Finalized sprinkler placement details.',
            'System pressure requirements.',
            'Specific pipe sizes.',
            'Depth of trenching guidelines.'
        ],
        timeline: '1 week after sharing detailed quotation/design approval',
        investmentDetail: 'ZMW 2,000 (ZMW 1,400 deposit, ZMW 700 upon plan submission)',
    },
    {
        id: 5,
        title: 'Step 4: Professional Installation & Handover',
        investment: '25% of Total Material Cost',
        sub: null,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        ),
        deliverables: [
            'Mobilization and site preparation.',
            'Precise marking of the designed layout.',
            'Careful trench digging.',
            'Expert installation of all irrigation components.',
            'System testing, commissioning, and fine-tuning.',
            'Thorough handover and operational guidance.'
        ],
        timeline: 'Varies (Dependent on project size; advised upon design finalization)',
        investmentDetail: '25% of Total Material Cost (Exact installation fee confirmed with detailed quotation)',
    },
];

const ProcessStepCard = ({ step, index, isExpanded, onToggle }) => {
    const isLast = index === PROCESS_STEPS.length - 1;
    const stepLabel = typeof step.id === 'number' ? step.id : step.id;
    return (
        <div className="relative flex gap-3 sm:gap-4 md:gap-6">
            {/* Timeline: circle + line — hidden on very small, visible from sm */}
            <div className="hidden sm:flex flex-col items-center shrink-0 pt-1">
                <button
                    type="button"
                    onClick={onToggle}
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 ${isExpanded ? 'bg-green-900 ring-2 ring-green-300 scale-100' : 'bg-green-700 hover:bg-green-800'}`}
                    aria-expanded={isExpanded}
                    aria-label={`${step.title}, ${isExpanded ? 'collapse' : 'expand'} details`}
                >
                    {stepLabel}
                </button>
                {!isLast && <div className="w-0.5 flex-1 min-h-[16px] sm:min-h-[20px] bg-green-200 my-0.5 rounded-full" aria-hidden="true" />}
            </div>

            {/* Card */}
            <div className="flex-1 min-w-0">
                <button
                    type="button"
                    onClick={onToggle}
                    className={`relative w-full text-left rounded-xl sm:rounded-2xl border transition-all duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-[0.99] ${isExpanded
                        ? 'bg-white border-green-900 shadow-lg shadow-blue-900/5'
                        : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
                        }`}
                >
                    <div className="p-4 sm:p-5 md:p-6 flex flex-wrap items-center justify-between gap-3">
                        {/* Step badge on mobile when timeline hidden */}
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                            <span className="sm:hidden shrink-0 w-9 h-9 rounded-full bg-green-900 text-white flex items-center justify-center text-sm font-bold">
                                {stepLabel}
                            </span>
                            <span className="hidden sm:block text-green-900 shrink-0">{step.icon}</span>
                            <div className="min-w-0">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-green-900 pr-10 sm:pr-8 leading-snug">{step.title}</h3>
                                {step.sub && <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{step.sub}</p>}
                                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm">
                                    <span className="font-semibold uppercase tracking-wider text-gray-500">Investment: </span>
                                    <span className={step.investmentHighlight ? 'text-green-700 font-semibold' : 'text-gray-800 font-semibold'}>{step.investment}</span>
                                </p>
                            </div>
                        </div>
                        <span className={`absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 shrink-0 w-9 h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${isExpanded ? 'rotate-180 bg-green-100 text-green-900' : 'bg-gray-100 text-gray-600'}`} aria-hidden="true">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </span>
                    </div>

                    {isExpanded && (
                        <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0 border-t border-gray-100 bg-gray-50/30 animate-[fadeIn_0.2s_ease-out]">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 pt-4 text-sm text-gray-700">
                                <div className="bg-white rounded-lg sm:rounded-xl p-4 border border-green-100">
                                    <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2 text-xs uppercase tracking-wider">
                                        <span className="w-6 h-6 rounded bg-green-900 text-white flex items-center justify-center text-xs shrink-0">1</span>
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
                                    <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2 text-xs uppercase tracking-wider">
                                        <span className="w-6 h-6 rounded bg-green-600 text-white flex items-center justify-center text-xs shrink-0">3</span>
                                        Investment
                                    </h4>
                                    <p className="leading-snug">{step.investmentDetail}</p>
                                </div>
                            </div>
                            {step.subStep && (
                                <div className="mt-5 pt-5 border-t border-green-200">
                                    <h4 className="font-bold text-green-800 mb-3 text-sm flex items-center gap-2">
                                        <span className="w-7 h-7 rounded bg-green-700 text-white flex items-center justify-center text-xs shrink-0">1.2</span>
                                        {step.subStep.title} <span className="text-green-600 font-semibold">({step.subStep.investment})</span>
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 text-sm text-gray-700 pl-0 md:pl-9">
                                        <div className="bg-green-50/60 rounded-lg sm:rounded-xl p-4 border border-green-100">
                                            <h5 className="font-semibold text-green-900 mb-2 text-xs uppercase tracking-wider">Deliverables</h5>
                                            <ul className="list-disc list-inside space-y-1.5">
                                                {step.subStep.deliverables.map((item, i) => (
                                                    <li key={i} className="leading-snug">{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 border border-gray-200">
                                            <h5 className="font-semibold text-gray-800 mb-2 text-xs uppercase tracking-wider">Timeline</h5>
                                            <p className="leading-snug">{step.subStep.timeline}</p>
                                        </div>
                                        <div className="bg-green-50/60 rounded-lg sm:rounded-xl p-4 border border-green-200">
                                            <h5 className="font-semibold text-green-700 mb-2 text-xs uppercase tracking-wider">Investment</h5>
                                            <p className="leading-snug">{step.subStep.investmentDetail}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
};

const Services = () => {
    const [expandedStep, setExpandedStep] = useState(0); // first step expanded by default

    const handleDownloadServicePathPDF = () => {
        const doc = new jsPDF({ format: 'a4', unit: 'mm' });
        const pageW = doc.internal.pageSize.getWidth();
        const margin = 14;
        let y = margin;

        // Header
        doc.setFillColor(22, 101, 52); // green-800
        doc.rect(0, 0, pageW, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.text('Lawn Irrigation Technologies', margin, 20);
        doc.setFontSize(12);
        doc.text('Service Pathway - How We Work', margin, 30);

        // Body
        doc.setTextColor(0, 0, 0);
        y = 50;
        doc.setFontSize(10);
        doc.text('Our standard services cater to properties up to 4,200m² within a 30km radius of Lusaka.', margin, y);
        y += 8;
        doc.text('For larger properties or specialized requirements, we\'re happy to discuss a custom solution.', margin, y);
        y += 12;

        PROCESS_STEPS.forEach((step, index) => {
            if (y > 250) {
                doc.addPage();
                y = margin;
            }
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(step.title.replace(/^Step \d+: /, `Step ${step.id}: `), margin, y);
            y += 6;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.text(`Investment: ${step.investment}`, margin, y);
            y += 5;
            doc.text('What You Receive:', margin, y);
            y += 4;
            step.deliverables.forEach((item) => {
                doc.text(`• ${item}`, margin + 3, y, { maxWidth: pageW - 2 * margin - 3 });
                y += 5;
            });
            y += 2;
            doc.text(`Timeline: ${step.timeline}`, margin, y);
            y += 5;
            doc.text(`Investment Details: ${step.investmentDetail}`, margin, y, { maxWidth: pageW - 2 * margin });
            y += 8;
            if (step.subStep) {
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10);
                doc.text(`  ${step.subStep.title} (${step.subStep.investment})`, margin, y);
                y += 5;
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                step.subStep.deliverables.forEach((item) => {
                    doc.text(`  • ${item}`, margin + 3, y, { maxWidth: pageW - 2 * margin - 3 });
                    y += 5;
                });
                doc.text(`  Timeline: ${step.subStep.timeline}`, margin, y);
                y += 5;
            }
            y += 6;
        });

        doc.save('Service-Pathway-Lawn-Irrigation-Technologies.pdf');
    };

    return (
        <div id="services" className="bg-gray-100 py-12" >
            <section data-aos="zoom-in-down">
                <div className="my-4 py-4">
                    <h2 className="my-2 text-center text-3xl text-green-900 uppercase font-bold">services</h2>

                    <div className='flex justify-center'>
                        <div className='w-24 border-b-4 border-green-900'></div>
                    </div>
                    <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-green-900">We are deeply committed to the growth and success of our clients.</h2>
                </div>

                <div className="px-4 sm:px-8 md:px-12" data-aos="fade-down" data-aos-delay="600">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        <div className="bg-white transition-all ease-in-out duration-300 overflow-hidden text-gray-700 hover:bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl group">
                            <div className="m-3 space-y-3 text-sm sm:text-base text-left">
                                <img alt="Irrigation supply" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-full h-40 object-cover" src={supplyImg} />
                                <h2 className="font-semibold my-3 text-lg sm:text-xl text-left">
                                    Supply of irrigation equipment
                                </h2>
                                <p className="font-medium leading-relaxed">
                                    We source and supply quality irrigation components including sprinklers, drip lines, controllers, pumps and fittings, ensuring every project is built on reliable hardware.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white transition-all ease-in-out duration-300 overflow-hidden text-gray-700 hover:bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl group">
                            <div className="m-3 space-y-3 text-sm sm:text-base text-left">
                                <img alt="Irrigation installation" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-full h-40 object-cover" src={installationImg} />
                                <h2 className="font-semibold my-3 text-lg sm:text-xl text-left">
                                    Engineering &amp; Consulting
                                </h2>
                                <p className="font-medium leading-relaxed">
                                    pH testing, nutrient analysis, and "Green-Lawn
                                    Guarantee" based on soil types.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white transition-all ease-in-out duration-300 overflow-hidden text-gray-700 hover:bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl group">
                            <div className="m-3 space-y-3 text-sm sm:text-base text-left">
                                <img alt="Irrigation maintenance" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-full h-40 object-cover" src={maintenanceImg} />
                                <h2 className="font-semibold my-3 text-lg sm:text-xl text-left">
                                    Water-Tech &amp; Irrigation
                                </h2>
                                <p className="font-medium leading-relaxed">
                                    Smart, automated, and solar-powered systems designed for
                                    Zambian water pressures.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white transition-all ease-in-out duration-300 overflow-hidden text-gray-700 hover:bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl group">
                            <div className="m-3 space-y-3 text-sm sm:text-base text-left">
                                <img alt="Irrigation consultation" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-full h-40 object-cover" src={consultationImg} />
                                <h2 className="font-semibold my-3 text-lg sm:text-xl text-left">
                                    3D Landscape Design &amp; Development
                                </h2>
                                <p className="font-medium leading-relaxed">
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
                        <p className="text-green-600 font-semibold uppercase tracking-widest text-sm">Our approach</p>
                        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-green-900">Design. Then deliver.</h2>
                        <div className="w-16 h-0.5 bg-green-900 rounded-full mx-auto mt-3" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-12">
                        {/* We Design */}
                        <div
                            className="card-3d group relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100 hover:shadow-2xl hover:border-green-200"
                            data-aos="fade-right"
                        >
                            <div className="relative h-52 sm:h-64 overflow-hidden">
                                <img
                                    src={DesignImg}
                                    alt="Irrigation design and consultancy"
                                    className="img-3d w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-800/80 via-green-800/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/95 text-green-900 shadow-lg">
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
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-900" /> Soil & site analysis</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-900" /> 3D visualisation & CAD</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-900" /> Bill of quantities</li>
                                </ul>
                            </div>
                        </div>
                        {/* We Implement */}
                        <div
                            className="card-3d group relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100 hover:shadow-2xl hover:border-green-200"
                            data-aos="fade-left"
                        >
                            <div className="relative h-52 sm:h-64 overflow-hidden">
                                <img
                                    src={installationImg}
                                    alt="Irrigation installation and implementation"
                                    className="img-3d w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-800/80 via-green-800/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/95 text-green-900 shadow-lg">
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
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-900" /> Turnkey installation</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-900" /> Smart controllers & sensors</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-900" /> Handover & training</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="process" className="bg-white scroll-mt-24">
                <div className="m-auto max-w-4xl lg:max-w-5xl px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16" data-aos="fade-up">
                    <div className="mb-8 sm:mb-10 text-center">
                        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-green-600">How we work</p>
                        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl text-green-900 font-bold tracking-tight">The process</h2>
                        <div className="flex justify-center mt-3">
                            <div className="w-16 sm:w-20 h-0.5 bg-green-900 rounded-full" />
                        </div>
                        <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">
                            From initial consultation to handover. Tap any step for details.
                        </p>
                        <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto px-2">
                            Our standard services cater to properties up to 4,200m² within a 30km radius of Lusaka (our transport included). For larger properties or specialized requirements beyond this scope, we're happy to discuss a custom solution.
                        </p>
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={handleDownloadServicePathPDF}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-900 hover:bg-green-800 text-white font-semibold rounded-xl shadow-md transition-colors text-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Service Pathway PDF
                            </button>
                        </div>
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

