import React from 'react';
import Clients from '../components/Clients';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import StatsBar from '../components/StatsBar';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
    return (
        <>
            <Hero />
            <StatsBar />
            <Services />
            <WhyChooseUs />
            <Portfolio />
            <Clients />
            <Cta />
            <Footer />
        </>

    )
}

export default Home;

