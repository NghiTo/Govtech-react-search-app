type Highlight = {
  BeginOffset: number;
  EndOffset: number;
};

type DocumentText = {
  Text: string;
  Highlights: Highlight[];
};

type ResultItem = {
  DocumentId: string;
  DocumentTitle: DocumentText;
  DocumentExcerpt: DocumentText;
  DocumentURI: string;
};

export type SearchResult = {
  TotalNumberOfResults: number;
  Page: number;
  PageSize: number;
  ResultItems: ResultItem[];
};
