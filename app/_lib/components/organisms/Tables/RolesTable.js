import {Table, TableHeader, TableBody, TableRow, TableCell} from "@/components/molecules/Table/Table"
import Badge from "@/components/atoms/Badge/Badge"
import Button from "@/components/atoms/Form/Button/Button"

export default function RolesTable({ roles }) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] w-full">
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
                                    Role
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Description
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Permissions
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
                            {roles.length > 0 ? (
                                roles.map((role, index) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            {role.name}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {role.description}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 flex flex-wrap max-w-[200px]">
                                            <div className="flex flex-wrap gap-2">
                                                {role.permissions.slice(0, 5).map((permission) => (
                                                    <Badge
                                                        key={permission}
                                                        size="sm"
                                                        className="m-2"
                                                    >
                                                        {permission}
                                                    </Badge>
                                                ))}
                                                {role.permissions.length > 5 && (
                                                    <Badge
                                                        size="sm"
                                                        className="mr2"
                                                        variant="solid"
                                                        color="gray"
                                                    >
                                                        +{role.permissions.length - 5} more permissions
                                                    </Badge>
                                                )}
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
                                    <TableCell colSpan={5} className="w-full text-center py-8 ">No roles found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
