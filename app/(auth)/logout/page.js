import { logout } from "@/actions/actionUtils"
import { Constants } from "@/utils/Constants"
import { redirect } from "next/navigation"

export default function Logout() {
    logout().then(() => {
        if (window?.location?.href){
            window.location.href = Constants.Paths.SignIn
        }
        else redirect(Constants.Paths.SignIn)
    })
}