import { Modal } from "@/components/templates/Modal/Modal"
import Card from "@/components/organisms/Card/Card"
import TextArea from "@/components/atoms/Form/Input/TextArea"
import { useState } from "react"
import { approveRoadmap } from "@/actions/roadmapActions"
import Button from "@/components/atoms/Form/Button/Button"
import { Constants } from "@/utils/Constants"

export default function ApproveRoadmap({id, show, closeCallback}) {

    const [reason, setReason] = useState()

    const approve = async () => {
        await approveRoadmap(id, reason)
        closeCallback?.()
        window.location.href = Constants.Paths.Roadmaps
    }

    return (
        <Modal isOpen={show} onClose={closeCallback} className="max-w-[680px]">
            <Card
                title='Confirm Roadmap Approval'
                description="Are you sure you want to approve this roadmap?"
            >
                <p>You can enter an optional comment below to pass additional message to the author of this roadmap.</p>
                <TextArea
                    rows={3}
                    onChange={(value) => setReason(value)}
                />
                <div className="flex flex-row gap-4 justify-end">
                    <Button variant='outline' onClick={() => closeCallback?.()}>Cancel</Button>
                    <Button variant='primary' onClick={approve}>Approve</Button>
                </div>
            </Card>
        </Modal>
    )
}