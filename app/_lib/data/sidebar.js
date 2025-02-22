import Home from "@/public/svgs/sidebar-icons/home"
import Projects from "@/public/svgs/sidebar-icons/projects"
import Initiatives from "@/public/svgs/sidebar-icons/initiatives"
import Roadmaps from "@/public/svgs/sidebar-icons/roadmaps"
import Tasks from "@/public/svgs/sidebar-icons/tasks"
import Reports from "@/public/svgs/sidebar-icons/reports"
import Files from "@/public/svgs/sidebar-icons/files"
import Forms from "@/public/svgs/sidebar-icons/forms"
import Engagements from "@/public/svgs/sidebar-icons/engagements"
import Staff from "@/public/svgs/sidebar-icons/staff"

const sidebar = [
    {
        title: "MENU",
        links: [
            {
                title: "Home",
                icon: (path) => <Home isActive={path === "/"} />,
                href: "/",
            },
            {
                title: "Projects",
                icon: (path) => <Projects isActive={path === "/projects"} />,
                href: "/projects",
            },
            {
                title: "Initiatives",
                icon: (path) => <Initiatives isActive={path === "/initiatives"} />,
                href: "/initiatives",
            },
            {
                title: "Roadmaps",
                icon: (path) => <Roadmaps isActive={path === "/roadmaps"} />,
                href: "/roadmaps",
            },
            {
                title: "Tasks",
                icon: (path) => <Tasks isActive={path === "/tasks"} />,
                href: "/tasks",
            },
            {
                title: "Reports",
                icon: (path) => <Reports isActive={path === "/reports"} />,
                href: "/reports",
            },
            {
                title: "Files",
                icon: (path) => <Files isActive={path === "/files"} />,
                href: "/files",
            },
            {
                title: "Forms",
                icon: (path) => <Forms isActive={path === "/forms"} />,
                href: "/forms",
            },
            {
                title: "Engagements",
                icon: (path) => <Engagements isActive={path === "/engagements"} />,
                href: "/engagements",
            },
            {
                title: "Staff",
                icon: (path) => <Staff isActive={path === "/staff"} />,
                href: "/staff",
            },
        ]
    },
    {
        title: "Personal",
        links: [

        ]
    }
]

export default sidebar;
