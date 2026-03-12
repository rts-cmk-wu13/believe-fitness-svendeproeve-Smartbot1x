import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/navbar";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";

const poppins = Poppins({
  variable: "--font-Poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});



export const metadata = {

  title: {

    template: "%s | Believe Fitness",
    default: "Believe Fitness",
  },
  description:
    "Velkommen til believe fitness, din ultimative destination for fitnessudstyr og træningstøj.",


};

export default async function RootLayout({ children }) {
  // Check if the user is logged in by looking for the access 
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("fitness-accessToken");
  return (
    <html lang="en" >
      <body
        className={poppins.className}
      >
        <header className="">
          <Navbar isLoggedIn={isLoggedIn} />
        </header>
        <main>
          {children}
          <Toaster
            position="top-center"
          />
        </main>
      </body>
    </html>
  );
}

