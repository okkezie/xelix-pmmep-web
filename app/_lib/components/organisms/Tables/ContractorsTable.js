
import Image from "next/image"
import { getDefaultUserAvatar, getStatusBadge, isNullOrEmptyString } from "@/utils/helpers"
import SimpleTable from "@/components/organisms/Table/SimpleTable"
import Dropdown from "@/components/molecules/Dropdown/Dropdown"
import { Constants } from "@/utils/Constants"
import { useAuthContext } from "@/contexts/AuthContext"
import { industrySectorOptions } from "@/data/industryOptions"

export default function ContractorsTable({ contractors }) {

    const getAvatar = (contractor) => {
        return isNullOrEmptyString(contractor?.logo) ? getDefaultUserAvatar(contractor?.name) : contractor?.logo
    }
     
    const getIndustryValue = (industry) => {
        return industrySectorOptions().find(option => option.value === industry)?.label
    }

    const headers = ['Contractor', 'Industry', 'Status', 'Actions']
    const body = []
    if (contractors?.length > 0) {
        contractors?.map((contractor, index) => (
            body.push([
                <div className="flex items-center gap-3" key={index+1}>
                    <Image
                        width={10}
                        height={10}
                        src={getAvatar(contractor)}
                        alt={contractor.name}
                        className="rounded-full w-15 h-15 object-cover"
                    />
                    <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {contractor.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {contractor.website} <br />{contractor.email}<br />{contractor.phone}
                        </span>
                    </div>
                </div>,
                getIndustryValue(contractor.industry),
                getStatusBadge(contractor.approvalStatus),
                <ContractorActionButtons contractor={contractor} key={index+1} />
            ])
        ))
    }

    return (
        <SimpleTable headers={headers} body={body} name={'Contractors'}/>
    )
}

const ContractorActionButtons = ({ contractor }) => {
    const { isAuthorized } = useAuthContext()
    const getDropDownItems = () => {
        const canEdit = isAuthorized(Constants.Authorizations.Contractor.Update)
        const canView = isAuthorized(Constants.Authorizations.Contractor.Read)
        const items = []
        if (canView) {
            items.push({
                label: 'View',
                icon: <></>,
                href: Constants.Paths.ContractorView.replace(':slug', contractor.id)
            })
        }
        if (canEdit) {
            items.push({
                label: 'Edit',
                icon: <></>,
                href: Constants.Paths.ContractorEdit.replace(':slug', contractor.id)
            })
        }
        return items
    }

    return (
        <Dropdown label='Actions' items={getDropDownItems()} />
    )
}
