import { ArchiveItem } from "@/lib/types";
import { fetchFullText } from "@/lib/actions/fetchFullTextAction";

type Props = {
  item: ArchiveItem;
  error: boolean;
  setText: (text: string | null) => void;
  setBookChoice: (bookChoice: ArchiveItem) => void;
  setErrorForItem: (identifier: string, error: boolean) => void;
};

export default function SearchResultCard({
  item,
  error,
  setText,
  setBookChoice,
  setErrorForItem,
}: Props) {
  const handleFetchFullText = async () => {
    try {
      const result = await fetchFullText(item.identifier);
      if (result !== null) {
        setErrorForItem(item.identifier, false);
        setText(result);
        setBookChoice(item);
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
            className='py-2 px-4 mt-4 text-lg text-neutral-50 rounded-xl bg-neutral-600'
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
