import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from "../navbar/Navbar";
import Hero from '../hero/Hero';
import Service from '../service/Service';
import BannerDetails from '../banners/BannerDetails';
import Footer from '../footer/Footer';
import blog1 from '../../assets/blog1.jpg';

const Home = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <Hero />
{/* 
      <Service /> */}
    
      {/* <BannerDetails reverse={true} img={blog1} /> */}
 
    </div>
  );
};

export default Home;
