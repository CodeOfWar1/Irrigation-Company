import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const linkClass = (atTop) =>
    atTop
        ? 'inline-flex items-center font-extrabold text-white hover:text-green-200 hover:bg-green-900/20 rounded-lg px-4 py-2 transition-colors duration-300'
        : 'inline-flex items-center font-extrabold text-gray-500 hover:text-green-900 hover:bg-gray-100 rounded-lg px-4 py-2 transition-colors duration-300';

const ctaClass = (atTop) =>
    atTop
        ? 'border-2 border-white text-white hover:bg-white hover:text-green-900 inline-flex items-center justify-center px-6 py-2.5 shadow-xl rounded-xl transition-colors duration-300'
        : 'text-white bg-green-900 hover:bg-green-800 inline-flex items-center justify-center px-6 py-2.5 shadow-xl rounded-xl transition-colors duration-300';

const dropdownLinkClass = (atTop) =>
    atTop
        ? 'block px-4 py-2.5 text-sm font-semibold text-white hover:text-green-200 hover:bg-green-900/20 rounded-lg transition-colors duration-300'
        : 'block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-green-900 rounded-lg transition-colors duration-300';

const mobileLinkClass = 'flex items-center w-full px-4 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-green-900 rounded-lg transition-colors border-b border-gray-100 last:border-b-0 active:bg-gray-100';
const mobileCtaClass = 'flex items-center justify-center w-full px-4 py-3.5 text-base font-bold text-white bg-green-900 hover:bg-green-800 rounded-xl mx-2 mt-2 mb-1 transition-colors';

const NavLinks = ({ atTop = false, onLinkClick, isMobileMenu = false }) => {
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

    if (isMobileMenu) {
        return (
            <>
                <Link to="/" className={mobileLinkClass} onClick={onLinkClick}>Home</Link>
                <div className="px-4 pt-3 pb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Resources</span>
                </div>
                <Link to="/about" className={mobileLinkClass} onClick={onLinkClick}>About</Link>
                <Link to="/company-profile" className={mobileLinkClass} onClick={onLinkClick}>Company Profile</Link>
                <Link to="/get-demo" className={mobileLinkClass} onClick={onLinkClick}>Portfolio</Link>
                <Link to="/terms" className={mobileLinkClass} onClick={onLinkClick}>Terms &amp; Conditions</Link>
                <div className="border-b border-gray-100 my-1" />
                <HashLink to="/#services" smooth className={mobileLinkClass} onClick={onLinkClick}>Services</HashLink>
                <HashLink to="/#process" smooth className={mobileLinkClass} onClick={onLinkClick}>Process</HashLink>
                <Link to="/contact" className={mobileLinkClass} onClick={onLinkClick}>Contact Us</Link>
                <Link to="/get-demo" className={mobileCtaClass} onClick={onLinkClick}>Portfolio</Link>
            </>
        );
    }

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
                    <div className={`absolute left-0 top-full pt-1 min-w-[200px] ${atTop ? 'bg-green-900/95 backdrop-blur' : 'bg-white shadow-lg'} rounded-lg border ${atTop ? 'border-white/20' : 'border-gray-100'}`}>
                        <Link to="/about" className={dropdownLinkClass(atTop)} onClick={() => setResourcesOpen(false)}>
                            About
                        </Link>
                        <Link to="/company-profile" className={dropdownLinkClass(atTop)} onClick={() => setResourcesOpen(false)}>
                            Company Profile
                        </Link>
                        <Link to="/get-demo" className={dropdownLinkClass(atTop)} onClick={() => setResourcesOpen(false)}>
                            Portfolio
                        </Link>
                        <Link to="/terms" className={dropdownLinkClass(atTop)} onClick={() => setResourcesOpen(false)}>
                            Terms &amp; Conditions
                        </Link>
                    </div>
                )}
            </div>
            <HashLink className={linkClass(atTop)} smooth to="/#services">
                Services
            </HashLink>
            <HashLink className={linkClass(atTop)} smooth to="/#process">
                Process
            </HashLink>
            <HashLink className={linkClass(atTop)} to="/contact#contact">
                Contact Us
            </HashLink>
            <Link className={ctaClass(atTop)} to="/get-demo">
                Portfolio
            </Link>
        </>
    )
}

export default NavLinks;
