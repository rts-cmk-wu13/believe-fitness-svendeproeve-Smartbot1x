import Link from "next/link";

export default function PopularClass({ Class }) {
    return (
        <Link href={`/Classes/${Class.id}`}>
            <div className="relative w-92.5 h-101.5 mx-auto my-14">
                <img
                    src={Class.asset?.url || "/placeholder.png"}
                    alt={Class.className}
                    className="w-full h-full object-cover rounded-2xl"
                />
                <div className="overlay_content absolute bottom-0 left-0  bg-Uranium rounded-[0px_48px_0_16px]  w-[224px] h-[72px]">
           
                    <h3 className="text-black text-[16px] font-semibold  not-italic leading-[106%] text-balance mt-3.5 ">{Class.className}</h3>
                </div>
            </div>
        </Link>
    );
}