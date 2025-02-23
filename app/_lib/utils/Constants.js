
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
        SignIn: "/auth/signin",
        ForgotPassword: "/auth/forgot-password",
        ResetPassword: "/auth/reset-password",
        VerifyEmail: "/auth/verify-email",
        ChangePassword: "/auth/change-password",
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
    
}



