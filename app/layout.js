import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/atoms/PageLoader/PageLoader";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abia State Xelix PMMEP",
  description: "Abia StateXelix Project Management Monitoring and Evaluation Platform",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <ThemeProvider>
          <PageLoader />
          {children}
        </ThemeProvider>
        
      </body>
    </html>
  )
}
