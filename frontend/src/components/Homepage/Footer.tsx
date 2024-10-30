import React from "react";

const Footer = () => {
  return (
    <div className="w-full text-white px-20 mt-[150px]">
      <h2 className="text-3xl font-semibold mb-10">CrossFi.</h2>
      <p className="text-gray-400 mb-4">
        CrossFi is a cross-chain DeFi platform that allows users to create, deposit and manage their DeFi positions at a single place using CrossFi.
        It is still in development, please use with caution.
      </p>

      <div className="flex justify-between font-light text-white items-center">
        <p className="text-sm">&#169; 2024 CrossFi.</p>
      </div>
    </div>
  );
};

export default Footer;
