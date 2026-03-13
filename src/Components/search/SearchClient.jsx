"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function SearchClient({ classes, trainers }) {
    const [searchQuery, setSearchQuery] = useState("");

    const search = searchQuery.toLowerCase();

    const filteredClasses = classes.filter((classItem) =>
        classItem.className?.toLowerCase().includes(search) ||
        classItem.classDescription?.toLowerCase().includes(search) ||
        classItem.classDay?.toLowerCase().includes(search)
    );

    const filteredTrainers = trainers.filter((trainer) =>
        trainer.trainerName?.toLowerCase().includes(search)
    );

    const noResults = searchQuery && filteredClasses.length === 0 && filteredTrainers.length === 0;

    return (
        <>
    <div className="flex items-center gap-3 px-4 pt-9 pb-2">
    <Link href="/Home" className="text-[#9E9E9E]">
        <IoArrowBack size={24} />
    </Link>
    <h1 className="text-xl font-bold">Search</h1>
</div>
        <section className="px-4 py-6">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search classes"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 outline-none text-base text-black bg-transparent"
                />
            </div>

            {noResults && (
                <p className="text-center text-[#9e9e9e] text-sm mt-10">
                    Your search did not give any results. Try to search for something else.
                </p>
            )}

            {filteredClasses.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-black font-bold text-lg mb-4">Popular classes</h2>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {filteredClasses.map((classItem) => (
                            <Link
                                key={classItem.id}
                                href={`/Classes/${classItem.id}`}
                                className="flex-shrink-0 w-[140px] relative rounded-xl overflow-hidden"
                            >
                                <Image
                                    src={classItem.asset?.url || "/img/welcome.jpg"}
                                    alt={classItem.className}
                                    width={140}
                                    height={160}
                                    unoptimized
                                    className="w-full h-[160px] object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-Uranium px-2 py-1">
                                    <p className="text-black text-xs font-bold truncate">{classItem.className}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {filteredTrainers.length > 0 && (
                <section>
                    <h2 className="text-black font-bold text-lg mb-4">Popular Trainers</h2>
                    <div className="flex flex-col gap-4">
                        {filteredTrainers.map((trainer) => (
                            <div key={trainer.id} className="flex items-center gap-4">
                                <Image
                                    src={trainer.asset?.url || "/trainer-placeholder.png"}
                                    alt={trainer.trainerName}
                                    width={64}
                                    height={64}
                                    unoptimized
                                    className="w-16 h-16 rounded-2xl object-cover"
                                />
                                <p className="font-semibold text-base">{trainer.trainerName}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </section>
        </>
    );
}