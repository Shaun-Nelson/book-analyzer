import { ArchiveItem } from "@/lib/types";

type Props = {
  item: ArchiveItem;
};

export default function SearchResultCard({ item }: Props) {
  return (
    <li key={item.identifier} className='p-4 bg-white shadow rounded'>
      <h3 className='font-bold'>{item.title}</h3>
      <p className='text-sm text-gray-600'>
        {item.creator || "Unknown author"} — {item.date || "n.d."}
      </p>
      <a
        href={`https://archive.org/details/${item.identifier}`}
        className='text-blue-500 hover:underline'
        target='_blank'
        rel='noopener noreferrer'
      >
        View
      </a>
    </li>
  );
}
