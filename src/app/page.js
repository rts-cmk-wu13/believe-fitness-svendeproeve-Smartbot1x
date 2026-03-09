import Link from "next/link";


export default function Home() {
  return (
    <>
      <h1>Splash page!</h1>
      <Link
        className="bg-Uranium"
        href="/Home">Start training</Link>
    </>


  );
}
