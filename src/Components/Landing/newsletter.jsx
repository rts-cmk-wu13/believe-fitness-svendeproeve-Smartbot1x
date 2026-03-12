"use client";

import { useActionState, useEffect } from "react";
import { subscribeNewsletter } from "@/lib/dal/newsletter";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [state, formAction, isPending] = useActionState(
    subscribeNewsletter,
    {},
  );
    
    useEffect(() => {
      if (state.success && state.message) {
        toast.success(state.message);
      }
    }, [state.success]);

  return (
    <>
      <h1 className="text-[24px] text-base leading-[120%] font-bold mx-2.5 my-4 ">Sign up for our newsletter</h1>
      <p className="text-black  text-base font-normal leading-[160%] mx-2.5 my-4 ">
        Sign up to receive the latest news and announcements from Believe
        Fitness{" "}
      </p>
    <section className="w-92.5  flex-center ">

      <form action={formAction} className="newsletter_form flex gap-3 my-4">
        <input
          type="email"
          name="email"
          placeholder="Enter your email..."
          className="newsletter_input
          "
        />
        <button
          type="submit"
          disabled={isPending}
          className="small_bttn"
        >
          {isPending ? "signingup" : "signup"}
        </button>
      </form>

      {state.message && (
        <p
          className={`mt-3 text-sm ${state.success ? "text-green-400" : "error_message"}`}
        >
          {state.message}
        </p>
      )}
    </section>
    </>
  );
  
}
