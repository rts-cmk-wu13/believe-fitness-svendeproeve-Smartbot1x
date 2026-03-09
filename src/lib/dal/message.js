export async function sendMessage(values) {
    try {
        const res = await fetch("http://localhost:4000/api/v1/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);

        return { success: true };
    } catch (error) {
        console.log("sendMessage error:", error);
        return { success: false };
    }
}