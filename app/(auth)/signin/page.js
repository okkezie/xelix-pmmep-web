'use client'
import SideNavBar from "@/app/_lib/components/organisms/Sidebar/Sidebar"
import Header from "@/components/organisms/Header/Header"
export default function HomePage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavBar />
      <Header />
    </div>
  )
}
