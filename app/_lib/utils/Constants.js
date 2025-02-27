
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
        MDAs: "/MDAS",
        Users: "/users",
        Settings: "/settings",
        Profile: "/profile",
        Logout: "/logout",
        Support: "/support",
        Account: "/account",
        Contractors: '/contractors',
        CreateContractor: '/create-contractor'
    }

    static UnProtectedPaths = [
        Constants.Paths.SignIn,
        Constants.Paths.ForgotPassword,
    ]

    static ApiPaths = {
        SignIn: "/api/auth/login",
        ForgotPassword: "/api/auth/forgot-password",
        
        Permissions: "/api/admin/permissions",
        Roles: "/api/admin/roles",
        RoleAudiences: "/api/utils/role-audiences",
        UserTypes: "/api/utils/user-types",
        MDAs: "/api/admin/mdas",
        Users: "/api/admin/users",
        Projects: "/api/projects",
        Initiatives: "/api/initiatives",
        Roadmaps: "/api/roadmaps",
        Tasks: "/api/tasks",
        Reports: "/api/reports",
        Files: "/api/files",
        Forms: "/api/forms",
        Engagements: "/api/engagements",
        Staff: "/api/staff",
        Settings: "/api/settings",
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

    static Authorizations = {
        Users: {
            Create: ['user:create'],
            Update: ['user:update'],
            Delete: ['user:delete'],
            List: ['user:list'],
            Get: ['user:get'],
            Approve: ['user:approve'],
            AssignRoles: ['user:assign.role'],
            AssignPermissions: ['user:assign.permission']
        },
        Roles: {
            Create: ['role:create'],
            Delete: ['role:delete'],
            List: ['role:list'],
            AssignPermissions: ['role:assign.permission']
        },
        Permissions: {
            List: ['permissions:list'],
        },
        MDAs: {
            Create: ['mda:create', 'mda:update'],
            Manage: ['mda:update'],
            Approve: ['mda:approve'],
            Read: ['mda:get', 'mda:list']
        },
        Contractor: {
            Create: ['contractor:create', 'contractor:update'],
            Update: ['contractor:update'],
            Delete: ['contractor:delete'],
            Read: ['contractor:get'],
            List: ['contractor:list'],
            Approve: ['contractor:approve']
        },
        Projects: {
            Create: ['project:create', 'project:update'],
            Approve: ['project:approve'],
            Read: ['project:get'],
            List: ['project:list'],
            Delete: ['project:delete']
        },
        Initiatives: {
            Create: ['initiative:create'],
            Update: ['initiative:updat'],
            Approve: ['initiative:approve'],
            Read: ['initiative:get', 'initiative:list'],
            Delete: ['initiative:delete']
        },
        Roadmaps: {
            CreateRoadmaps: ['roadmap:create', 'roadmap:update'],
            ApproveRoadmaps: ['roadmap:approve'],
            ReadRoadmaps: ['roadmap:list', 'roadmap:get'],
            DeleteRoadmap: ['roadmap:delete']
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


