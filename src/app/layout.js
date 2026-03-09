import { Poppins } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body
        className={poppins.className}
      >
        {children}
      </body>
    </html>
  );
}
