import React, { useEffect, useState } from "react";
import Background from "../component/Background";
import Hero from "../component/Hero";

function Home() {
  let heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time only!" },
    { text1: "Explore Our Best collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" }
  ];

  let [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount === 3 ? 0 : prevCount + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden relative top-[70px]">
    <div className="w-screen h-screen md-h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-hidden">
      <div className="flex w-full h-full">
        
        {/* Text (Hero) on LEFT */}
        <div className="w-1/2 h-full flex flex-col justify-center pl-16">
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
          />
        </div>

        {/* Image (Background) on RIGHT */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <Background heroCount={heroCount} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Home;
