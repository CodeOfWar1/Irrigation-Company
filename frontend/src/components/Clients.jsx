import React from 'react';
import kws from '../images/clients/isl.jpg';
import geps from '../images/clients/unza.png';
import protergia from '../images/clients/Zicta.png';
import plantWorld from '../images/clients/PlantWorld.png';
import zda from '../images/clients/Zambia Development Agency.webp';
import zica from '../images/clients/Zambia Institute of Chartered Accountants.webp';

const Clients = () => {
    return (
        <div className="mt-8 bg-gray-100">
            <section data-aos="fade-up">
                <div className="my-4 py-4">
                    <h2 className="my-2 text-center text-3xl text-green-900 uppercase font-bold">
                        Our Clients
                    </h2>
                    <div className="flex justify-center">
                        <div className="w-24 border-b-4 border-green-900"></div>
                    </div>
                    <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-green-900">
                        Some of our clients.
                    </h2>
                </div>

                <div className="p-16" data-aos="fade-in" data-aos-delay="600">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center text-center">

                        {/* International School of Lusaka */}
                        <div className="flex flex-col items-center justify-center h-56 w-full">
                            <img
                                src={kws}
                                alt="International School of Lusaka"
                                className="h-32 w-auto object-contain mb-4"
                            />
                            <p className="text-green-900 font-semibold text-sm">
                                International School of Lusaka, Zambia
                            </p>
                        </div>

                        {/* ZICTA */}
                        <div className="flex flex-col items-center justify-center h-56 w-full">
                            <img
                                src={protergia}
                                alt="Zambia Information and Communications Technology Authority"
                                className="h-32 w-auto object-contain mb-4"
                            />
                            <p className="text-green-900 font-semibold text-sm">
                                Zambia Information and Communications Technology Authority (ZICTA)
                            </p>
                        </div>

                        {/* University of Zambia */}
                        <div className="flex flex-col items-center justify-center h-56 w-full">
                            <img
                                src={geps}
                                alt="University of Zambia"
                                className="h-32 w-auto object-contain mb-4"
                            />
                            <p className="text-green-900 font-semibold text-sm">
                                University of Zambia
                            </p>
                        </div>

                        {/* PlantWorld */}
                        <div className="flex flex-col items-center justify-center h-56 w-full">
                            <img
                                src={plantWorld}
                                alt="PlantWorld"
                                className="h-32 w-auto object-contain mb-4"
                            />
                            <p className="text-green-900 font-semibold text-sm">
                                PlantWorld
                            </p>
                        </div>

                        {/* Zambia Development Agency */}
                        <div className="flex flex-col items-center justify-center h-56 w-full">
                            <img
                                src={zda}
                                alt="Zambia Development Agency"
                                className="h-32 w-auto object-contain mb-4"
                            />
                            <p className="text-green-900 font-semibold text-sm">
                                Zambia Development Agency
                            </p>
                        </div>

                        {/* Zambia Institute of Chartered Accountants */}
                        <div className="flex flex-col items-center justify-center h-56 w-full">
                            <img
                                src={zica}
                                alt="Zambia Institute of Chartered Accountants"
                                className="h-32 w-auto object-contain mb-4"
                            />
                            <p className="text-green-900 font-semibold text-sm">
                                Zambia Institute of Chartered Accountants
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Clients;

