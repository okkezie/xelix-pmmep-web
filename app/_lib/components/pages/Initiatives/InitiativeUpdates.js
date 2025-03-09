import Card from "@/components/organisms/Card/Card"
import { Modal } from "@/components/templates/Modal/Modal"
import { formatRelative } from "date-fns"
import Image from "next/image"
import Button from "@/components/atoms/Form/Button/Button"
import { useModal } from "@/hooks/useModal"
import { useEffect, useState } from "react"
import AttachmentBadge from "@/components/atoms/AttachmentBadge/AttachmentBadge"
import Label from "@/components/atoms/Form/Label"
import TextArea from "@/components/atoms/Form/Input/TextArea"
import FileInput from "@/components/atoms/Form/Input/FileInput"

const InitiativeUpdates = ({initiative}) => {
    const {openModal, closeModal, isOpen} = useModal()
    const [updates, setUpdates] = useState([])

    useEffect(() => {
        const updatesData = [
            {
                message: "Everything is going on perfectly fine as it should. The project is on track!",
                author: {
                    name: "Okezie Arukwe",
                    id: "01",
                    avatar: "/assets/images/user/user-18.jpg"
                },
                createdAt: "10-02-2025",
                images: [
                    "/assets/images/product/product-01.jpg", 
                    "/assets/images/chat/chat.jpg"
                ],
                files: [
                    { name: "Document1", path: "/doc1.doc", type: "doc"},
                    { name: "Document2", path: "/doc2.doc", type: "pdf"}
                ]
            },
            {
                message: "Everything is going on perfectly fine as it should. The project is on track!",
                author: {
                    name: "Julius Onyema",
                    id: "012",
                    avatar: "/assets/images/user/user-20.jpg"
                },
                createdAt: "01-01-2025",
                images: [
                    "/assets/images/product/product-05.jpg", 
                ]
            },
            {
                message: "Take a look at this updated document and review it. We need it by the end of the week to ensure we stay on target. Thank you very much.",
                author: {
                    name: "John Smith",
                    id: "015",
                    avatar: "/assets/images/user/user-15.jpg"
                },
                createdAt: "2-30-2025",
                files: [
                    { name: "Project document review.doc", url: "/doc3.doc", type: "doc"},
                ]
            }
        ]

        setUpdates(updatesData)
    }, [])

    return (
        <>
        <Card contentClass="flex flex-col">
            <div className="flex flex-row w-full justify-between items-end mb-4 border-b pb-4">
                <h4 className="font-medium text-lg">Project Updates</h4>
                <Button variant="outline" onClick={openModal}>
                    Post new update
                </Button>
            </div>
            {updates && updates?.map((u, index) =>
            <div className="flex items-start gap-4 pt-6 w-full border-b border-gray-300 last:border-b-0 pb-6" key={index+1}>
                <div className="w-10 h-10 overflow-hidden rounded-full">
                    <Image alt="Kaiya George profile"
                        loading="lazy"
                        width="40"
                        height="40"
                        decoding="async"
                        className="object-cover object-center w-full h-full"
                        src={u?.author?.avatar}
                        style={{color: "transparent"}}
                    />
                </div>
                <div className="w-full">
                    <p className="mb-2 text-gray-500 text-theme-xs dark:text-gray-400">{u.author?.name}, {u.author?.userType}</p>
                    <div className="mb-2 w-full overflow-hidden rounded-lg flex flex-col lg:flex-row gap-6 flex-wrap">
                        { u?.images && u?.images?.map(i => 
                        <Image
                            key={i} 
                            alt="chat" 
                            loading="lazy" 
                            width="270" 
                            height="150" 
                            decoding="async" 
                            data-nimg="1"
                            className="object-cover w-full max-w-[400px]"
                            src={i}
                            style={{color: "transparent"}}
                        />
                        )}
                    </div>
                    <div
                        className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-white/90 rounded-tl-sm w-fit">
                        <p className="text-sm ">{u.message}</p>
                    </div>
                    <div className="flex flex-row w-fit gap-6 mt-4">
                        {u?.files && u?.files?.map((f, index) => 
                            <AttachmentBadge file={f} key={index+1} />
                        )}
                    </div>
                    <p className="mt-2 text-gray-500 text-theme-xs dark:text-gray-400">{formatRelative(new Date(u.createdAt), new Date())}</p>
                </div>
            </div>
            )}
        </Card>
        <Modal isOpen={isOpen} onClose={closeModal} className={'max-w-[700px]'}>
            <Card title={'Post update'}>
                <form>
                    <div className="">
                        <Label
                            htmlFor="update"
                        >
                            Update
                            <br />
                            <small>Describe the project in detail.</small>
                        </Label>
                        <TextArea
                            id="update"
                            name="update"
                            rows={4}
                            placeholder="Enter Update"
                            required
                        />
                    </div>
                    <div className="">
                        <Label
                            htmlFor="files"
                        >
                            Attachments
                            <br />
                            <small>Attach optional files or images to your update</small>
                        </Label>
                        <FileInput
                            id="files"
                            name="files"
                            placeholder="Choose files to upload"
                        />
                    </div>
                    <div className="flex items-center justify-end w-full gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={closeModal}
                            type='button'
                            name='cancel'
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Submit Update
                        </Button>
                    </div>
                </form>
            </Card>
        </Modal>
        </>
    )
}

export default InitiativeUpdates