
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/molecules/Table/Table"

export default function SimpleTable({name, headers, body, showSN = true}) {

    return (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] h-full">
            <div className="max-w-full h-full overflow-x-auto lg:overflow-x-visible">
                <div className="w-full">
                    <Table className=''>
                        {headers && 
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                {showSN && <TableCell
                                    isHeader
                                    className="px-4 py-4 font-medium text-gray-500 text-start text-md dark:text-gray-400"
                                >
                                    SN
                                </TableCell>}
                                { headers?.map((h, index) => 
                                <TableCell
                                    key={index+1}
                                    isHeader
                                    className="px-4 py-4 font-medium text-gray-500 text-start text-md dark:text-gray-400"
                                >
                                    {h}
                                </TableCell>
                                )}
                            </TableRow>
                        </TableHeader>
                        }
                        { body &&
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {body?.length > 0 ? (
                                body?.map((item, index) => (
                                <TableRow key={index+ 1}>
                                    {showSN && <TableCell className="px-2 py-3 sm:px-4 text-start">
                                        { index + 1 }
                                    </TableCell>}
                                    { item?.map((i, j) => 
                                    <TableCell
                                        key={j+1}
                                        isHeader
                                        className="px-2 py-3 font-medium text-gray-500 text-start dark:text-gray-400 text-sm"
                                    >
                                        {i}
                                    </TableCell>
                                    )}
                                </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="w-full text-left lg:text-center py-8 ">No {name} Found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        }
                    </Table>
                </div>
            </div>
        </div>
    )

}