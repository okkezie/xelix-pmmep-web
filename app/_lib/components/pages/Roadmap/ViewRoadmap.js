import Card from "@/components/organisms/Card/Card"
import Button from "@/components/atoms/Form/Button/Button"
import ButtonLink from "@/components/atoms/Form/ButtonLink/ButtonLink"
import { ApprovalStatus } from "@/entities/Roadmaps"
import { Constants } from "@/utils/Constants"
import { getRoadmapDraftBadge, getRoadmapStatusBadge, deleteRoadMap, parseRoadmapDate } from "@/components/organisms/Tables/RoadmapsTable"
import { useAuthContext } from "@/contexts/AuthContext"
import Trash from '@/svgs/trash'
import Pencil from '@/svgs/pencil'
import PaperPlane from '@/svgs/paper-plane'
import Download from '@/svgs/download'
import Check from "@/svgs/check-line"
import Close from "@/svgs/close-line"
import ArrowRight from "@/svgs/arrow-right"
import { downloadPage } from "@/utils/helpers"
import ApproveRoadmap from "@/components/organisms/Dialog/ApproveRoadmap"
import RejectRoadmap from "@/components/organisms/Dialog/RejectRoadmap"
import { useState } from "react"

export default function ViewRoadmap({ roadmap }) {
    const { isAuthorized } = useAuthContext()
    const [openApprove, setOpenApprove] = useState(false)
    const [openReject, setOpenReject] = useState(false)

    const isApproved = roadmap?.approvalStatus === ApprovalStatus.APPROVED
    const isRejected = roadmap?.approvalStatus === ApprovalStatus.REJECTED
    const isDraft = roadmap?.isDraft
    const id = roadmap?.id

    const canView = isAuthorized(Constants.Authorizations.Roadmaps.ReadRoadmaps)

    if (!canView) {
        return <>Unauthorized</>
    }

    const canApprove = isAuthorized(Constants.Authorizations.Roadmaps.ApproveRoadmaps)
    const canEdit = isAuthorized(Constants.Authorizations.Roadmaps.CreateRoadmaps)
    const canDelete = isAuthorized(Constants.Authorizations.Roadmaps.DeleteRoadmap)

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
        <Card className="mb-3" contentClass="w-full flex flex-row justify-end items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-end w-full">
                { ((isDraft || isRejected) && canEdit) &&
                    <div>
                        <ButtonLink
                            size="sm"
                            href={Constants.Paths.RoadmapsEdit.replace(':slug', roadmap?.id)} 
                            className=""
                            variant="outline_primary">
                                <Pencil />
                                Edit
                        </ButtonLink>
                    </div>
                }
                { (canDelete && !isApproved && !isRejected && isDraft) &&
                    <div>
                        <Button size="sm" variant="danger" onClick={() => deleteRoadMap(id)}>
                            <Trash />Delete
                        </Button>
                    </div>
                }
                { ((!isApproved && !isRejected && !isDraft) && (canApprove)) && <>
                <div>
                    <Button size="sm" onClick={() => setOpenApprove(true)}>
                        <Check />
                        Approve
                    </Button>
                </div>
                <div>
                    <Button size="sm" variant="outline_danger" onClick={() => setOpenReject(true)}>
                        <Close />
                        Reject
                    </Button>
                </div>
                </>}
                <div>
                    <Button size="sm" variant="outline_primary" onClick={downloadPage}>
                        <Download /> Download
                    </Button>
                </div>
                <div>
                    <Button size="sm" variant="outline_primary">
                        <PaperPlane /> Share
                    </Button>
                </div>
            </div>
        </Card>
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
                            <b>Start:</b> {parseRoadmapDate(roadmap?.startDate)} 
                            <ArrowRight />
                            <b>End: </b> {parseRoadmapDate(roadmap?.endDate)}
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
                            <b>Status:</b> {getRoadmapStatusBadge(roadmap?.approvalStatus)} &nbsp; {getRoadmapDraftBadge(roadmap?.isDraft)}
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
        <ApproveRoadmap closeCallback={() => setOpenApprove(false)} id={roadmap?.id} show={openApprove}/>
        <RejectRoadmap closeCallback={() => setOpenReject(false)} id={roadmap?.id} show={openReject}/>
        </>}
        </>
    )
}