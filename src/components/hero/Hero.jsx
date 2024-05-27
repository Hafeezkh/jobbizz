import React from "react";
import { Link } from "react-router-dom";
import Banner from "../../assets/jobportal.webp";

const Hero = () => {
  return (
    <main className="bg-white pt-20">
      <section className="container flex h-[650px] flex-col items-center justify-center md:h-[500px] ">
        <div className="grid grid-cols-1 items-center gap-8 dark:text-white md:grid-cols-2">
          <div
            data-aos="fade-right"
            data-aos-duration="400"
            data-aos-once="true"
            className="flex flex-col items-center gap-4 text-center text-black md:items-start md:text-left "
          >
            <h1 className=" text-4xl ">
              Welcome to <Link to="/#home" className="">
               JOB
                <span className="inline-block font-bold text-primary">BIZZ</span>
              </Link>
            </h1>
            <p className="">
            "🌟 Welcome to JObBIZZ – Your Gateway to Success! 🌟 Employers, discover top talent to elevate your business. 
            💼 Job seekers, find your dream job and advance your career. 
            🚀 Join JobBiz today and connect with endless opportunities for a brighter future! 🌟"
            </p>
            <div className="space-x-4">
              <Link to="login-Jobseeker" className="button-link">
                {/* Use Link to create a link to another route */}
                <button className="rounded-md border-2 border-primary bg-primary px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary/80">
                  SEARCH FOR JOB 
                </button>
              </Link>
              <Link to="login-Employer" className="button-link">
              <button className="border-1  rounded-md border-2 border-Black px-4 py-2 text-sm text-black transition-colors duration-300 ">
                SEARCH FOR TALENTS
              </button>
              </Link>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-once="true"
            className="mx-auto max-w-lg p-2"
          >
            <img src={Banner} alt="No image" className="hover:drop-shadow-md w-full" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
