"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/dal/user";

const createClassSchema = z.object({
  className: z.string().min(2, "Please enter a class name."),
  classDescription: z
    .string()
    .min(5, "Please enter a longer description.")
    .max(500, "Description is too long."),
  classDay: z.string().min(2, "Please enter a day."),
  classTime: z.string().min(2, "Please enter a time.").regex(
        /^([01]\d|2[0-3]):[0-5]\d$/,
            "Time must be in HH:mm format.",
        ),
  trainerName: z.string().optional(),
  maxParticipants: z
    .string()
    .min(1, "Please enter max participants."),
    
});

export async function createClass(prevState, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("fitness-accessToken")?.value;

  const userResult = await getCurrentUser();
  const user = userResult.success ? userResult.user : null;

  if (!token || !user || (user.role !== "admin" && user.role !== "instructor")) {
    return {
      values: {},
      errors: { form: ["You must be an instructor to create classes."] },
    };
  }

  const values = {
    className: formData.get("className")?.toString() || "",
    classDescription: formData.get("classDescription")?.toString() || "",
    classDay: formData.get("classDay")?.toString() || "",
    classTime: formData.get("classTime")?.toString() || "",
    trainerName: formData.get("trainerName")?.toString() || "",
    maxParticipants: formData.get("maxParticipants")?.toString() || "",
  };

  const imageFile = formData.get("image");

  const result = createClassSchema.safeParse(values);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      values,
      errors: fieldErrors,
    };
  }

  let assetId = undefined;

  // If an image file is provided
  if (imageFile && typeof imageFile === "object") {
    try {
      const assetForm = new FormData();
      assetForm.append("file", imageFile);

      const assetRes = await fetch("http://localhost:4000/api/v1/assets", {
        method: "POST",
        body: assetForm,
      });

      if (assetRes.ok) {
        const assetData = await assetRes.json();
        assetId = assetData.id ?? assetData.assetId;
      }
    } catch (err) {
      console.log("Image upload failed:", err);
    }
  }

  try {
    const classRes = await fetch("http://localhost:4000/api/v1/classes", {
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
        trainerId: user.id,
        assetId: assetId ?? 1,
      }),
    });

    if (!classRes.ok) {
      return {
        values,
        errors: { form: ["Could not create class. Please try again."] },
      };
    }
  } catch (error) {
    console.log("createClass error:", error);
    return {
      values,
      errors: { form: ["Something went wrong. Please try again."] },
    };
  }

  redirect("/Profile");
}

