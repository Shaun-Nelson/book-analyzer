"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ArchiveItem } from "@/lib/types";

type ReaderContextType = {
  text: string | null;
  book: ArchiveItem | null;
  setText: (text: string | null) => void;
  setBook: (book: ArchiveItem | null) => void;
};

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

export const ReaderProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState<string | null>(null);
  const [book, setBook] = useState<ArchiveItem | null>(null);

  return (
    <ReaderContext.Provider value={{ text, book, setText, setBook }}>
      {children}
    </ReaderContext.Provider>
  );
};

export const useReader = (): ReaderContextType => {
  const context = useContext(ReaderContext);
  if (!context) {
    throw new Error("useReader must be used within a ReaderProvider");
  }
  return context;
};
