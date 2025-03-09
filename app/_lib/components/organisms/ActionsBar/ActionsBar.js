
import Button from "@/components/atoms/Form/Button/Button"
import ButtonLink from "@/components/atoms/Form/ButtonLink/ButtonLink"
import Card from "@/components/organisms/Card/Card"
import { downloadPage, printPage } from "@/utils/helpers"
import Pencil from "@/svgs/pencil"
import Trash from "@/svgs/trash"
import Check from "@/svgs/check-line"
import Close from "@/svgs/close-line"
import Download from "@/svgs/download"
import File from "@/svgs/file"

export default function ActionsBar({
    openApprove,
    openReject,
    openDelete,
    editPath,
    isDraft,
    isRejected,
    isApproved,
    canEdit,
    canApprove,
    canDelete
}) {

    return (
        <Card className="mb-3" contentClass="w-full flex flex-row justify-end items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-end w-full">
                { ((isDraft || isRejected) && canEdit) &&
                    <div>
                        <ButtonLink
                            size="sm"
                            href={editPath} 
                            className=""
                            variant="outline_primary">
                                <Pencil />
                                Edit
                        </ButtonLink>
                    </div>
                }
                { (canDelete && !isApproved && !isRejected && isDraft) &&
                    <div>
                        <Button size="sm" variant="danger" onClick={openDelete}>
                            <Trash />Delete
                        </Button>
                    </div>
                }
                { ((!isApproved && !isRejected && !isDraft) && (canApprove)) && <>
                <div>
                    <Button size="sm" onClick={openApprove}>
                        <Check />
                        Approve
                    </Button>
                </div>
                <div>
                    <Button size="sm" variant="outline_danger" onClick={openReject}>
                        <Close />
                        Reject
                    </Button>
                </div>
                </>}
                {/* <div>
                    <Button size="sm" variant="outline_primary" onClick={downloadPage}>
                        <Download /> Download
                    </Button>
                </div> */}
                <div>
                    <Button size="sm" variant="outline_primary" onClick={printPage}>
                        <File /> Print
                    </Button>
                </div>
            </div>
        </Card>
    )
}