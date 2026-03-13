"use client";

import { useRef, useState } from "react";
import { joinClassAction, leaveClassAction } from "./classActions";

export default function JoinLeaveButton({ classId, isJoined }) {
    const [isPending, setIsPending] = useState(false);
    const [joined, setJoined] = useState(isJoined);
    const dialogRef = useRef(null);

    const openDialog = () => dialogRef.current?.showModal();
    const closeDialog = () => dialogRef.current?.close();

    const handleConfirm = async () => {
        closeDialog();
        setIsPending(true);
        const result = joined
            ? await leaveClassAction(classId)
            : await joinClassAction(classId);
        console.log("join/leave result:", result);
        setIsPending(false);
        if (result.success) {
            console.log(joined ? "User left class" : "User joined class");
            setJoined(!joined);
        }
        if (result.message) alert(result.message);
    };

    return (
        <>
            <button
                type="button"
                onClick={openDialog}
                disabled={isPending}
                className="w-full mt-8 py-4 bg-Uranium text-black font-bold text-sm rounded-full disabled:opacity-70"
            >
                {isPending ? "..." : joined ? "LEAVE" : "SIGN UP"}
            </button>

            <dialog
                ref={dialogRef}
                className="mx-auto my-auto rounded-2xl p-6 shadow-xl backdrop:bg-dustgray/55 backdrop:opacity-95"
            >
                <h2 className="text-lg font-bold text-black mb-2">
                    {joined ? "Forlad klassen?" : "Tilmeld klassen?"}
                </h2>
                <p className="text-sm text-[#9e9e9e] mb-6">
                    {joined
                        ? "are you sure you want to leave?"
                        : "are you sure you want to sign up?"}
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={closeDialog}
                        className="flex-1 py-3 rounded-full border border-[#9e9e9e] text-[#9e9e9e] font-bold text-sm"
                    >
                        Annuller
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 py-3 rounded-full bg-Uranium text-black font-bold text-sm"
                    >
                        {joined ? "leave" : "signup"}
                    </button>
                </div>
            </dialog>
        </>
    );
}