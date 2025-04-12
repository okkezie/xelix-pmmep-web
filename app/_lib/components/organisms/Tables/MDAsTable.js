import UnorderedList from "@/components/molecules/List/UnorderedList"
import SimpleTable from "@/components/organisms/Table/SimpleTable"
import Dropdown from "@/components/molecules/Dropdown/Dropdown"
import { Modal } from "@/components/templates/Modal/Modal"
import { Constants } from "@/utils/Constants"
import { useState } from "react"
import MdaForm from "@/components/organisms/MdaForm/MdaForm"
import { useAuthContext } from "@/contexts/AuthContext"

export default function MDAsTable({ mdas }) {
    const tableName = "MDAs"
    const headers = ["Name", "Code", "Ministries", "Departments", "Agencies", "Actions"]
    const body = []
    if (mdas?.length > 0) {
        mdas?.map((mda, index) => {
            body.push([
                mda.name,
                mda.code,
                <UnorderedList items={mda.ministries ?? []} includeContainer={false} key={index+1} />,
                <UnorderedList items={mda.departments ?? []} includeContainer={false} key={index+1} />,
                <UnorderedList items={mda.agencies ?? []} includeContainer={false} key={index+1} />,
                <MdaActions mda={mda} key={index+1} />
            ])
        })
    }

   return <SimpleTable name={tableName} headers={headers} body={body} />
}

const MdaActions = ({mda}) => {
    const { isAuthorized } = useAuthContext()
    const [showViewModal, setShowViewModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const getDropDownItems = () => {
        const canEdit = isAuthorized(Constants.Authorizations.MDAs.Manage)
        const canView = isAuthorized(Constants.Authorizations.MDAs.Read)
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
                <MdaForm mda={mda} closeModal={() => setShowEditModal(false)} />
            </Modal>

            <Modal
                isOpen={showViewModal}
                onClose={() => setShowViewModal(false)}
                className="max-w-[700px] m-4"
            >
                <h2>View MDA</h2>
            </Modal>
        </>
    )
}
