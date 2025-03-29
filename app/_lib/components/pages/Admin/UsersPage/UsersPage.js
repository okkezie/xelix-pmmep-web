import UsersTable from "@/components/organisms/Tables/UsersTable"
import Button from "@/components/atoms/Form/Button/Button"
import { Modal } from "@/components/templates/Modal/Modal"
import NewUserForm from "@/components/organisms/NewUserForm/NewUserForm"
import Card from "@/components/organisms/Card/Card"
import { useModal } from "@/hooks/useModal"

export default function UsersPage({users, roles, permissions, userTypes, mdas}) {
    const {isOpen, closeModal, openModal} = useModal()
    console.log({mdas})
    console.log({userTypes})
    return (
        <>
        <Card className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center justify-end">
                <Button variant="outline" className="mb-4" onClick={openModal}>
                    Create New User
                </Button>
            </div>
            <UsersTable users={users} userTypes={userTypes} mdas={mdas} roles={roles} permissions={permissions} />
        </Card>
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[700px] m-4"
        >
            <NewUserForm userTypes={userTypes} mdas={mdas} close={closeModal} />
        </Modal>
        </>
    )
}
