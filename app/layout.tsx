import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import TopWrapper from "./components/top-wrapper";
import NavBar from "./components/navbar";
import { Toaster } from "react-hot-toast";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FREEBIRD - Site officiel",
  description: "Une companie aérienne algérienne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <NavBar />
        <TopWrapper />
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
