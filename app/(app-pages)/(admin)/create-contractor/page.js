'use client'

import Card from "@/components/organisms/Card/Card"
import NewContractorForm from "@/components/organisms/NewContractorForm/NewContractorForm"

export default function CreateContractorPage() {

    const createContractorAction = (formData) => {
        console.log(formData)
        alert('Contractor Created successfully!')
    }

    return (
        <Card title='Create New Contractor'>
            <NewContractorForm submitAction={createContractorAction} />
        </Card>
    )
}