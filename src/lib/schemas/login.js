import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Indtast din email adresse."),

    password: z
        .string()
        .min(4, "Password skal være mindst 4 karakterer.")
});