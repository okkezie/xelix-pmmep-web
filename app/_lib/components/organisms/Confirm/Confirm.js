'use client'
import { Modal } from "@/components/templates/Modal/Modal"
import Card from "@/components/organisms/Card/Card"
import TextArea from "@/components/atoms/Form/Input/TextArea"
import { useState } from "react"
import Button from "@/components/atoms/Form/Button/Button"
import { Constants } from "@/utils/Constants"
import { toLowerCase, toTitleCase } from "@/utils/helpers"
import {toast} from 'react-toastify'
import { useRouter } from "next/navigation"

export default function Confirm({
    close, 
    show, 
    action = async () => {}, 
    entity, 
    actionType, 
    redirect = Constants.Paths.Dashboard
}) {
    const router = useRouter()
    const [reason, setReason] = useState()

    const act = async () => {
        action(reason).then(({success, message, result}) => {
            close?.()
            if (success) {
                toast.success(message ?? `${getVerb()} successful!`)
            }
            else {
                toast.error(message ?? `${getVerb()} failed!`)
            }
            router.push(redirect)
        })
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
            case Constants.ConfirmActionType.Disable:
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