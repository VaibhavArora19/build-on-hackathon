import { useRouter } from "next/navigation";
import React from "react";
import { HiMiniArrowSmallRight } from "react-icons/hi2";

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex h-[93vh] flex-col items-center pt-60">
      <p className="text-gray-400 font-Poppins text-xl font-light uppercase">Welcome to CrossFi</p>
      <p className="text-center text-[100px] font-bold font-Poppins leading-[110px]">
        Create your position <br /> on any chain <span className="text-secondary">SEAMLESSLY</span>
      </p>

      <button
        onClick={() => {
          router.push("/lend");
        }}
        className="bg-secondary py-5 w-[300px] text-black text-xl font-semibold font-Poppins flex items-center gap-1  justify-center rounded-full mt-14 hover:bg-white hover:text-[#41a960] "
      >
        <p className="text-center">Get Started </p>
        <HiMiniArrowSmallRight size={35} />
      </button>
    </div>
  );
};

export default Header;
