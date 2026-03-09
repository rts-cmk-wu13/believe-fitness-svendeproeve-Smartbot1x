"use server";

import { z } from "zod";
import { ContactFormSchema } from "@/lib/schemas/contactForm";
import { sendMessage } from "@/lib/dal/message";

export async function contactForm(prevState, formData) {
    const values = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    };

    const result = ContactFormSchema.safeParse(values);

    if (!result.success) {
        return {
            values,
            success: false,
            errors: z.flattenError(result.error).fieldErrors,
            message: "",
        };
    }

    const { success } = await sendMessage(values);

    return {
        values,
        success,
        errors: undefined,
        message: success
            ? "Your message has been sent successfully!"
            : "Something went wrong, please try again later.",
    };
}