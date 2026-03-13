"use client";

import { FaUser } from "react-icons/fa";

export default function ProfileHeader({ user }) {
  const fullName = `${user.userFirstName ?? ""} ${user.userLastName ?? ""}`.trim() || user.username;
  const roleLabel = user.role === "admin" || user.role === "instructor" ? "Instructor" : "Member";

  return (
    <section className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 rounded-full bg-Uranium flex items-center justify-center">
        <span className="text-2xl font-bold">
          <FaUser />
        </span>
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{fullName}</h2>
        <span className="text-sm text-[#9e9e9e]">{roleLabel}</span>
      </div>
    </section>
  );
}

