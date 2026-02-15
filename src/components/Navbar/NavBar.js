import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavLinks from '../Navbar/NavLinks';
import { HashLink } from 'react-router-hash-link';
import logo from '../../images/LIT LOGO.jpg';

const NavBar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const [top, setTop] = useState(isHome && !window.scrollY);
    const [isOpen, setisOpen] = useState(false);

    const showTransparent = isHome && top;

    // Scroll effect
    useEffect(() => {
        if (!isHome) return;

        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true);
        };

        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [isHome]);

    // Route change effect
    useEffect(() => {
        if (!isHome) setTop(false);
        else setTop(window.pageYOffset <= 10);
    }, [isHome, location.pathname]);

    function handleClick() {
        setisOpen(!isOpen);
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 w-full z-30 transition duration-300 ease-in-out ${!showTransparent ? 'bg-white shadow-lg' : ''}`}
        >
            {/* NAV CONTENT — ensure menu button always has space */}
            <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 px-3 py-3 sm:px-4 md:px-6 lg:px-8 sm:py-4 min-h-[3.5rem] sm:min-h-[4rem]">
                {/* LOGO + TEXT — can shrink on very small screens */}
                <div className="min-w-0 flex items-center gap-2 sm:gap-3 flex-shrink">
                    <HashLink smooth to={isHome ? '/#hero' : '/'} className="shrink-0 flex items-center">
                        <img
                            src={logo}
                            alt="Lawn Irrigation Technologies Logo"
                            className="h-9 w-9 sm:h-12 md:h-14 sm:w-auto max-w-[2.25rem] sm:max-w-none rounded-lg sm:rounded-xl object-cover transition-all duration-300 hover:scale-105"
                        />
                    </HashLink>
                    <HashLink
                        smooth
                        to={isHome ? '/#hero' : '/'}
                        className={`min-w-0 text-xs sm:text-sm md:text-lg font-bold leading-tight transition-colors duration-300 cursor-pointer truncate max-w-[120px] sm:max-w-none ${showTransparent ? 'text-white' : 'text-blue-900'}`}
                    >
                        <span className="sm:hidden">LIT</span>
                        <span className="hidden sm:inline">Lawn Irrigation</span>
                        <br className="hidden md:block" />
                        <span className="hidden sm:inline">Technologies</span>
                    </HashLink>
                </div>

                {/* RIGHT SIDE — never shrink, always visible */}
                <div className="flex-shrink-0 flex items-center lg:contents">
                    {/* MOBILE MENU BUTTON — 44px min touch target */}
                    <button
                        type="button"
                        className={`lg:hidden flex items-center justify-center min-w-[44px] min-h-[44px] -m-2 rounded-xl transition-colors duration-300 touch-manipulation ${showTransparent ? 'text-white hover:bg-white/10' : 'text-blue-900 hover:bg-gray-100'}`}
                        onClick={handleClick}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                    >
                        <svg
                            className="h-6 w-6 shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            {isOpen ? (
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                            ) : (
                                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                            )}
                        </svg>
                    </button>

                    {/* DESKTOP NAV LINKS */}
                    <div className="hidden lg:flex lg:flex-row lg:items-center lg:gap-4">
                        <NavLinks atTop={showTransparent} />
                    </div>
                </div>
            </div>

            {/* MOBILE MENU — below nav, full-width on small screens */}
            <div
                className={`fixed inset-x-0 z-20 transition-all duration-300 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
                style={{ top: '3.5rem' }}
            >
                <div className="bg-white shadow-xl rounded-b-2xl mx-2 sm:mx-4 py-2 sm:py-4 px-2 sm:px-4 max-h-[calc(100vh-3.5rem)] overflow-y-auto overscroll-contain">
                    <nav className="flex flex-col" aria-label="Main">
                        <NavLinks atTop={false} onLinkClick={() => setisOpen(false)} isMobileMenu />
                    </nav>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
