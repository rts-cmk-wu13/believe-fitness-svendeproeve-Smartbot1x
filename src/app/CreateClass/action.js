"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const createClassSchema = z.object({
    className: z.string().min(2, "Navn skal være mindst 2 tegn."),
    classDescription: z.string().min(5, "Beskrivelse skal være mindst 5 tegn."),
    classDay: z.string().min(1, "Vælg en ugedag."),
    classTime: z.string().min(1, "Indtast et tidspunkt."),
    trainerId: z.string().min(1, "Vælg en træner."),
    maxParticipants: z.string().min(1, "Indtast max deltagere."),
});

export async function createClassAction(_, formData) {
    const values = {
        className: formData.get("className"),
        classDescription: formData.get("classDescription"),
        classDay: formData.get("classDay"),
        classTime: formData.get("classTime"),
        trainerId: formData.get("trainerId"),
        maxParticipants: formData.get("maxParticipants"),
    };

    const result = createClassSchema.safeParse(values);
    if (!result.success) {
        return { values, errors: z.flattenError(result.error).fieldErrors };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("fitness-accessToken")?.value;

    // upload image first if provided
    const imageFile = formData.get("image");
    let assetId = null;

    if (imageFile && imageFile.size > 0) {
        const imageFormData = new FormData();
        imageFormData.append("file", imageFile);

        const assetRes = await fetch("http://localhost:4000/api/v1/assets", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: imageFormData,
        });

        if (assetRes.ok) {
            const assetData = await assetRes.json();
            assetId = assetData.id;
        }
    }

    const response = await fetch("http://localhost:4000/api/v1/classes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            className: values.className,
            classDescription: values.classDescription,
            classDay: values.classDay,
            classTime: values.classTime,
            maxParticipants: Number(values.maxParticipants),
            trainerId: Number(values.trainerId),
            ...(assetId && { assetId }),
        }),
    });

    if (!response.ok) {
        return { values, errors: { form: ["Kunne ikke oprette klasse. Prøv igen."] } };
    }

    redirect("/Profile");
}