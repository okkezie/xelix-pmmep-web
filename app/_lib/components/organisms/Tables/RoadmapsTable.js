
import {Table, TableHeader, TableBody, TableRow, TableCell} from "@/components/molecules/Table/Table"
import Dropdown from "@/components/molecules/Dropdown/Dropdown"
import { Constants } from "@/utils/Constants"
import { deleteRoadMapAction } from "@/actions/roadmapActions"
import ArrowRight from "@/svgs/arrow-right"
import { useAuthContext } from "@/contexts/AuthContext"
import { getDraftBadge, getStatusBadge, parseDateToMonthYear } from "@/utils/helpers"

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
                                       { parseDateToMonthYear(roadmap.startDate) } <ArrowRight /> { parseDateToMonthYear(roadmap.endDate) }
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <div className="flex flex-col lg:flex-row items-center justify-start gap-3">
                                            <span>{ getStatusBadge(roadmap.approvalStatus) }</span>
                                            <span>{ getDraftBadge(roadmap.isDraft) }</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Dropdown label='Actions' items={getDropDownItems(roadmap?.id, roadmap?.isDraft, roadmap?.approvalStatus)}/>
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