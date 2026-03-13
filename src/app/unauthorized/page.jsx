import Link from "next/link";
export const metadata = {
    title: 'Unauthorized Access',
    description: 'You are not authorized to access this page.',
};


export default function Unauthorized() {
  return (
    <section className="flex items-center justify-center min-h-screen p-4 bg-white text-black ">
      <div className="w-full max-w-md mx-auto my-8 flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="text-center">
          <h2 className="mb-6 font-extrabold text-8xl sm:text-8xl md:text-9xl text-Uranium ">
            <span className="sr-only ">Error</span>401
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
            This page is not for you. You don't have access to this page.
          </p>
          <p className="mt-4 mb-8 text-base sm:text-lg">
            But don't worry, you can go back to the homepage, try to log in if
            you have an account, or create one.
          </p>
          <div className="flex flex-col sm:flex-row gap-1">
            <Link
              href="/Home"
              className="big_bttn"
            >
              Back to homepage
            </Link>
            <Link
              href="/Login"
              className="big_bttn"
            >
              Try to log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
