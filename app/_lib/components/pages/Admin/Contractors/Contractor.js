import { useAuthContext } from "@/contexts/AuthContext"
import { Constants } from "@/utils/Constants"
import { useState } from "react"
import Tabs from "@/components/organisms/Tabs/Tabs"
import ActionsBar from "@/components/organisms/ActionsBar/ActionsBar"
import Confirm from "@/components/organisms/Confirm/Confirm"
import { approveContractor, deleteContractor, rejectContractor } from "@/actions/contractorActions"
import ContractorDetails from "@/components/pages/Admin/Contractors/ContractorDetails"

export default function Contractor({contractor}) {

    const { isAuthorized } = useAuthContext()
    const [openApprove, setOpenApprove] = useState(false)
    const [openReject, setOpenReject] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const isApproved = contractor?.approvalStatus === Constants.ApprovalStatus.APPROVED
    const isRejected = contractor?.approvalStatus === Constants.ApprovalStatus.REJECTED
    const id = contractor?.id

    const canView = isAuthorized(Constants.Authorizations.Contractor.Read)

    const canApprove = isAuthorized(Constants.Authorizations.Contractor.Approve)
    const canEdit = isAuthorized(Constants.Authorizations.Contractor.Create)
    const canDelete = isAuthorized(Constants.Authorizations.Contractor.Delete)

    if (!canView) {
        return <>Unauthorized</>
    }

    const tabsData = {
        activeTabId: 1,
        tabs: [
            {
                id: 1,
                title: "Info",
                content: <ContractorDetails contractor={contractor} />,
            },
            {
                id: 2,
                title: "Projects",
                content: <h2>Projects</h2>,
                badge: `${0}`
            },
            {
                id: 3,
                title: "Documents",
                content: <h2>Documents</h2>,
                badge: `${0}`
            },
            {
                id: 4,
                title: "Reviews",
                content: <h2>Reviews</h2>,
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
                    entity={'Contractor'}
                    action={approveContractor}
                    actionType={Constants.ConfirmActionType.Approve}
                    redirect={Constants.Paths.ContractorView.replace(Constants.Slug, id)}
                />
                <Confirm
                    show={openReject}
                    close={() => setOpenReject(false)}
                    entity={'Contractor'}
                    action={rejectContractor}
                    actionType={Constants.ConfirmActionType.Reject}
                    redirect={Constants.Paths.ContractorView.replace(Constants.Slug, id)}
                />
            </>}
            {canDelete && 
                <Confirm
                    show={openDelete}
                    close={() => setOpenDelete(false)}
                    entity={'Contractor'}
                    action={deleteContractor}
                    actionType={Constants.ConfirmActionType.Delete}
                    redirect={Constants.Paths.Contractors}
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
                isDraft={false}
                editPath={Constants.Paths.ContractorEdit.replace(Constants.Slug, id)}
            />
            <div className="mx-auto w-full flex flex-col gap-3">
                <h3
                    className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl text-center"
                >
                    {contractor?.name}
                </h3>
                <Tabs data={tabsData} />
            </div>
        </>
    )
}
