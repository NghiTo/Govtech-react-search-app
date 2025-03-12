import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Search = () => {
  return (
    <div className="shadow-md py-12 px-28">
      <div className="border border-gray-400 rounded-md w-full flex flex-row gap-4 items-center pl-5">
        <input type="text" className="outline-none w-full" />
        <IoClose className="text-[#686868] text-3xl" />
        <button
          type="button"
          className="rounded-sm flex flex-row items-center py-3 px-8 gap-2 bg-[#1c76d5] text-white"
        >
          <FaSearch />
          <p className="font-semibold">Search</p>
        </button>
      </div>
    </div>
  );
};

export default Search;
