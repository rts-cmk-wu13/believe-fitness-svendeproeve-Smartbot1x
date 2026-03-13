import { getAllClasses, getAllTrainers } from "@/lib/dal/Classes";
import SearchClient from "@/Components/search/SearchClient";

export const metadata = {
    title: "Search",
    description: "Søg efter klasser og trænere",
};

export default async function SearchPage() {
    const [classesResult, trainersResult] = await Promise.all([
        getAllClasses(),
        getAllTrainers(),
    ]);

    const classes = classesResult.success ? classesResult.data : [];
    const trainers = trainersResult.success ? trainersResult.data : [];

    return <SearchClient classes={classes} trainers={trainers} />;
}