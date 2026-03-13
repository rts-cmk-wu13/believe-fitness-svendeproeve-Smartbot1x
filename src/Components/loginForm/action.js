"use server"
import { z } from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginSchema } from "@/lib/schemas/login"


export async function loginUser(prevState, formData) {
    const cookieStore = await cookies();
    const email = formData.get("email");
    const password = formData.get("password");

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {

        return {
            values: { email, password },
            errors: z.flattenError(result.error).fieldErrors,

        };
    }


    const response = await fetch("http://localhost:4000/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
    });

    if (!response.ok) {
        return {
            values: { email, password },
            errors: { form: ["Forkert email eller adgangskode."] },
        };
    }

    const data = await response.json();
    // token and userId are stored in cookies, token has a max age of 7 days
    cookieStore.set("fitness-accessToken", data.token, { maxAge: 60 * 60 * 24 * 7 });
    cookieStore.set("userId", data.userId);

    redirect("/Profile");
}