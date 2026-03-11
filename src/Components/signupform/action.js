"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signupSchema } from "@/lib/schemas/signup";

export async function signupUser(_, formData) {
    const cookieStore = cookies();

    const values = {
        firstName: formData.get("firstName"),
        username: formData.get("username"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    };

    const result = signupSchema.safeParse(values);

    if (!result.success) {
        return {
            values,
            errors: z.flattenError(result.error).fieldErrors,
        };

    }
    console.log(result.data.firstName);




    const response = await fetch("http://localhost:4000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userFirstName: result.data.firstName,
            /*  userLastName: result.data.lastName, */
            username: result.data.username,
            password: result.data.password,
        }),
    });

    if (!response.ok) {
        return {
            values,

        };
    }

    const data = await response.json();

    cookieStore.set("fitness-accessToken", data.token);

    redirect("/Login");
}