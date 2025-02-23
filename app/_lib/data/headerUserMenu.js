import Profile from "@/svgs/profile";
import Settings from "@/svgs/sidebar-icons/settings";
import Support from "@/svgs/support";   

const headerUserMenu = [
    {
        id: 1,
        name: "Profile",
        href: "/profile",
        svg: <Profile />
    },
    {
        id: 2,
        name: "Account",
        href: "/account",
        svg: <Settings />
    },
    {
        id: 3,
        name: "Support",
        href: "/support",
        svg: <Support />
    }
]

export default headerUserMenu;
