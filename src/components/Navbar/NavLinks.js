import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const linkClass = (atTop) =>
  atTop
    ? 'inline-flex items-center font-extrabold text-white hover:text-blue-200 hover:bg-blue-900/20 rounded-lg px-4 py-2 transition-colors duration-300'
    : 'inline-flex items-center font-extrabold text-gray-500 hover:text-blue-900 hover:bg-gray-100 rounded-lg px-4 py-2 transition-colors duration-300';

const ctaClass = (atTop) =>
  atTop
    ? 'border-2 border-white text-white hover:bg-white hover:text-blue-900 inline-flex items-center justify-center px-6 py-2.5 shadow-xl rounded-xl transition-colors duration-300'
    : 'text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center px-6 py-2.5 shadow-xl rounded-xl transition-colors duration-300';

const dropdownLinkClass = (atTop) =>
  atTop
    ? 'block px-4 py-2.5 text-sm font-semibold text-white hover:text-blue-200 hover:bg-blue-900/20 rounded-lg transition-colors duration-300'
    : 'block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-blue-900 rounded-lg transition-colors duration-300';

const NavLinks = ({ atTop = false }) => {
    const [resourcesOpen, setResourcesOpen] = useState(false);
    const closeTimeoutRef = useRef(null);

    const handleEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setResourcesOpen(true);
    };

    const handleLeave = () => {
        closeTimeoutRef.current = setTimeout(() => setResourcesOpen(false), 120);
    };

    return (
        <>
            <Link className={linkClass(atTop)} to="/">
                Home
            </Link>
            <div
                className="relative hidden lg:block"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
            >
                <button
                    type="button"
                    className={`inline-flex items-center gap-1 ${linkClass(atTop)}`}
                    aria-expanded={resourcesOpen}
                    aria-haspopup="true"
                >
                    Resources
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                {resourcesOpen && (
                    <div className={`absolute left-0 top-full pt-1 min-w-[200px] ${atTop ? 'bg-blue-900/95 backdrop-blur' : 'bg-white shadow-lg'} rounded-lg border ${atTop ? 'border-white/20' : 'border-gray-100'}`}>
                        <Link to="/company-profile" className={dropdownLinkClass(atTop)} onClick={() => setResourcesOpen(false)}>
                            Company Profile
                        </Link>
                        <Link to="/projects" className={dropdownLinkClass(atTop)} onClick={() => setResourcesOpen(false)}>
                            Projects
                        </Link>
                        <Link to="/portfolio" className={dropdownLinkClass(atTop)} onClick={() => setResourcesOpen(false)}>
                            Portfolio
                        </Link>
                    </div>
                )}
            </div>
            <div className="lg:hidden flex flex-col space-y-1">
                <span className={`px-4 pt-2 text-xs font-bold uppercase tracking-wider ${atTop ? 'text-white/80' : 'text-gray-400'}`}>
                    Resources
                </span>
                <Link to="/company-profile" className={linkClass(atTop)} onClick={() => setResourcesOpen(false)}>
                    Company Profile
                </Link>
                <Link to="/projects" className={linkClass(atTop)}>
                    Projects
                </Link>
                <Link to="/portfolio" className={linkClass(atTop)}>
                    Portfolio
                </Link>
            </div>
            <HashLink className={linkClass(atTop)} to="/about">
                About
            </HashLink>
            <HashLink className={linkClass(atTop)} smooth to="/#services">
                Services
            </HashLink>
            <HashLink className={linkClass(atTop)} to="/contact#contact">
                Contact Us
            </HashLink>
            <HashLink className={ctaClass(atTop)} smooth to="/get-demo#demo">
                Demo our products
            </HashLink>
        </>
    )
}

export default NavLinks;
