"use client";

import { IoIosSearch } from "react-icons/io";
import { searchArchiveOrgAction } from "@/lib/actions/searchbarAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchArchiveOrgSchema } from "@/lib/actions/schemas";

export default function Searchbar() {
  // Initialize the form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchArchiveOrgSchema),
  });

  const onSubmit = async (data: { query: string }) => {
    try {
      const formData = new FormData();
      formData.append("query", data.query);
      await searchArchiveOrgAction(formData);
      // Handle successful search action
    } catch (error) {
      console.error("Search failed:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <div className='relative flex items-center justify-center w-full'>
        <IoIosSearch
          className='absolute left-0 flex items-center pl-4 text-gray-500'
          size='2.5em'
          onClick={handleSubmit(onSubmit)}
        />
        <input
          type='text'
          placeholder='Search'
          {...register("query", {
            required: "Please enter a book title or author",
          })}
          className='font-[ibmPlexSans] pl-12 text-2xl w-full max-w-md p-2 bg-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {errors.query && (
          <span className='text-red-500'>{errors.query.message}</span>
        )}
      </div>
    </form>
  );
}
