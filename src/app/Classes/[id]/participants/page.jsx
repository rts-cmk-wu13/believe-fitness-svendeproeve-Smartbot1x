import { getClassById } from "@/lib/dal/Classes";
import { notFound } from "next/navigation";
import Link from "next/link";

export const metadata = {
    title: "Participants",
};

export default async function ParticipantsPage({ params }) {
    const { id } = await params;

    const { success, data: classItem } = await getClassById(id);
    if (!success || !classItem) notFound();

    const participants = classItem.users ?? [];

    return (
   
          
<>


            <h1 className="text-xl font-bold mb-1">{classItem.className}</h1>
            <p className="text-sm text-[#9e9e9e] mb-6">Participants:</p>

            <div className="flex flex-col gap-3">
                {participants.length === 0 ? (
                    <p className="text-sm text-[#ff0000]">No participants yet.</p>
                ) : (
                    participants.map((participant) => {
                        const fullName = `${participant.userFirstName ?? ""} ${participant.userLastName ?? ""}`.trim() || participant.username;
                        return (
                            <div
                                key={participant.id}
                                className="rounded-full border border-[#E0E0E0] px-5 py-3 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-black">👤</span>
                                    <p className="text-sm font-medium">{fullName}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
      </>
    );
}