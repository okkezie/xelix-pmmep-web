'use client'
import { useEffect } from "react"
import Dashboard from "@/components/pages/Dashboard/Dashboard"
import { useAuthContext } from "@/contexts/AuthContext"

export default function HomePage() {
    const { user, permissions, roles } = useAuthContext()

    useEffect(() => {
        console.log({user, permissions, roles})
    }, [user, permissions, roles])

    return (
        <Dashboard />
    )
}
