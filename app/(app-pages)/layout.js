import { Outfit, Inter } from "next/font/google"
import "@/app/globals.css"
import PageLoader from "@/components/atoms/PageLoader/PageLoader"
import { ThemeProvider } from "@/contexts/ThemeContext"
import MainPageLayout from "@/components/templates/MainPageLayout/MainPageLayout"
import { AuthProvider } from "@/contexts/AuthContext"
import { ToastContainer } from 'react-toastify';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'

const outfit = Outfit({subsets: ["latin"] });
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Abia State Xelix PMMEP",
  description: "Abia StateXelix Project Management Monitoring and Evaluation Platform",
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${outfit.className} ${inter.className} dark:bg-gray-900`}>
        <ThemeProvider> 
          <AuthProvider>
            <PageLoader />
            <MainPageLayout>
              { children }
              <ToastContainer />
            </MainPageLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
