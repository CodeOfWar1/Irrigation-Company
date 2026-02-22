import React, {useEffect} from 'react';
import Clients from '../components/Clients';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import StatsBar from '../components/StatsBar';
import WhyChooseUs from '../components/WhyChooseUs';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
            navigate("/appointments");
            }
        };
        
        checkUser();
    }, [navigate]);
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

