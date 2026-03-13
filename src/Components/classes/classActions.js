"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { joinClass, leaveClass, getClassById } from "@/lib/dal/Classes";
import { getCurrentUser } from "@/lib/dal/user";

export async function joinClassAction(classId) {
    const cookieStore = await cookies();
    const token = cookieStore.get("fitness-accessToken")?.value;
    const userId = cookieStore.get("userId")?.value;

  const classResult = await getClassById(classId);
const userResult = await getCurrentUser();

const classItem = classResult.data;
const user = userResult.user;

console.log("user.classes:", JSON.stringify(user.classes, null, 2));
console.log("classItem.classDay:", classItem.classDay);

    // max participants check
    if (classItem.users?.length >= classItem.maxParticipants) {
        return { success: false, message: "this class is full" };
    }

    // same day check
    const alreadyOnSameDay = user.classes?.some(
        (enrolledClass) => enrolledClass.classDay === classItem.classDay
    );
    if (alreadyOnSameDay) {
        return { success: false, message: "you are already enrolled in a class on this day go to your profile to manage your enrollments" };
    }

    const result = await joinClass(userId, classId, token);

    if (result.success) {
        revalidatePath("/Classes");
        revalidatePath(`/Classes/${classId}`);
        revalidatePath("/Profile");
    }

    return result;
}

export async function leaveClassAction(classId) {
    const cookieStore = await cookies();
    const token = cookieStore.get("fitness-accessToken")?.value;
    const userId = cookieStore.get("userId")?.value;

    const result = await leaveClass(userId, classId, token);

    if (result.success) {
        revalidatePath("/Classes");
        revalidatePath(`/Classes/${classId}`);
        revalidatePath("/Profile");
    }

    return result;
}