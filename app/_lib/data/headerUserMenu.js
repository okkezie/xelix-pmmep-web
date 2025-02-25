import Profile from "@/svgs/profile"
import Settings from "@/svgs/sidebar-icons/settings"
import Support from "@/svgs/support"
import {Constants} from "@/utils/Constants"

const headerUserMenu = [
    {
        id: 1,
        name: "Profile",
        href: Constants.Paths.Profile,
        svg: <Profile />
    },
    {
        id: 2,
        name: "Account",
        href: Constants.Paths.Account,
        svg: <Settings />
    },
    {
        id: 3,
        name: "Support",
        href: Constants.Paths.Support,
        svg: <Support />
    }
]

export default headerUserMenu
