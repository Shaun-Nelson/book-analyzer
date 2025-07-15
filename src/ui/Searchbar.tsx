"use client";

import { IoIosSearch } from "react-icons/io";
import { searchArchiveOrgAction } from "@/lib/searchbarAction";
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
    const params = new URLSearchParams(searchParams);
    params.set("query", getValues("query"));
    replace(`${pathname}?${params.toString()}`);
  };

  const onSubmit = async (data: { query: string }) => {
    try {
      const formData = new FormData();
      formData.append("query", data.query);
      const res = await searchArchiveOrgAction(formData);
      console.log("Search results:", res);
      handleSearch();
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <div className='relative flex items-center justify-center w-full'>
        <IoIosSearch
          className='absolute left-0 flex items-center pl-4 text-neutral-500'
          size='2.5em'
          onClick={handleSubmit(onSubmit)}
        />
        <input
          type='text'
          placeholder={errors.query ? errors.query.message : "Search"}
          {...register("query", {
            required: "Please enter a book title or author",
          })}
          className='font-[ibmPlexSans] pl-12 text-2xl text-neutral-800 w-full max-w-md p-2 bg-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
    </form>
  );
}
