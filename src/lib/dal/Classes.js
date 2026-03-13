
/** classes  */
export async function getAllClasses() {
    try {
        const res = await fetch("http://localhost:4000/api/v1/classes", {
            cache: "no-store",
        });

        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) throw new Error("Response is not JSON");

        const data = await res.json();
        console.log(data, "data for classes");

        return { success: true, data };
    } catch (error) {
        console.log("getAllClasses error:", error);
        return { success: false, data: [] };
    }
}
/** classByID  */
export async function getClassById(id) {
    try {
        if (!id) {
            throw new Error({ message: "id is required" })
        }
        if (Number.isNaN(Number(id))) {
            throw new Error("id is not number");
        }

        const res = await fetch(`http://localhost:4000/api/v1/classes/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) throw new Error("Response is not JSON");

        const data = await res.json();
        console.log(data);

        return { success: true, data };
    } catch (error) {
        console.log("getClassById error:", error);
        return { success: false, data: null };
    }

}



export async function getTrainerById(id) {
    try {
        const res = await fetch(`http://localhost:4000/api/v1/trainers/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) throw new Error("Response is not JSON");
        const data = await res.json();
        console.log(data,"trainers");
        
        return { success: true, data };
    } catch (error) {
        console.log("getTrainerById error:", error);
        return { success: false, data: null };
    }
}
export async function getAllTrainers() {
    try {
        const res = await fetch("http://localhost:4000/api/v1/trainers", {
            cache: "no-store",
        });
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
        const data = await res.json();
        console.log("trainers:", JSON.stringify(data, null, 2));
        return { success: true, data };
    } catch (error) {
        console.log("getAllTrainers error:", error);
        return { success: false, data: [] };
    }
}
export async function joinClass(userId, classId, token) {
    try {
        const res = await fetch(
            `http://localhost:4000/api/v1/users/${userId}/classes/${classId}`,
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
        return { success: true };
    } catch (error) {
        console.log("joinClass error:", error);
        return { success: false, message: "something went wrong on the server, please try again later." };
    }
}

export async function leaveClass(userId, classId, token) {
    try {
        const res = await fetch(
            `http://localhost:4000/api/v1/users/${userId}/classes/${classId}`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
        return { success: true };
    } catch (error) {
        console.log("leaveClass error:", error);
        return { success: false, message: "something went wrong on the server, please try again later." };
    }
}