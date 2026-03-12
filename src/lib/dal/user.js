"use server";

import { cookies } from "next/headers";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("fitness-accessToken")?.value;
    const userId = cookieStore.get("userId")?.value;

    if (!token || !userId) {
        return { success: false, user: null };
    }

    try {
        const res = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return { success: false, user: null };
        }

        const user = await res.json();
        return { success: true, user };
    } catch (error) {
        console.log("getCurrentUser error:", error);
        return { success: false, user: null };
    }
}

