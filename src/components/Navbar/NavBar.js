import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavLinks from '../Navbar/NavLinks';
import { HashLink } from 'react-router-hash-link';

const NavBar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [top, setTop] = useState(isHome && !window.scrollY);
    const [isOpen, setisOpen] = useState(false);

    const showTransparent = isHome && top;

    useEffect(() => {
      if (!isHome) return;
      const scrollHandler = () => {
        window.pageYOffset > 10 ? setTop(false) : setTop(true);
      };
      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    }, [isHome, top]);

    useEffect(() => {
      if (!isHome) setTop(false);
      else setTop(window.pageYOffset <= 10);
    }, [isHome, location.pathname]);

    function handleClick() {
        setisOpen(!isOpen);
    }

    return (
        <nav className={`fixed top-0 w-full z-30 transition duration-300 ease-in-out mb-16 ${!showTransparent ? 'bg-white shadow-lg' : ''}`}>
            <div className="flex flex-row justify-between items-center gap-4 px-4 md:px-6 lg:px-8 py-3">
                <div className="flex-shrink-0">
                    <HashLink smooth to={isHome ? '/#hero' : '/'}><h1 className={`font-extrabold text-4xl transition-colors duration-300 ${showTransparent ? 'text-white' : 'text-blue-900'}`}>mld</h1></HashLink>
                </div>
                <div className="flex flex-row items-center gap-2 lg:gap-0">
                    <button className={`p-2 rounded-lg lg:hidden transition-colors duration-300 ${showTransparent ? 'text-white' : 'text-blue-900'}`} onClick={handleClick} aria-label="Toggle menu">
                        <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            {isOpen && (
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                            )}
                            {!isOpen && (
                            <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                            )}
                        </svg>
                    </button>
                    <div className="hidden lg:flex lg:flex-row lg:items-center lg:gap-4">
                        <NavLinks atTop={showTransparent} />
                    </div>
                </div>
            </div>

            <div className={`fixed inset-x-0 top-[4.5rem] z-20 transition-all duration-300 lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="bg-white shadow-xl rounded-b-lg mx-4 py-6 px-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
                    <nav className="flex flex-col gap-2">
                        <NavLinks atTop={false} />
                    </nav>
                </div>
            </div>
        </nav>
    )
    
}


export default NavBar;
