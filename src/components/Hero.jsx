import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import heroImg from '../images/hero/IMG_20220616_155944.jpg';
import backgroundWebp from '../images/hero/background.webp';
import smartIrrigationImg from '../images/hero/smart-irrigation-month-scaled.jpeg';
import irrigationImg from '../images/hero/types-of-irrigation-for-your-lawn.jpeg';

const Hero = () => {
    // Array of hero images to cycle through
    const heroImages = [
        backgroundWebp,
        smartIrrigationImg,
        irrigationImg,
        heroImg, // Keep the original as fallback
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [previousImageIndex, setPreviousImageIndex] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPreviousImageIndex(currentImageIndex);
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 6000); // Change image every 6 seconds

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [heroImages.length, currentImageIndex]);

    return (
        <>
            <div
                id="hero"
                className="relative min-h-screen flex flex-col bg-gray-900 overflow-hidden"
            >
                {/* Hero Images with Smooth Crossfade Transition and 3D Animation */}
                <div className="absolute inset-0 overflow-hidden">
                    {heroImages.map((img, index) => {
                        const isCurrent = index === currentImageIndex;
                        const isPrevious = index === previousImageIndex;

                        return (
                            <div
                                key={index}
                                className={`absolute inset-0 hero-3d-bg hero-bg-slide ${isCurrent ? 'opacity-100 z-10' : isPrevious ? 'opacity-0 z-[5]' : 'opacity-0 z-0'
                                    }`}
                                style={{
                                    backgroundImage: `url(${img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    transition: 'opacity 2500ms cubic-bezier(0.4, 0, 0.2, 1), transform 2500ms cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                                aria-hidden={!isCurrent}
                            />
                        );
                    })}
                </div>
                {/* Gradient overlay for better contrast and depth */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(135deg, rgba(22, 160, 107, 0.75) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.7) 100%)',
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
                <div
                    className="relative z-10 m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 flex-1 flex flex-col justify-center w-full max-w-6xl"
                    data-aos="fade"
                    data-aos-duration="1000"
                >

                    <div className="flex flex-col lg:flex-row py-8 justify-start lg:justify-between text-left items-start lg:items-center">

                        <div className="lg:max-w-2xl flex flex-col justify-center items-start w-full text-left">

                            {/* HEADLINE - break-words + smaller on mobile to prevent overflow */}
                            <h1 className="mb-5 md:mb-7 md:text-5xl text-2xl sm:text-3xl font-extrabold text-white drop-shadow-lg leading-tight break-words max-w-full">
                                Stop Guessing. Start Engineering.
                            </h1>

                            {/* SUB-HEADLINE (shorter on mobile, break-words to avoid overflow) */}
                            <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-green-200 mb-4 md:mb-5 drop-shadow break-words max-w-full">
                                <span className="sm:hidden">
                                    Soil science, 3D design &amp; advanced irrigation for your property.
                                </span>
                                <span className="hidden sm:inline">
                                    The only firm in Zambia combining Soil Science,
                                    3D Landscape Visualization, and Advanced Water Technology.
                                </span>
                            </h2>

                            {/* BODY TEXT (summarised on mobile) */}
                            <p className="text-gray-100 text-sm md:text-lg leading-relaxed mb-6 md:mb-7 drop-shadow">
                                <span className="sm:hidden">
                                    14+ years of Agricultural Engineering experience, delivering
                                    efficient, engineered irrigation systems for homes, estates and institutions.
                                </span>
                                <span className="hidden sm:inline">
                                    In a market saturated with unqualified labor, Lawn Irrigation
                                    Technologies brings 14 years of Agricultural Engineering
                                    expertise to your doorstep. We don't just plant; we design.
                                    We don't just water; we engineer.
                                    <br /><br />
                                    From small luxury gardens to massive estates, we use 3D
                                    renders to show you the future of your property before we
                                    ever dig a trench. Our designs are based on your soil’s DNA
                                    and your property’s unique hydraulics.
                                </span>
                            </p>

                            {/* CTA BUTTONS */}
                            <div className="mt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-start w-full sm:w-auto">
                                <Link
                                    to="/contact"
                                    className="btn-3d w-auto max-w-[200px] sm:max-w-none sm:w-auto text-white bg-green-700 hover:bg-green-600 inline-flex items-center justify-center px-3 py-2 text-xs sm:px-8 sm:py-3.5 sm:text-lg shadow-xl rounded-lg sm:rounded-2xl"
                                >
                                    Learn More
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                                    className="btn-3d w-auto max-w-[200px] sm:max-w-none sm:w-auto text-green-900 bg-white hover:bg-gray-100 inline-flex items-center justify-center px-3 py-2 text-xs sm:px-8 sm:py-3.5 sm:text-lg shadow-md rounded-lg sm:rounded-2xl border border-green-100"
                                >
                                    Book a project
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

