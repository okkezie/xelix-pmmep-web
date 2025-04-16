
import Dropdown from "@/components/molecules/Dropdown/Dropdown"
import { Constants } from "@/utils/Constants"
import { deleteRoadMapAction } from "@/actions/roadmapActions"
import ArrowRight from "@/svgs/arrow-right"
import { useAuthContext } from "@/contexts/AuthContext"
import { getEntityApprovalStatusBadges, parseDateToMonthYear } from "@/utils/helpers"
import SimpleTable from "@/components/organisms/Table/SimpleTable"
import Confirm from "@/components/organisms/Confirm/Confirm"
import { useEffect, useState } from "react"

export default function RoadmapsTable({ entities }) {
    const [roadmaps, setRoadmaps] = useState(entities)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [idForDelete, setIdForDelete] = useState()
    const { isAuthorized } = useAuthContext()

    useEffect(() => {
        setRoadmaps(entities)
    }, [entities])

    const getDropDownItems = (id, isDraft, status) => {
        let canEdit, canView, canDelete, isRejected
        canEdit = isAuthorized(Constants.Authorizations.Roadmaps.Create)
        canDelete = isAuthorized(Constants.Authorizations.Roadmaps.Delete)
        canView = isAuthorized(Constants.Authorizations.Roadmaps.Read)
        isRejected = status === Constants.ApprovalStatus.REJECTED

        const items = []
        if (canView) {
            items.push( {
                label: 'View',
                icon: <></>,
                href: Constants.Paths.RoadmapsView.replace(':slug', id)
            })
        }
        if(canEdit && (isDraft || isRejected)) {
            items.push({
                label: 'Edit',
                icon: <></>,
                href: Constants.Paths.RoadmapsEdit.replace(':slug', id)
            })
        }
        if (canDelete && isDraft) {
            items.push({
                label: 'Delete',
                icon: <></>,
                onClick: () => {
                    setIdForDelete(id)
                    setShowDeleteDialog(true)
                }
            })
        }
        return items
    }
    const headers = ['Title', 'MDA', 'Period', 'Approvals', 'Actions']
    const body = []
    if (roadmaps?.length > 0 ) {
        roadmaps?.map((roadmap, index) => (
            body.push([
                roadmap.title,
                roadmap.mda?.name,
                <div key={index+1}>{parseDateToMonthYear(roadmap.startDate)} <ArrowRight /> {parseDateToMonthYear(roadmap.endDate)}</div>,
                getEntityApprovalStatusBadges(roadmap),
                <Dropdown label='Actions' items={getDropDownItems(roadmap?.id, roadmap?.isDraft, roadmap?.approvalStatus)} key={index+1}/>
            ])
        ))
    }

    const closeDeleteModal = () => {
        setShowDeleteDialog(false)
    }

    return (
        <>
        <Confirm
            actionType={Constants.ConfirmActionType.Delete}
            close={closeDeleteModal}
            show={showDeleteDialog}
            entity={'Roadmap'}
            redirect={Constants.Paths.Roadmaps}
            action={async () => await deleteRoadMapAction(idForDelete)}
        />
        <SimpleTable headers={headers} body={body} name='Roadmap' />
        </>
    )
}