"use client";

import { ArchiveItem } from "@/lib/types";
import { fetchFullText } from "@/lib/actions/fetchFullTextAction";
import { useReader } from "@/lib/context/ReaderContext";

type Props = {
  item: ArchiveItem;
  error: boolean;
  setErrorForItem: (identifier: string, error: boolean) => void;
};

export default function SearchfullTextCard({
  item,
  error,
  setErrorForItem,
}: Props) {
  const { setText, setBook } = useReader();

  const handleFetchFullText = async () => {
    try {
      const fullText = await fetchFullText(item.identifier);
      if (fullText) {
        setErrorForItem(item.identifier, false);
        setText(fullText);
        setBook(item);
      } else {
        setErrorForItem(item.identifier, true);
      }
    } catch (error) {
      setErrorForItem(item.identifier, true);
      console.error(error);
    }
  };

  return (
    <li key={item.identifier} className='p-4 bg-neutral-100 shadow rounded'>
      {!error ? (
        <>
          <h3 className='font-bold'>{item.title}</h3>
          <p className='text-sm text-neutral-600'>
            {item.creator || "Unknown author"} —{" "}
            {item.date?.split("-")[0] || "undated"}
          </p>
          <button
            className='py-2 px-4 mt-4 text-neutral-50 rounded-xl bg-neutral-600'
            onClick={handleFetchFullText}
          >
            Read and Analyze
          </button>
        </>
      ) : (
        <p className='text-lg text-neutral-800'>
          Full text is unavailable for your selection
        </p>
      )}
    </li>
  );
}
