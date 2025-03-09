
import { Modal } from "@/components/templates/Modal/Modal"
import Card from "@/components/organisms/Card/Card"
import TextArea from "@/components/atoms/Form/Input/TextArea"
import { useState } from "react"
import Button from "@/components/atoms/Form/Button/Button"
import { Constants } from "@/utils/Constants"
import { toLowerCase, toTitleCase } from "@/utils/helpers"

export default function Confirm({
    close, 
    show, 
    action, 
    entity, 
    actionType, 
    redirect = Constants.Paths.Dashboard
}) {

    const [reason, setReason] = useState()

    const act = async () => {
        await action(reason)
        close?.()
        window.location.href = redirect
    }

    const getVerb = () => {
        switch(actionType) {
            case Constants.ConfirmActionType.Approve:
                return " Approval"
            case Constants.ConfirmActionType.Reject:
                return " Rejection"
            case Constants.ConfirmActionType.Delete:
                return " Deletion"
            default:
                return " Update"
        }
    }

    const getButtonVariant = () => {
        switch(actionType) {
            case Constants.ConfirmActionType.Approve:
                return "primary"
            case Constants.ConfirmActionType.Reject:
                return "outline_danger"
            case Constants.ConfirmActionType.Delete:
                return "danger"
            default:
                return "outline"
        }
    }

    return (
        <Modal isOpen={show} onClose={close} className="max-w-[680px]">
            <Card
                title={
                    `Confirm ${toTitleCase(entity)} ${getVerb()}`
                }
                description={`Are you sure you want to ${actionType} this ${toLowerCase(entity)}?`}
            >
                { (actionType !== Constants.ConfirmActionType.Delete) &&
                <>
                <p>You can enter an optional comment below to pass additional message to the author of this {toLowerCase(entity)}.</p>
                <TextArea
                    rows={3}
                    onChange={(value) => setReason(value)}
                />
                </>
                }
                <div className="flex flex-row gap-4 justify-end">
                    <Button variant='outline' onClick={close}>Cancel</Button>
                    <Button variant={getButtonVariant()} onClick={act}>{toTitleCase(actionType)}</Button>
                </div>
            </Card>
        </Modal>
    )
}