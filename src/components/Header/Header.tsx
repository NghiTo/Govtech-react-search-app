import lionLogo from "../../assets/R-removebg-preview.png";

const Header = () => {
  return (
    <div className="bg-[#f0f0f0] py-1 px-6 sm:px-12 md:px-20 lg:px-40 flex flex-row gap-4 text-xs">
      <img
        src={lionLogo}
        alt="Logo of the Singapore Government"
        className="object-cover w-4"
      />
      <div className="text-[#5b5b5b] flex flex-row gap-1 items-center">
        <span>An Official Website of the</span>
        <span className="font-semibold">Singapore Government</span>
      </div>
    </div>
  );
};

export default Header;
