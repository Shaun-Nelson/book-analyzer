"use client";

import BookReader from "@/ui/BookReader";
import { useReader } from "@/lib/context/ReaderContext";

export default function ReadPage() {
  const { text, book } = useReader();

  return <BookReader text={text} book={book} />;
}
