'use client'

import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { useEffect, useState } from "react"
import ViewInitiative from "@/components/pages/Initiatives/ViewInitiative"
import LoadingInitiativePage from "./loading"

export default function ViewProjectPage({ params }) {

    const [initiative, setInitiative] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const id = (await params).slug
            const result = await get(`${Constants.ApiPaths.Initiatives}/${id}`, true)
            setInitiative(result?.result)
            setLoading(false)
        }
        fetchData()
    }, [params])

    return (
        loading ? <LoadingInitiativePage /> :
        <ViewInitiative initiative={initiative} />
    )
}