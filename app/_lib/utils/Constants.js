export class Constants {
    
    static Slug = ":slug"

    static Paths = {
        SignIn: "/signin",
        Logout: "/logout",
        ForgotPassword: "/forgot-password",
        Dashboard: "/dashboard",
        
        Initiatives: "/initiatives",
        InitiativesCreate: "/initiatives/create",
        InitiativesView: "/initiatives/view/:slug",
        InitiativesEdit: "/initiatives/edit/:slug",

        Roadmaps: "/roadmaps",
        RoadmapsCreate: '/roadmaps/create',
        RoadmapsEdit: '/roadmaps/edit/:slug',
        RoadmapsView: '/roadmaps/view/:slug',

        Projects: "/projects",
        ProjectsCreate: "/projects/create",
        ProjectsView: "/projects/view/:slug",
        ProjectsEdit: "/projects/edit/:slug",

        Analytics: "/analytics",
        Reports: "/reports",
        Engagements: "/engagements",
        Files: "/files",
        Forms: "/forms",
        Staff: "/staff",
        AiChat: "/aichat",
        Roles: "/roles",
        MDAs: "/MDAS",
        Users: "/users",
        Settings: "/settings",
        Profile: "/profile",
        
        Support: "/support",
        Account: "/account",
        Contractors: '/contractors',
        ContractorCreate: '/contractors/create',
        ContractorEdit: '/contractors/edit/:slug',
        ContractorView: '/contractors/view/:slug',

        NotFound: '/404'
    }

    static UnProtectedPaths = [
        Constants.Paths.SignIn,
        Constants.Paths.ForgotPassword,
    ]

    static ApiPaths = {
        SignIn: "/api/auth/login",
        RefreshAccessToken: "/api/auth/refresh-access-token",
        ForgotPassword: "/api/auth/forgot-password",

        Users: "/api/admin/users",
        Permissions: "/api/admin/permissions",
        AssignPermissionToUser: "/api/admin/users/:userId/permission/:permissionId",
        RemovePermissionFromUser: "/api/admin/users/:userId/permission/:permissionId",
        GetUserPermissions: "/api/admin/permissions/:userId/user",
        ApproveUser: "/api/admin/users/:userId/approve",
        RejectUser: "/api/admin/users/:userId/reject",
        DisableUser: "/api/admin/users/:userId/disable",

        Roles: "/api/admin/roles",
        GetUserRoles: "/api/admin/roles/:userId",
        RoleAudiences: "/api/utils/role-audiences",
        AssignRoleToUser: "/api/admin/users/:userId/role/:roleId",
        RemoveRoleFromUser: "/api/admin/users/:userId/role/:roleId",
        AssignPermissionsToRole: "/api/admin/roles/:roleId/permissions",
        RemovePermissionsFromRole: "/api/admin/roles/:roleId/permissions",
        GetRolePermissions: "/api/admin/permissions/:roleId/role",
        AssignSinglePermissionToRole: "/api/admin/roles/:roleId/permission/:permissionId",
        RemoveSinglePermissionFromRole: "/api/admin/roles/:roleId/permission/:permissionId",

        UserTypes: "/api/utils/user-types",

        Contractors: "/api/admin/contractors",
        ContractorById: "/api/admin/contractors/:contractorId",
        ApproveContractor: "/api/admin/contractors/:contractorId/approve",
        RejectContractor: "/api/admin/contractors/:contractorId/reject",
        DisableContractor: "/api/admin/contractors/:contractorId/disable",

        MDAs: "/api/admin/mdas",
        MDAById: "/api/admin/mdas/:mdaId",
        
        Projects: "/api/projects",
        ProjectsApprove: "/api/projects/approve/:slug",
        ProjectsReject: "/api/projects/reject/:slug",
        ProjectsByMda: "/api/projects/mda/:slug",

        Initiatives: "/api/initiatives",
        InitiativesApprove: "/api/initiatives/approve/:slug",
        InitiativesReject: "/api/initiatives/reject/:slug",
        InitiativesByMda: "/api/initiatives/mda/:slug",

        Roadmaps: "/api/roadmaps",
        RoadmapsApprove: "/api/roadmaps/approve/:slug",
        RoadmapsReject: "/api/roadmaps/reject/:slug",
        RoadmapByMda: "/api/roadmaps/mda/:slug",

        Analytics: "/api/tasks",
        Reports: "/api/reports",
        Files: "/api/files",
        Forms: "/api/forms",
        Engagements: "/api/engagements",
        Staff: "/api/staff",
        Settings: "/api/settings",
        FileUpload: "/api/files/upload",
    }

    static ApiMethods = {
        POST: "POST",
        GET: "GET",
        PUT: "PUT",
        PATCH: "PATCH",
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
        REMEMBER_ME: 'rememberMe',
        REFRESH_TOKEN_EXPIRY: 'refreshTokenExpiry'
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
            Create: ['project:create'],
            Edit: ['project:update'],
            Approve: ['project:approve'],
            Read: ['project:get'],
            List: ['project:list'],
            Delete: ['project:delete']
        },
        Initiatives: {
            Create: ['initiative:create'],
            Edit: ['initiative:updat'],
            Approve: ['initiative:approve'],
            Read: ['initiative:get', 'initiative:list'],
            Delete: ['initiative:delete']
        },
        Roadmaps: {
            Create: ['roadmap:create', 'roadmap:update'],
            Approve: ['roadmap:approve'],
            Read: ['roadmap:list', 'roadmap:get'],
            Delete: ['roadmap:delete']
        },
        Analytics: {

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

    static ConfirmActionType = {
        Approve: 'approve',
        Reject: 'reject',
        Delete: 'delete',
        Disable: 'disable'
    }

    static FormAction = {
        Submit: 'submit',
        Save: 'save',
    }

    static ApprovalStatus = {
        PENDING: 'PENDING',
        APPROVED: 'APPROVED',
        REJECTED: 'REJECTED',
    }

    static Status = {
        ACTIVE: "ACTIVE",
        PENDING: "PENDING",
        APPROVED: 'APPROVED'
    }

    static UserTypes = {
        MDA_USER: 'MDA_USER',
        MDA_ADMIN: 'MDA_ADMIN',
        PROJECT_USER: 'PROJECT_USER',
        PROJECT_ADMIN: 'PROJECT_ADMIN',
        CONTRACTOR_USER: 'CONTRACTOR_USER',
        CONTRACTOR_ADMIN: 'CONTRACTOR_ADMIN',
        GOVERNOR: 'GOVERNOR',
        ALL: 'ALL'
    }
}


