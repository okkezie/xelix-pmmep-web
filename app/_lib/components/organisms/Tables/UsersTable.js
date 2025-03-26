import Image from "next/image"
import Badge from "@/components/atoms/Badge/Badge"
import { getDefaultUserAvatar, isNullOrEmptyString } from "@/utils/helpers"
import SimpleTable from "@/components/organisms/Table/SimpleTable"
import { Constants } from "@/utils/Constants"
import { useAuthContext } from "@/contexts/AuthContext"
import { useState } from "react"
import Dropdown from "@/components/molecules/Dropdown/Dropdown"
import NewUserForm from "@/components/organisms/NewUserForm/NewUserForm"
import { Modal } from "@/components/templates/Modal/Modal"
import Confirm from "@/components/organisms/Confirm/Confirm"

export default function UsersTable({ users, userTypes, mdas }) {

    const tableHeader = ['User', 'Type', 'Roles', 'Status', 'Actions']
    const tableBody = []
    users.map(user => {
        tableBody.push([
            <UserImageCell user={user} key={user?.id+'1'} />,
            user.userType,
            <UserRolesBadges user={user} key={user?.id+'2'} />,
            <UserStatusBadge user={user} key={user?.id+'3'} />, 
            <UserActions user={user} key={user?.id+'4'} userTypes={userTypes} mdas={mdas} />
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

const UserActions = ({user, userTypes, mdas}) => {
    const [showViewModal, setShowViewModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { isAuthorized, user: authUser } = useAuthContext()

    const getDropDownItems = () => {
        let canEdit, canView, canDelete
        canEdit = isAuthorized(Constants.Authorizations.Users.Create)
        canDelete = isAuthorized(Constants.Authorizations.Users.Delete)
        canView = isAuthorized(Constants.Authorizations.Users.List)

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
                <NewUserForm userTypes={userTypes} mdas={mdas} close={() => setShowEditModal(false)} user={user} />
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
                <h2>User details!</h2>
            </Modal>
        </>
    )
}