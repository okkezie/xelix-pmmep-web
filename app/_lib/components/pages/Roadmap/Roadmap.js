import RoadmapsTable from "@/components/organisms/Tables/RoadmapsTable"
import VerticalTabs from "@/components/organisms/Tabs/VerticalTab"
import { useEffect, useState } from "react"
import ButtonLink from "@/components/atoms/Form/ButtonLink/ButtonLink"
import { Constants } from "@/utils/Constants"
import { ApprovalStatus } from "@/entities/Roadmaps"

export default function RoadmapPage({roadmaps}) {
    const [data, setData] = useState({})

    useEffect(() => {
        console.log({roadmaps})
        const draft = [...roadmaps].filter(r => r.isDraft)
        const pending = [...roadmaps].filter(r => r.approvalStatus === ApprovalStatus.PENDING && !r.isDraft)
        const approved = [...roadmaps].filter(r => r.approvalStatus === ApprovalStatus.APPROVED && !r.isDraft)
        const rejected = [...roadmaps].filter(r => r.approvalStatus === ApprovalStatus.REJECTED && !r.isDraft)
        const archived = [...roadmaps].filter(r => Date.parse(r.endDate) < Date.now())

        const tabs = [
            {
                id: 1,
                title: "All",
                content: <RoadmapsTable roadmaps={[...roadmaps]} />,
                icon: <></>,
                badge: roadmaps.length
            },
            {
                id: 2,
                title: "Approved",
                content: <RoadmapsTable roadmaps={approved} />,
                icon: <></>,
                badge: approved.length
            },
            {
                id: 3,
                title: "Pending",
                content: <RoadmapsTable roadmaps={pending} />,
                icon: <></>,
                badge: pending.length
            },
            {
                id: 4,
                title: "Rejected",
                content: <RoadmapsTable roadmaps={rejected} />,
                icon: <></>,
                badge: rejected.length
            },
            {
                id: 5,
                title: "Archived",
                content: <RoadmapsTable roadmaps={archived} />,
                icon: <></>,
                badge: archived.length
            },
            {
                id: 6,
                title: "Draft",
                content: <RoadmapsTable roadmaps={draft} />,
                icon: <></>,
                badge: draft.length
            }
        ]
    
        const data = {
            activeTabId: 1,
            showTabTitles: true,
            tabs: tabs
        }

        setData(data)

    }, [roadmaps])

    return (
        <>
            <div className="flex flex-row gap-4 items-center justify-end">
                <ButtonLink href={Constants.Paths.RoadmapsCreate} variant="outline" className="mb-4">New Roadmap</ButtonLink>
            </div>
            <VerticalTabs data={data} />
        </>
    )
}