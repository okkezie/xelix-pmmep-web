
import Dropdown from "@/components/molecules/Dropdown/Dropdown"
import { Constants } from "@/utils/Constants"
import { parseDateToMonthYear, getStatusBadge, getDraftBadge } from '@/utils/helpers'
import ArrowRight from "@/svgs/arrow-right"
import { useAuthContext } from "@/contexts/AuthContext"
import { deleteInitiative } from "@/actions/initiativeActions"
import SimpleTable from "@/components/organisms/Table/SimpleTable"
import Confirm from "@/components/organisms/Confirm/Confirm"
import { useState } from "react"

export default function InitiativesTable({ initiatives }) {
    const { isAuthorized } = useAuthContext()
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const getDropDownItems = (id, isDraft) => {
        let canEdit, canView, canDelete
        canEdit = isAuthorized(Constants.Authorizations.Initiatives.Create)
        canDelete = isAuthorized(Constants.Authorizations.Initiatives.Delete)
        canView = isAuthorized(Constants.Authorizations.Initiatives.Read)

        const items = []
        if (canView) {
            items.push( {
                label: 'View',
                icon: <></>,
                href: Constants.Paths.InitiativesView.replace(':slug', id)
            })
        }
        if(canEdit && isDraft) {
            items.push({
                label: 'Edit',
                icon: <></>,
                href: Constants.Paths.InitiativesEdit.replace(':slug', id)
            })
        }
        if (canDelete && isDraft) {
            items.push({
                label: 'Delete',
                icon: <></>,
                onClick: (id) => setOpenDeleteDialog(true)
            })
        }
        return items
    }

    const headers = ['Name', 'MDA', 'Dates', 'Status', 'Actions']
    const body = []
    if (initiatives?.length > 0) {
        initiatives.forEach(initiative => {
            body.push([
                initiative?.name,
                initiative?.mda?.name,
                <>
                { parseDateToMonthYear(initiative.startDate) } 
                <ArrowRight /> 
                { parseDateToMonthYear(initiative.endDate) }
                </>,
                <div className="flex flex-col lg:flex-row items-center justify-start gap-3" key={initiative?.id}>
                    <span>{ getStatusBadge(initiative.approvalStatus) }</span>
                    <span>{ getDraftBadge(initiative.isDraft) }</span>
                </div>,
                <Dropdown label='Actions' items={getDropDownItems(initiative?.id, initiative?.isDraft)}  key={initiative?.id} />
            ])
        })
    }
    const name = "Initiatives";

    return (
        <>
            <SimpleTable headers={headers} body={body} name={name} />
            <Confirm 
                show={openDeleteDialog} 
                close={() => setOpenDeleteDialog(false)} 
                action={() => deleteInitiative(id)}
                actionType={Constants.ConfirmActionType.Delete}
                entity={'Initiative'}
                redirect={Constants.Paths.Initiatives}
            />
        </>
    )
}