
"use client"
import { useDropzone } from "react-dropzone"
import Card from "@/components/organisms/Card/Card"
import PaperClip from "@/svgs/paperclip"
import Close from "@/svgs/close-line"
import Upload from "@/svgs/upload"
import Button from "./Button/Button"
import { formatBytes } from "@/app/_lib/utils/helpers"
import { useCallback, useRef } from "react"

const defaultAccept = {
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

const FileDrop = ({ title, files = [], setFiles, accept, uploadAction }) => {
    const filesRef = useRef()

    const updateFilesRef = useCallback((files = []) => {
        console.log({files})
        if (filesRef.current && files) {
            const dataTransfer = new DataTransfer()
            files?.forEach((v) => {
                dataTransfer.items.add(v)
            })
            console.log({dataTransfer})
            filesRef.current.files = dataTransfer.files
        }
    }, [])

    const onDrop = (selected) => {
        setFiles?.([...files, ...selected])
        updateFilesRef(selected)
    }

    const removeFile = (selected) => {
        const newFiles = [...files].filter(f => f.name !== selected.name && f.path !== selected.path)
        setFiles?.(newFiles)
        updateFilesRef(newFiles)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: accept ?? defaultAccept
    })

    return (
        <Card title={title}>
            <form
                action={uploadAction}
                id="upload"
            >
                <div
                    {...getRootProps()}
                    className={
                    `dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
                        ${ isDragActive 
                            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                        }
                    `}
                >
                    <div 
                        className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500"
                    >
                
                        <input {...getInputProps()} />
                        <input type="file" name="files" multiple style ={{opacity: 0}} ref={filesRef} />
                        <div className="dz-message flex flex-col items-center m-0!">
                            <div className="mb-[22px] flex justify-center">
                                <div className="flex h-[68px] w-[68px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                    <Upload />
                                </div>
                            </div>

                            <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                                {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
                            </h4>

                            <span className=" text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
                                {/* Drag and drop your DOC, PDF, XLSX, PPTX, PNG, JPG, WebP, MP4, MP3 Files here here or click to browse */}
                                Drag and drop your files here or click to browse
                            </span>

                            <span className="font-medium underline text-theme-sm text-brand-500">
                                Browse File
                            </span>
                        </div>
                        
                    </div>
                </div>
                <AttachedFilesList files={files} removeFile={removeFile} />
                { (files && files.length > 0 && uploadAction) &&
                    <Button type='submit' variant="outline_primary" size="sm">
                        <Upload /> {files.length > 1 ? 'Upload Files' : 'Upload File'}
                    </Button>
                }
            </form>
        </Card>
    )
}

const AttachedFilesList = ({files, removeFile}) => {
    return (
        files && 
        <div className="flex flex-row flex-wrap gap-2 text-center mb-5 block w-full text-sm text-gray-700 dark:text-gray-600 mt-2">
        { files.map( f =>
            <div 
                className="flex flex-row items-center justify-between gap-1 bg-gray-100 w-fit p-2 rounded-lg text-sm" 
                key={f.path}
            >
                <span className="flex flex-row gap-1 items-center justify-start">
                    <PaperClip /> <span className=" truncate max-w-[200px]">{f.name}</span>
                </span>
                <div className="flex flex-row gap-1 items-center justify-between">
                    <span className="mr-1">{formatBytes(f.size)}</span>
                    <button onClick={() => removeFile(f)}><Close /></button>
                </div>
            </div>
        )}
        </div>
    )
}

export default FileDrop