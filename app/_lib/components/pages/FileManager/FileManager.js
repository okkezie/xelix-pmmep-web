'use client'
import Plus from "@/svgs/plus"
import Search from "@/svgs/search"
import Card from "@/components/organisms/Card/Card"
import Folder from "@/svgs/folder"
import { useState, useRef, useEffect } from "react"
import VerticalEllipses from "@/svgs/vertical-ellipses"
import ArrowRight from "@/svgs/arrow-right"
import Link from "next/link"
import Download from "@/svgs/download"
import File from "@/svgs/file"
import Video from "@/svgs/video"
import Audio from "@/svgs/audio"
import FolderLine from "@/svgs/folder-line"
import Apps from "@/svgs/apps"
import dynamic from "next/dynamic";
import SimpleTable from "@/components/organisms/Table/SimpleTable"
import Trash from "@/public/svgs/trash"
import Image from "next/image"
const Chart = dynamic(() => import('react-apexcharts'), {ssr: false})

export default function FileManager() {
    return (
        <>
            <Card className="mb-4">
                <SummaryHeader />
                <FilesSummary />
            </Card>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 xl:col-span-8">
                    <Card>
                        <Folders />
                    </Card>
                </div>
                <div className="col-span-12 xl:col-span-4">
                    <Card>
                        <StorageSummaryHeader />
                        <StorageSummary />
                    </Card>
                </div>
            </div>

            <Card className="mt-4">
                <RecentFilesHeader />
                <RecentFiles />
            </Card>
        </>
    )
}

const SummaryHeader = () => {
    return (
        <div className="px-4 py-4 sm:pl-6 sm:pr-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    All Media
                </h3>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative">
                        <button className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                            <Search />
                        </button>
                        <input type="text" placeholder="Search..."
                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-[42px] pr-3.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]" />
                    </div>

                    <button
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 sm:w-auto">
                        <Plus />
                        Upload File
                    </button>
                </div>
            </div>
        </div>
    )
}

