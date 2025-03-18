import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { getResult, getSuggestion } from "../../apis/search.api";
import { useRef, useState, useEffect } from "react";
import Result from "./Result";
import { SearchResult } from "../../types/search.type";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { Suggestions } from "../../types/suggestion.type";

const Search = () => {
  const [searchResult, setSearchResult] = useState<SearchResult>();
  const [highlightKey, setHighlightKey] = useState("");
  const [inputField, setInputField] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionBoxRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: getResult,
    onSuccess: (res) => {
      setSearchResult(res);
      setShowSuggestions(false);
      setHighlightKey(inputField);
      setMutationError(null);
    },
    onError: (error) => {
      if (error instanceof Error) {
        setMutationError(error.message);
      } else {
        setMutationError("Something went wrong. Please check your network.");
      }
      setIsSubmitting(false);
    },
  });

  const {
    data,
    refetch,
    isError: isSuggestionError,
    error: suggestionError,
  } = useQuery<Suggestions>({
    queryKey: ["suggestions"],
    queryFn: getSuggestion,
    enabled: false,
  });

  const executeSearch = () => {
    setShowSuggestions(false);
    setIsSubmitting(true);
    inputRef.current?.blur();
    mutate();
  };

  useEffect(() => {
    if (inputField.length === 0) {
      setShowSuggestions(false);
      return;
    }
    if (isSubmitting) return;
    const timer = setTimeout(() => {
      refetch();
      setShowSuggestions(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputField, refetch, isSubmitting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(false);
    setInputField(e.target.value);
    setSelectedIndex(null);
  };

  const filteredSuggestions =
    data?.suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputField.toLowerCase())
    ) || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  const handleClear = () => {
    setInputField("");
    setShowSuggestions(false);
    setSelectedIndex(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (selectedIndex !== null) {
        setInputField(filteredSuggestions[selectedIndex]);
      }
      executeSearch();
    }

    if (!filteredSuggestions.length) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev === null || prev === filteredSuggestions.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev === null || prev === 0 ? filteredSuggestions.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="w-full">
      <div className="shadow-md py-12 px-6 sm:px-12 md:px-24 lg:px-40">
        <form
          onSubmit={handleSubmit}
          className="border border-gray-400 rounded-md w-full flex flex-row items-center"
        >
          <div className="relative w-full flex flex-row">
            <input
              ref={inputRef}
              type="text"
              className="outline-none w-full pl-5"
              value={inputField}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            {inputField.length > 0 && (
              <IoClose
                className="text-[#686868] text-3xl cursor-pointer pr-4"
                onClick={handleClear}
              />
            )}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div
                ref={suggestionBoxRef}
                className="absolute flex flex-col top-10 bg-white w-full shadow-sm rounded-b-lg z-10 max-h-60 overflow-y-auto"
              >
                {filteredSuggestions.map((suggestion, index) => (
                  <p
                    key={suggestion}
                    className={`text-[#686868] p-3 cursor-pointer ${
                      selectedIndex === index
                        ? "bg-blue-200"
                        : "hover:bg-blue-100"
                    }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => {
                      setInputField(suggestion);
                      executeSearch();
                    }}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: suggestion.replace(
                          new RegExp(`(${inputField})`, "gi"),
                          (match) => `<b class="text-blue-600">${match}</b>`
                        ),
                      }}
                    />
                  </p>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="rounded-sm cursor-pointer hover:bg-[#1c56d5] flex flex-row items-center py-3 px-8 gap-2 bg-[#1c76d5] text-white"
          >
            <FaSearch />
            <p className="font-semibold">Search</p>
          </button>
        </form>
      </div>
      {isPending && <LoadingSpinner />}
      {mutationError && (
        <div className="text-center text-red-500 mt-4">{mutationError}</div>
      )}
      {isSuggestionError && (
        <div className="text-center text-red-500 mt-2">
          Failed to load suggestions.{" "}
          {suggestionError instanceof Error
            ? suggestionError.message
            : "Please check your connection."}
        </div>
      )}
      {searchResult && !isPending && (
        <Result searchResult={searchResult} highlightKey={highlightKey} />
      )}
    </div>
  );
};

export default Search;
