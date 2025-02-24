import { Constants } from "@/utils/Constants"
import { NextResponse } from 'next/server'
import { cookies } from "next/headers"
import { deleteCookie } from "cookies-next"

const unAuthenticatedPaths 
    = Object.values(Constants.UnProtectedPaths) 

export const config = { matcher: '/((?!.*\\.|api\\/).*)' }

export async function middleware(request) {
    const pathname = getPathName(request)

    if (shouldSignout(pathname)) {
        return await signout(request)
    }

    if (shouldAuthenticate(pathname)) {
        return await authenticateRequest(request)
    }

    return NextResponse.next({request})
}

const shouldSignout = (pathname) => {
    return pathname === Constants.Paths.Logout
}

const authenticateRequest = async (request) => {
    if (isAuthenticated()) {
        return NextResponse.next({request})
    }
    return NextResponse.redirect(new URL(Constants.Paths.SignIn, request.nextUrl))
}

const getPathName = (request) => {
    return '/'+request.nextUrl.pathname.split('/')[1].split('?')[0].split('#')[0]
}

const shouldAuthenticate = (pathname) => {
    return !unAuthenticatedPaths.includes(pathname)
}

const isAuthenticated = async () => {
    const cookieStore = await cookies()
    const user = getUserObject(cookieStore)
    const token = cookieStore.get(Constants.Cookies.TOKEN)?.value
    const isAuthenticated = cookieStore.get(Constants.Cookies.IS_AUTHENTICATED)?.value
    return user && typeof user === 'object' && 
           typeof token === 'string' && token.length > 0 &&
           isAuthenticated === 'true'
}

const getUserObject = (cookieStore) => {
    try {
        const userCookie = cookieStore.get(Constants.Cookies.USER)?.value
        return userCookie ? JSON.parse(userCookie) : null
    } catch (error) {
        console.error("Error retrieving user object:", error)
        return null
    }
}

const signout = async (request) => {
    const headers = new Headers()
    headers.set(Constants.Headers.X_PATH_NAME, '')
    const response = NextResponse.redirect(
        new URL(Constants.Paths.SignIn, request.url),
        { headers }
    )

    response.cookies.set(Constants.Cookies.TOKEN, '', { maxAge: 0 })
    response.cookies.set(Constants.Cookies.USER, '', { maxAge: 0 })
    response.cookies.set(Constants.Cookies.USER_ID, '', { maxAge: 0 })
    response.cookies.set(Constants.Cookies.DO_TOKEN_REFRESH, '', { maxAge: 0 })
    response.cookies.set(Constants.Cookies.REFRESH_TOKEN, '', { maxAge: 0 })
    response.cookies.set(Constants.Cookies.CLIENT_IP_ADDRESS, '', {maxAge: 0})
    response.cookies.set(Constants.Cookies.REMEMBER_ME, '', { maxAge: 0 })
    response.cookies.set(Constants.Cookies.IS_AUTHENTICATED, '', { maxAge: 0 })

    deleteCookie(Constants.Cookies.TOKEN)
    deleteCookie(Constants.Cookies.USER)
    deleteCookie(Constants.Cookies.USER_ID)
    deleteCookie(Constants.Cookies.DO_TOKEN_REFRESH)
    deleteCookie(Constants.Cookies.REFRESH_TOKEN)
    deleteCookie(Constants.Cookies.CLIENT_IP_ADDRESS)
    deleteCookie(Constants.Cookies.REMEMBER_ME)
    deleteCookie(Constants.Cookies.IS_AUTHENTICATED)

    return response
}