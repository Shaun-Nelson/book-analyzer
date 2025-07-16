export default function SearchResultCardSkeleton() {
  return (
    <div className='animate-pulse p-4 border rounded-lg shadow-sm'>
      <div className='h-6 bg-gray-200 rounded w-3/4 mb-2'></div>
      <div className='h-4 bg-gray-200 rounded w-1/2 mb-4'></div>
      <div className='h-32 bg-gray-200 rounded mb-4'></div>
      <div className='flex space-x-4'>
        <div className='h-8 bg-gray-200 rounded w-1/3'></div>
        <div className='h-8 bg-gray-200 rounded w-1/3'></div>
      </div>
    </div>
  );
}
