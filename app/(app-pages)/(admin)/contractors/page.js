'use client'
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import Contractors from "@/components/pages/Admin/Contractors/Contractors"
import { useEffect, useState } from "react"
import ContractorsLoading from "./loading"

export default function ContractorsPage() {
    const [contractors, setContractors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const result = await get(Constants.ApiPaths.Contractors, true)
            setContractors(result?.result)
            setLoading(false)
        }
        fetch()
    }, [])

    return (
        loading ? <ContractorsLoading /> :
        <Contractors contractors={contractors} />
    )
}