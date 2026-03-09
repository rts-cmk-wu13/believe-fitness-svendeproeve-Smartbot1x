export async function getTestimonials() {
    try {
        const res = await fetch("http://localhost:4000/api/v1/testimonials");

        if (!res.ok) {
            throw new Error(`Server responded with status ${res.status}`);
        }

        const data = await res.json();

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.log("getTestimonials error:", error);
        return {
            success: false,
            message: "Something went wrong on the server, try again later.",
            data: [],
        };
    }
}