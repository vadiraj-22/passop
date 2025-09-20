
const Footer = () => {
  return (
    <div className="bg-slate-800 lg:flex flex-row justify-center  py-5  bottom-0 items-center w-full gap-7 text-white">
      <div className=" logo font-bold text-2xl flex   text-white justify-center lg:flex items-center">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">Op/&gt;</span>
      </div>
      <div className="lg:flex flex justify-center lg:mt-0 mt-2">
        Created with &nbsp;
        <img
          className="w-6 flex items-center justify-center"
          src="/icons/heart.png"
          alt="heart"
        />
        &nbsp; by Vadiraj Joshi
      </div>
    </div>
  );
};

export default Footer;
