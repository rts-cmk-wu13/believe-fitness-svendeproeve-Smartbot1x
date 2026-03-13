export async function getNews() {
    try {
        const res = await fetch("http://localhost:4000/api/v1/news", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Server responded with status ${res.status}`);
        }

        const data = await res.json();

        console.log("News fetched:", data.length, "items");
        return {
            success: true,
            data,
        };
    } catch (error) {
        console.log("getNews error:", error);
        return {
            success: false,
            message: "Something went wrong on the server, please try again later.",
            data: [],
        };
    }
}