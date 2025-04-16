import VerticalTabs from "@/components/organisms/Tabs/VerticalTab"
import { useEffect, useState } from "react"
import ButtonLink from "@/components/atoms/Form/ButtonLink/ButtonLink"
import { Constants } from "@/utils/Constants"
import InitiativesTable from "@/components/organisms/Tables/InitiativesTable"
import { getEntitiesTabsTableData } from "@/utils/helpers"

export default function InitiativesPage({initiatives}) {
    const [data, setData] = useState({})
    const canCreateInitiatives = isAuthorized(Constants.Authorizations.Initiatives.Create)

    useEffect(() => {
        const data = {
            activeTabId: 1,
            showTabTitles: true,
            tabs: getEntitiesTabsTableData(initiatives, userType, InitiativesTable)
        }

        setData(data)

    }, [initiatives])

    return (
        <>
            { canCreateInitiatives && 
            <div className="flex flex-row gap-4 items-center justify-end">
                <ButtonLink href={Constants.Paths.InitiativesCreate} variant="outline" className="mb-4">New Initiative</ButtonLink>
            </div>
            }
            <VerticalTabs data={data} />
        </>
    )
} 