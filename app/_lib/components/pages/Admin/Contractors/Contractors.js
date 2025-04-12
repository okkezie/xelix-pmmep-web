
import { Constants } from "@/utils/Constants"
import ContractorsTable from "@/components/organisms/Tables/ContractorsTable"
import ButtonLink from "@/components/atoms/Form/ButtonLink/ButtonLink"
import { useEffect, useState } from "react"
import VerticalTabs from "@/components/organisms/Tabs/VerticalTab"

export default function Contractors({ contractors }) {
    const [tabs, setTabs] = useState([])
    useEffect(() => {
        const pending = [...contractors].filter(r => r.approvalStatus === Constants.ApprovalStatus.PENDING)
        const approved = [...contractors].filter(r => r.approvalStatus === Constants.ApprovalStatus.APPROVED)
        const rejected = [...contractors].filter(r => r.approvalStatus === Constants.ApprovalStatus.REJECTED)
        const data = {
            activeTabId: 1,
            showTabTitles: true,
            tabs: [
                {
                    id: 1,
                    title: "All",
                    content: <ContractorsTable contractors={[...contractors]} />,
                    icon: <></>,
                    badge: contractors.length
                },
                {
                    id: 2,
                    title: "Approved",
                    content: <ContractorsTable contractors={approved} />,
                    icon: <></>,
                    badge: approved.length
                },
                {
                    id: 3,
                    title: "Pending",
                    content: <ContractorsTable contractors={pending} />,
                    icon: <></>,
                    badge: pending.length
                },
                {
                    id: 4,
                    title: "Rejected",
                    content: <ContractorsTable contractors={rejected} />,
                    icon: <></>,
                    badge: rejected.length
                }
            ]
        }
        setTabs(data)
    }, [contractors])

    return (
        <>
            <div className="flex flex-row gap-4 items-center justify-end">
                <ButtonLink href={Constants.Paths.ContractorCreate} className="mb-4" variant='outline'>
                    Create New Contracotor
                </ButtonLink>
            </div>
            <VerticalTabs data={tabs} />
        </>
    )
}