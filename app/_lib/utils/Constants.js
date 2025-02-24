
export class Constants {
    
    static Paths = {
        SignIn: "/signin",
        ForgotPassword: "/forgot-password",
        Dashboard: "/dashboard",
        Projects: "/projects",
        ProjectDetails: "/projects/:id",
        Users: "/users",
        UserDetails: "/users/:id",
        Settings: "/settings",
        Profile: "/profile",
        Logout: "/logout",
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

}


