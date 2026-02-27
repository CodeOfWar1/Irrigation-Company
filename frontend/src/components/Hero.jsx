import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import heroImg from '../images/hero/IMG_20220616_155944.jpg';
import backgroundWebp from '../images/hero/background.jpeg';
import smartIrrigationImg from '../images/hero/smart-irrigation-month-scaled.jpeg';
import irrigationImg from '../images/hero/types-of-irrigation-for-your-lawn.jpeg';

const Hero = () => {
    const heroImages = [
        backgroundWebp,
        smartIrrigationImg,
        irrigationImg,
        heroImg,
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [previousImageIndex, setPreviousImageIndex] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPreviousImageIndex(currentImageIndex);
            setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % heroImages.length
            );
        }, 6000);

        return () => clearInterval(interval);
    }, [currentImageIndex, heroImages.length]);

    return (
        <div
            id="hero"
            className="relative min-h-screen flex flex-col bg-gray-900 overflow-hidden"
        >
            {/* BACKGROUND IMAGES */}
            <div className="absolute inset-0 overflow-hidden">
                {heroImages.map((img, index) => {
                    const isCurrent = index === currentImageIndex;
                    const isPrevious = index === previousImageIndex;

                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-[2500ms] ease-in-out ${isCurrent
                                ? 'opacity-100 scale-100 z-10'
                                : isPrevious
                                    ? 'opacity-0 scale-105 z-[5]'
                                    : 'opacity-0 scale-110 z-0'
                                }`}
                            style={{
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    );
                })}
            </div>

            {/* GRADIENT OVERLAY */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background:
                        'linear-gradient(135deg, rgba(22,160,107,0.75) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.75) 100%)',
                }}
            />

            {/* VIGNETTE */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-60"
                style={{
                    boxShadow: 'inset 0 0 18rem 6rem rgba(0,0,0,0.5)',
                }}
            />

            {/* NAVBAR */}
            <div className="relative z-20">
                <NavBar />
            </div>

            {/* HERO CONTENT */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12">
                <div className="w-full max-w-6xl text-center lg:text-left">

                    {/* HEADLINE */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight sm:leading-snug drop-shadow-lg mb-6">
                        Stop Guessing.
                        <br className="sm:hidden" />
                        {' '}Start Engineering.
                    </h1>

                    {/* SUBHEADLINE */}
                    <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-green-200 mb-6 leading-relaxed max-w-3xl mx-auto lg:mx-0">

                        {/* Mobile version */}
                        <span className="sm:hidden">
                            Soil science, 3D design &amp; advanced irrigation for your property.
                        </span>

                        {/* Desktop version (original wording preserved) */}
                        <span className="hidden sm:block">
                            The only firm in Zambia combining Soil Science,
                            3D Landscape Visualization, and Advanced Water Technology.
                        </span>

                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-gray-100 text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-3xl mx-auto lg:mx-0">

                        {/* Mobile version */}
                        <span className="sm:hidden">
                            14+ years of Agricultural Engineering experience delivering
                            efficient, engineered irrigation systems for homes,
                            estates and institutions.
                        </span>

                        {/* Desktop version (FULL original text restored) */}
                        <span className="hidden sm:block">
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

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                            to="/contact"
                            className="btn-3d text-white bg-green-700 hover:bg-green-600 px-6 py-3 text-sm sm:text-base shadow-xl rounded-xl transition"
                        >
                            Learn More
                        </Link>

                        <button
                            type="button"
                            onClick={() =>
                                window.dispatchEvent(new CustomEvent('open-booking'))
                            }
                            className="btn-3d text-green-900 bg-white hover:bg-gray-100 px-6 py-3 text-sm sm:text-base shadow-md rounded-xl border border-green-100 transition"
                        >
                            Book a Project
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;