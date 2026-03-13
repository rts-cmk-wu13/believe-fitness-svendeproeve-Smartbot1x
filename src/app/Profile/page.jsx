import ProfileClasses from "@/Components/profile/ProfileClasses";
import ProfileHeader from "@/Components/profile/ProfileHeader";
import { getAllClasses } from "@/lib/dal/Classes";
import { getCurrentUser } from "@/lib/dal/user";

export default async function ProfilePage() {
    const userResult = await getCurrentUser
    ();
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
       
            <h1 className="text-xl font-bold mb-4">Profil</h1>
            <ProfileHeader user={user} />
            <ProfileClasses user={user} classes={classes} />
       </>
    );
}