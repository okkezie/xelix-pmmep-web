import { Outfit } from "next/font/google"
import { ThemeProvider } from "@/contexts/ThemeContext"
import AuthPageLayout from "@/components/templates/AuthPageLayout/AuthPageLayout"
import '@/app/globals.css'

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sign In | Abia State Xelix PMMEP",
  description: "Abia StateXelix Project Management Monitoring and Evaluation Platform",
}

export default function AuthLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <ThemeProvider>
          <AuthPageLayout>
            {children}
          </AuthPageLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}