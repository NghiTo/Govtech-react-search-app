import React from "react";
import { SearchResult } from "../../types/search.type";

interface ResultProps {
  searchResult: SearchResult;
  highlightKey: string;
}

const Result: React.FC<ResultProps> = ({ searchResult, highlightKey }) => {
  const getHighlightedText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="font-bold">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const filteredResults = searchResult?.ResultItems?.filter(
    (item) =>
      item.DocumentTitle.Text.toLowerCase().includes(
        highlightKey.toLowerCase()
      ) ||
      item.DocumentExcerpt.Text.toLowerCase().includes(
        highlightKey.toLowerCase()
      )
  );

  return (
    <div className="flex flex-col gap-12 px-6 sm:px-12 md:px-24 lg:px-40 py-12 max-w-full overflow-x-hidden">
      {filteredResults?.length > 0 && (
        <p className="text-[#282828] font-semibold text-2xl break-words">
          {`Showing ${filteredResults?.length > 0 ? searchResult.Page : 0} - ${
            filteredResults.length
          } of ${filteredResults?.length} results`}
        </p>
      )}
      {filteredResults?.length > 0 ? (
        filteredResults?.map((item) => (
          <div key={item.DocumentId} className="flex flex-col gap-3">
            <h3 className="text-[#1c76d5] text-2xl font-medium break-words">
              {getHighlightedText(item.DocumentTitle.Text, highlightKey)}
            </h3>
            <p className="text-[#282828] break-words">
              {getHighlightedText(item.DocumentExcerpt.Text, highlightKey)}
            </p>
            <p className="text-[#686868] break-all whitespace-normal">
              {item.DocumentURI}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-lg">
          No results found for "{highlightKey}"
        </p>
      )}
    </div>
  );
};

export default Result;
