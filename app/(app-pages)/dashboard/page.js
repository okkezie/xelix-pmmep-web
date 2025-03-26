'use client'
import { useEffect } from "react"
import Dashboard from "@/components/pages/Dashboard/Dashboard"
import { useAuthContext } from "@/contexts/AuthContext"

export default function HomePage() {
    const { user, permissions, roles, userType, userMda } = useAuthContext()

    useEffect(() => {
        console.log({user, permissions, roles, userType, userMda})
    }, [user, permissions, roles, userType, userMda])

    return (
        <Dashboard />
    )
}
