import { redirect } from "next/navigation"
import { Constants } from "@/utils/Constants"

export default function HomePage() {
  return (
    redirect(Constants.Paths.Dashboard)
  )
}
