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
    const [userType, setUserType] = useState()
    const [roles, setRoles] = useState([])
    const [userMda, setUserMda] = useState({})
    const [userContractor, setUserContractor] = useState({})
    const [userOffice, setUserOffice] = useState('')

    useEffect(() => {
        const userCookie = getCookie(Constants.Cookies.USER)
        let utype, uMda = '', uContractor = {}, uOffice = ''
        if (userCookie) {
            const userObject = new User(userCookie, true)
            setUser(userObject)
            setRoles(userObject.getRoles())
            utype = userObject.getUserType()
            uMda = userObject.getMda()
            uContractor = userObject.getContractor()
            uOffice = userObject.getOffice()
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
            if (utype === decoded?.user_type) {
                setUserType(utype)
            }
            const dmda = JSON.parse(decoded?.mda ?? "{}")
            if (dmda?.id === uMda?.id) {
                setUserMda(uMda)
            }
            const dcontractor = JSON.parse(decoded?.contractor ?? "{}")
            if (dcontractor?.id === uContractor?.id) {
                setUserContractor(uContractor)
            }
            if (decoded?.office === uOffice) {
                setUserOffice(uOffice)
            }
        }
    }, [])

    const isAuthorized = useCallback((authority) => {
        if (!authority || authority === undefined || authority?.length == 0) {
            return true
        }
        if (!permissions || permissions?.length === 0) {
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

    const values = useMemo(() => ({ 
        user, 
        isAuthenticated, 
        permissions, 
        roles,
        userType,
        userMda,
        userContractor,
        userOffice,
        isAuthorized
    }), [user, isAuthenticated, permissions, roles, isAuthorized, userType, userMda, userContractor, userOffice])

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
