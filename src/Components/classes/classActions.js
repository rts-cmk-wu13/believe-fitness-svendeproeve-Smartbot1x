"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { joinClass, leaveClass } from "@/lib/dal/Classes";

export async function joinClassAction(classId) {
    const cookieStore = await cookies();
    const token = cookieStore.get("fitness-accessToken")?.value;
    const userId = cookieStore.get("userId")?.value;

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