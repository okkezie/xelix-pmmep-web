import Card from "@/components/organisms/Card/Card"
import { Constants } from "@/utils/Constants"
import { useAuthContext } from "@/contexts/AuthContext"
import ArrowRight from "@/svgs/arrow-right"
import { getDraftBadge, getStatusBadge, parseDateToMonthYear } from "@/utils/helpers"
import { useState } from "react"
import ActionsBar from "@/components/organisms/ActionsBar/ActionsBar"
import Confirm from "@/components/organisms/Confirm/Confirm"
import { approveRoadmap, deleteRoadMapAction, rejectRoadmap } from "@/actions/roadmapActions"

export default function ViewRoadmap({ roadmap }) {
    const { isAuthorized } = useAuthContext()
    const [openApprove, setOpenApprove] = useState(false)
    const [openReject, setOpenReject] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const isApproved = roadmap?.approvalStatus === Constants.ApprovalStatus.APPROVED
    const isRejected = roadmap?.approvalStatus === Constants.ApprovalStatus.REJECTED
    const isDraft = roadmap?.isDraft
    const id = roadmap?.id

    const canView = isAuthorized(Constants.Authorizations.Roadmaps.Read)

    if (!canView) {
        return <>Unauthorized</>
    }

    const canApprove = isAuthorized(Constants.Authorizations.Roadmaps.Approve)
    const canEdit = isAuthorized(Constants.Authorizations.Roadmaps.Create)
    const canDelete = isAuthorized(Constants.Authorizations.Roadmaps.Delete)

    // console.log({isApproved}, {isRejected}, {isDraft}, {canApprove}, {canEdit})

    const getHtmlContent = (value) => {
        return '<p>' + value?.replaceAll('\r\n', '</p><p>') + '</p>'
    }
    
    const displayRoadmapItem = (item) => {
        const blockQuoteClass = "w-full ring-1 p-4 rounded-lg ring-gray-300 bg-brand-50/50"
        return <blockquote 
            className={blockQuoteClass}
            dangerouslySetInnerHTML={{__html: getHtmlContent(item)}}
        ></blockquote>
    }

    const showDate = (d) => {
        const date = new Date(d)
        return `${date.getUTCDay()} - ${date.getUTCMonth()} - ${date.getUTCFullYear()}`
    }

    return (
        <>
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
            editPath={Constants.Paths.RoadmapsEdit.replace(':slug', id)}
        />
        <div
            className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12"
        >
            <div className="mx-auto w-full flex flex-col gap-3">
                <h3
                    className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl text-center"
                >
                    {roadmap?.title} 
                </h3>
                <Card
                    contentClass="flex flex-col md:flex-row items-end justify-between text-sm text-gray-500 dark:text-gray-400 sm:text-base p-2"
                >
                    <div>
                        <p className="flex flex-row gap-4"><b>Owner:</b> {roadmap?.mda}</p>
                        <p className="flex flex-row gap-4"><b>Period:</b> {roadmap?.period}</p>
                        <p className="flex flex-row gap-3 items-end justify-start w-full">
                            <b>Start:</b> {parseDateToMonthYear(roadmap?.startDate)} 
                            <ArrowRight />
                            <b>End: </b> {parseDateToMonthYear(roadmap?.endDate)}
                        </p>
                    </div>
                    <div>
                        <p className="flex flex-row gap-4">
                            <b>Created By:</b> { roadmap?.createdBy }
                        </p>
                        <p className="flex flex-row gap-4">
                            <b>Last Updated:</b>{ showDate(roadmap?.lastModifiedByDate) }
                        </p>
                        <p className="w-full flex flex-row items-center justify-start gap-3">
                            <b>Status:</b> {getStatusBadge(roadmap?.approvalStatus)} &nbsp; {getDraftBadge(roadmap?.isDraft)}
                        </p>
                        { isApproved && <>
                            <p className="flex flex-row gap-4"><b>Approved by:</b> {roadmap?.approvedBy}</p>
                            <p className="flex flex-row gap-4"><b>Comment:</b> {roadmap?.approvalComment}</p>
                        </>}
                        { isRejected && <>
                            <p className="flex flex-row gap-4"><b>Rejected by:</b> {roadmap?.rejectedBy}</p>
                            <p className="flex flex-row gap-4"><b>Comment: </b>{roadmap?.rejectionComment}</p>
                        </>}
                    </div>
                </Card>
                <Card
                    className="w-full"
                    title={'Goals'}
                    description="Enter all your goals for this period here. Clearly state all the goals you are setting for your organization this period."
                >
                    { displayRoadmapItem(roadmap?.goals) }
                </Card>
                <Card 
                    className="w-full" 
                    title={ isApproved ? 'Projects' : 'Proposed Projects'}
                    description="List out in complete detail all the proposed projects for the year."
                >
                    { displayRoadmapItem(roadmap?.proposedProjects) }
                </Card>
                <Card 
                    className="w-full" 
                    title={isApproved ? 'Initiatives' : ' Proposed Initiatives'}
                    description="List out in complete detail all the proposed initiatives for the period."
                >
                    { displayRoadmapItem(roadmap?.proposedInitiatives) }
                </Card>
                <Card 
                    className="w-full" 
                    title={'Projected Impact'}
                    description="What impact do you forsee these goals to have if achieved?"
                >
                    { displayRoadmapItem(roadmap?.projectedImpacts) }
                </Card>
                <Card 
                    className="w-full" 
                    title={'Dependencies'}
                    description="What are the dependencies for the actualization of your goal?"
                >
                    { displayRoadmapItem(roadmap?.dependencies) }
                </Card>
                <Card 
                    className="w-full" 
                    title={'Assumptions'}
                    description="What are some of the assumptions made in articulating this roadmap?"
                >
                    { displayRoadmapItem(roadmap?.assumptions) }
                </Card>
                <Card 
                    className="w-full" 
                    title={'Foreseen Challenges'}
                    description="What challenges do you forsee that might prevent the actualization of the above goals?"
                >
                    { displayRoadmapItem(roadmap?.foreseenChallenges) }
                </Card>
                <Card 
                    className="w-full" 
                    title={'Financial Requirements'}
                    description="Provide a detailed breakdown of the financial requirements attached to your goals for this period."
                >
                    { displayRoadmapItem(roadmap?.financialRequirements) }
                </Card>
                <Card 
                    className="w-full" 
                    title={'Non Financial Requirements'}
                    description="Provide a detailed breakdown of the non-financial requirements attached to your goals for this period."
                >
                    { displayRoadmapItem(roadmap?.nonFinancialRequirements) }
                </Card>
            </div>
        </div>
        { canApprove && <>
        <Confirm
            show={openReject}
            close={() => setOpenReject(false)}
            entity={'Roadmap'}
            action={(reason) => rejectRoadmap(id, reason)}
            actionType={Constants.ConfirmActionType.Reject}
            redirect={Constants.Paths.RoadmapsView.replace(Constants.Slug, id)}
        />
        <Confirm
            show={openApprove}
            close={() => setOpenApprove(false)}
            entity={'Roadmap'}
            action={(reason) => approveRoadmap(id, reason)}
            actionType={Constants.ConfirmActionType.Approve}
            redirect={Constants.Paths.RoadmapsView.replace(Constants.Slug, id)}
        />
        </>}
        {canDelete && 
        <Confirm
            show={openDelete}
            close={() => setOpenDelete(false)}
            entity={'Roadmap'}
            action={() => deleteRoadMapAction(id)}
            actionType={Constants.ConfirmActionType.Delete}
            redirect={Constants.Paths.RoadmapsView}
        />
        }
        </>
    )
}