const FilesSummary = () => {
    const files = [
        {
            name: "Image",
            icon: <FolderLine />,
            color: "bg-success-500/[0.08] text-success-500",
            percentage: "17% Used",
            files: "245 files",
            size: "26.40 GB"
        },
        {
            name: "Videos",
            icon: <Video />,
            color: "bg-theme-pink-500/[0.08] text-theme-pink-500",
            percentage: "22% Used",
            files: "245 files",
            size: "26.40 GB"
        },
        {
            name: "Audio",
            icon: <Audio />,
            color: "bg-blue-500/[0.08] text-blue-light-500",
            percentage: "24% Used",
            files: "245 files",
            size: "26.40 GB"
        },
        {
            name: "Apps",
            icon: <Apps />,
            color: "bg-orange-500/[0.08] text-orange-500",
            percentage: "46% Used",
            files: "245 files",
            size: "26.40 GB"
        },
        {
            name: "Documents",
            icon: <File />,
            color: "bg-warning-500/[0.08] text-warning-500",
            percentage: "24% Used",
            files: "245 files",
            size: "26.40 GB"
        },
        {
            name: "Downloads",
            icon: <Download />,
            color: "bg-theme-purple-500/[0.08] text-theme-purple-500",
            percentage: "24% Used",
            files: "245 files",
            size: "26.40 GB"
        }
    ]

    return (
        <div className="border-t border-gray-100 p-4 dark:border-gray-800 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                {files.map((file, index) => (
                    <div
                        key={index + 1}
                        className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white py-4 pl-4 pr-4 dark:border-gray-800 dark:bg-white/[0.03] xl:pr-5">
                        <div className="flex items-center gap-4">
                            <div
                                className={`flex h-[52px] w-[52px] items-center justify-center rounded-xl ${file.color}`}>
                                {file.icon}
                            </div>

                            <div>
                                <h4 className="mb-1 text-sm font-medium text-gray-800 dark:text-white/90">
                                    {file.name}
                                </h4>
                                <span className="block text-sm text-gray-500 dark:text-gray-400">
                                    {file.percentage}
                                </span>
                            </div>
                        </div>

                        <div>
                            <span className="mb-1 block text-right text-sm text-gray-500 dark:text-gray-400">
                                {file.files}
                            </span>
                            <span className="block text-right text-sm text-gray-500 dark:text-gray-400">
                                {file.size}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Folders = () => {
    const folders = [
        {
            name: "Image",
            noOfFiles: "345",
            size: "100MB"
        },
        {
            name: "Documents",
            noOfFiles: "345",
            size: "100MB"
        },
        {
            name: "Downloads",
            noOfFiles: "345",
            size: "100MB"
        },
        {
            name: "Videos",
            noOfFiles: "345",
            size: "100MB"
        }
    ]
    return (
        <>
            <FoldersHeader />
            <div className="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                    { folders.map((folder, index) => (
                    <div
                        key={index+1}
                        className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-6 dark:border-gray-800 dark:bg-white/[0.03] xl:py-[27px]">
                        <div className="mb-6 flex justify-between">
                          <div>
                            <Folder />
                          </div>
            
                          <FolderDropdown />
                        </div>
            
                        <h4 className="mb-1 text-sm font-medium text-gray-800 dark:text-white/90">
                          {folder.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="block text-sm text-gray-500 dark:text-gray-400">
                            {folder.noOfFiles} Files
                          </span>
                          <span className="block text-right text-sm text-gray-500 dark:text-gray-400">
                            {folder.size}
                          </span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}

const FolderDropdown = () => {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])
    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setOpen(old => !old)}
                className={`${open ? 'text-gray-700 dark:text-white' : 'text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}>
                <VerticalEllipses />
            </button>
            <div
                className={`absolute right-0 top-full z-40 w-40 space-y-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${open ? "block" : "hidden"}`}>
                <button
                    className="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                    View More
                </button>
                <button
                    className="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                    Delete
                </button>
            </div>
        </div>
    )
}

const FoldersHeader = () => {
    return (
        <div className="px-4 py-4 sm:pl-6 sm:pr-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    All Folders
                </h3>

                <Link href="/#"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500">
                    View All
                    <ArrowRight />
                </Link>
            </div>
      </div>
    )
}

const StorageSummaryHeader = () => {
    return (
        <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Storage Details
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            585 GB Free space left
          </p>
        </div>

        <FolderDropdown />
      </div>
    )
}

const StorageSummary = () => {
    const pieSeries = [44, 55, 41, 17, 56]
    const pieOptions = {
        chart: {
            width: 380,
            type: 'donut',
        },
        colors: ["#9b8afb", "#fd853a", "#fdb022", "#32d583", "gray"],
        labels: ['Downloads', 'Apps', 'Documents', 'Media', 'Free'],
        stroke: {
            show: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    lineCap: "smooth",
                    size: "65%",
                    background: "transparent",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            offsetY: 0,
                            fontSize: "12px",
                            fontWeight: "normal",
                            text: "Total 135GB"
                        },
                        value: {
                            show: true,
                            offsetY: 10,
                            fontSize: "14px",
                            formatter: () => "Used of 135 GB"
                        },
                        total: {
                            show: true,
                            label: "Total 135 GB",
                            fontSize: "24px",
                            fontWeight: "bold"
                        }
                    }
                },
                expandOnClick: false
            }
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "left",
            fontFamily: "Outfit",
            fontSize: "14px",
            fontWeight: 400,
            markers: {
                size: 5,
                shape: "circle",
                radius: 999,
                strokeWidth: 0
            },
            itemMargin: {
                horizontal: 10,
                vertical: 6
            }
        },
        fill: {
            type: 'gradient',
        },
    }
    return (
        <Chart
             options={pieOptions}
            series={pieSeries}
            type="donut"
            width="500"
        />
    )
}

const RecentFilesHeader = () => {
    return (
        <div className="mb-4 flex items-center justify-between px-6">
            <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Recent Files
            </h3>
            </div>

            <Link href="#"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500">
                View All
                <ArrowRight />
            </Link>
        </div>
    )
}

const RecentFiles = () => {
    const headers = ['File Name', 'Category', 'Size', 'Date Modified', 'Action']
    const body = [
        [
            <div key={1} className="flex flex-row items-center justify-start gap-2">
                <div>
                  <Image src="/assets/images/icons/file-image.svg" alt="icon" className="dark:hidden" height={20} width={20} />
                  <Image src="/assets/images/icons/file-image-dark.svg" alt="icon" className="hidden dark:block" height={20} width={20} />
                </div>
                Video_947954.mp4
            </div>,
            'Video',
            '100MB',
            '12 Jan, 2027',
            <TableRowActions key={1} />
        ],
        [
            <div key={1} className="flex flex-row items-center justify-start gap-2">
                <div>
                  <Image src="/assets/images/icons/file-image.svg" alt="icon" className="dark:hidden" height={20} width={20} />
                  <Image src="/assets/images/icons/file-image-dark.svg" alt="icon" className="hidden dark:block" height={20} width={20} />
                </div>
                Travel.jpeg
            </div>,
            'Image',
            '100MB',
            '12 Jan, 2027',
            <TableRowActions key={1} />
        ],
        [
            <div key={1} className="flex flex-row items-center justify-start gap-2">
                <div>
                  <Image src="/assets/images/icons/file-image.svg" alt="icon" className="dark:hidden" height={20} width={20} />
                  <Image src="/assets/images/icons/file-image-dark.svg" alt="icon" className="hidden dark:block" height={20} width={20} />
                </div>
                Document.pdf
            </div>,
            'Document',
            '100MB',
            '12 Jan, 2027',
            <TableRowActions key={1} />
        ]
    ]
    
    return (
        <SimpleTable name={'Recent Files'} headers={headers} body={body} showSN={false} />
    )
}

const TableRowActions = () => {
    return (
        <div className="col-span-2 flex items-center">
            <div className="flex w-full items-center justify-center gap-2">
                <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
                    <Trash />
                </button>
                <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                    <svg className="fill-current" width="21" height="20" viewBox="0 0 21 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M10.8749 13.8619C8.10837 13.8619 5.74279 12.1372 4.79804 9.70241C5.74279 7.26761 8.10837 5.54297 10.8749 5.54297C13.6415 5.54297 16.0071 7.26762 16.9518 9.70243C16.0071 12.1372 13.6415 13.8619 10.8749 13.8619ZM10.8749 4.04297C7.35666 4.04297 4.36964 6.30917 3.29025 9.4593C3.23626 9.61687 3.23626 9.78794 3.29025 9.94552C4.36964 13.0957 7.35666 15.3619 10.8749 15.3619C14.3932 15.3619 17.3802 13.0957 18.4596 9.94555C18.5136 9.78797 18.5136 9.6169 18.4596 9.45932C17.3802 6.30919 14.3932 4.04297 10.8749 4.04297ZM10.8663 7.84413C9.84002 7.84413 9.00808 8.67606 9.00808 9.70231C9.00808 10.7286 9.84002 11.5605 10.8663 11.5605H10.8811C11.9074 11.5605 12.7393 10.7286 12.7393 9.70231C12.7393 8.67606 11.9074 7.84413 10.8811 7.84413H10.8663Z"
                            fill="" />
                    </svg>
                </button>
            </div>
        </div>
    )
}