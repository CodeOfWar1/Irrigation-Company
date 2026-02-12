import React from 'react';
import installationImg from '../images/Services/installation.jpg';
import supplyImg from '../images/Services/Supply.jpg';
import maintenanceImg from '../images/Services/maintance.webp';
import consultationImg from '../images/Services/consultation.webp';

const Services = () => {

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
                                    <h2 className="font-semibold my-4 text-2xl text-center">System installation & commissioning</h2>
                                    <p className="text-md font-medium">
                                        We design, install and commission complete irrigation systems for lawns, gardens, farms and commercial sites, calibrated for even coverage and efficient water use.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                                <div className="m-2 text-justify text-sm">
                                    <img alt="Irrigation maintenance" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-full h-40 object-cover" src={maintenanceImg} />
                                    <h2 className="font-semibold my-4 text-2xl text-center ">Maintenance & repairs</h2>
                                    <p className="text-md font-medium">
                                        We provide scheduled maintenance, troubleshooting and repairs to keep existing irrigation systems running efficiently and extend the life of installed equipment.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                                <div className="m-2 text-justify text-sm">
                                    <img alt="Irrigation consultation" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out w-full h-40 object-cover" src={consultationImg} />
                                    <h2 className="font-semibold my-4 text-2xl text-center ">Design & consultation</h2>
                                    <p className="text-md font-medium">
                                        We offer site assessments, system design and technical advice to help you choose the right irrigation solution for your lawns, gardens, sports fields or farms.
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" className='fill-current'><path d="M2 12h2a7.986 7.986 0 0 1 2.337-5.663 7.91 7.91 0 0 1 2.542-1.71 8.12 8.12 0 0 1 6.13-.041A2.488 2.488 0 0 0 17.5 7C18.886 7 20 5.886 20 4.5S18.886 2 17.5 2c-.689 0-1.312.276-1.763.725-2.431-.973-5.223-.958-7.635.059a9.928 9.928 0 0 0-3.18 2.139 9.92 9.92 0 0 0-2.14 3.179A10.005 10.005 0 0 0 2 12zm17.373 3.122c-.401.952-.977 1.808-1.71 2.541s-1.589 1.309-2.542 1.71a8.12 8.12 0 0 1-6.13.041A2.488 2.488 0 0 0 6.5 17C5.114 17 4 18.114 4 19.5S5.114 22 6.5 22c.689 0 1.312-.276 1.763-.725A9.965 9.965 0 0 0 12 22a9.983 9.983 0 0 0 9.217-6.102A9.992 9.992 0 0 0 22 12h-2a7.993 7.993 0 0 1-.627 3.122z"></path><path d="M12 7.462c-2.502 0-4.538 2.036-4.538 4.538S9.498 16.538 12 16.538s4.538-2.036 4.538-4.538S14.502 7.462 12 7.462zm0 7.076c-1.399 0-2.538-1.139-2.538-2.538S10.601 9.462 12 9.462s2.538 1.139 2.538 2.538-1.139 2.538-2.538 2.538z"></path></svg>
                            </div>
                            <h3 className="text-3xl  text-blue-900 
                            font-bold">We <span className='font-black'>Build</span></h3>
                            <div>
                                <p className='my-3 text-xl text-gray-600 font-semibold'>
                                    With over 10 years experience in software analysis and design and a deep understanding of the latest IT trends and solutions, we provide customized recommendations and strategies to help you improve your operations, reduce costs, and increase efficiency.
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex flex-col lg:mx-4 justify-center">
                            <div className='text-blue-900 mb-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" className='fill-current'><path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z"></path></svg>
                            </div>
                            <h3 className="text-3xl  text-blue-900 font-bold">We <span className='font-black'>Collaborate</span></h3>
                            <div>
                                <p className='my-3 text-xl text-gray-600 font-semibold'>We can collaborate with your existing tech team to scale existing software applications or design customized software applications that suits your everyday need and simplifies various processes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="m-auto max-w-6xl px-4 md:px-8 py-12" data-aos="fade-up">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl text-blue-900 font-bold uppercase">The process</h2>
                        <p className="mt-3 text-gray-600 font-semibold text-sm md:text-base">
                            Detailed breakdown of the service pathway &mdash; from the initial scientific audit to final handover.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-200" tabIndex={0}>
                            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                                <h3 className="text-lg md:text-xl font-bold text-blue-900">
                                    Step 1: The Scientific Audit
                                </h3>
                                <span className="text-xs md:text-sm font-semibold text-gray-500">
                                    Investment: <span className="text-gray-800">ZMW 1,000</span>
                                </span>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Deliverables</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>On-site evaluation of soil texture and topography.</li>
                                        <li>Measurement of water flow rates and static pressure.</li>
                                        <li>Identification of hydro-zones and specific water needs.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Timeline</h4>
                                    <p>Initial consultation on site.</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Cancellations &lt; 24 hours or no-shows forfeit the fee.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Investment</h4>
                                    <p>ZMW 1,000 commitment fee.</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        100% deductible from the final installation cost.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2A */}
                        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-200" tabIndex={0}>
                            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                                <h3 className="text-lg md:text-xl font-bold text-blue-900">
                                    Step 2 (Path A): Scoping &mdash; Standard residential
                                </h3>
                                <span className="text-xs md:text-sm font-semibold text-gray-500">
                                    Investment: <span className="text-green-700">Complimentary</span>
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">
                                For properties up to approximately 4,200&nbsp;m².
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Deliverables</h4>
                                    <p>
                                        Complimentary preliminary quote based on more than 14 years of irrigation experience.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Timeline</h4>
                                    <p>Prepared following completion of the scientific audit.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Investment</h4>
                                    <p>Complimentary (no charge).</p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2B */}
                        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-200" tabIndex={0}>
                            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                                <h3 className="text-lg md:text-xl font-bold text-blue-900">
                                    Step 2 (Path B): Scoping &mdash; Estate &amp; commercial
                                </h3>
                                <span className="text-xs md:text-sm font-semibold text-gray-500">
                                    Investment: <span className="text-gray-800">ZMW 3,000</span>
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">
                                For properties roughly between 4,200&nbsp;m² and 10,000&nbsp;m².
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Deliverables</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Advanced hydraulic quantification.</li>
                                        <li>Technical CAD blueprints for precise sprinkler placement.</li>
                                        <li>Comprehensive installation guide.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Timeline</h4>
                                    <p>Work starts after deposit; drafting begins immediately.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Investment</h4>
                                    <p>ZMW 3,000 (ZMW 1,500 deposit required to start).</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Arrangements for larger or more complex sites can be discussed separately.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-200" tabIndex={0}>
                            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                                <h3 className="text-lg md:text-xl font-bold text-blue-900">
                                    Step 3: 3D visualisation &amp; CAD design
                                </h3>
                                <span className="text-xs md:text-sm font-semibold text-gray-500">
                                    Investment: <span className="text-gray-800">ZMW 4,000</span>
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">
                                Typically for properties up to around 4,200&nbsp;m².
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Deliverables</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Professional 3D landscape rendering.</li>
                                        <li>Virtual walkthrough of the garden layout.</li>
                                        <li>Full material list and high‑resolution renders.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Timeline</h4>
                                    <p>Completed before any trenching or digging begins.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Investment</h4>
                                    <p>ZMW 4,000 for standard property sizes.</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Larger or more complex properties can be quoted individually.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 & 5 */}
                        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-200" tabIndex={0}>
                            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                                <h3 className="text-lg md:text-xl font-bold text-blue-900">
                                    Steps 4 &amp; 5: Precision installation &amp; handover
                                </h3>
                                <span className="text-xs md:text-sm font-semibold text-gray-500">
                                    Investment: <span className="text-gray-800">from 25% of total material cost</span>
                                </span>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Deliverables</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Trenching, piping and sprinkler installation.</li>
                                        <li>Smart setup of Wi‑Fi controllers and rain sensors.</li>
                                        <li>Training on how to control the lawn from your phone.</li>
                                        <li>Handover of a fully operational, precision‑engineered system.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Timeline</h4>
                                    <p>Mobilisation after design approval and contract signing.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-600 mb-1">Investment</h4>
                                    <p>Typically from 25% of the total material cost.</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Detailed installation pricing is confirmed with your final design and bill of quantities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-5 text-xs md:text-sm text-gray-600 space-y-2">
                        <p>
                            This standard service pathway caters to properties within roughly a 30&nbsp;km radius of Lusaka (transport included).
                        </p>
                        <p>
                            For large‑scale designs (Path B), design fees must be settled in full before technical blueprints and renders are released.
                        </p>
                        <p>
                            For properties beyond this scope or with specialised requirements, a tailored solution can be arranged.
                        </p>
                        <p>
                            Optional maintenance service contracts are available for seasonal filter cleaning, nozzle adjustments and performance checks.
                        </p>
                        <p className="mt-3 font-semibold text-gray-700">
                            George Mulenga &mdash; Irrigation Specialist (MEng Agric student, BSc Agric Soil, Dip Eng Agric)
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services;