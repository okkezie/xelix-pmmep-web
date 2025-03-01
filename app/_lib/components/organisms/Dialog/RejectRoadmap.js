import { Modal } from "@/components/templates/Modal/Modal"
import Card from "@/components/organisms/Card/Card"
import TextArea from "@/components/atoms/Form/Input/TextArea"
import { useState } from "react"
import { rejectRoadmap } from "@/actions/roadmapActions"
import Button from "@/components/atoms/Form/Button/Button"
import { Constants } from "@/utils/Constants"

export default function RejectRoadmap({show, id, closeCallback}) {
    const [reason, setReason] = useState()

    const reject = () => {
        rejectRoadmap(id, reason)
        closeCallback?.()
        window.location.href = Constants.Paths.Roadmaps
    }

    return (
        <Modal isOpen={show} onClose={closeCallback}  className="max-w-[680px]">
            <Card 
                title='Confirm Roadmap Rejection' 
                description="Are you sure you want to reject this roadmap?"
            >
                <p>Provide an optional comment below to let the author know why you are rejecting this proposal.</p>
                <TextArea
                    rows={3}
                    onChange={(value) => setReason(value)}
                />
                <div className="flex flex-row gap-4 justify-end">
                    <Button variant='outline' onClick={() => closeCallback?.()}>Cancel</Button>
                    <Button variant='danger' onClick={reject}>Reject</Button>
                </div>
            </Card>
        </Modal>
    )
}