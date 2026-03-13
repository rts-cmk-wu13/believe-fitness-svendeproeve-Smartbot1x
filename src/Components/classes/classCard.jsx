import Image from "next/image";
import Link from "next/link";

export default function ClassCard({ Class }) {
    return (
        <Link href={`/Classes/${Class.id}`} className="">
    
            <div className="relative w-32 h-36 ">
                <Image
                    src={Class.asset?.url || "/placeholder.png"}
                    alt={Class.className}
                    className="w-full h-full object-cover rounded-2xl "
                    width={128}
                    height={144}
                      unoptimized
                />
                <div className="absolute bottom-0 left-0 right-0 bg-Uranium rounded-b-2xl px-3 py-2">
                    <h3 className="heading_classnames">{Class.className}</h3>
                </div>
            </div>
        </Link>
    );
}