import React from "react";
import CountUp from "react-countup";

const Service = () => {
  return (
    <section className="container h-12 md:h-32">
      <div className="mx-auto my-4 grid w-full -translate-y-10 grid-cols-4 divide-x divide-slate-700 bg-white p-2 shadow-lg dark:bg-gray-800 dark:text-white/70 md:max-w-[800px] md:-translate-y-16 md:p-8">
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-sm font-bold text-black/80 dark:text-white sm:text-lg md:text-3xl">
            <CountUp end={150} suffix="k+" duration={2.75} />
          </h1>
          <h1 className="sm:text-md text-xs  md:text-lg">Clients</h1>
        </div>
        <div className="flex  flex-col items-center justify-center">
          <h1 className="text-sm font-bold text-black/80 dark:text-white sm:text-lg md:text-3xl">
            <CountUp end={300} suffix="k+" duration={2.75} />
          </h1>
          <h1 className=" sm:text-md text-xs md:text-lg">Transactions</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-sm font-bold text-black/80 dark:text-white sm:text-lg md:text-3xl">
          <CountUp
              start={-75.039}
              end={30.012}
              duration={2.75}
              separator=" "
              // decimals={4}
              // decimal=","
              suffix="+"
            />
          </h1>
          <h1 className="sm:text-md text-xs md:text-lg">Countries</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-sm font-bold text-black/80 dark:text-white sm:text-lg md:text-3xl">
            <CountUp
              end={400}
              duration={2.75}
              separator=" "
              // decimals={4}
              // decimal=","
              suffix="+"
            />
          </h1>
          <h1 className="sm:text-md text-xs  md:text-lg">Branches</h1>
        </div>
      </div>
    </section>
  );
};

export default Service;
