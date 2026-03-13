"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const splashImages = ["/img/splash1.png", "/img/splash2.png"];

export default function SplashPage() {
  const [imageSrc, setImageSrc] = useState(splashImages[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * splashImages.length);
    setImageSrc(splashImages[randomIndex]);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <Image
        src={imageSrc}
        alt="Believe Fitness splash"
        width={410}
        height={410}
        className="object-cover"
      />

      <div className="absolute  inset-0 bg-blend-multiply bg-gradient-to-r from-white/30 to-black/50" 
    //   style={{
    //     background: "linear-gradient(180deg, #FFF 0%, rgba(0, 0, 0, 0.50) 100%)",
    // backgroundBlendMode: "multiply",
    // backgroundPosition: "50% center ",
    // backgroundSize: "cover",
    // background: "lightgray 50% / cover no-repeat",
    //   }}
       />

      <section className="absolute bottom-0 left-0 right-0  z-10 flex flex-col justify-between px-8 py-10">

        <h1 className="text-[40px] leading-tight font-extrabold text-Uranium">
          Believe
          <br />
          Fitness
        </h1>
        <span className="mt-2 text-lg font-semibold ">
          Train like a pro
        </span>
        <hr className="text-white w-7.5 h-0.5 absolute left-0 top-[48%] " />


        <div className="flex justify-center">
          <Link
            href="/Home"
            className="bg-Uranium text-black w-48 h-12 mt-18.75  rounded-[100px] text-center grid content-center  animate-fade-in-delayed "
          >
            Start training
          </Link>
        </div>
      </section>
    </div >
  );
}
