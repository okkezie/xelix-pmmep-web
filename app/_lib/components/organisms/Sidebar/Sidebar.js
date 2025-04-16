import SideBarLogo from "@/components/molecules/Sidebar/SidebarLogo/SidebarLogo"
import links from '@/data/sidebar'
import SidebarLink from "@/components/molecules/Sidebar/SidebarLink/SidebarLink"
import clsx from "clsx"
import { useAuthContext } from "@/contexts/AuthContext"
import { Constants } from "@/utils/Constants"

export default function SideNavBar({ sidebarToggle }) {
    const { userType } = useAuthContext()

    const showMenuItem = (menuItem) => {
        if (menuItem?.hide?.includes(userType)) {
            return false
        }
        return menuItem?.show?.includes(Constants.UserTypes.ALL) || menuItem?.show?.includes(userType) ;
    }

    return (
        <aside
            className={clsx(
                "sidebar fixed left-0 top-0 z-[100] flex h-screen w-[290px] flex-col overflow-y-hidden border-r border-gray-200 bg-white px-5 dark:border-gray-800 dark:bg-gray-900 lg:static lg:translate-x-0",
                sidebarToggle ? "translate-x-0 lg:w-[90px]" : "-translate-x-full"
            )}
        >
            <SideBarLogo toggled={sidebarToggle} />

            <div className="flex flex-col duration-300 ease-linear overflow-hidden hover:overflow-y-auto no-scrollbar">
                <nav>
                    { links.map( section => (
                        ((section.links.length > 0) && showMenuItem(section)) && (
                        <div key={section.title}>
                            <h3 className="mb-4 text-xs uppercase leading-[20px] text-gray-400">
                                <span className={clsx(
                                    "menu-group-title",
                                    sidebarToggle && "lg:hidden"
                                )}>
                                    {section.title}
                                </span>

                                <svg className={clsx(
                                    "mx-auto fill-current menu-group-icon",
                                    sidebarToggle ? 'lg:block hidden' : 'hidden'
                                )}
                                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z"
                                        fill="" />
                                </svg>
                            </h3>
                            <ul className="flex flex-col gap-4 mb-6">
                                { section.links.map( link => 
                                    showMenuItem(link) && <SidebarLink link={link} key={link.title} sidebarToggle={sidebarToggle} />
                                )}
                            </ul> 
                        </div>
                    )
                    ))}
                </nav>
            </div>
        </aside>
    )
}
