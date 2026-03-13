import ProfileClasses from "@/Components/profile/ProfileClasses";
import ProfileHeader from "@/Components/profile/ProfileHeader";
import { getAllClasses } from "@/lib/dal/Classes";
import { getCurrentUser } from "@/lib/dal/user";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default async function ProfilePage() {
  const userResult = await getCurrentUser();
    const { success, user } = userResult;

    if (!success || !user) {
        return (
            <div className="flex-center min-h-[60vh] px-6 text-center">
                <p className="text-base">Du skal være logget ind for at se din profil.</p>
            </div>
        );
    }

    const isAdmin = user.role === "admin" || user.role === "instructor";

    let classes = [];

    if (isAdmin) {
        const res = await getAllClasses();
        classes = res.success ? res.data : [];
    } else {
        classes = user.classes ?? [];
    }

    return (
        <>
       
              <div className="flex items-center gap-3 px-4 pt-9 pb-2">
    <Link href="/Home" className="text-[#9E9E9E]">
        <IoArrowBack size={24} />
    </Link>
    <h1 className="text-xl font-bold">profile</h1>
</div>
            <ProfileHeader user={user} />
            <ProfileClasses user={user} classes={classes} />
       </>
    );
}