import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';

const About = () => {
  const router = useRouter();
  return (
    <section className="min-h-screen bg-[#090909] border-t-[0.5px] border-gray-700 rounded-[100px] ">
      <div className="flex w-[80%] mx-auto mt-20 gap-10">
        <div className="flex-[0.5]">
          <div className="h-[550px] rounded-3xl bg-[#7CFEA2] p-10 mb-10 relative overflow-hidden">
            <p className="text-3xl text-black font-Poppins font-semibold mb-4">
              An unique concept of creating smartcontracts with AI!
            </p>
            <p className="text-black font-Poppins text-thin">
              Forget about writing hectic code! Create contracts with simple
              prompts and enjoy the beauty of our platform
            </p>

            <Image
              src="/about7.svg"
              height={300}
              width={300}
              alt="Create contract"
              className=" mt-3"
            />
          </div>
          <div className="bg-[#121212] h-[300px] rounded-3xl p-10 mb-10  border-[0.5px] border-gray-600">
            <Image
              src="/about3.svg"
              alt="image"
              height={40}
              width={60}
              className="mb-6"
            />

            <p className="font-semibold font-Poppins text-2xl mb-1">
              Already have a contract? Deploy here
            </p>
            <p className="font-thin mb-8">
              Have a pre-written contract in cadence and struggling to deploy?
              Use our dapp for easy deployment and management!
            </p>

            <p
              onClick={() => {
                router.push('/deploy');
              }}
              className="flex items-center hover:text-[#7CFEA2] cursor-pointer"
            >
              Deploy here{' '}
              <span>
                <BsArrowRightShort size={25} />
              </span>
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex-[0.5]">
          <div className="bg-[#121212] h-[300px] rounded-3xl p-10 mb-10  border-[0.5px] border-gray-600">
            <Image
              src="/about1.svg"
              alt="image"
              height={40}
              width={60}
              className="mb-10"
            />

            <p className="font-semibold font-Poppins text-2xl mb-1">
              Create contracts on cadence with AI.
            </p>
            <p className="font-thin mb-8">
              building on flow? Struggling with cadence? Use our dapp to build
              and deploy contracts using <strong>GPT3</strong>!
            </p>

            <p
              onClick={() => {
                router.push('/create');
              }}
              className="flex items-center hover:text-[#7CFEA2] cursor-pointer"
            >
              Try here{' '}
              <span>
                <BsArrowRightShort size={25} />
              </span>
            </p>
          </div>
          <div className="h-[550px] rounded-3xl bg-[#7CFEA2] p-10 relative">
            <Image
              src="/about4.svg"
              height={250}
              width={250}
              alt="Create contract"
              className="mt-0 mx-auto mb-10"
            />

            <div className="self-end">
              <p className="text-3xl text-black font-Poppins font-semibold mb-4">
                Deploying contracts with scripts and CLI is too hectic?
              </p>
              <p className="text-black font-Poppins text-thin">
                Use Flowweb's deployer to deploy your smartcontracts in a breeze
                and embrace the power of our dapp!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto">
        <div className="bg-[#121212] h-[300px] rounded-3xl p-10 mb-10  border-[0.5px] border-gray-600 flex flex-col items-center">
          <Image
            src="/about1.svg"
            alt="image"
            height={40}
            width={60}
            className="mb-10"
          />

          <p className="font-semibold font-Poppins text-2xl mb-1">
            Manage your existing contracts with our very own explorer!
          </p>
          <p className="font-thin mb-8 w-[550px] text-center">
            Deployed contracts with our platform? Just simply search your
            address on explorer and get all the deployed contracts at a single
            place!
          </p>

          <p
            onClick={() => {
              router.push('/explorer');
            }}
            className="flex items-center hover:text-[#7CFEA2] cursor-pointer"
          >
            Use Explorer{' '}
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
