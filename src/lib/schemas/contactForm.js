import { z } from "zod";
export const ContactFormSchema = z.object({
    name: z.string().min(1, "Indtast dit navn."),
    email: z.email("Indtast en gyldig email adresse."),
    message: z.string().min(10, "Beskeden skal være mindst 10 tegn."),
});