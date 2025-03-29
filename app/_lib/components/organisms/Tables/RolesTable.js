import Badge from "@/components/atoms/Badge/Badge"
import SimpleTable from "@/components/organisms/Table/SimpleTable"
import Dropdown from "@/components/molecules/Dropdown/Dropdown"
import { Modal } from "@/components/templates/Modal/Modal"
import Confirm from "@/components/organisms/Confirm/Confirm"
import Card from "@/components/organisms/Card/Card"
import { Constants } from "@/utils/Constants"
import { deleteRole } from "@/actions/roleActions"
import { useState } from "react"
import { useAuthContext } from "@/contexts/AuthContext"
import RoleForm from "@/components/organisms/RoleForm/RoleForm"
import RolePermissions from "@/components/pages/Admin/Roles/RolePermissions"

export default function RolesTable({ roles, permissions,audiences }) {
    const headers = ['Role', 'Description', 'Permissions', 'Actions']
    const body = []
    if(roles.length > 0 ) {
        roles.map((role, index) => body.push([
            role.name,
            role.description,
            <div className="flex flex-wrap gap-2" key={index+1}>
                {role.permissions.slice(0, 3).map((permission) => (
                    <Badge
                        key={permission}
                        size="sm"
                        className="m-2"
                    >
                        {permission}
                    </Badge>
                ))}
                {role.permissions.length > 3 && (
                    <Badge
                        size="sm"
                        className="mr2"
                        variant="solid"
                        color="gray"
                    >
                        +{role.permissions.length - 3} more permissions
                    </Badge>
                )}
            </div>,
            <RoleActions role={role} permissions={permissions} audiences={audiences} key={index+1} />
        ]))
    }
    const tableName = "Roles";

    return (
        <SimpleTable headers={headers} body={body} name={tableName} />
    )
}

const RoleActions = ({role, permissions,audiences}) => {
    const [showViewModal, setShowViewModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showPermissionsModal, setShowPermissionsModal] = useState(false)
    const { isAuthorized } = useAuthContext()

    const getDropDownItems = () => {
        const canEdit = isAuthorized(Constants.Authorizations.Roles.Create)
        const canDelete = isAuthorized(Constants.Authorizations.Roles.Delete)
        const canView = isAuthorized(Constants.Authorizations.Roles.List)
        const canAssignPermissions = isAuthorized(Constants.Authorizations.Roles.AssignPermissions)

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
        if (canDelete) {
            items.push({
                label: 'Delete',
                icon: <></>,
                onClick: () => setShowDeleteModal(true)
            })
        }
        if (canAssignPermissions) {
            items.push({
                label: 'Permissions',
                icon: <></>,
                onClick: () => setShowPermissionsModal(true)
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
                <RoleForm role={role} closeModal={() => setShowEditModal(false)} submitAction={() => {}} audiences={audiences} />
            </Modal>
            <Confirm 
                action={async () => {
                    return deleteRole(role?.id)
                }}
                entity={'Role'}
                actionType={Constants.ConfirmActionType.Delete}
                close={() => setShowDeleteModal(false)}
                show={showDeleteModal}
                redirect={Constants.Paths.Roles}
            />
            <Modal
                isOpen={showViewModal}
                onClose={() => setShowViewModal(false)}
                className="max-w-[700px] m-4"
            >
                <RoleDetails role={role} />
            </Modal>
            <Modal
                isOpen={showPermissionsModal}
                onClose={() => setShowPermissionsModal(false)}
                className="max-w-[800px] m-4"
            >
                <Card title={role?.name} description={`Permissions for Role: ${role?.name}`}>
                    <RolePermissions role={role} availablePermissions={permissions} />
                </Card>
            </Modal>
        </>
    )
}

const RoleDetails = ({role}) => {
    return (
        <Card title={role?.name} description={`Details for Role: ${role?.name}`}>
            <div className="flex flex-col gap-4 divide-y divide-gray-300 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                    <h3 className="text-sm text-gray-500 col-span-1">Description</h3>
                    <p className="col-span-1">{role?.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                    <h3 className="text-sm text-gray-500 col-span-1">Audience</h3>
                    <p className="col-span-1">{role?.audience}</p>
                </div>
                { role?.permissions?.length > 0 && 
                    <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                        <h3 className="text-sm text-gray-500 col-span-1">Permissions</h3>
                        <div className="col-span-1">
                        {role?.permissions?.map((permission) => (
                            <div key={permission} className="m-2 p-2"><Badge>{permission}</Badge></div>
                        ))}
                        </div>
                    </div>
                }
            </div>
        </Card>
    )
}
