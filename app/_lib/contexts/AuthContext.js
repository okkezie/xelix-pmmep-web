'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { getCookie } from "cookies-next"
import { Constants } from "@/utils/Constants"
import User from "@/entities/User"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [permissions, setPermissions] = useState([])
    const [roles, setRoles] = useState([])

    useEffect(() => {
        const userCookie = getCookie(Constants.Cookies.USER)
        if (userCookie) {
            const userObject = new User(userCookie, true)
            setUser(userObject)
            setRoles(userObject.getRoles())
        }
        const isAuthenticated = getCookie(Constants.Cookies.IS_AUTHENTICATED)
        if (isAuthenticated) {
            setIsAuthenticated(isAuthenticated)
        }
        const token = getCookie(Constants.Cookies.TOKEN)
        if (token) {
            const decoded = decodeToken(token)
            const perms = decoded?.scp?.split(" ") || []
            setPermissions(perms) 
        }
    }, [])

    const isAuthorized = useCallback((authority) => {
        if (!authority || authority === undefined || authority?.length == 0) {
            return true
        }
        if (!permissions || permissions?.length <= 0) {
            return false;
        }
        for (let permission of authority) {
            if (permissions.includes(permission)) {
                return true
            }
        }
        return false
    }, [permissions])

    const decodeToken = (token) => {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        return decoded
    }

    const values = useMemo(() => (
        { 
            user, 
            isAuthenticated, 
            permissions, 
            roles,
            isAuthorized
        }
    ), [user, isAuthenticated, permissions, roles, isAuthorized])

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
