import React from 'react';
import kws from '../images/clients/isl.jpg';
import geps from '../images/clients/unza.png';
import protergia from '../images/clients/Zicta.png';

const Clients = () => {
    return (
        <div className="mt-8 bg-gray-100">
            <section data-aos="fade-up">
                <div className="my-4 py-4">
                    <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">
                        Our Clients
                    </h2>
                    <div className="flex justify-center">
                        <div className="w-24 border-b-4 border-blue-900"></div>
                    </div>
                    <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">
                        Some of our clients.
                    </h2>
                </div>

                <div className="p-16" data-aos="fade-in" data-aos-delay="600">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 place-items-center">

                        <div className="flex items-center justify-center h-40 w-full">
                            <img
                                src={kws}
                                alt="ISL"
                                className="h-32 w-auto object-contain"
                            />
                        </div>

                        <div className="flex items-center justify-center h-40 w-full">
                            <img
                                src={protergia}
                                alt="ZICTA"
                                className="h-32 w-auto object-contain"
                            />
                        </div>

                        <div className="flex items-center justify-center h-40 w-full">
                            <img
                                src={geps}
                                alt="UNZA"
                                className="h-32 w-auto object-contain"
                            />
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Clients;
