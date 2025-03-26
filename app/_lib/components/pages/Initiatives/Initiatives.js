import VerticalTabs from "@/components/organisms/Tabs/VerticalTab"
import { useEffect, useState } from "react"
import ButtonLink from "@/components/atoms/Form/ButtonLink/ButtonLink"
import { Constants } from "@/utils/Constants"
import InitiativesTable from "@/components/organisms/Tables/InitiativesTable"

export default function InitiativesPage({initiatives}) {
    const [data, setData] = useState({})

    useEffect(() => {
        console.log({initiatives})
        const draft = [...initiatives].filter(r => r.isDraft)
        const pending = [...initiatives].filter(r => r.approvalStatus === Constants.ApprovalStatus.PENDING && !r.isDraft)
        const approved = [...initiatives].filter(r => r.approvalStatus === Constants.ApprovalStatus.APPROVED && !r.isDraft)
        const rejected = [...initiatives].filter(r => r.approvalStatus === Constants.ApprovalStatus.REJECTED && !r.isDraft)
        const archived = [...initiatives].filter(r => Date.parse(r.endDate) < Date.now())
        const ongoing = [...initiatives].filter(r => Date.parse(r.endDate) < Date.now())

        const tabs = [
            {
                id: 1,
                title: "All",
                content: <InitiativesTable initiatives={initiatives} />,
                icon: <></>,
                badge: initiatives.length
            },
            {
                id: 2,
                title: "Approved",
                content: <InitiativesTable initiatives={approved} />,
                icon: <></>,
                badge: approved.length
            },
            {
                id: 3,
                title: "Ongoing",
                content: <InitiativesTable initiatives={ongoing} />,
                icon: <></>,
                badge: ongoing.length
            },
            {
                id: 4,
                title: "Pending",
                content: <InitiativesTable initiatives={pending} />,
                icon: <></>,
                badge: pending.length
            },
            {
                id: 5,
                title: "Rejected",
                content: <InitiativesTable initiatives={rejected} />,
                icon: <></>,
                badge: rejected.length
            },
            {
                id: 6,
                title: "Archived",
                content: <InitiativesTable initiatives={archived} />,
                icon: <></>,
                badge: archived.length
            },
            {
                id: 7,
                title: "Draft",
                content: <InitiativesTable initiatives={draft} />,
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

    }, [initiatives])

    return (
        <>
            <div className="flex flex-row gap-4 items-center justify-end">
                <ButtonLink href={Constants.Paths.InitiativesCreate} variant="outline" className="mb-4">New Initiative</ButtonLink>
            </div>
            <VerticalTabs data={data} />
        </>
    )
}