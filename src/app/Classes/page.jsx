import PopularClass from "@/Components/classes/popular";
import ClassCard from "@/Components/classes/classCard";
import { getAllClasses } from "@/lib/dal/Classes";

export default async function ClassesPage() {
    const { data } = await getAllClasses();



    const [popular, ...rest] = data;

    return (
       <>
            <h1 className="heading_popular mt-5 ml-2">Popular class</h1>
            <PopularClass Class={popular} />
 

            <h2 className="heading_classes ml-5 mb-3.25 ">Classes For You</h2>
            <section className="flex ml-5 gap-4 overflow-hidden">
                   <div className="overlay_content absolute bottom-0 "></div>
                {rest.map((classItem) => (
                    <ClassCard Class={classItem} key={classItem.id} />
                ))}
            </section>
       </>
    );
}