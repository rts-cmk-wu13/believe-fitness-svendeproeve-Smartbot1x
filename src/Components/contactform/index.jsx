"use client";
import { useActionState } from "react";
import { contactForm } from "./action";

const initialState = {
  success: false,
  message: "",
  values: {},
  errors: undefined,
};

export default function ContactLanding() {
  const [state, formAction, isPending] = useActionState(
    contactForm,
    initialState,
  );

  return (
    <>
        <h2 className="text-[24px] text-base leading-[120%] font-bold mx-2.5 my-4 ">Contact us</h2>
        <p className="text-black  text-[16px] text-base font-normal leading-[160%] mx-2.5 my-4 ">
          Ask us anything about Believe Fitness!
        </p>
      <form action={formAction} className="form_container">

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          defaultValue={state.success ? "" : state.values?.name || ""}
          className="base_input"
        />
        {state.errors?.name && (
          <p className="error_message">{state.errors.name[0]}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          defaultValue={state.success ? "" : state.values?.email || ""}
          className="base_input"
        />
        {state.errors?.email && (
          <p className="error_message">{state.errors.email[0]}</p>
        )}

        <textarea
          name="message"
          placeholder="Enter your message"
          rows={4}
          defaultValue={state.success ? "" : state.values?.message || ""}
          className="textarea_input "
        />
        {state.errors?.message && (
          <p className="error_message">{state.errors.message[0]}</p>
        )}

        {state.message && (
          <p
            className={`text-sm ${state.success ? "text-green-600" : "text-red-400"}`}
          >
            {state.message}
          </p>
        )}

        <button 
        className="big_bttn "
        type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send message"}
        </button>
      </form>

      <section className="overflow-hidden">
      <hr className=" text-black w-10 h-0.5 mx-auto my-8 " />
        <h2 className="text-Uranium text-center text-[32px] font-bold leading-14">
          Believe Fitness
        </h2>
        <p className="text-black text-center text-lg font-bold leading-6">
          Train like a pro
        </p>
        <address className="text-black text-center text-base font-normal leading-[160%] not-italic">
          Rabalderstræde 48 · 4000 Roskilde
          <br />
          hello@believe-fitness.com
        </address>
      </section>
    </>
  );
}
