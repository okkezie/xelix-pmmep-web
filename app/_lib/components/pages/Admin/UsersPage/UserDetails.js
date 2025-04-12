import { useAuthContext } from "@/contexts/AuthContext"
import { Constants } from "@/utils/Constants"
import Confirm from "@/components/organisms/Confirm/Confirm"
import { useState } from "react"
import Button from "@/components/atoms/Form/Button/Button"
import { approveUser, disableUser, rejectUser } from "@/actions/userActions"
import { formatFullDate, UserRolesBadges } from "@/utils/helpers"

export default function UserDetails({user}) {
    const { isAuthorized } = useAuthContext()
    const isPending = user?.approvalStatus === Constants.ApprovalStatus.PENDING
    const [openApproveUserDialog, setOpenApproveUserDialog] = useState(false)
    const [openRejectUserDialog, setOpenRejectUserDialog] = useState(false)
    const [openDisableUserDialog, setOpenDisableUserDialog] = useState(false)
    const canApprove = isAuthorized(Constants.Authorizations.Users.Approve)

    return (
        <>
        <div className="flex flex-col gap-4 divide-y divide-gray-300 dark:divide-gray-700">
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">Email</h3>
                <p className="col-span-1">{user?.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">Phone Number</h3>
                <p className="col-span-1">{user?.phone}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">Gender</h3>
                <p className="col-span-1">{user?.gender}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">MDA</h3>
                <p className="col-span-1">{user?.mda?.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">User Type</h3>
                <p className="col-span-1">{user?.userType}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">Role</h3>
                <div className="col-span-1"><UserRolesBadges user={user} /></div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">Status</h3>
                <p className="col-span-1">{user?.status}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 pl-4">
                <h3 className="text-sm text-gray-500 col-span-1">Created At</h3>
                <p className="col-span-1">{formatFullDate(user?.createdDate)}</p>
            </div>
            { canApprove &&
                <div className="flex flex-row gap-4 justify-end items-center mt-4 pt-4">
                    { isPending && <Button variant="outline_primary" onClick={() => setOpenApproveUserDialog(true)}>Approve</Button> }
                    { isPending && <Button variant="outline_danger" onClick={() => setOpenRejectUserDialog(true)}>Reject</Button> }
                    <Button variant="danger" onClick={() => setOpenDisableUserDialog(true)}>Disable</Button>
                </div>
            }
        </div>
        { canApprove &&
            <>
                <Confirm
                    action={async () => {
                        setOpenApproveUserDialog(false)
                        return await approveUser(user?.id)
                    }}
                    entity={'User'}
                    actionType={Constants.ConfirmActionType.Approve}
                    close={() => setOpenApproveUserDialog(false)}
                    show={openApproveUserDialog}
                    redirect={Constants.Paths.Users}
                />
                <Confirm 
                    action={async () => {
                        setOpenRejectUserDialog(false)
                        return await rejectUser(user?.id)
                    }}
                    entity={'User'}
                    actionType={Constants.ConfirmActionType.Reject}
                    close={() => setOpenRejectUserDialog(false)}
                    show={openRejectUserDialog}
                    redirect={Constants.Paths.Users}
                />
                <Confirm 
                    action={async () => {
                        setOpenDisableUserDialog(false)
                        return await disableUser(user?.id)
                    }}
                    entity={'User'}
                    actionType={Constants.ConfirmActionType.Disable}
                    close={() => setOpenDisableUserDialog(false)}
                    show={openDisableUserDialog}
                    redirect={Constants.Paths.Users}
                />
            </>
        }
        </>
    )
}
