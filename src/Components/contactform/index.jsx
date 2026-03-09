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
      <form action={formAction} className="flex flex-col gap-4">
        <h2>Contact us</h2>
        <p>Ask us anything about Believe Fitness!</p>

        <input
          type="text"
          name="name"
          placeholder="Navn"
          defaultValue={state.success ? "" : state.values?.name || ""}
        />
        {state.errors?.name && (
          <p className="text-red-400 ">{state.errors.name[0]}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={state.success ? "" : state.values?.email || ""}
        />
        {state.errors?.email && (
          <p className="text-red-400 ">{state.errors.email[0]}</p>
        )}

        <textarea
          name="message"
          placeholder="Besked"
          rows={4}
          defaultValue={state.success ? "" : state.values?.message || ""}
        />
        {state.errors?.message && (
          <p className="text-red-400 ">{state.errors.message[0]}</p>
        )}

        {state.message && (
          <p
            className={`text-sm ${state.success ? "text-green-600" : "text-red-400"}`}
          >
            {state.message}
          </p>
        )}

        <button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send message"}
        </button>
      </form>
      <hr className=" text-black w-10 h-0.5 mx-auto " />

      <section>
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
