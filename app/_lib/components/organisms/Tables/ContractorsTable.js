
import Image from "next/image"
import {Table, TableHeader, TableBody, TableRow, TableCell} from "@/components/molecules/Table/Table"
import Button from "@/components/atoms/Form/Button/Button"
import { getDefaultUserAvatar, isNullOrEmptyString } from "@/utils/helpers"

export default function ContractorsTable({ contractors }) {

    const getAvatar = (contractor) => {
        return isNullOrEmptyString(contractor?.logo) ? getDefaultUserAvatar(contractor?.name) : contractor?.logo
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                    <Table>
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
                                    Contractor
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Industry
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Address
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Contact Person
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
                            {contractors?.length > 0 ? (
                                contractors?.map((contractor, index) => (
                                <TableRow key={contractors.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    src={getAvatar(contractor)}
                                                    alt={contractor.name}
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {contractor.name}
                                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                    {contractor.website} | {contractor.email} | {contractor.phone}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {contractor.industry}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {contractor.address}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <div>
                                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {contractor.contactPersonName}
                                            </span>
                                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                {contractor.contactPersonDesignation} | {contractor.contactPersonEmail} | {contractor.contactPersonPhone}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="w-full text-center py-8 ">No contractors found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>

    )
}
