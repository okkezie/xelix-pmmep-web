"use client"
import Button from "@/components/atoms/Form/Button/Button"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import TextArea from "@/components/atoms/Form/Input/TextArea"
import useGoBack from "@/hooks/useGoBack"
import Card from "@/components/organisms/Card/Card"
import Select from "@/components/atoms/Form/Select"
import { useActionState } from "react"
import { saveContractor } from "@/actions/contractorActions"
import Alert from "@/components/molecules/Alert/Alert"
import { industrySectorOptions } from "@/data/industryOptions"

export default function ContractorForm({contractor}) {
    const [state, formAction, pending] = useActionState(saveContractor, {errors: {}})
    const goBack = useGoBack()
    const industries = industrySectorOptions()

    if (contractor && !state?.prev) {
        state.prev = contractor
    }
    const id = contractor?.id
    const title = id ? 'Edit Contractor' : 'Create New Contractor'

    return (
        <Card title={ title }>
            <form
                action={formAction}
                className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-2 dark:bg-gray-900 lg:p-4"
            >
                { state.error && 
                <div className="mb-6">
                    <Alert variant="error" title={state.error} />
                </div> 
                }
                { state.success && <Alert variant="success" title='Contractor info submitted successfully' />}

                { id && <input type='hidden' name='id' value={id} /> }
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
                                defaultValue={state?.prev?.name}
                                error={state?.errors?.name}
                                hint={state?.errors?.name}
                            />
                        </div>
                        <div className="">
                            <Label
                                htmlFor="about"
                            >
                                About
                            </Label>
                            <TextArea
                                placeholder="Contractor's About"
                                name='about'
                                id='about'
                                rows={3}
                                defaultValue={state?.prev?.about}
                                error={state?.errors?.about}
                                hint={state?.errors?.about}
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
                                defaultValue={state?.prev?.address}
                                error={state?.errors?.address}
                                hint={state?.errors?.address}
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
                                defaultValue={state?.prev?.email}
                                error={state?.errors?.email}
                                hint={state?.errors?.email}
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
                                defaultValue={state?.prev?.phone}
                                error={state?.errors?.phone}
                                hint={state?.errors?.phone}
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
                                defaultValue={state?.prev?.website}
                                error={state?.errors?.website}
                                hint={state?.errors?.website}
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
                                defaultValue={state?.prev?.industry}
                                error={state?.errors?.industry}
                                hint={state?.errors?.industry}
                            />                    
                        </div>
                    </Card>
                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
                        <Card className="w-full" contentClass="flex flex-col gap-4" title="Contractor Contact Person">
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
                                    defaultValue={state?.prev?.contactPersonName}
                                    error={state?.errors?.contactPersonName}
                                    hint={state?.errors?.contactPersonName}
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
                                    defaultValue={state?.prev?.contactPersonEmail}
                                    error={state?.errors?.contactPersonEmail}
                                    hint={state?.errors?.contactPersonEmail}
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
                                    defaultValue={state?.prev?.contactPersonPhone}
                                    error={state?.errors?.contactPersonPhone}
                                    hint={state?.errors?.contactPersonPhone}
                                /> 
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="contactPersonDesignation"
                                >
                                    Contact Person Designation
                                </Label>
                                <Input
                                    id="contactPersonDesignation"
                                    name="contactPersonDesignation"
                                    type="text"
                                    placeholder="Contact Person's Designation"
                                    defaultValue={state?.prev?.contactPersonDesignation}
                                    error={state?.errors?.contactPersonDesignation}
                                    hint={state?.errors?.contactPersonDesignation}
                                />
                            </div>
                        </Card>
                        <Card className="w-full" contentClass="flex flex-col gap-4" title={'Other Details'}>
                            <div className="">
                                <Label
                                    htmlFor="services"
                                >
                                    Services
                                </Label>
                                <TextArea
                                    placeholder="Services Offered"
                                    name='services'
                                    rows={3}
                                    defaultValue={state?.prev?.services}
                                    error={state?.errors?.services}
                                    hint={state?.errors?.services}
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="references"
                                >
                                    References
                                </Label>
                                <TextArea
                                    placeholder="Contractor's References"
                                    name='references'
                                    rows={3}
                                    defaultValue={state?.prev?.references}
                                    error={state?.errors?.references}
                                    hint={state?.errors?.references}
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="certifications"
                                >
                                    Certifications
                                </Label>
                                <TextArea
                                    placeholder="Contractor's Certifications"
                                    name='certifications'
                                    rows={3}
                                    defaultValue={state?.prev?.certifications}
                                    error={state?.errors?.certifications}
                                    hint={state?.errors?.certifications}
                                />
                            </div>
                        </Card>
                    </div>
                </div>

                { state.error && 
                <div className="mb-6">
                    <Alert variant="error" title={state.error} />
                </div> 
                }
                { state.success && <Alert variant="success" title='Contractor info submitted successfully' />}

                <div className="flex items-center justify-end w-full gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={goBack}
                        type='button'
                        isLoading={pending}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        isLoading={pending}
                    >
                        Submit for Approval
                    </Button>
                </div>
            </form >
        </Card>
    )
}