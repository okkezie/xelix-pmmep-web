import VerticalTabs from "@/components/organisms/Tabs/VerticalTab"
import { useEffect, useState } from "react"
import ButtonLink from "@/components/atoms/Form/ButtonLink/ButtonLink"
import { Constants } from "@/utils/Constants"
import ProjectsTable from "@/components/organisms/Tables/ProjectsTable"

export default function ProjectsPage({projects}) {
    const [data, setData] = useState({})

    useEffect(() => {
        const draft = [...projects].filter(r => r.isDraft)
        const pending = [...projects].filter(r => r.approvalStatus === Constants.ApprovalStatus.PENDING && !r.isDraft)
        const approved = [...projects].filter(r => r.approvalStatus === Constants.ApprovalStatus.APPROVED && !r.isDraft)
        const rejected = [...projects].filter(r => r.approvalStatus === Constants.ApprovalStatus.REJECTED && !r.isDraft)
        const archived = [...projects].filter(r => Date.parse(r.endDate) < Date.now())
        const ongoing = [...projects].filter(r => Date.parse(r.endDate) < Date.now())
        const tabs = [
            {
                id: 1,
                title: "All",
                content: <ProjectsTable projects={[...projects]} />,
                icon: <></>,
                badge: projects.length
            },
            {
                id: 2,
                title: "Approved",
                content: <ProjectsTable projects={approved} />,
                icon: <></>,
                badge: approved.length
            },
            {
                id: 3,
                title: "Ongoing",
                content: <ProjectsTable projects={ongoing} />,
                icon: <></>,
                badge: ongoing.length
            },
            {
                id: 4,
                title: "Pending",
                content: <ProjectsTable projects={pending} />,
                icon: <></>,
                badge: pending.length
            },
            {
                id: 5,
                title: "Rejected",
                content: <ProjectsTable projects={rejected} />,
                icon: <></>,
                badge: rejected.length
            },
            {
                id: 6,
                title: "Archived",
                content: <ProjectsTable projects={archived} />,
                icon: <></>,
                badge: archived.length
            },
            {
                id: 7,
                title: "Draft",
                content: <ProjectsTable projects={draft} />,
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

    }, [projects])

    return (
        <>
            <div className="flex flex-row gap-4 items-center justify-end">
                <ButtonLink href={Constants.Paths.ProjectsCreate} variant="outline" className="mb-4">New Project</ButtonLink>
            </div>
            <VerticalTabs data={data} />
        </>
    )
}