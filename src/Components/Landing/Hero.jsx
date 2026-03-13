import Image from "next/image";
import Link from "next/link";

export default function Hero({ isLoggedIn }) {
  return (
    <section className=" flex space-y-2.5">
      <div className=" relative w-102.5 h-81 hero_img">
        <p className="hero_text absolute top-1/2 left-6  text-Uranium ">
          Welcome to <br /> Belive Fitness
        </p>

        <Link
          type="button"
          href="/Classes"
          className="absolute top-3/4 left-6 bg-Uranium text-Black w-28.25 h-12 rounded-3xl transition duration-300 flex items-center justify-center uppercase"
        >
          classes
        </Link>
      {!isLoggedIn && (
    <Link
        href="/Login"
        className="absolute top-3/4 left-6 bg-Uranium text-Black w-24.5 h-12 rounded-3xl transition duration-300 translate-x-30 flex items-center justify-center uppercase"
    >
        login
    </Link>
)}
      </div>
    </section>
  );
}
