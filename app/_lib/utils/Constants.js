
export class Constants {
    
    static Paths = {
        SignIn: "/signin",
        ForgotPassword: "/forgot-password",
        Dashboard: "/dashboard",
        Projects: "/projects",
        Initiatives: "/initiatives",
        Roadmaps: "/roadmaps",
        Tasks: "/tasks",
        Reports: "/reports",
        Engagements: "/engagements",
        Files: "/files",
        Forms: "/forms",
        Staff: "/staff",
        Roles: "/roles",
        MDAs: "/mdas",
        Users: "/users",
        Settings: "/settings",
        Profile: "/profile",
        Logout: "/logout",
        Support: "/support",
        Account: "/account",
    }

    static UnProtectedPaths = [
        Constants.Paths.SignIn,
        Constants.Paths.ForgotPassword,
    ]

    static ApiPaths = {
        SignIn: "/api/auth/login",
        ForgotPassword: "/api/auth/forgot-password",
        ResetPassword: "/api/auth/reset-password",
        VerifyEmail: "/api/auth/verify-email",
        ChangePassword: "/api/auth/change-password",
    }

    static ApiMethods = {
        POST: "POST",
        GET: "GET",
        PUT: "PUT",
        DELETE: "DELETE",
    }

    static ApiHeaders = {
        ContentType: "Content-Type",
        Authorization: "Authorization",
        Bearer: "Bearer",
    }

    static ApiContentTypes = {
        Json: "application/json",
        FormData: "multipart/form-data",
    }
    
    static Cookies = {
        USER: 'user',
        TOKEN: 'token',
        REFRESH_TOKEN: 'refreshToken',
        USER_ID: 'userId',
        USER_NAME: 'userName',
        CLIENT_IP_ADDRESS: 'clientIpAddress',
        DO_TOKEN_REFRESH: 'doTokenRefresh',
        IS_AUTHENTICATED: 'isAuthenticated',
    }

    static Headers = {
        X_PATH_NAME: 'x-path-name',
    }

    static Permissions = {
        Users: {

        },
        Roles: {

        },
        MDAs: {

        },
        Projects: {

        },
        Initiatives: {

        },
        Roadmaps: {

        },
        Tasks: {

        },
        Reports: {

        },
        Files: {

        },
        Forms: {

        },
        Engagements: {

        },
        Staff: {

        },
    }
}


