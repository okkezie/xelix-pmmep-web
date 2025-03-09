
import {Table, TableHeader, TableBody, TableRow, TableCell} from "@/components/molecules/Table/Table"
import Dropdown from "@/components/molecules/Dropdown/Dropdown"
import { Constants } from "@/utils/Constants"
import { parseDateToMonthYear, getStatusBadge, getDraftBadge } from '@/utils/helpers'
import ArrowRight from "@/svgs/arrow-right"
import { useAuthContext } from "@/contexts/AuthContext"
import { useState } from "react"
import Confirm from "../Confirm/Confirm"
import { deleteProject } from "@/app/_lib/actions/projectActions"

export default function ProjectsTable({ projects }) {
    const { isAuthorized } = useAuthContext()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [idForDelete, setIdForDelete] = useState()

    const getDropDownItems = (id, isDraft, status) => {
        let canEdit, canView, canDelete, isRejected
        canEdit = isAuthorized(Constants.Authorizations.Projects.Create)
        canDelete = isAuthorized(Constants.Authorizations.Projects.Delete)
        canView = isAuthorized(Constants.Authorizations.Projects.Read)
        isRejected = status === Constants.ApprovalStatus.REJECTED

        const items = []
        if (canView) {
            items.push( {
                label: 'View',
                icon: <></>,
                href: Constants.Paths.ProjectsView.replace(':slug', id)
            })
        }
        if(canEdit && (isDraft || isRejected)) {
            items.push({
                label: 'Edit',
                icon: <></>,
                href: Constants.Paths.ProjectsEdit.replace(':slug', id)
            })
        }
        if (canDelete && isDraft) {
            items.push({
                label: 'Delete',
                icon: <></>,
                onClick: (id) => {
                    setIdForDelete(id)
                    setShowDeleteDialog(true)
                }
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
                            {projects?.length > 0 ? (
                                projects?.map((project, index) => (
                                <TableRow key={project.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        { index + 1 }
                                    </TableCell>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        { project.name }
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        { project.mda }
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                       { parseDateToMonthYear(project.startDate) } <ArrowRight /> { parseDateToMonthYear(project.endDate) }
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <div className="flex flex-col lg:flex-row items-center justify-start gap-3">
                                            <span>{ getStatusBadge(project.approvalStatus) }</span>
                                            <span>{ getDraftBadge(project.isDraft) }</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Dropdown label='Actions' items={getDropDownItems(project?.id, project?.isDraft, project.approvalStatus)}/>
                                    </TableCell>
                                </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="w-full text-left lg:text-center py-8 ">No Projects Found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Confirm
                show={showDeleteDialog}
                close={() => setShowDeleteDialog(false)}
                entity={'Project'}
                action={() => deleteProject(idForDelete)}
                actionType={Constants.ConfirmActionType.Delete}
                redirect={Constants.Paths.Projects}
            />
        </div>
    )
}