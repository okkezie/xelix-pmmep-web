"use client"
import RolesTable from "@/components/organisms/Tables/RolesTable"
import Button from "@/components/atoms/Form/Button/Button"
import RoleForm from "@/components/organisms/RoleForm/RoleForm"
import { Modal } from "@/components/templates/Modal/Modal"
import { useState } from "react"
import PermissionsTable from "@/components/organisms/Tables/PermissionsTable"
import Card from "@/components/organisms/Card/Card"
export default function Roles({ roles, permissions, roleAudiences }) {
    const [permissionsModalOpen, setPermissionsModalOpen] = useState(false)
    const [newRoleModalOpen, setNewRoleModalOpen] = useState(false)

    const close = () => {
        setPermissionsModalOpen(false)
        setNewRoleModalOpen(false)
    }

    return (
        <>
        <Card className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center justify-end">
                <Button variant="outline" className="mb-4" onClick={() => setPermissionsModalOpen(true)}>View All Permissions</Button>
                <Button variant="outline" className="mb-4" onClick={() => setNewRoleModalOpen(true)}>Add New Role</Button>
            </div>
            <RolesTable roles={roles} permissions={permissions} audiences={roleAudiences} />
        </Card>
        <Modal
            isOpen={newRoleModalOpen}
            onClose={close}
            className="max-w-[700px] m-4"
        >
            <RoleForm closeModal={close} audiences={roleAudiences} />
        </Modal>
        <Modal
            isOpen={permissionsModalOpen}
            onClose={close}
            className="w-fit max-h-[700px] overflow-y-auto m-4 p-8"
        >
            <PermissionsTable permissions={permissions} />
        </Modal>
        </>
    )
}
