
import { Constants } from "@/utils/Constants"
import Card from "@/components/organisms/Card/Card"
import ContractorsTable from "@/components/organisms/Tables/ContractorsTable"
import ButtonLink from "@/components/atoms/Form/ButtonLink/ButtonLink"

export default function Contractors({ contractors }) {
    return (
        <Card className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center justify-end">
                <ButtonLink href={Constants.Paths.CreateContractor} className="mb-4" variant='outline'>
                    Create New Contracotor
                </ButtonLink>
            </div>
            
            <ContractorsTable contractors={contractors} />
        </Card>
    )
}