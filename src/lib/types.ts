//archive.org
export interface ArchiveSearchResult {
  response: {
    docs: {
      identifier: string;
    }[];
    numFound: number;
  };
}

export type ArchiveSearchOptions = {
  query: string;
  rows?: number;
  page?: number;
};

export type ArchiveItem = {
  identifier: string;
  title: string;
  creator?: string;
  date?: string;
  mediatype: string;
};
