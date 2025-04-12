'use client'
import { get } from "@/utils/Api"
import { useEffect, useState } from "react"
import { Constants } from "@/utils/Constants"
import ContractorsLoading from "../../loading"
import { redirect } from "next/navigation"
import Contractor from "@/components/pages/Admin/Contractors/Contractor"

export default function ViewContractorPage({params}) {
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

    const showPageOrNotFound = () => {
        return contractor ? <Contractor contractor={contractor} /> : redirect(Constants.Paths.NotFound)
    }

    return (
        loading ? <ContractorsLoading /> : showPageOrNotFound()
    )
}