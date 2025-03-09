'use client'
import InitiativesPage from "@/components/pages/Initiatives/Initiatives"
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { useEffect, useState } from "react"
import InitiativesLoading from "./loading"

export default function Initiativee() {
    const [initiatives, setInitiatives] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const data = await get(Constants.ApiPaths.Initiatives, true)
            setInitiatives(data?.result ?? [])
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        loading ? <InitiativesLoading />
        : <InitiativesPage initiatives={initiatives} />
    )
}
