"use client";

import { useSearchParams } from "next/navigation";
import clsx from "clsx";

export default function PageTitleAndDescription() {
  const searchParams = useSearchParams();
  return (
    <div
      className={clsx("text-center mt-8", {
        ["hidden"]: searchParams.has("query"),
      })}
    >
      <h1 className='text-4xl font-bold text-neutral-800'>Book Analyzer</h1>
      <p className='text-lg text-neutral-600 mt-2'>
        Analyze your favorite books and authors with ease.
      </p>
    </div>
  );
}
