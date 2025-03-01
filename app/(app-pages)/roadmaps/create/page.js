'use client'
import CreateRoadmap from "@/components/pages/Roadmap/CreateRoadmap";


export default function CreateRoadmapPage() {
    
    const createAction = (formData) => {
        console.log(formData)
    }

    return (
        <CreateRoadmap createRoadmapAction={createAction} />
    )
}