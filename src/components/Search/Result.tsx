import React from "react";
import { SearchResult } from "../../types/search.type";

interface ResultProps {
  searchResult: SearchResult;
}

const Result: React.FC<ResultProps> = ({ searchResult }) => {
  return (
    <div className="flex flex-col gap-12 px-40">
      <p className="text-[#282828] pt-12 font-semibold text-2xl">{`Showing ${searchResult.Page}-${searchResult.PageSize} of ${searchResult.TotalNumberOfResults} results`}</p>
      {searchResult.ResultItems.map((item) => {
        return (
          <div key={item.DocumentId} className="flex flex-col gap-3">
            <h3 className="text-[#1c76d5] text-2xl font-medium">
              {item.DocumentTitle.Text}
            </h3>
            <p className="text-[#282828]">{item.DocumentExcerpt.Text}</p>
            <p className="text-[#686868]">{item.DocumentURI}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Result;
