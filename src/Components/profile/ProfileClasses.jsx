"use client";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

import Link from "next/link";
import JoinLeaveButton from "@/Components/classes/JoinLeaveButton";

export default function ProfileClasses({ user, classes }) {
    const isAdmin = user.role === "admin" || user.role === "instructor";

    return (
        <section className="flex flex-col gap-4">
            {classes.length === 0 && (
                <p className="text-[#9e9e9e] text-sm">
                    {isAdmin ? "There are no classes available." : "You are not signed up for any classes."}
                </p>
            )}

            {classes.map((cls) => (
                <div
                    key={cls.id}
                    className="rounded-3xl ml-3.5 border w-[370px] border-[#E0E0E0] px-5 py-4 flex flex-col gap-3 "
                >
                    <div className="flex flex-col items-start gap-2.5 px-5 pt-4 pb-5 w-full"></div>
                    <Link href={`/Classes/${cls.id}`}>
                        <h3 className="text-black text-2xl not-italic font-semibold">{cls.className}</h3>
                        <p className="text-black text-base not-italic font-normal">{cls.classDay} – {cls.classTime}</p>
                        {isAdmin && (
                            <p className="text-black text-base not-italic font-normal flex justify-evenly">
                                Max. participants: {cls.maxParticipants} &nbsp;  Joined: {cls.users?.length ?? 0}
                            </p>
                        )}
                    </Link>

                    {isAdmin && (
                        <div className="flex items-center gap-3">
                            <Link href={`/Classes/${cls.id}/participants`} className="small_bttn flex-1 text-center">
                                Participants
                            </Link>
                            <button className="w-10 h-10 rounded-full bg-Uranium flex items-center justify-center"><HiOutlinePencilAlt /></button>
                            <button className="w-10 h-10 rounded-full bg-Uranium flex items-center justify-center"><HiOutlineTrash /></button>
                        </div>
                    )}

                    {!isAdmin && (
                        <JoinLeaveButton classId={cls.id} isJoined={true} />
                    )}
                </div>
            ))}

            {isAdmin && (
                <Link href="/CreateClass" className="big_bttn mt-4 block text-center">
                    CREATE CLASS
                </Link>
            )}
        </section>
    );
}