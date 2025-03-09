import UsersTable from "@/components/organisms/Tables/UsersTable"
import Button from "@/components/atoms/Form/Button/Button"
import { useState } from "react"
import { Modal } from "@/components/templates/Modal/Modal"
import NewUserForm from "@/components/organisms/NewUserForm/NewUserForm"
import Card from "@/components/organisms/Card/Card"

export default function UsersPage({users, roles, permissions, userTypes, mdas}) {
    const [newUserModalOpen, setNewUserModalOpen] = useState(false)
    const close = () => {
        setNewUserModalOpen(false)
    }
    
    const submitNewUser = (data) => {
        console.log(data)
        alert("User created")
    }
    
    return (
        <>
        <Card className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center justify-end">
                <Button variant="outline" className="mb-4" onClick={() => setNewUserModalOpen(true)}>Create New User</Button>
            </div>
            <UsersTable users={users} />
        </Card>
        <Modal
            isOpen={newUserModalOpen}
            onClose={close}
            className="max-w-[700px] m-4"
        >
            <NewUserForm closeModal={close} submitAction={submitNewUser} roles={roles} permissions={permissions} userTypes={userTypes} />
        </Modal>
        </>
    )
}
