import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <section className="h-[80vh] font-Poppins bg-secondary my-40 rounded-t-[90px] flex ">
      <div className="max-w-[570px] mx-auto my-40 flex-[0.6]">
        <p className="text-black font-bold text-6xl mb-5">Manage DeFi using CrossFi!</p>

        <p className="text-black text-lg">
          Create, deposit and manage your DeFi positions at a single place using CrossFi. No more hassle with bridging tokens and depositing into
          different protocols!
        </p>

        <p className="text-black text-lg mt-10">Lets Get Started :)</p>
      </div>

      <div className="flex-[0.5] relative overflow-hidden">
        <Image src="/circle.svg" height={800} width={800} alt="circle" className="absolute -top-28 -right-20 animate-spin-extraSlow" />

        {/* <Image
          src="/logo.svg"
          height={250}
          width={250}
          className="absolute z-10 left-[45%] top-32"
        /> */}

        <p className="absolute z-10 left-[45%] top-48 text-[120px] text-[#7CFEA2] font-Poppins">CrossFi.</p>
      </div>
    </section>
  );
};

export default Banner;
