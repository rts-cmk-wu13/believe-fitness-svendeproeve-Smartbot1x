import { cookies } from "next/headers";
import ContactLanding from "@/Components/contactform";
import Hero from "@/Components/Landing/Hero";
import NewsList from "@/Components/Landing/News";
import Newsletter from "@/Components/Landing/newsletter";
import TestimonialSlider from "@/Components/Landing/testimonials";

export const metadata = {
    title: "Landing page",
    description: "Velkommen til vores landing page",
};

export default async function Home() {
    const cookieStore = await cookies();
    const isLoggedIn = !!cookieStore.get("fitness-accessToken");

    return (
        <>
            <Hero isLoggedIn={isLoggedIn} />
            <NewsList />
             <hr className=" text-black w-10 h-0.5 mx-auto " />
            <Newsletter />
            <TestimonialSlider />
            <ContactLanding />
        </>
    );
}
