import Link from "next/link";

export default function ClassCard({ Class }) {
    return (
        <Link href={`/Classes/${Class.id}`} className="">
    
            <div className="relative w-32 h-36 ">
                <img
                    src={Class.asset?.url || "/placeholder.png"}
                    alt={Class.className}
                    className="w-full h-full object-cover rounded-2xl "
                />
                <div className="absolute bottom-0 left-0 right-0 bg-Uranium rounded-b-2xl px-3 py-2">
                    <h3 className="heading_classnames">{Class.className}</h3>
                </div>
            </div>
        </Link>
    );
}