"use client";

import { useActionState } from "react";
import { createClass } from "./createClassAction";

const initialState = { values: {}, errors: {} };

export default function CreateClassForm() {
  const [state, formAction, isPending] = useActionState(
    createClass,
    initialState
  );

  return (
    <form
      action={formAction}
      className="flex flex-col w-92.5 gap-4"
      aria-label="Create a new class"
    >
      <h1 className="text-2xl font-semibold mb-2">Create a new class</h1>

      <div>
        <input
          name="className"
          placeholder="Class name..."
          defaultValue={state.values.className || ""}
          className="base_input w-full"
        />
        {state.errors.className && (
          <p className="error_message">{state.errors.className[0]}</p>
        )}
      </div>

      <div>
        <textarea
          name="classDescription"
          placeholder="Class description..."
          defaultValue={state.values.classDescription || ""}
          className="textarea_input w-full"
        />
        {state.errors.classDescription && (
          <p className="error_message">{state.errors.classDescription[0]}</p>
        )}
      </div>

      <div className="flex gap-3">
        <input
          name="classDay"
          placeholder="Class day..."
          defaultValue={state.values.classDay || ""}
          className="base_input flex-1 w-22.25"
        />
        <input
          name="classTime"
          placeholder="Class time..."
          defaultValue={state.values.classTime || ""}
          className="base_input flex-1 "
        />
      </div>

      <div>
        <input
          name="trainerName"
          placeholder="Class trainer..."
          defaultValue={state.values.trainerName || ""}
          className="base_input w-full"
        />
      </div>

      <div>
        <input
          name="maxParticipants"
          type="number"
          min={1}
          placeholder="Max participants in class..."
          defaultValue={state.values.maxParticipants || ""}
          className="base_input w-full"
        />
        {state.errors.maxParticipants && (
          <p className="error_message">{state.errors.maxParticipants[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Choose an image (optional):</label>
        <input name="image" type="file" accept="image/*" />
        {state.errors.image && (
          <p className="error_message">{state.errors.image[0]}</p>
        )}
      </div>

      {state.errors.form && (
        <p className="error_message">{state.errors.form[0]}</p>
      )}

      <button
        type="submit"
        className="big_bttn mt-4 disabled:opacity-70"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "CREATE CLASS"}
      </button>
    </form>
  );
}

