"use client";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getTestimonials } from "@/lib/dal/testimonials";

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    (async () => {
      const { success, data } = await getTestimonials();
      if (success) setTestimonials(data);
    })();
  }, []);

  if (!testimonials.length) return null;

  const activeTestimonial = testimonials[current];

  const prev = () =>
    setCurrent((index) => {
      if (index === 0) return testimonials.length - 1;
      return index - 1;
    });
  const next = () =>
    setCurrent((index) => {
      if (index === testimonials.length - 1) return 0;
      return index + 1;
    });

  return (
    <section
      aria-label="Testimonials"
      className="flex flex-col items-center w-102.5 px-5 py-8 gap-6"
      style={{
        background:
          "linear-gradient(0deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.50) 100%), url('/img/testimonial.png') lightgray 50% / cover no-repeat",
      }}
    >
      <h2 className="w-[370px] text-white text-center font-[Poppins] text-2xl font-bold leading-[100%]">
        A word from other Believers
      </h2>
      <article className="flex flex-col items-center gap-2 w-full">
        <p className="w-[370px] text-white text-center font-[Poppins] text-base font-normal leading-[160%]">
          {activeTestimonial.text}
        </p>
        <p className="w-[370px] text-white text-center font-[Poppins] text-base font-semibold leading-normal">
          {activeTestimonial.name}
        </p>
      </article>
      <div className="flex justify-center items-center gap-[11px] h-14 py-[19px] w-full">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex items-center justify-center w-[43px] h-[43px] rounded-full border border-white cursor-pointer"
        >
          <FaChevronLeft className="text-white" />
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="flex items-center justify-center w-[43px] h-[43px] rounded-full border border-white cursor-pointer"
        >
          <FaChevronRight className="text-white" />
        </button>
      </div>
    </section>
  );
}
