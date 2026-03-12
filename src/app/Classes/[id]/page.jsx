
import { getClassById, getTrainerById } from "@/lib/dal/Classes";
import { getCurrentUser } from "@/lib/dal/user";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Class details",
    description: "Detaljer for en class",
};

export default async function ClassDetailPage({ params }) {
    const { id } = await params;

    const { success, data: classItem } = await getClassById(id);
    if (!success || !classItem) notFound();

    const [trainerResult] = await Promise.all([
        getTrainerById(classItem.trainerId),
        getCurrentUser(),
    ]);

    classItem.trainer = trainerResult?.data;
    console.log(classItem.trainer);
    

    return (
        <>
    
      <section className="relative w-full h-[300px] overflow-hidden bg-gray-200">
        <img
          src={classItem.asset?.url || "/img/welcome.jpg"}
          alt={classItem.className}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-6 bg-gradient-to-t from-black to-transparent">
          <h1 className="text-Uranium text-4xl font-bold leading-tight">
            {classItem.className}
          </h1>
          <div className="flex items-center justify-between mt-4">
                        <p className="text-white font-semibold">rate</p>
                        <button className="px-6 py-2 rounded-full border border-Uranium text-Uranium font-bold text-sm hover:bg-Uranium hover:text-black transition">
                            RATE
                        </button>
                    </div>

        </div>
      </section>
      <section className="px-4 py-6">
        <p className="text-black text-base not-italic font-medium leading-4mb-4">
          {classItem.classDay} – {classItem.classTime}
        </p>
        <p className="text-black text-base not-italic font-normal leading-6.25">
          {classItem.classDescription}
        </p>

        <h2 className="text-black font-bold text-lg mt-6 mb-3">Trainer</h2>
        <div className="flex items-center w-59.75 h-22 gap-5 ">
          <img
            src={
              classItem.trainer?.asset?.url || "/trainer-placeholder.png"
            }
            alt={classItem.trainer?.trainerName || "Trainer"}
            className="w-22 h-22 rounded-2xl  object-cover"
          />
          <p className="font-semibold text-base">
            {classItem.trainer?.trainerName || "Unknown Trainer"}
          </p>
        </div>
        <button className="big_bttn mt-5">sign up</button>
      </section>
      </>
  );
}
