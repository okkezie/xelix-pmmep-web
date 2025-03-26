import { logout } from "@/actions/actionUtils";
import { Constants } from "@/utils/Constants";
import { redirect } from "next/navigation";

export default async function Logout() {
    await logout()
    redirect(Constants.Paths.SignIn)
}