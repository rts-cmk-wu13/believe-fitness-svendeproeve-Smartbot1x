import { getNews } from "@/lib/dal/news";

export default async function NewsList() {
  const { success, message, data } = await getNews();

  if (!success) {
    return (
      <section className="px-4 py-6 max-w-lg">
        <h2 className="text-[--color-Uranium] text-4xl font-black mb-6 font-[Poppins]">
          News
        </h2>
        <p className="text-red-500 text-sm">{message}</p>
      </section>
    );
  }

  return (
    <section className="px-4 py-6 max-w-lg">
      <h2 className="text-Uranium text-[56px] font-black mb-6 ">News</h2>
      {data.map((item) => (
        <article key={item.id} className="mb-10">
          <h3 className="text-black  text-2xl font-bold leading-[120%] mb-2.5   ">
            {item.title}
          </h3>
          <img
            src={item.asset.url || "/placeholder.png"}
            alt={item.title}
            className="w-full h-48 object-cover rounded mb-3"
          />
          <p className="text-black  text-base font-normal leading-[160%]">
            {item.text}
          </p>
        </article>
      ))}
    </section>
  );
}
