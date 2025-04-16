import VerticalTabs from "@/components/organisms/Tabs/VerticalTab"
import { useEffect, useState } from "react"
import ButtonLink from "@/components/atoms/Form/ButtonLink/ButtonLink"
import { Constants } from "@/utils/Constants"
import ProjectsTable from "@/components/organisms/Tables/ProjectsTable"
import { getEntitiesTabsTableData } from "@/utils/helpers"

export default function ProjectsPage({projects}) {
    const [data, setData] = useState({})
    const { isAuthorized, userType } = useAuthContext()
    const canCreateProjects = isAuthorized(Constants.Authorizations.Projects.Create)

    useEffect(() => {
        const data = {
            activeTabId: 1,
            showTabTitles: true,
            tabs: getEntitiesTabsTableData(projects, userType, ProjectsTable)
        }
        setData(data)
    }, [projects, userType])

    return (
        <>
            { canCreateProjects && 
            <div className="flex flex-row gap-4 items-center justify-end">
                <ButtonLink href={Constants.Paths.ProjectsCreate} variant="outline" className="mb-4">New Project</ButtonLink>
            </div>
            }
            <VerticalTabs data={data} />
        </>
    )
}