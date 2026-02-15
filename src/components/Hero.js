import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import heroImg from '../images/sprinklerirrigation.jpg';

const Hero = () => {
    return (
        <>
            <div
                id="hero"
                className="relative min-h-screen flex flex-col bg-gray-900 overflow-hidden"
                style={{
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                data-aos="fade"
                data-aos-duration="1000"
            >
                {/* Gradient overlay for better contrast and depth */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(135deg, rgba(15, 76, 117, 0.75) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.7) 100%)',
                    }}
                    aria-hidden="true"
                />
                {/* Subtle vignette */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-60"
                    style={{
                        boxShadow: 'inset 0 0 20rem 8rem rgba(0,0,0,0.4)',
                    }}
                    aria-hidden="true"
                />

                {/* Navbar */}
                <div className="relative z-20">
                    <NavBar />
                </div>

                {/* HERO CONTENT */}
                <div className="relative z-10 m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 flex-1 flex flex-col justify-center w-full max-w-6xl">

                    <div className="flex flex-col lg:flex-row py-8 justify-between text-center lg:text-left items-center">

                        <div className="lg:max-w-2xl flex flex-col justify-center">

                            {/* HEADLINE */}
                            <h1 className="mb-6 md:text-5xl text-3xl font-extrabold text-white drop-shadow-lg leading-tight">
                                Stop Guessing. Start Engineering.
                            </h1>

                            {/* SUB-HEADLINE */}
                            <h2 className="text-xl md:text-2xl font-semibold text-blue-200 mb-6 drop-shadow">
                                The only firm in Zambia combining Soil Science,
                                3D Landscape Visualization, and Advanced Water Technology.
                            </h2>

                            {/* BODY TEXT */}
                            <p className="text-gray-200 text-lg leading-relaxed mb-8 drop-shadow">
                                In a market saturated with unqualified labor, Lawn Irrigation
                                Technologies brings 14 years of Agricultural Engineering
                                expertise to your doorstep. We don't just plant; we design.
                                We don't just water; we engineer.
                                <br /><br />
                                From small luxury gardens to massive estates, we use 3D
                                Renders to show you the future of your property before we
                                ever dig a trench. Our designs are based on your soil’s DNA
                                and your property’s unique hydraulics.
                            </p>

                            {/* CTA BUTTONS */}
                            <div className="space-x-0 md:space-x-4 flex flex-col md:flex-row">

                                <Link
                                    to="/contact"
                                    className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center px-8 py-3 my-2 text-lg shadow-xl rounded-2xl"
                                >
                                    Learn More
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                                    className="text-blue-900 bg-white hover:bg-gray-100 inline-flex items-center justify-center px-8 py-3 my-2 text-lg shadow-md rounded-2xl border border-blue-100"
                                >
                                    Book a Project
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
