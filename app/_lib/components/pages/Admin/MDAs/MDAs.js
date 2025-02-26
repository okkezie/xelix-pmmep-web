import MDAsTable from "@/components/organisms/Tables/MDAsTable"
import Button from "@/components/atoms/Form/Button/Button"
import { Modal } from "@/components/templates/Modal/Modal"
import NewMdaForm from "@/components/organisms/NewMdaForm/NewMdaForm"
import { useState } from "react"
import Card from "@/components/organisms/Card/Card"

export default function MDAs( { mdas} ) {
    const [isOpen, setIsOpen] = useState(false)
    const close = () => {
        setIsOpen(false)
    }

    const createMdaAction = (data) => {
        console.log(data)
        alert("Mda created successfully")
    }

    return (
        <>
        <Card className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center justify-end">
                <Button variant="outline" className="mb-4" onClick={() => setIsOpen(true)}>Create New MDA</Button>
            </div>
            <MDAsTable mdas={mdas} />
        </Card>
        <Modal
            isOpen={isOpen}
            onClose={close}
            className="max-w-[700px] m-4"
        >
            <NewMdaForm closeModal={close} submitAction={createMdaAction} />
        </Modal>
        </>
    )
}
