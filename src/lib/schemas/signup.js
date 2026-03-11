import { z } from "zod"

export const signupSchema = z.object({
    firstName: z.string().min(2, "Indtast mindst 2 tegn."),
    username: z
        .string()
        .min(3, "Brugernavn skal være mindst 3 tegn.")
        .regex(
            /^[a-zA-Z0-9._-]+$/,
            "Brug kun bogstaver, tal, punktum, _ eller -.",
        ),
    password: z.string().min(4, "Adgangskode skal være mindst 4 tegn."),
    confirmPassword: z.string().min(1, "Gentag adgangskoden."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Adgangskoderne matcher ikke.",
    path: ["confirmPassword"],
});
