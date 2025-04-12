
import Dropdown from "@/components/molecules/Dropdown/Dropdown"
import { Constants } from "@/utils/Constants"
import { deleteRoadMapAction } from "@/actions/roadmapActions"
import ArrowRight from "@/svgs/arrow-right"
import { useAuthContext } from "@/contexts/AuthContext"
import { getDraftBadge, getStatusBadge, parseDateToMonthYear } from "@/utils/helpers"
import SimpleTable from "../Table/SimpleTable"

export default function RoadmapsTable({ roadmaps }) {
    const { isAuthorized } = useAuthContext()
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
                onClick: (id) => deleteRoadMap(id)
            })
        }
        return items
    }
    const headers = ['Title', 'MDA', 'Period', 'Status', 'Actions']
    const body = []
    if (roadmaps?.length > 0 ) {
        roadmaps?.map((roadmap, index) => (
            body.push([
                roadmap.title,
                roadmap.mda?.name,
                <div key={index+1}>{parseDateToMonthYear(roadmap.startDate)} <ArrowRight /> {parseDateToMonthYear(roadmap.endDate)}</div>,
                <div className="flex flex-col lg:flex-row items-center justify-start gap-3" key={index+1}>
                    <span>{ getStatusBadge(roadmap.approvalStatus) }</span>
                    <span>{ getDraftBadge(roadmap.isDraft) }</span>
                </div>,
                <Dropdown label='Actions' items={getDropDownItems(roadmap?.id, roadmap?.isDraft, roadmap?.approvalStatus)} key={index+1}/>
            ])
        ))
    }

    return (
        <SimpleTable headers={headers} body={body} name='Roadmaps' />
    )
}

export const deleteRoadMapDialog = async (id) => {
    const pathname = window.location.pathname
    if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS ROADMAP? \r\nTHIS ACTION CANNOT BE UNDONE.")) {
        const response = await deleteRoadMapAction(id)
        if (response?.success) {
            alert("Roadmap deleted successfully!")
            if (pathname === Constants.Paths.Roadmaps)
                location.reload()
            else
                location.href = Constants.Paths.Roadmaps
        }
    }
}