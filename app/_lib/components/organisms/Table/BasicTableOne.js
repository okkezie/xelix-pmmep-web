import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/molecules/Table/Table"

import Badge from "@/components/atoms/Badge/Badge"
import Image from "next/image"

// Define the table data using the interface
const tableData = [
  {
    id: 1,
    user: {
      image: "/assets/images/user/user-17.jpg",
      name: "A & B Construction Co.",
      role: "Contractor",
    },
    projectName: "School Renovation",
    team: {
      images: [
        "/assets/images/user/user-22.jpg",
        "/assets/images/user/user-23.jpg",
        "/assets/images/user/user-24.jpg",
      ],
    },
    budget: "39M",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/assets/images/user/user-18.jpg",
      name: "CD Road Construction Co.",
      role: "Contractor",
    },
    projectName: "Road Rehabilitation",
    team: {
      images: ["/assets/images/user/user-25.jpg", "/assets/images/user/user-26.jpg"],
    },
    budget: "249M",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/assets/images/user/user-17.jpg",
      name: "DC Development Co.",
      role: "Contractor",
    },
    projectName: "Hospital Reconstruction",
    team: {
      images: ["/assets/images/user/user-27.jpg"],
    },
    budget: "127M",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/assets/images/user/user-20.jpg",
      name: "ACME Medicals Inc",
      role: "Suppliers",
    },
    projectName: "Medical Equipment Renewal",
    team: {
      images: [
        "/assets/images/user/user-28.jpg",
        "/assets/images/user/user-29.jpg",
        "/assets/images/user/user-30.jpg",
      ],
    },
    budget: "28M",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      image: "/assets/images/user/user-21.jpg",
      name: "Ministry of Works",
      role: "Project Manager",
    },
    projectName: "Government Offices Renovation",
    team: {
      images: [
        "/assets/images/user/user-31.jpg",
        "/assets/images/user/user-32.jpg",
        "/assets/images/user/user-33.jpg",
      ],
    },
    budget: "45m",
    status: "Active",
  },
]

const TableOne = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Owner
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Project Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Team
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
                  Budget
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={order.user.image}
                          alt={order.user.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.user.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.user.role}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.projectName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">
                      {order.team.images.map((teamImage, index) => (
                        <div
                          key={index+1}
                          className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                        >
                          <Image
                            width={24}
                            height={24}
                            src={teamImage}
                            alt={`Team member ${index + 1}`}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        order.status === "Active"
                          ? "success"
                          : order.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.budget}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default TableOne;