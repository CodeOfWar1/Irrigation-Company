import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import Intro from '../components/Intro';

const About = () => {
  useDocTitle('About Us | Lawn Irrigation Technologies');

  return (
    <>
      <div>
        <NavBar />
      </div>
      <main className="mt-20 min-h-screen bg-gray-50">
        <Intro />
      </main>
      <Footer />
    </>
  );
};

export default About;
