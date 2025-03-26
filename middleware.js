import { Constants } from "@/utils/Constants"
import { NextResponse } from 'next/server'
import { cookies } from "next/headers"
import { logout } from "@/actions/actionUtils"

const unAuthenticatedPaths 
    = Object.values(Constants.UnProtectedPaths) 

export const config = { matcher: '/((?!.*\\.|api\\/).*)' }

export async function middleware(request) {
    const authenticated = await isAuthenticated()
    const pathname = '/'+request.nextUrl.pathname.split('/')[1].split('?')[0].split('#')[0]

    if (pathname === Constants.Paths.Logout) {
        return await signout(request)
    }

    if (pathname === Constants.Paths.SignIn && authenticated) {
        return NextResponse.redirect(new URL(Constants.Paths.Dashboard, request.nextUrl))
    }

    if (!unAuthenticatedPaths.includes(pathname) && !authenticated) {
        return NextResponse.redirect(new URL(Constants.Paths.SignIn, request.nextUrl))
    }

    return NextResponse.next({request})
}

const isAuthenticated = async () => {
    const cookieStore = await cookies()
    const user = getUserObject(cookieStore)
    const token = cookieStore.get(Constants.Cookies.TOKEN)?.value
    const isAuthenticated = cookieStore.get(Constants.Cookies.IS_AUTHENTICATED)?.value
    return user && 
            typeof user === 'object' && 
            typeof token === 'string' && 
            token.length > 0 &&
            !!isAuthenticated
}

const getUserObject = (cookieStore) => {
    try {
        const userCookie = cookieStore.get(Constants.Cookies.USER)?.value
        return (typeof userCookie === 'string') ? JSON.parse(userCookie) : null
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
    await logout()
    return response
}