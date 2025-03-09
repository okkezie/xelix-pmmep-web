import { Constants } from "@/utils/Constants"
import { useState } from "react"
import ActionsBar from "@/components/organisms/ActionsBar/ActionsBar"
import { useAuthContext } from "@/contexts/AuthContext"
import Tabs from "@/components/organisms/Tabs/Tabs"
import InitiativeDetails from "@/components/pages/Initiatives/InitiativeDetails"
import InitiativeUpdates from "@/components/pages/Initiatives/InitiativeUpdates"
import InitiativeFiles from "@/components/pages/Initiatives/InitiativeFiles"
import InitiativeReport from "@/components/pages/Initiatives/InitiativeReports"
import InitiativeReviews from "@/components/pages/Initiatives/InitiativeReviews"
import InitiativeEvaluations from "@/components/pages/Initiatives/InitiativeEvaluations"
import Confirm from "@/components/organisms/Confirm/Confirm"
import { approveInitiative, deleteInitiative, rejectInitiative } from "@/actions/initiativeActions"

export default function ViewInitiative({ initiative }) {
    const { isAuthorized } = useAuthContext()
    const [openApprove, setOpenApprove] = useState(false)
    const [openReject, setOpenReject] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const isApproved = initiative?.approvalStatus === Constants.ApprovalStatus.APPROVED
    const isRejected = initiative?.approvalStatus === Constants.ApprovalStatus.REJECTED
    const isDraft = initiative?.isDraft
    const id = initiative?.id

    const canView = isAuthorized(Constants.Authorizations.Initiatives.Read)

    const canApprove = isAuthorized(Constants.Authorizations.Initiatives.Approve)
    const canEdit = isAuthorized(Constants.Authorizations.Initiatives.Create)
    const canDelete = isAuthorized(Constants.Authorizations.Initiatives.Delete)

    // console.log({isApproved}, {isRejected}, {isDraft}, {canApprove}, {canEdit}, {canDelete}, {id}, {project})

    if (!canView) {
        return <>Unauthorized</>
    }

    const tabsData = {
        activeTabId: 1,
        tabs: [
            {
                id: 1,
                title: "Info",
                content: <InitiativeDetails initiative={initiative} />,
            },
            {
                id: 2,
                title: "Updates",
                content: <InitiativeUpdates initiative={initiative} />,
                badge: `${0}`
            },
            {
                id: 3,
                title: "Documents",
                content: <InitiativeFiles initiative={initiative} />,
                badge: `${0}`
            },
            {
                id: 4,
                title: "Reports",
                content: <InitiativeReport initiative={initiative} />,
                badge: `${0}`
            },
            {
                id: 5,
                title: "Reviews",
                content: <InitiativeReviews initiative={initiative} />,
                badge: `${0}`
            },
            {
                id: 6,
                title: "Evaluation",
                content: <InitiativeEvaluations inititiative={initiative} />,
                badge: `${0}`
            }
        ]
    }

    return (
        <>
            {canApprove && <>
                <Confirm
                    show={openApprove}
                    close={() => setOpenApprove(false)}
                    entity={'Initiative'}
                    action={approveInitiative}
                    actionType={Constants.ConfirmActionType.Approve}
                    redirect={Constants.Paths.InitiativesView.replace(Constants.Slug, id)}
                />
                <Confirm
                    show={openReject}
                    close={() => setOpenReject(false)}
                    entity={'Initiative'}
                    action={rejectInitiative}
                    actionType={Constants.ConfirmActionType.Reject}
                    redirect={Constants.Paths.InitiativesView.replace(Constants.Slug, id)}
                />
            </>}
            {canDelete && 
                <Confirm
                    show={openDelete}
                    close={() => setOpenDelete(false)}
                    entity={'Initiative'}
                    action={deleteInitiative}
                    actionType={Constants.ConfirmActionType.Delete}
                    redirect={Constants.Paths.Initiatives}
                />
            }
            
            <ActionsBar
                openApprove={() => setOpenApprove(true)}
                openReject={() => setOpenReject(true)}
                openDelete={() => setOpenDelete(true)}
                canApprove={canApprove}
                canDelete={canDelete}
                canEdit={canEdit}
                isApproved={isApproved}
                isRejected={isRejected}
                isDraft={isDraft}
                editPath={Constants.Paths.InitiativesEdit.replace(Constants.Slug, id)}
            />
            <div className="mx-auto w-full flex flex-col gap-3">
                <h3
                    className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl text-center"
                >
                    {initiative?.name}
                </h3>
                <Tabs data={tabsData} />
            </div>
        </>
    )
}
