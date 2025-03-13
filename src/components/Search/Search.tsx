import { useMutation } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { getResult } from "../../apis/search.api";
import { useState } from "react";
import Result from "./Result";
import { SearchResult } from "../../types/search.type";
import LoadingSpinner from "../Loading/LoadingSpinner";

const Search = () => {
  const [searchResult, setSearchResult] = useState<SearchResult>();
  const { mutate, isPending } = useMutation({
    mutationFn: getResult,
    onSuccess: (res) => {
      setSearchResult(res);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div>
      <div className="shadow-md py-12 px-40">
        <form
          onSubmit={handleSubmit}
          className="border border-gray-400 rounded-md w-full flex flex-row gap-4 items-center pl-5"
        >
          <input type="text" className="outline-none w-full" />
          <IoClose className="text-[#686868] text-3xl" />
          <button
            type="submit"
            className="rounded-sm flex flex-row items-center py-3 px-8 gap-2 bg-[#1c76d5] text-white"
          >
            <FaSearch />
            <p className="font-semibold">Search</p>
          </button>
        </form>
      </div>
      {isPending && <LoadingSpinner />}
      {searchResult && <Result searchResult={searchResult} />}
    </div>
  );
};

export default Search;
