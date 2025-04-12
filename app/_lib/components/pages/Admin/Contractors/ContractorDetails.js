import { industrySectorOptions } from "@/data/industryOptions";
import Card from "@/components/organisms/Card/Card";

export default function ContractorDetails({contractor}) {
         
    const getIndustryValue = (industry) => {
        return industrySectorOptions().find(option => option.value === industry)?.label
    }

    return (
        <div className="flex flex-col gap-8 w-full lg:flex-row">
            <div className="flex flex-col gap-8 w-full lg:w-1/2">
                <Card className="w-full" contentClass="flex flex-col gap-4" title='Contractor Details'>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">
                            Address
                        </span>
                        <span>
                            {contractor.address}
                        </span>                 
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">
                            Email
                        </span>
                        <span>
                            {contractor.email}
                        </span>                 
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">
                            Phone
                        </span>
                        <span>
                            {contractor.phone}
                        </span>                 
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">
                            Website
                        </span>
                        <span>
                            {contractor.website}
                        </span>                 
                    </div>
                </Card>
                <Card className="w-full" contentClass="flex flex-col gap-4" title="Contractor Contact Person">
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">
                            Contact Person Name
                        </span>
                        <span>
                            {contractor.contactPersonName}
                        </span>                 
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">
                            Contact Person Email
                        </span>
                        <span>
                            {contractor.contactPersonEmail}
                        </span>                 
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">
                            Contact Person Phone
                        </span>
                        <span>
                            {contractor.contactPersonPhone}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">
                            Contact Person Designation
                        </span>
                        <span>
                            {contractor.contactPersonDesignation}
                        </span>
                    </div>
                </Card>
            </div>
                            
            <Card className="w-full lg:w-1/2" contentClass="flex flex-col gap-4" title={'Other Details'}>
                <div className="flex flex-col gap-1">
                    <span className="font-bold">
                        Industry
                    </span>
                    <span>
                        {getIndustryValue(contractor.industry)}
                    </span>                 
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold">
                        About
                    </span>
                    <span>
                        {contractor.about}
                    </span>                 
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold">
                        Services
                    </span>
                    <span>
                        {contractor.services}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold">
                        References
                    </span>
                    <span>
                        {contractor.references}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold">
                        Certifications
                    </span>
                    <span>
                        {contractor?.certifications}
                    </span>
                </div>
            </Card>
        </div>
    )
}
