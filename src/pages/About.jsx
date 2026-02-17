import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import Intro from '../components/Intro';

const About = () => {
  useDocTitle('About Us | Lawn Irrigation Technologies');

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero strip – aligned with Contact / Portfolio */}
        <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-800 text-white py-10 sm:py-14">
          <div className="m-auto max-w-4xl px-4 text-center">
            <p className="text-green-200 text-sm font-semibold uppercase tracking-widest">Who we are</p>
            <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">About us</h1>
            <p className="mt-2 text-green-100 text-base sm:text-lg max-w-xl mx-auto">
              Precision-engineered irrigation and landscape design, led by over 14 years of experience.
            </p>
          </div>
        </div>

        {/* Content – scroll-mt so heading stays visible below fixed nav */}
        <div className="scroll-mt-24 pt-12 sm:pt-16 pb-16">
          <Intro />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;

