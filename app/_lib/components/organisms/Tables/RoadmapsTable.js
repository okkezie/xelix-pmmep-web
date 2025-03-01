
import {Table, TableHeader, TableBody, TableRow, TableCell} from "@/components/molecules/Table/Table"
import Dropdown from "@/components/molecules/Dropdown/Dropdown"
import { Constants } from "@/utils/Constants"
import Badge from "@/components/atoms/Badge/Badge"
import { ApprovalStatus } from "@/entities/Roadmaps"
import { deleteRoadMapAction } from "@/actions/roadmapActions"
import ArrowRight from "@/svgs/arrow-right"
import { useAuthContext } from "@/contexts/AuthContext"

export default function RoadmapsTable({ roadmaps }) {
    const { isAuthorized } = useAuthContext()
    const getDropDownItems = (id, isDraft) => {
        let canEdit, canView, canDelete
        canEdit = isAuthorized(Constants.Authorizations.Roadmaps.CreateRoadmaps)
        canDelete = isAuthorized(Constants.Authorizations.Roadmaps.DeleteRoadmap)
        canView = isAuthorized(Constants.Authorizations.Roadmaps.ReadRoadmaps)

        const items = []
        if (canView) {
            items.push( {
                label: 'View',
                icon: <></>,
                href: Constants.Paths.RoadmapsView.replace(':slug', id)
            })
        }
        if(canEdit && isDraft) {
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

    return (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] h-full">
            <div className="max-w-full h-full overflow-x-auto lg:overflow-x-visible">
                <div className="w-full">
                    <Table className=''>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    SN
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Title
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    MDA
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Period
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {roadmaps?.length > 0 ? (
                                roadmaps?.map((roadmap, index) => (
                                <TableRow key={roadmap.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        { index + 1 }
                                    </TableCell>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        { roadmap.title }
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        { roadmap.mda }
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                       { parseRoadmapDate(roadmap.startDate) } <ArrowRight /> { parseRoadmapDate(roadmap.endDate) }
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <div className="flex flex-col lg:flex-row items-center justify-start gap-3">
                                            <span>{ getRoadmapStatusBadge(roadmap.approvalStatus) }</span>
                                            <span>{ getRoadmapDraftBadge(roadmap.isDraft) }</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Dropdown label='Actions' items={getDropDownItems(roadmap?.id, roadmap?.isDraft)}/>
                                    </TableCell>
                                </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="w-full text-left lg:text-center py-8 ">No Roadmaps Found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export const parseRoadmapDate = (date) => {
    if(!date) return ''
    const d = new Date(date)
    // const months = ["January", "February", "March", "April", "May", "June", "July",
    //     "August", "September", "October", "November", "December"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[d.getUTCMonth()]} ${d.getFullYear()}`
}

export const getRoadmapStatusBadge = (status) => {
    let color = ''
    if (status === ApprovalStatus.APPROVED) color = 'success'
    if (status === ApprovalStatus.PENDING) color = 'warning'
    if (status === ApprovalStatus.REJECTED) color = 'error'
    return <Badge variant="light" color={color}>{status}</Badge>
}

export const getRoadmapDraftBadge = (isDraft) => {
    if (!isDraft) return <></>
    const icon = <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.0911 3.53206C16.2124 2.65338 14.7878 2.65338 13.9091 3.53206L5.6074 11.8337C5.29899 12.1421 5.08687 12.5335 4.99684 12.9603L4.26177 16.445C4.20943 16.6931 4.286 16.9508 4.46529 17.1301C4.64458 17.3094 4.90232 17.3859 5.15042 17.3336L8.63507 16.5985C9.06184 16.5085 9.45324 16.2964 9.76165 15.988L18.0633 7.68631C18.942 6.80763 18.942 5.38301 18.0633 4.50433L17.0911 3.53206ZM14.9697 4.59272C15.2626 4.29982 15.7375 4.29982 16.0304 4.59272L17.0027 5.56499C17.2956 5.85788 17.2956 6.33276 17.0027 6.62565L16.1043 7.52402L14.0714 5.49109L14.9697 4.59272ZM13.0107 6.55175L6.66806 12.8944C6.56526 12.9972 6.49455 13.1277 6.46454 13.2699L5.96704 15.6283L8.32547 15.1308C8.46772 15.1008 8.59819 15.0301 8.70099 14.9273L15.0436 8.58468L13.0107 6.55175Z"
            fill="currentColor"
        />
    </svg>
    return <Badge variant="solid" color="light" startIcon={icon}><em>Draft</em></Badge>
}


export const deleteRoadMap = async (id) => {
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