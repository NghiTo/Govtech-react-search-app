import React, { JSX } from "react";
import { Highlight, SearchResult } from "../../types/search.type";

interface ResultProps {
  searchResult: SearchResult;
}

const Result: React.FC<ResultProps> = ({ searchResult }) => {
  const getHighlightedText = (text: string, highlights: Highlight[]) => {
    if (highlights.length === 0) return text;

    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    highlights.forEach(({ BeginOffset, EndOffset }, index) => {
      if (lastIndex < BeginOffset) {
        parts.push(
          <span key={`normal-${index}`}>
            {text.substring(lastIndex, BeginOffset)}
          </span>
        );
      }

      parts.push(
        <span key={`highlight-${index}`} className="font-bold">
          {text.substring(BeginOffset, EndOffset)}
        </span>
      );

      lastIndex = EndOffset;
    });

    if (lastIndex < text.length) {
      parts.push(<span key="normal-end">{text.substring(lastIndex)}</span>);
    }

    return parts;
  };
  return (
    <div className="flex flex-col gap-12 px-40">
      <p className="text-[#282828] pt-12 font-semibold text-2xl">{`Showing ${searchResult.Page}-${searchResult.PageSize} of ${searchResult.TotalNumberOfResults} results`}</p>
      {searchResult.ResultItems.map((item) => {
        return (
          <div key={item.DocumentId} className="flex flex-col gap-3">
            <h3 className="text-[#1c76d5] text-2xl font-medium">
              {getHighlightedText(
                item.DocumentTitle.Text,
                item.DocumentTitle.Highlights
              )}
            </h3>
            <p className="text-[#282828]">
              {getHighlightedText(
                item.DocumentExcerpt.Text,
                item.DocumentExcerpt.Highlights
              )}
            </p>
            <p className="text-[#686868]">{item.DocumentURI}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Result;
