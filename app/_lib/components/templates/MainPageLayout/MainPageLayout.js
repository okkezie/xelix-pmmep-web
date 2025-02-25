"use client"
import SideNavBar from "@/components/organisms/Sidebar/Sidebar"
import Header from "@/components/organisms/Header/Header"
import BreadCrumb from "@/components/organisms/BreadCrumb/BreadCrumb"
import { useState } from "react"

export default function MainPageLayout({children}) {
    const [sidebarToggle, setSidebarToggle] = useState(false)

    const toggleSidebar = () => {
        setSidebarToggle(oldValue => !oldValue)
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <SideNavBar sidebarToggle={sidebarToggle} />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header sidebarToggle={sidebarToggle} toggleSideBar={toggleSidebar} />
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6">
                        <BreadCrumb />
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
