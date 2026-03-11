
export async function getAllClasses() {
    try {
        const res = await fetch("http://localhost:4000/api/v1/classes", {
            cache: "no-store",
        });

        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) throw new Error("Response is not JSON");

        const data = await res.json();
        return { success: true, data };
    } catch (error) {
        console.log("getAllClasses error:", error);
        return { success: false, data: [] };
    }
}

