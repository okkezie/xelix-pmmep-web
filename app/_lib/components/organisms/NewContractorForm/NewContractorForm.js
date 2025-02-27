"use client"
import Button from "@/components/atoms/Form/Button/Button"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import TextArea from "@/components/atoms/Form/Input/TextArea"
import useGoBack from "@/hooks/useGoBack"
import Card from "@/components/organisms/Card/Card"
import Select from "@/components/atoms/Form/Select"

export default function NewContractorForm({submitAction}) {
    const goBack = useGoBack()
    const industries = []
    return (
        <form 
            action={submitAction}
            className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
        >
            <div className="flex flex-col lg:flex-row gap-8 w-full">
                <Card className="w-full lg:w-1/2" contentClass="flex flex-col" title='Contractor Details'>
                    <div className="">
                        <Label
                            htmlFor="name"
                        >
                            Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Contractor's Name"
                        />                    
                    </div>
                    <div className="">
                        <Label
                            htmlFor="about"
                        >
                            About
                        </Label>
                        <TextArea
                            placeholder="Contractor's Profile"
                            name='about'
                            id='about'
                            rows={3}
                        />
                    </div>
                    <div className="">
                        <Label
                            htmlFor="address"
                        >
                            Address
                        </Label>
                        <TextArea
                            placeholder="Contractor's Address"
                            name='address'
                            rows={3}
                        />
                    </div>
                    <div className="">
                        <Label
                            htmlFor="email"
                        >
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Contractor's Email"
                        />                    
                    </div>
                    <div className="">
                        <Label
                            htmlFor="phone"
                        >
                            Phone
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Contractor's Phone Number"
                        />                    
                    </div>
                    <div className="">
                        <Label
                            htmlFor="website"
                        >
                            Website
                        </Label>
                        <Input
                            id="website"
                            name="website"
                            type="url"
                            placeholder="Contractor's Website"
                        />                    
                    </div>
                    <div className="">
                        <Label
                            htmlFor="industry"
                        >
                            Industry
                        </Label>
                        <Select
                            id="industry"
                            name="industry"
                            placeholder="Select Contractor's Industry"
                            options={industries}
                        />                    
                    </div>
                </Card>

                <Card className="w-full lg:w-1/2" contentClass="flex flex-col gap-4" title="Contractor Contact Person">
                    <div className="">
                        <Label
                            htmlFor="contactPersonName"
                        >
                            Contact Person Name
                        </Label>
                        <Input
                            id="contactPersonName"
                            name="contactPersonName"
                            type="text"
                            placeholder="Contact Person Full Name"
                        />                    
                    </div>
                    <div className="">
                        <Label
                            htmlFor="contactPersonEmail"
                        >
                            Contact Person Email
                        </Label>
                        <Input
                            id="contactPersonEmail"
                            name="contactPersonEmail"
                            type="email"
                            placeholder="Contact Person Email"
                        />                    
                    </div>
                    <div className="">
                        <Label
                            htmlFor="contactPersonPhone"
                        >
                            Contact Person Phone
                        </Label>
                        <Input
                            id="contactPersonPhone"
                            name="contactPersonPhone"
                            type="tel"
                            placeholder="Contact Person's Phone Number"
                        />                    
                    </div>
                    <div className="">
                        <Label
                            htmlFor="contactPersonDepartment"
                        >
                            Contact Person Phone
                        </Label>
                        <Input
                            id="contactPersonDepartment"
                            name="contactPersonDepartment"
                            type="tel"
                            placeholder="Contact Person's Phone Number"
                        />                    
                    </div>
                    <div className="">
                        <Label
                            htmlFor="contactPersonPDesignation"
                        >
                            Contact Person Designation
                        </Label>
                        <Input
                            id="contactPersonDesignation"
                            name="contactPersonDesignation"
                            type="tel"
                            placeholder="Contact Person's Designation"
                        />                    
                    </div>
                </Card>
            </div>

            <div className="flex items-center justify-end w-full gap-3 mt-6">
                <Button
                    variant="outline"
                    onClick={goBack}
                    type='button'
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                >
                    Create Contractor
                </Button>
            </div>
        </form >
    )
}