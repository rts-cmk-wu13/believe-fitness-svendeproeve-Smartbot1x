import { getCurrentUser } from "@/lib/dal/user";
import { getAllTrainers } from "@/lib/dal/Classes";
import { redirect } from "next/navigation";
import CreateClassForm from "@/Components/createclass/CreateClassForm";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export const metadata = { title: "Create Class" };

export default async function CreateClassPage() {
    const userResult = await getCurrentUser();
    const user = userResult.user;

    if (!user || (user.role !== "admin" && user.role !== "instructor")) {
        redirect("/Profile");
    }

    const trainersResult = await getAllTrainers();
    const trainers = trainersResult.success ? trainersResult.data : [];

    return (
        <>
                        <div className="flex items-center gap-3 px-4 pt-9 pb-2">
    <Link href="/Home" className="text-[#9E9E9E]">
        <IoArrowBack size={24} />
    </Link>
    <h1 className="text-xl font-bold">Create Class</h1>
</div>
            <CreateClassForm trainers={trainers} />
            </>
      
    );
}