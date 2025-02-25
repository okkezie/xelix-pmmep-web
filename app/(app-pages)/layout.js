import { Outfit } from "next/font/google"
import "@/app//globals.css"
import PageLoader from "@/components/atoms/PageLoader/PageLoader"
import { ThemeProvider } from "@/contexts/ThemeContext"
import MainPageLayout from "@/components/templates/MainPageLayout/MainPageLayout"

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abia State Xelix PMMEP",
  description: "Abia StateXelix Project Management Monitoring and Evaluation Platform",
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <ThemeProvider>
          <PageLoader />
          <MainPageLayout>
            {children}
          </MainPageLayout>
        </ThemeProvider>
        
      </body>
    </html>
  )
}
