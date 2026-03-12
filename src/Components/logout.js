"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete("fitness-accessToken");
    cookieStore.delete("userId");
    redirect("/Login");
}