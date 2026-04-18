import { useState, useEffect } from "react";

const OfferSection = () => {
  const [currentOffer, setCurrentOffer] = useState(0);
  
  const offers = [
    {
      title: "FLASH SALE - 50% OFF",
      subtitle: "On all Wireless Audio Gear",
      code: "SMART50",
      bgColor: "bg-[#194F70]",
      textColor: "text-white"
    },
    {
      title: "NEW ARRIVALS",
      subtitle: "Explore the 2026 Tech Collection",
      code: "NEW2026",
      bgColor: "bg-[#FFB400]",
      textColor: "text-black"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [offers.length]);

  return (
    <section className="mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className={`relative overflow-hidden rounded-[2.5rem] p-8 md:p-16 min-h-[300px] flex flex-col justify-center transition-all duration-700 ${offers[currentOffer].bgColor} ${offers[currentOffer].textColor} shadow-2xl`}>
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80">Limited Time Offer</span>
          <h2 className="text-4xl md:text-6xl font-black mt-2 tracking-tighter uppercase leading-tight">
            {offers[currentOffer].title}
          </h2>
          <p className="mt-4 text-lg font-bold opacity-90 uppercase tracking-widest">
            {offers[currentOffer].subtitle}
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="px-6 py-3 border-2 border-dashed border-current rounded-xl font-black text-xl">
              CODE: {offers[currentOffer].code}
            </div>
            <button className="px-8 py-4 bg-white text-black dark:bg-black dark:text-white font-black rounded-xl hover:scale-105 transition-transform uppercase tracking-widest text-sm shadow-xl">
              Shop Now
            </button>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 right-12 flex gap-2">
          {offers.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 w-8 rounded-full transition-all duration-500 ${currentOffer === idx ? 'bg-white w-12' : 'bg-white/30'}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferSection;