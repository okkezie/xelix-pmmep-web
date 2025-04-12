import UsersTable from "@/components/organisms/Tables/UsersTable"
import Button from "@/components/atoms/Form/Button/Button"
import { Modal } from "@/components/templates/Modal/Modal"
import UserForm from "@/components/pages/Admin/UsersPage/UserForm"
import { useModal } from "@/hooks/useModal"
import { useEffect, useState } from "react"
import VerticalTabs from "@/components/organisms/Tabs/VerticalTab"
import { Constants } from "@/utils/Constants"

export default function UsersPage({users, roles, permissions, userTypes, mdas, contractors}) {
    const {isOpen, closeModal, openModal} = useModal()
    const [tabs, setTabs] = useState([])

    const closeCallback = () => {
        closeModal()
        // reload the page to refresh the data
        window?.location?.reload()
    }

    useEffect(() => {
        const pending = [...users].filter(u => u.approvalStatus === Constants.ApprovalStatus.PENDING)
        const approved = [...users].filter(u => u.approvalStatus === Constants.ApprovalStatus.APPROVED)
        const rejected = [...users].filter(u => u.approvalStatus === Constants.ApprovalStatus.REJECTED)
        const data = {
            activeTabId: 1,
            showTabTitles: true,
            tabs: [
                {
                    id: 1,
                    title: "All",
                    content: <UsersTable users={users} userTypes={userTypes} mdas={mdas} roles={roles} permissions={permissions} />,
                    icon: <></>,
                    badge: users.length
                },
                {
                    id: 2,
                    title: "Approved",
                    content: <UsersTable users={approved} userTypes={userTypes} mdas={mdas} roles={roles} permissions={permissions} />,
                    icon: <></>,
                    badge: approved.length
                },
                {
                    id: 3,
                    title: "Pending",
                    content: <UsersTable users={pending} userTypes={userTypes} mdas={mdas} roles={roles} permissions={permissions} />,
                    icon: <></>,
                    badge: pending.length
                },
                {
                    id: 4,
                    title: "Rejected",
                    content: <UsersTable users={rejected} userTypes={userTypes} mdas={mdas} roles={roles} permissions={permissions} />,
                    icon: <></>,
                    badge: rejected.length
                }
            ]
        }
        setTabs(data)
    }, [mdas, permissions, roles, userTypes, users])

    return (
        <>
        <div className="flex flex-row gap-4 items-center justify-end">
            <Button variant="outline" className="mb-4" onClick={openModal}>
                Create New User
            </Button>
        </div>
        <VerticalTabs data={tabs} />
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[700px] m-4"
        >
            <UserForm userTypes={userTypes} mdas={mdas} close={closeCallback} contractors={contractors} />
        </Modal>
        </>
    )
}
