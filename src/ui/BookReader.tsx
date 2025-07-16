"use client";

import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useReader } from "@/lib/context/ReaderContext";
import { ArchiveItem } from "@/lib/types";

type Props = {
  text: string | null;
  book: ArchiveItem | null;
};

export default function BookReader({ text, book }: Props) {
  const router = useRouter();
  const { setText, setBook } = useReader();

  const handleClick = () => {
    setText(null);
    setBook(null);
    router.back();
  };

  return (
    <>
      <IoIosArrowRoundBack className='mt-4' size={48} onClick={handleClick} />
      <div className='max-w-3xl mx-auto px-4 py-6'>
        <h1 className='text-2xl font-bold mb-2'>{book?.title}</h1>
        <p className='text-sm text-neutral-600 mb-6'>
          {book?.creator || "Unknown author"} —{" "}
          {book?.date?.split("-")[0] || "undated"}
        </p>
        <article className='prose prose-lg text-neutral-800'>
          {text?.slice(0, 500) + " ..."}
        </article>
      </div>
    </>
  );
}
