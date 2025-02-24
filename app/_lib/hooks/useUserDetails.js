import { Constants } from "@/utils/Constants"
import { useEffect, useState } from "react" 
import { getCookie } from 'cookies-next/client'

export default function useUserDetails() {
    const [user, setUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const isAuthenticated = getCookie(Constants.Cookies.IS_AUTHENTICATED)
        setIsAuthenticated(isAuthenticated)
        if (isAuthenticated) {
            setUser(JSON.parse(getCookie(Constants.Cookies.USER)))
        }
    }, [])

    return { user, isAuthenticated }
}

