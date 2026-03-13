"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

const signupSchema = z.object({
    fullName: z.string().min(2, "Indtast mindst 2 tegn."),
    username: z.string().min(3, "Brugernavn skal være mindst 3 tegn.").regex(
        /^[a-zA-Z0-9._-]+$/,
        "Brug kun bogstaver, tal, punktum, _ eller -.",
    ),
    password: z.string().min(4, "Adgangskode skal være mindst 4 tegn."),
    confirmPassword: z.string().min(1, "Gentag adgangskoden."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Adgangskoderne matcher ikke.",
    path: ["confirmPassword"],
});

export async function signupUser(_, formData) {
    const values = {
        fullName: formData.get("fullName"),
        username: formData.get("username"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    };

    const result = signupSchema.safeParse(values);

    if (!result.success) {
        const fieldErrors = z.flattenError(result.error).fieldErrors;
        return { values, errors: fieldErrors };
    }

    const nameParts = values.fullName.trim().split(" ");
    const userFirstName = nameParts[0];
    const userLastName = nameParts[1] || "";

    const response = await fetch("http://localhost:4000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userFirstName,
            userLastName,
            username: values.username,
            password: values.password,
        }),
    });

    if (!response.ok) {
        return {
            values,
            errors: { form: ["Kunne ikke oprette bruger. Prøv igen."] },
        };
    }

    redirect("/Login");
}