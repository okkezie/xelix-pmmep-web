'use client'
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { useEffect, useState } from "react"
import CreateInitiative from "@/components/pages/Initiatives/CreateInitiative";
import LoadingInitiativeEdit from "./loading";

export default function EditProjectPage({ params }) {
    const [initiative, setInitiative] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const id = (await params).slug
            const result = await get(`${Constants.ApiPaths.Initiatives}/${id}`, true)
            setInitiative(result?.result)
            setLoading(false)
        }
        fetch()
    }, [params])

    return ( 
        loading ? <LoadingInitiativeEdit /> :
        <CreateInitiative initiative={initiative} />
    )
}