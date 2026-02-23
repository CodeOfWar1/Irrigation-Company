import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* GRID SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* COMPANY INFO */}
                    <div>
                        <h2 className="text-2xl font-bold text-green-900 mb-3">
                            Lawn Irrigation Technologies
                        </h2>
                        <p className="italic text-sm text-gray-600 mb-4">
                            “Green Grass, Zero Effort.”
                        </p>

                        <div className="text-sm text-gray-700 space-y-1">
                            <p>Plot 70, Handsworth</p>
                            <p>Great East Road</p>
                            <p>Lusaka, Zambia</p>
                            <p className="pt-2 font-medium">Established: 2011</p>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-lg font-semibold text-green-900 mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>
                                <HashLink smooth to="#about" className="hover:text-green-700 transition">
                                    About Us
                                </HashLink>
                            </li>
                            <li>
                                <HashLink smooth to="#services" className="hover:text-green-700 transition">
                                    Services
                                </HashLink>
                            </li>
                            <li>
                                <Link to="/get-demo" className="hover:text-green-700 transition">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <HashLink smooth to="#contact" className="hover:text-green-700 transition">
                                    Contact
                                </HashLink>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:text-green-700 transition">
                                    Terms &amp; Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* CORE SERVICES */}
                    <div>
                        <h3 className="text-lg font-semibold text-green-900 mb-4">
                            Core Services
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>3D Landscape Visualization & CAD Design</li>
                            <li>Automated Pop-up Sprinkler Systems</li>
                            <li>Precision Drip & Micro-Irrigation</li>
                            <li>Solar-Powered Irrigation Systems</li>
                            <li>Pump Station Installation</li>
                            <li>Soil Science & Fertility Consultancy</li>
                        </ul>
                    </div>

                    {/* CONTACT & SOCIAL */}
                    <div>
                        <h3 className="text-lg font-semibold text-green-900 mb-4">
                            Contact
                        </h3>

                        <div className="text-sm text-gray-700 space-y-2 mb-4">
                            <p>📞 +260 966 897 354</p>
                            <p>✉ lawnirrigationtech@gmail.com</p>
                            <p className="font-semibold pt-2">
                                “Easy Life With Modern Technology”
                            </p>
                        </div>

                        {/* SOCIAL ICONS */}
                        <div className="flex space-x-4 mt-4">
                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/share/1EcgVxqMcW/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-green-900 hover:text-green-700 transition"
                            >
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M22 12A10 10 0 1010.9 21.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/george.mulenga.58?igsh=MWlydTVmcHBhcWx3eg==&utm_source=ig_contact_invite"
                                target="_blank"
                                rel="noreferrer"
                                className="text-green-900 hover:text-green-700 transition"
                            >
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm0 2C5.7 4 4 5.7 4 7.8v8.4C4 18.3 5.7 20 7.8 20h8.4c2.1 0 3.8-1.7 3.8-3.8V7.8C20 5.7 18.3 4 16.2 4H7.8zm4.2 3.5A4.5 4.5 0 1112 16.5 4.5 4.5 0 0112 7.5zm0 2A2.5 2.5 0 1014.5 12 2.5 2.5 0 0012 9.5zm4.8-3.3a1 1 0 110 2 1 1 0 010-2z" />
                                </svg>
                            </a>

                            {/* TikTok */}
                            <a
                                href="https://www.tiktok.com/@lawn.irrigation.t?_r=1&_t=ZS-94AO1t1kI7Q"
                                target="_blank"
                                rel="noreferrer"
                                className="text-green-900 hover:text-green-700 transition"
                            >
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M17.1 5.2c.7.8 1.6 1.5 2.6 1.9V4.1A4.6 4.6 0 0117.2 3V8a6.3 6.3 0 01-3.6-1.1v7.1a4.1 4.1 0 11-3.6-4v2.4a1.7 1.7 0 001.2 2 1.7 1.7 0 002-1.2 1.7 1.7 0 00.1-.6V2h3.8a3.9 3.9 0 001.1 3.2z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-gray-300 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-600">
                    <span>© {new Date().getFullYear()} Lawn Irrigation Technologies. All Rights Reserved.</span>
                    <span className="hidden sm:inline">|</span>
                    <Link to="/terms" className="hover:text-green-700 transition font-medium">
                        Terms &amp; Conditions
                    </Link>
                    <span className="hidden sm:inline">|</span>
                    <span>Lusaka, Zambia | Engineering Smart Green Spaces Since 2011</span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;

