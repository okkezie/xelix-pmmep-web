'use client'
import SideNavBar from "@/components/organisms/Sidebar/Sidebar"
import Header from "@/components/organisms/Header/Header"
import { useState } from "react"
import useUserDetails from "@/hooks/useUserDetails"

export default function HomePage() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const { user } = useUserDetails()

  console.log(user)

  const toggleSidebar = () => {
    setSidebarToggle(oldValue => !oldValue);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavBar sidebarToggle={sidebarToggle} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <div className="fixed z-9 h-screen w-full bg-gray-900/50"></div>
        <Header sidebarToggle={sidebarToggle} toggleSideBar={toggleSidebar} user={user} />

        <main></main>
      </div>
    </div>
  )
}
