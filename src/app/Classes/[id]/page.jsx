import Link from "next/link";
import JoinLeaveButton from "@/Components/classes/JoinLeaveButton";
import { getClassById, getTrainerById } from "@/lib/dal/Classes";
import { getCurrentUser } from "@/lib/dal/user";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";


export const metadata = {
    title: "Class details",
    description: "class details page for Believe Fitness.",
};
export default async function ClassDetailPage({ params }) {
  const { id } = await params;

const { success, data: classItem } = await getClassById(id);
if (!success || !classItem) notFound();

const trainerResult = await getTrainerById(classItem.trainerId);
const userResult = await getCurrentUser();

const trainer = trainerResult.data;
const user = userResult.user;
const isInstructor = user?.role === "admin" || user?.role === "instructor";
const isJoined = classItem.users?.some((p) => p.id == user?.id) ?? false;


    

    return (
        <>
 
      <section className="relative w-full h-108 overflow-hidden bg-gray-200">
        <Image
          src={classItem.asset?.url || "/img/welcome.jpg"}
          alt={classItem.className}
          className="w-full h-full object-cover"
          width={1200}
          height={300}
          unoptimized
          blurDataURL="data:"
           placeholder="blur" 

        />
       
            <Link href="/Home" className="absolute top-4 left-4 text-white z-10">
                <IoArrowBack size={24} />
            </Link>
        <div className="absolute bottom-0 left-0 right-0 px-4 py-6 bg-linear-to-t from-black to-transparent">
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
        <div className="coach_container w-59.75 h-22 gap-5 ">
       
        <Image
        src={trainer?.asset?.url || "/trainer-placeholder.png"}
        alt={trainer?.trainerName || "Trainer"}
        width={80}
        height={80}
        unoptimized
          />
   <p className="font-semibold text-base">
           {trainer?.trainerName || "Unknown Trainer"}
          </p>
        </div>
         {/* Medlem: knap Tilmeld / Leave */}
        {user && !isInstructor && (
          <JoinLeaveButton classId={id} isJoined={isJoined} />
        )}
        {/* <button className="big_bttn mt-5">sign up</button> */}
      </section>
      </>
  );
}
