"use server";

import { z } from "zod";
import { newsletterSchema } from "../schemas/newsletter";

export async function subscribeNewsletter(prevState, formData) {
    const email = formData.get("email");

    const result = newsletterSchema.safeParse({ email });

    if (!result.success) {
        console.log("Newsletter validation fejl:", z.flattenError(result.error).fieldErrors);
        return {
            success: false,
            message: z.flattenError(result.error).fieldErrors.email?.[0] || "Ugyldig email.",
        };
    }

    try {
        const res = await fetch("http://localhost:4000/api/v1/newsletter"
            , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

        if (!res.ok) {
            throw new Error("Something went wrong");
        }

        console.log("Newsletter tilmeldt:", email);
        return {
            success: true,
            message: "You are now subscribed to the newsletter!",
        };
    } catch (error) {
        console.log("subscribeNewsletter error:", error);
        return {
            success: false,
            message: "something went wrong server, please try again later  .",
        };
    }
}
