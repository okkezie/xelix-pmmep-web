import { logout } from "@/actions/actionUtils"
import { Constants } from "@/utils/Constants"

export default async function Logout() {
    await logout()
    window?.location?.href = Constants.Paths.SignIn
}