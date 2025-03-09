
import { Constants } from "@/utils/Constants"
import { useState } from "react"
import ActionsBar from "@/components/organisms/ActionsBar/ActionsBar"
import { useAuthContext } from "@/contexts/AuthContext"
import Tabs from "@/components/organisms/Tabs/Tabs"
import ProjectUpdates from "@/components/pages/Projects/ProjectUpdates"
import ProjectFiles from "@/components/pages/Projects/ProjectFiles"
import ProjectDetails from "@/components/pages/Projects/ProjectDetails"
import ProjectReport from "@/components/pages/Projects/ProjectReports"
import ProjectReviews from "@/components/pages/Projects/ProjectReviews"
import Confirm from "@/app/_lib/components/organisms/Confirm/Confirm"
import { approveProject, deleteProject, rejectProject } from "@/app/_lib/actions/projectActions"

export default function ViewProject({ project }) {
    const { isAuthorized } = useAuthContext()
    const [openApprove, setOpenApprove] = useState(false)
    const [openReject, setOpenReject] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const isApproved = project?.approvalStatus === Constants.ApprovalStatus.APPROVED
    const isRejected = project?.approvalStatus === Constants.ApprovalStatus.REJECTED
    const isDraft = project?.isDraft
    const id = project?.id

    const canView = isAuthorized(Constants.Authorizations.Projects.Read)

    const canApprove = isAuthorized(Constants.Authorizations.Projects.Approve)
    const canEdit = isAuthorized(Constants.Authorizations.Projects.Create)
    const canDelete = isAuthorized(Constants.Authorizations.Projects.Delete)

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
                content: <ProjectDetails project={project} />,
            },
            {
                id: 2,
                title: "Updates",
                content: <ProjectUpdates project={project} />,
                badge: `${0}`
            },
            {
                id: 3,
                title: "Documents",
                content: <ProjectFiles project={project} />,
                badge: `${0}`
            },
            {
                id: 4,
                title: "Reports",
                content: <ProjectReport project={project} />,
                badge: `${0}`
            },
            {
                id: 5,
                title: "Reviews",
                content: <ProjectReviews project={project} />,
                badge: `${0}`
            },
            {
                id: 6,
                title: "Evaluation",
                content: <>Project Evaluation</>,
                badge: `${0}`
            }
        ]
    }

    return (
        <>
            {canApprove && <>
                <Confirm
                    show={openReject}
                    close={() => setOpenReject(false)}
                    entity={'Project'}
                    action={(reason) => rejectProject(id, reason)}
                    actionType={Constants.ConfirmActionType.Reject}
                    redirect={Constants.Paths.ProjectsView.replace(Constants.Slug, id)}
                />
                <Confirm
                    show={openApprove}
                    close={() => setOpenApprove(false)}
                    entity={'Project'}
                    action={(reason) => approveProject(id, reason)}
                    actionType={Constants.ConfirmActionType.Approve}
                    redirect={Constants.Paths.ProjectsView.replace(Constants.Slug, id)}
                />
            </>}
            {canDelete && 
                <Confirm
                    show={openDelete}
                    close={() => setOpenDelete(false)}
                    entity={'Project'}
                    action={() => deleteProject(id)}
                    actionType={Constants.ConfirmActionType.Delete}
                    redirect={Constants.Paths.ProjectsView.replace(Constants.Slug, id)}
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
                editPath={Constants.Paths.ProjectsEdit.replace(Constants.Slug, id)}
            />
            <div className="mx-auto w-full flex flex-col gap-3">
                <h3
                    className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl text-center"
                >
                    {project?.name}
                </h3>
                <Tabs data={tabsData} />
            </div>
        </>
    )
}
