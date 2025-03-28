import Image from "next/image"
import Badge from "@/components/atoms/Badge/Badge"
import { getDefaultUserAvatar, isNullOrEmptyString } from "@/utils/helpers"
import SimpleTable from "@/components/organisms/Table/SimpleTable"
import { Constants } from "@/utils/Constants"
import { useAuthContext } from "@/contexts/AuthContext"
import { useState } from "react"
import Dropdown from "@/components/molecules/Dropdown/Dropdown"
import UserForm from "@/components/organisms/UserForm/UserForm"
import { Modal } from "@/components/templates/Modal/Modal"
import Confirm from "@/components/organisms/Confirm/Confirm"
import { deleteUser } from "@/actions/userActions"
import Card from "@/components/organisms/Card/Card"
import UserDetails from "@/components/pages/Admin/UsersPage/UserDetails"
import UserPermissions from "@/components/pages/Admin/UsersPage/UserPermissions"
import UserRoles from "@/components/pages/Admin/UsersPage/UserRoles"

export default function UsersTable({ users, userTypes, mdas, roles, permissions }) {

    const tableHeader = ['User', 'Type', 'Roles', 'Status', 'Actions']
    const tableBody = []
    users.map(user => {
        tableBody.push([
            <UserImageCell user={user} key={user?.id+'1'} />,
            user.userType,
            <UserRolesBadges user={user} key={user?.id+'2'} />,
            <UserStatusBadge user={user} key={user?.id+'3'} />, 
            <UserActions user={user} key={user?.id+'4'} userTypes={userTypes} mdas={mdas} roles={roles} permissions={permissions} />
        ])
    })

    const tableName = 'Users'
    
    return (
        <SimpleTable body={tableBody} headers={tableHeader} name={tableName}  />
    )
}

const UserImageCell = ({user}) => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 overflow-hidden rounded-full">
                <Image
                    width={40}
                    height={40}
                    src={isNullOrEmptyString(user?.avatar?.icon) ? getDefaultUserAvatar(user.name) : user?.avatar?.icon}
                    alt={user?.name}
                />
            </div>
            <div>
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {user?.name}
                </span>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                    {user?.email}
                </span>
            </div>
        </div>
    )
}

const UserRolesBadges = ({user}) => {
    return (
        <div className="flex -space-x-2">
            {user?.roles?.map((role) => (
                <Badge
                    key={role}
                    size="sm"
                    className="mr2"
                >
                    {role}
                </Badge>
            ))}
        </div>
    )
}

const UserStatusBadge = ({user}) => {
    const getUserStatusColor = (status) => {
        if (status === Constants.Status.ACTIVE) return "success"
        if (status === Constants.Status.PENDING) return "warning"
        return "error"
    }

    return (
        <Badge
            size="sm"
            color={
                getUserStatusColor(user?.status)
            }
        >
            {user?.status}
        </Badge>
    )
}

const UserActions = ({user, userTypes, mdas, roles, permissions}) => {
    const [showViewModal, setShowViewModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showPermissionsModal, setShowPermissionsModal] = useState(false)
    const [showRolesModal, setShowRolesModal] = useState(false)
    const { isAuthorized, user: authUser } = useAuthContext()

    const getDropDownItems = () => {
        const canEdit = isAuthorized(Constants.Authorizations.Users.Create)
        const canDelete = isAuthorized(Constants.Authorizations.Users.Delete)
        const canView = isAuthorized(Constants.Authorizations.Users.List)
        const canAssignPermissions = isAuthorized(Constants.Authorizations.Users.AssignPermissions)
        const canAssignRoles = isAuthorized(Constants.Authorizations.Users.AssignRoles)

        const items = []
        if (canView) {
            items.push({
                label: 'View',
                icon: <></>,
                onClick: () => setShowViewModal(true)
            })
        }
        if (canEdit) {
            items.push({
                label: 'Edit',
                icon: <></>,
                onClick: () => setShowEditModal(true)
            })
        }
        if (canDelete && user?.id !== authUser?.getId()) {
            items.push({
                label: 'Delete',
                icon: <></>,
                onClick: () => setShowDeleteModal(true)
            })
        }
        if (canAssignPermissions && user?.id !== authUser?.getId()) {
            items.push({
                label: 'Permissions',
                icon: <></>,
                onClick: () => setShowPermissionsModal(true)
            })
        }
        if (canAssignRoles && user?.id !== authUser?.getId()) {
            items.push({
                label: 'Roles',
                icon: <></>,
                onClick: () => setShowRolesModal(true)
            })
        }
        return items
    }
    return (
        <>
            <Dropdown label='Actions' items={getDropDownItems()} />
            <Modal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                className="max-w-[700px] m-4"
            >
                <UserForm userTypes={userTypes} mdas={mdas} close={() => setShowEditModal(false)} user={user} />
            </Modal>
            <Confirm 
                action={() => {
                    deleteUser(user?.id)
                    setShowDeleteModal(false)
                }}
                entity={'User'}
                actionType={Constants.ConfirmActionType.Delete}
                close={() => setShowDeleteModal(false)}
                show={showDeleteModal}
                redirect={Constants.Paths.Users}
            />
            <Modal
                isOpen={showViewModal}
                onClose={() => setShowViewModal(false)}
                className="max-w-[700px] m-4"
            >
                <Card title={user?.name} description={`Details for User: ${user?.name}`}>
                    <UserDetails user={user} />
                </Card>
            </Modal>
            <Modal
                isOpen={showPermissionsModal}
                onClose={() => setShowPermissionsModal(false)}
                className="max-w-[800px] m-4"
            >
                <Card title={user?.name} description={`Permissions for User: ${user?.name}`}>
                    <UserPermissions user={user} availablePermissions={permissions} />
                </Card>
            </Modal>
            <Modal
                isOpen={showRolesModal}
                onClose={() => setShowRolesModal(false)}
                className="max-w-[800px] m-4"
            >
                <Card title={user?.name} description={`Roles for User: ${user?.name}`}>
                    <UserRoles user={user} availableRoles={roles} />
                </Card>
            </Modal>
        </>
    )
}