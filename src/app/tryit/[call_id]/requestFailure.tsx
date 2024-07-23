export default function ReqFail() {
  return (
    <div className='h-[80vh] justify-center items-center flex'>
      <div className='bg-red-200 w-fit px-5 py-6 rounded-xl border-red-300 border text-red-400 flex gap-1 items-center'>
        Failed to fetch response
      </div>
    </div>
  );
}
