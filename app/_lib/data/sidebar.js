import Home from "@/svgs/sidebar-icons/home"
import Projects from "@/svgs/sidebar-icons/projects"
import Initiatives from "@/svgs/sidebar-icons/initiatives"
import Roadmaps from "@/svgs/sidebar-icons/roadmaps"
import Files from "@/svgs/sidebar-icons/files"
import Forms from "@/svgs/sidebar-icons/forms"
import Engagements from "@/svgs/sidebar-icons/engagements"
import Staff from "@/svgs/sidebar-icons/staff"
import Roles from "@/svgs/sidebar-icons/role"
import MDAs from "@/svgs/sidebar-icons/mdas"
import Users from "@/svgs/sidebar-icons/users"
import Contractors from '@/svgs/sidebar-icons/contractors'
import { Constants } from "@/utils/Constants"
import Analytics from "@/svgs/sidebar-icons/analytics"
import Reports from "@/svgs/sidebar-icons/reports"
import AiChat from "@/svgs/sidebar-icons/aichat"

const sidebar = [
    {
        title: "MENU",
        show: [Constants.UserTypes.ALL],
        links: [
            {
                title: "Dashboard",
                icon: (path) => <Home isActive={path === Constants.Paths.Dashboard} />,
                href: Constants.Paths.Dashboard,
                show: [Constants.UserTypes.ALL]
            },
            {
                title: "Projects",
                icon: (path) => <Projects isActive={path === Constants.Paths.Projects} />,
                href: Constants.Paths.Projects,
                show: [Constants.UserTypes.ALL]
            },
            {
                title: "Initiatives",
                icon: (path) => <Initiatives isActive={path === Constants.Paths.Initiatives} />,
                href: Constants.Paths.Initiatives,
                show: [Constants.UserTypes.ALL],
                hide: [Constants.UserTypes.CONTRACTOR_ADMIN, Constants.UserTypes.CONTRACTOR_USER]
            },
            {
                title: "Roadmaps",
                icon: (path) => <Roadmaps isActive={path === Constants.Paths.Roadmaps} />,
                href: Constants.Paths.Roadmaps,
                show: [Constants.UserTypes.ALL],
                hide: [Constants.UserTypes.CONTRACTOR_ADMIN, Constants.UserTypes.CONTRACTOR_USER]
            },
            {
                title: "Analytics",
                icon: (path) => <Analytics isActive={path === Constants.Paths.Analytics} />,
                href: Constants.Paths.Analytics,
                show: [Constants.UserTypes.ALL],
                hide: [Constants.UserTypes.CONTRACTOR_ADMIN, Constants.UserTypes.CONTRACTOR_USER]
            },
            {
                title: "Reports",
                icon: (path) => <Reports isActive={path === Constants.Paths.Reports} />,
                href: Constants.Paths.Reports,
                show: [Constants.UserTypes.ALL],
                hide: [Constants.UserTypes.CONTRACTOR_ADMIN, Constants.UserTypes.CONTRACTOR_USER]
            },
            {
                title: "Files",
                icon: (path) => <Files isActive={path === Constants.Paths.Files} />,
                href: Constants.Paths.Files,
                show: [Constants.UserTypes.ALL],
            },
            {
                title: "Forms",
                icon: (path) => <Forms isActive={path === Constants.Paths.Forms} />,
                href: Constants.Paths.Forms,
                show: [Constants.UserTypes.ALL],
            },
            {
                title: "Engagements",
                icon: (path) => <Engagements isActive={path === Constants.Paths.Engagements} />,
                href: Constants.Paths.Engagements,
                show: [Constants.UserTypes.ALL],
                hide: [Constants.UserTypes.CONTRACTOR_ADMIN, Constants.UserTypes.CONTRACTOR_USER]
            },
            {
                title: "Staff",
                icon: (path) => <Staff isActive={path === Constants.Paths.Staff} />,
                href: Constants.Paths.Staff,
                show: [Constants.UserTypes.MDA_ADMIN, Constants.UserTypes.PROJECT_ADMIN, Constants.UserTypes.PROJECT_USER],
            },
            {
                title: "Ai Chat",
                icon: (path) => <AiChat isActive={path === Constants.Paths.AiChat} />,
                href: Constants.Paths.AiChat,
                show: [Constants.UserTypes.ALL],
            },
        ]
    },
    {
        title: "Admin",
        show: [Constants.UserTypes.MDA_ADMIN, Constants.UserTypes.PROJECT_ADMIN, Constants.UserTypes.PROJECT_USER],
        links: [
            {
                title: "Users",
                icon: (path) => <Users isActive={path === Constants.Paths.Users} />,
                href: Constants.Paths.Users,
                show: [Constants.UserTypes.MDA_ADMIN, Constants.UserTypes.PROJECT_ADMIN, Constants.UserTypes.PROJECT_USER],
            },
            {
                title: "Roles",
                icon: (path) => <Roles isActive={path === Constants.Paths.Roles} />,
                href: Constants.Paths.Roles,
                show: [Constants.UserTypes.PROJECT_ADMIN, Constants.UserTypes.PROJECT_USER],
            },
            {
                title: "MDAs",
                icon: (path) => <MDAs isActive={path === Constants.Paths.MDAs} />,
                href: Constants.Paths.MDAs,
                show: [Constants.UserTypes.PROJECT_ADMIN, Constants.UserTypes.PROJECT_USER],
            },
            {
                title: "Contractors",
                icon: (path) => <Contractors isActive={path === Constants.Paths.Contractors} />,
                href: Constants.Paths.Contractors,
                show: [Constants.UserTypes.PROJECT_ADMIN, Constants.UserTypes.PROJECT_USER],
            }
        ]
    }
]

export default sidebar;
