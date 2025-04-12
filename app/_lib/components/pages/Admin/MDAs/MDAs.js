import MDAsTable from "@/components/organisms/Tables/MDAsTable"
import Button from "@/components/atoms/Form/Button/Button"
import { Modal } from "@/components/templates/Modal/Modal"
import MdaForm from "@/components/organisms/MdaForm/MdaForm"
import Card from "@/components/organisms/Card/Card"
import { useState } from "react"

export default function MDAs({ mdas }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
        <Card className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center justify-end">
                <Button variant="outline" className="mb-4" onClick={() => setIsOpen(true)}>
                    Create New MDA
                </Button>
            </div>
            <MDAsTable mdas={mdas} />
        </Card>
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            className="max-w-[700px] m-4"
        >
            <MdaForm closeModal={() => setIsOpen(false)} />
        </Modal>
        </>
    )
}
