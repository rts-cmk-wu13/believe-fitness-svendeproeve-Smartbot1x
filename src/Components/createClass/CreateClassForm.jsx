"use client";

import { useActionState } from "react";
import { createClassAction } from "@/app/CreateClass/action";

const initialState = { values: {}, errors: {} };
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function CreateClassForm({ trainers }) {
    const [state, formAction, isPending] = useActionState(createClassAction, initialState);

    return (
        <form action={formAction} className="flex flex-col w-92.5 gap-4" >
            <input
                name="className"
                placeholder="Class name..."
                defaultValue={state.values?.className || ""}
                className="base_input"
            />
            {state.errors?.className && <p className="error_message">{state.errors.className[0]}</p>}

            <textarea
                name="classDescription"
                placeholder="Class description..."
                defaultValue={state.values?.classDescription || ""}
                className="textarea_input"
                rows={4}
            />
            {state.errors?.classDescription && <p className="error_message">{state.errors.classDescription[0]}</p>}

            <div className="flex gap-3">
                <select name="classDay" defaultValue={state.values?.classDay || ""} className="base_input flex-1">
                    <option value="">Class day...</option>
                    {days.map((day) => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>

                <input
                    name="classTime"
                    placeholder="Class time..."
                    defaultValue={state.values?.classTime || ""}
                    className="base_input flex-1"
                />
            </div>
            {state.errors?.classDay && <p className="error_message">{state.errors.classDay[0]}</p>}
            {state.errors?.classTime && <p className="error_message">{state.errors.classTime[0]}</p>}

            <select name="trainerId" defaultValue={state.values?.trainerId || ""} className="base_input">
                <option value="">Class trainer...</option>
                {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>{trainer.trainerName}</option>
                ))}
            </select>
            {state.errors?.trainerId && <p className="error_message">{state.errors.trainerId[0]}</p>}

            <input
                name="maxParticipants"
                type="number"
                placeholder="Max participants in class..."
                defaultValue={state.values?.maxParticipants || ""}
                className="base_input"
            />
            {state.errors?.maxParticipants && <p className="error_message">{state.errors.maxParticipants[0]}</p>}

            <div>
                <label className="text-sm font-medium mb-1 block">Choose an image:</label>
                <input name="image" type="file" accept="image/*" className="base_input" />
            </div>
            {state.errors?.image && <p className="error_message">{state.errors.image[0]}</p>}

            {state.errors?.form && <p className="error_message">{state.errors.form[0]}</p>}

            <button type="submit" disabled={isPending} className="big_bttn">
                {isPending ? "Creating..." : "CREATE CLASS"}
            </button>
        </form>
    );
}