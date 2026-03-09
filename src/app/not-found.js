// app/not-found.jsx

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-8">
      <h1 className="text-Uranium font-[Poppins] font-black text-[120px] leading-none">
        404
      </h1>
      <p className="text-white font-[Poppins] font-bold text-2xl mt-4">
        Page Not Found
      </p>
      <p className="text-gray-400 font-[Poppins] font-normal text-base mt-3 text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 px-8 py-4 bg-Uranium text-black font-[Poppins] font-bold text-sm rounded-full hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </div>
  );
}
