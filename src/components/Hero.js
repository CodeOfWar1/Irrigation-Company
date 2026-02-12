import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import heroImg from '../images/sprinklerirrigation.jpg';

const Hero = () => {
    return (
        <>
            <div
                id="hero"
                className="relative min-h-screen flex flex-col bg-gray-900"
                style={{
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                data-aos="fade"
                data-aos-duration="1000"
            >
                {/* Overlay for text readability - pointer-events-none so nav stays clickable */}
                <div className="absolute inset-0 z-0 bg-black/40 pointer-events-none" aria-hidden="true" />

                <div className="relative z-20">
                    <NavBar />
                </div>

                <div className="relative z-10 m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 flex-1 flex flex-col justify-center w-full max-w-6xl" data-aos="zoom-in">
                    <div className="flex flex-col lg:flex-row py-8 justify-between text-center lg:text-left items-center lg:items-center">
                        <div className="lg:max-w-xl flex flex-col justify-center" data-aos="zoom-in" data-aos-delay="200">
                            <h1 className="mb-5 md:text-5xl text-3xl font-bold text-white drop-shadow-md">
                                Bespoke software solutions for your unique business needs
                            </h1>
                            <div className="text-xl font-semibold tracking-tight mb-5 text-gray-200 drop-shadow">We are a team of highly motivated and skilled developers dedicated to delivering only the best software.</div>
                            <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                                <Link to="/contact" className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0">
                                    Learn more
                                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </Link>
                                <a href="#booking" className="text-blue-900 bg-white hover:bg-gray-100 inline-flex items-center justify-center w-full px-6 py-3 my-2 text-lg shadow-md rounded-2xl sm:w-auto sm:mb-0 border border-blue-100">
                                    Book a project
                                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h7.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero;