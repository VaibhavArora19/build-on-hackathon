import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

const About = () => {
  const router = useRouter();
  return (
    <section className="min-h-screen bg-neutral border-t-[0.5px] border-gray-700 rounded-[100px] ">
      <div className="flex w-[80%] mx-auto mt-20 gap-10">
        <div className="flex-[0.5]">
          <div className="h-[550px] rounded-3xl bg-secondary p-10 mb-10 relative overflow-hidden">
            <p className="text-3xl text-black font-Poppins font-semibold mb-4">An unique concept of creating positions cross chain!</p>
            <p className="text-black font-Poppins text-thin">
              Forget about bridging tokens and depositing into different protocols! No gas fees required to deposit into protocols
            </p>

            <Image src="/about7.svg" height={300} width={300} alt="Create contract" className=" mt-3" />
          </div>
          <div className="bg-[#121212] h-[300px] rounded-3xl p-10 mb-10  border-[0.5px] border-gray-600">
            <Image src="/about3.svg" alt="image" height={40} width={60} className="mb-6" />

            <p className="font-semibold font-Poppins text-2xl mb-1">Almost instant deposit? Fast as lightning!</p>
            <p className="font-thin mb-8">Transactions never feel slow! Even if they are cross chain, almost instantenous deposits and withdrawal!</p>

            <p
              onClick={() => {
                router.push("/lend");
              }}
              className="flex items-center hover:text-[#7CFEA2] cursor-pointer"
            >
              Deposit here{" "}
              <span>
                <BsArrowRightShort size={25} />
              </span>
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex-[0.5]">
          <div className="bg-[#121212] h-[300px] rounded-3xl p-10 mb-10  border-[0.5px] border-gray-600">
            <Image src="/about1.svg" alt="image" height={40} width={60} className="mb-10" />

            <p className="font-semibold font-Poppins text-2xl mb-1">More than 10 chains to deposit.</p>
            <p className="font-thin mb-8">So many chain? Worry not, we have got you covered!</p>

            <p
              onClick={() => {
                router.push("/lend");
              }}
              className="flex items-center hover:text-[#7CFEA2] cursor-pointer"
            >
              Try here{" "}
              <span>
                <BsArrowRightShort size={25} />
              </span>
            </p>
          </div>
          <div className="h-[550px] rounded-3xl bg-secondary p-10 relative">
            <Image src="/about4.svg" height={250} width={250} alt="Create contract" className="mt-0 mx-auto mb-10" />

            <div className="self-end">
              <p className="text-3xl text-black font-Poppins font-semibold mb-4">Migrate your positions in a single click?</p>
              <p className="text-black font-Poppins text-thin">
                You are just one click away from moving your positons from one protocol to another just like that!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto">
        <div className="bg-[#121212] h-[300px] rounded-3xl p-10 mb-10  border-[0.5px] border-gray-600 flex flex-col items-center">
          <Image src="/about1.svg" alt="image" height={40} width={60} className="mb-10" />

          <p className="font-semibold font-Poppins text-2xl mb-1">All in One DeFi solution!</p>
          <p className="font-thin mb-8 w-[550px] text-center">
            The all in one defi solution that offers extensive chain abstraction on your fingertips!
          </p>

          <p
            onClick={() => {
              router.push("/explorer");
            }}
            className="flex items-center hover:text-[#7CFEA2] cursor-pointer"
          >
            Lend here{" "}
            <span>
              <BsArrowRightShort size={25} />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
