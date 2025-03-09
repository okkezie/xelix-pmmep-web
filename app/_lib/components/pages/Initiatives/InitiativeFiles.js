import { useEffect, useState } from "react"
import { Modal } from "@/components/templates/Modal/Modal"
import Card from "@/components/organisms/Card/Card"
import FileDrop from "@/components/atoms/Form/FileDrop"
import Button from "@/components/atoms/Form/Button/Button"
import { useModal } from "@/hooks/useModal"
import Upload from "@/svgs/upload"
import { uploadProjectFiles } from "@/actions/projectActions"

export default function InitiativeFiles ({initiative}) {

    const {isOpen, closeModal, openModal } = useModal()
    const [files, setFiles] = useState()
    const [selectedFiles, setSelectedFiles] = useState([])

    useEffect(() => {
        const filesData = [
            {
                fileName: "Project requirements specification document.doc",
                fileType: "document",
                fileSize: "120 kb",
                fileUrl: "/file",
            },
            {
                fileName: "Project_design_document2.doc",
                fileType: "document",
                fileSize: "120 kb",
                fileUrl: "/file-design",
            },
            {
                fileName: "Project_image.doc",
                fileType: "image",
                fileSize: "120 kb",
                fileUrl: "/file-image",
            }
        ]

        setFiles(filesData)
    }, [])

    const accept = {
        "image/png": [],
        "image/jpeg": [],
        "image/webp": [],
        "application/pdf": [],
        "application/msword": [],
        "application/vnd.ms-excel": [],
        "application/vnd.ms-powerpoint": [],
        "text/plain": [],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
        "application/vnd.openxmlformats-officedocument.presentationml.slideshow": [],
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": [],
        "audio/mpeg": [],
        "audio/aac": [],
        "video/mp4": [],
        "video/mpeg": [],
    }

    return (
        <>
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
            <div className="flex flex-row w-full justify-between items-end mb-4 border-b pb-4">
                <h4 className="font-medium text-lg">Project Documents</h4>
                <Button 
                    onClick={openModal}
                    size="sm"
                    variant='outline'
                    className="block"
                >
                    <Upload /> Upload Document
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                {files && files?.map(f => 
                    <FileCard 
                        fileName={f.fileName} 
                        fileSize={f.fileSize} 
                        fileType={f.fileType}
                        fileUrl={f.fileUrl}
                        key={f.fileUrl}
                    />
                )}
            </div>
        </div>
        <Modal isOpen={isOpen} onClose={closeModal} className={'max-w-[700px]'}>
            <Card title={'Upload Project Related File'}>
                <FileDrop 
                    files={selectedFiles}
                    setFiles={setSelectedFiles}
                    accept={accept} 
                    uploadAction={uploadProjectFiles}
                />
            </Card>
        </Modal>
        </>
    )
}

const FileCard = ({fileName, fileType, fileSize, fileUrl}) => {
    const icon = (fileType === 'video' || fileType === 'image') ?
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none">
            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5"
                d="M6.708 5.931V18.07a1.5 1.5 0 0 0 2.285 1.278l9.884-6.069a1.5 1.5 0 0 0 0-2.556L8.993 4.653a1.5 1.5 0 0 0-2.285 1.278Z"></path>
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none"
            className="file_svg__fill-current">
            <path fill="currentColor" fillRule="evenodd"
                d="M19.834 19.75a2.25 2.25 0 0 1-2.25 2.25h-10.5a2.25 2.25 0 0 1-2.25-2.25V9.621c0-.596.236-1.169.658-1.59L10.86 2.66A2.25 2.25 0 0 1 12.45 2h5.133a2.25 2.25 0 0 1 2.25 2.25zm-2.25.75a.75.75 0 0 0 .75-.75V4.25a.75.75 0 0 0-.75-.75h-5.002l.002 4a2.25 2.25 0 0 1-2.25 2.25h-4v10c0 .414.335.75.75.75zM7.393 8.25l3.69-3.691.001 2.941a.75.75 0 0 1-.75.75zm1.19 6.25a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75m0 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75"
                clipRule="evenodd"></path>
        </svg>

    return (
        <div className="grid grid-cols-4 rounded-2xl border border-gray-100 bg-white py-4 pl-4 pr-4 dark:border-gray-800 dark:bg-white/[0.03] xl:pr-5">
            <div className="col-span-3">
                <div className="flex flex-col gap-4">
                    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-success-500/[0.08] text-success-500">
                        {icon}
                    </div>
                    <div className="flex flex-col">
                        <h4 className="mb-1 text-sm font-medium text-gray-800 dark:text-white/90 flex-wrap">{fileName}</h4>
                        <span className="block text-sm text-gray-500 dark:text-gray-400">{fileType}</span>
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <div className="flex flex-col items-end justify-end">
                    <span className="block mb-1 text-sm text-right text-gray-500 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none"
                            className="download_svg__fill-current">
                            <path fill="currentColor" fillRule="evenodd"
                                d="M12.669 16.75a.75.75 0 0 1-.548-.237l-4.61-4.607a.75.75 0 0 1 1.06-1.061l3.348 3.345V4a.75.75 0 0 1 1.5 0v10.185l3.343-3.34a.75.75 0 0 1 1.06 1.06l-4.575 4.573a.75.75 0 0 1-.578.272M5.417 16a.75.75 0 0 0-1.5 0v2.5a2.25 2.25 0 0 0 2.25 2.25h13a2.25 2.25 0 0 0 2.25-2.25V16a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 1-.75.75h-13a.75.75 0 0 1-.75-.75z"
                                clipRule="evenodd"></path>
                        </svg>
                    </span>
                    <span className="block text-sm text-right text-gray-500 dark:text-gray-400">{fileSize}</span>
                </div>
            </div>
        </div>
    )
}
