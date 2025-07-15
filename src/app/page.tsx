import Searchbar from "@/ui/Searchbar";
import PageTitleAndDescription from "@/ui/PageTitleAndDescription";

export default function Home() {
  return (
    <main className='min-h-screen bg-neutral-200 font-[literata]'>
      <div className='container mx-auto p-4'>
        <Searchbar />
        <PageTitleAndDescription />
      </div>
    </main>
  );
}
