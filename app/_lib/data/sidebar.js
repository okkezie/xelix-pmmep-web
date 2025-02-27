import Home from "@/svgs/sidebar-icons/home"
import Projects from "@/svgs/sidebar-icons/projects"
import Initiatives from "@/svgs/sidebar-icons/initiatives"
import Roadmaps from "@/svgs/sidebar-icons/roadmaps"
import Tasks from "@/svgs/sidebar-icons/tasks"
import Reports from "@/svgs/sidebar-icons/reports"
import Files from "@/svgs/sidebar-icons/files"
import Forms from "@/svgs/sidebar-icons/forms"
import Engagements from "@/svgs/sidebar-icons/engagements"
import Staff from "@/svgs/sidebar-icons/staff"
import Roles from "@/svgs/sidebar-icons/role"
import MDAs from "@/svgs/sidebar-icons/mdas"
import Users from "@/svgs/sidebar-icons/users"
import Contractors from '@/svgs/sidebar-icons/contractors'
import { Constants } from "@/utils/Constants"

const sidebar = [
    {
        title: "MENU",
        links: [
            {
                title: "Dashboard",
                icon: (path) => <Home isActive={path === Constants.Paths.Dashboard} />,
                href: Constants.Paths.Dashboard,
            },
            {
                title: "Projects",
                icon: (path) => <Projects isActive={path === Constants.Paths.Projects} />,
                href: Constants.Paths.Projects,
            },
            {
                title: "Initiatives",
                icon: (path) => <Initiatives isActive={path === Constants.Paths.Initiatives} />,
                href: Constants.Paths.Initiatives,
            },
            {
                title: "Roadmaps",
                icon: (path) => <Roadmaps isActive={path === Constants.Paths.Roadmaps} />,
                href: Constants.Paths.Roadmaps,
            },
            {
                title: "Tasks",
                icon: (path) => <Tasks isActive={path === Constants.Paths.Tasks} />,
                href: Constants.Paths.Tasks,
            },
            {
                title: "Reports",
                icon: (path) => <Reports isActive={path === Constants.Paths.Reports} />,
                href: Constants.Paths.Reports,
            },
            {
                title: "Files",
                icon: (path) => <Files isActive={path === Constants.Paths.Files} />,
                href: Constants.Paths.Files,
            },
            {
                title: "Forms",
                icon: (path) => <Forms isActive={path === Constants.Paths.Forms} />,
                href: Constants.Paths.Forms,
            },
            {
                title: "Engagements",
                icon: (path) => <Engagements isActive={path === Constants.Paths.Engagements} />,
                href: Constants.Paths.Engagements,
            },
            {
                title: "Staff",
                icon: (path) => <Staff isActive={path === Constants.Paths.Staff} />,
                href: Constants.Paths.Staff,
            },
        ]
    },
    {
        title: "Admin",
        links: [
            {
                title: "Users",
                icon: (path) => <Users isActive={path === Constants.Paths.Users} />,
                href: Constants.Paths.Users,
            },
            {
                title: "Roles",
                icon: (path) => <Roles isActive={path === Constants.Paths.Roles} />,
                href: Constants.Paths.Roles,
            },
            {
                title: "MDAs",
                icon: (path) => <MDAs isActive={path === Constants.Paths.MDAs} />,
                href: Constants.Paths.MDAs,
            },
            {
                title: "Contractors",
                icon: (path) => <Contractors isActive={path === Constants.Paths.Contractors} />,
                href: Constants.Paths.Contractors,
            }
        ]
    }
]

export default sidebar;
