"use client";

import { IoIosSearch } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchArchiveOrgSchema } from "@/lib/schemas";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Searchbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(searchArchiveOrgSchema),
  });

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    const query = getValues("query")?.trim();

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    replace(url);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} className='w-full'>
      <div className='relative flex items-center justify-center w-full'>
        <IoIosSearch
          className='absolute left-0 flex items-center pl-4 text-neutral-500'
          size='2.5em'
          onClick={handleSubmit(handleSearch)}
        />
        <input
          type='text'
          placeholder={errors.query ? errors.query.message : "Search"}
          {...register("query", {
            required: "Search book title or author",
          })}
          className='font-[ibmPlexSans] pl-12 text-2xl text-neutral-800 w-full max-w-md p-2 bg-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:bg-neutral-100 transition-colors duration-300'
        />
      </div>
    </form>
  );
}
