import RoadmapsTable from "@/components/organisms/Tables/RoadmapsTable"
import VerticalTabs from "@/components/organisms/Tabs/VerticalTab"
import { useEffect, useState } from "react"
import ButtonLink from "@/components/atoms/Form/ButtonLink/ButtonLink"
import { Constants } from "@/utils/Constants"
import { useAuthContext } from "@/contexts/AuthContext"
import { getEntitiesTabsTableData } from "@/utils/helpers"

export default function RoadmapPage({roadmaps}) {
    const { isAuthorized, userType } = useAuthContext()
    const [data, setData] = useState({})
    const canCreateRoadmap = isAuthorized(Constants.Authorizations.Roadmaps.Create)

    useEffect(() => {
        const data = {
            activeTabId: 1,
            showTabTitles: true,
            tabs: getEntitiesTabsTableData(roadmaps, userType, RoadmapsTable)
        }

        setData(data)

    }, [roadmaps, userType])

    return (
        <>
            { canCreateRoadmap &&
            <div className="flex flex-row gap-4 items-center justify-end">
                <ButtonLink href={Constants.Paths.RoadmapsCreate} variant="outline" className="mb-4">New Roadmap</ButtonLink>
            </div>
            }
            <VerticalTabs data={data} />
        </>
    )
}