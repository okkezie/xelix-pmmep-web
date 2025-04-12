'use client'
import { get } from "@/utils/Api"
import ContractorForm from "@/components/organisms/ContractorForm/ContractorForm"
import { useEffect, useState } from "react"
import { Constants } from "@/utils/Constants"
import ContractorsLoading from "../../loading"

export default function EditContractorPage({params}) {
    const [contractor, setContractor] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const id = (await params).slug
            const path = Constants.ApiPaths.ContractorById.replace(':contractorId', id)
            const result = await get(path, true)
            setContractor(result?.result)
            setLoading(false)
        }
        fetch()
    }, [params])

    return (
        loading ? <ContractorsLoading /> :
        <ContractorForm contractor={contractor} />
    )
}