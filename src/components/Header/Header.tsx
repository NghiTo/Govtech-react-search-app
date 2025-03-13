import lionLogo from "/src/assets/R-removebg-preview.png";

const Header = () => {
  return (
    <div className="bg-[#f0f0f0] py-1 px-40 flex flex-row gap-4 text-xs">
      <img src={lionLogo} alt="Singapore logo" className="object-cover w-4" />
      <span className="text-[#5b5b5b] flex flex-row gap-1">
        <p>An Official Website of the</p>
        <p className="font-semibold">Singapore Government</p>
      </span>
    </div>
  );
};

export default Header;
