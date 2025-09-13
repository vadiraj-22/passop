import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-700 flex justify-center py-5 fixed bottom-0 items-center w-full gap-7 text-white">
      <div className=" logo font-bold text-2xl  text-white flex items-center">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">Op/&gt;</span>
      </div>
      <div className="flex">
        Created with
        <img
          className="w-6 flex items-center justify-center"
          src="/icons/heart.png"
          alt="heart"
        />
        by Vadiraj Joshi
      </div>
    </div>
  );
};

export default Footer;
