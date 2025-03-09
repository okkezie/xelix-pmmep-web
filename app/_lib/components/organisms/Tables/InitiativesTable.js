
import {Table, TableHeader, TableBody, TableRow, TableCell} from "@/components/molecules/Table/Table"
import Dropdown from "@/components/molecules/Dropdown/Dropdown"
import { Constants } from "@/utils/Constants"
import { parseDateToMonthYear, getStatusBadge, getDraftBadge } from '@/utils/helpers'
import ArrowRight from "@/svgs/arrow-right"
import { useAuthContext } from "@/contexts/AuthContext"
import { deleteInitiative } from "@/actions/initiativeActions"

export default function InitiativesTable({ initiatives }) {
    const { isAuthorized } = useAuthContext()
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
                onClick: (id) => deleteInitiativeDialog(id)
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
                            {initiatives?.length > 0 ? (
                                initiatives?.map((initiative, index) => (
                                <TableRow key={initiative.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        { index + 1 }
                                    </TableCell>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        { initiative.title }
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        { initiative.mda }
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                       { 
                                        parseDateToMonthYear(initiative.startDate) } 
                                        <ArrowRight /> 
                                        { parseDateToMonthYear(initiative.endDate) }
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <div className="flex flex-col lg:flex-row items-center justify-start gap-3">
                                            <span>{ getStatusBadge(initiative.approvalStatus) }</span>
                                            <span>{ getDraftBadge(initiative.isDraft) }</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Dropdown label='Actions' items={getDropDownItems(initiative?.id, initiative?.isDraft)}/>
                                    </TableCell>
                                </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="w-full text-left lg:text-center py-8 ">No Initiatives Found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export const deleteInitiativeDialog = async (id) => {
    const pathname = window.location.pathname
    if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS INITIATIVE? \r\nTHIS ACTION CANNOT BE UNDONE.")) {
        const response = await deleteInitiative(id)
        if (response?.success) {
            alert("Initiative deleted successfully!")
            if (pathname === Constants.Paths.Initiatives)
                location.reload()
            else
                location.href = Constants.Paths.Initiatives
        }
    }
}