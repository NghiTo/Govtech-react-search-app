import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Result from "./Result";
import { SearchResult } from "../../types/search.type";
import { describe, test, expect } from "vitest";

const mockSearchResult: SearchResult = {
  ResultItems: [
    {
      DocumentId: "1",
      DocumentTitle: { Text: "Mocked Title" },
      DocumentExcerpt: { Text: "Mocked excerpt text with highlight" },
      DocumentURI: "https://example.com",
    },
    {
      DocumentId: "2",
      DocumentTitle: { Text: "Another Mocked Title" },
      DocumentExcerpt: { Text: "Another mocked excerpt" },
      DocumentURI: "https://example.com/another",
    },
  ],
  Page: 1,
};

describe("Result Component", () => {
  test("renders search results correctly", () => {
    render(<Result searchResult={mockSearchResult} highlightKey="mocked" />);

    const titleElement = screen.getByText((content, element) => {
        return element?.textContent === "Mocked Title";
      });
  
      expect(titleElement).toBeInTheDocument();
  });

  test("renders 'No results found' when no results match", () => {
    render(<Result searchResult={{ ResultItems: [], Page: 1 }} highlightKey="xyz" />);

    expect(screen.getByText('No results found for "xyz"')).toBeInTheDocument();
  });

  test("highlights search keyword correctly", () => {
    render(<Result searchResult={mockSearchResult} highlightKey="mocked" />);

    const highlightedText = screen.getAllByText(/mocked/i, { exact: false });

    expect(highlightedText.length).toBeGreaterThan(0);

    highlightedText.forEach((text) => {
      expect(text).toHaveClass("font-bold");
    });
  });
});
