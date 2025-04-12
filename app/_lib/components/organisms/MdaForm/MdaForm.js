"use client"
import Button from "@/components/atoms/Form/Button/Button"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import TextArea from "@/components/atoms/Form/Input/TextArea"
import { useActionState, useState } from "react"
import { saveMda } from "@/actions/mdaAction"
import Alert from "@/components/molecules/Alert/Alert"
import Plus from "@/svgs/plus"
import Close from "@/svgs/close-line"
import Card from "@/components/organisms/Card/Card"
import { isNullOrEmptyString } from "@/utils/helpers"

export default function MdaForm( { closeModal, mda } ) {
    const [state, formAction, pending] = useActionState(saveMda, {errors: {}})
    const [ministries, setMinistries] = useState(mda?.ministries ?? [])
    const [departments, setDepartments] = useState(mda?.departments ?? [])
    const [agencies, setAgencies] = useState(mda?.agencies ?? [])
    const [ministryItem, setMinistryItem] = useState('')
    const [departmentItem, setDepartmentItem] = useState('')
    const [agencyItem, setAgencyItem] = useState('')

    const addMinistry = () => {
        if (!isNullOrEmptyString(ministryItem)) {
            const exists = ministries.find(m => m === ministryItem)
            if (!exists) {
                setMinistries([...ministries, ministryItem])
                document.getElementById('ministryItem').value = ''
            }
            else {
                alert('Ministry already added!')
            }
        }
        else {
            alert('Please enter a ministry value')
        }
    }

    const removeMinistry = (ministry) => {
        setMinistries([...ministries].filter(m => m !== ministry))
    }

    const addDepartment = () => {
        if (!isNullOrEmptyString(departmentItem)) {
            const exists = departments.find(d => d === departmentItem)
            if (!exists) {
                setDepartments([...departments, departmentItem])
                document.getElementById('departmentItem').value = ''
            }
            else {
                alert('Department already added!')
            }
        }
        else {
            alert('Please enter a department value!')
        }
    }

    const removeDepartment = (department) => {
        setDepartments([...departments].filter(d => d !== department))
    }

    const addAgency = () => {
        if (!isNullOrEmptyString(agencyItem)) {
            const exists = agencies.find(a => a === agencyItem)
            if (!exists) {
                setAgencies([...agencies, agencyItem])
                document.getElementById('agencyItem').value = ''
            }
            else {
                alert('Agency already added!')
            }
        }
        else {
            alert('Please enter an agency value!')
        }
    }

    const removeAgency = (agency) => {
        setAgencies([...agencies].filter(a => a !== agency))
    }

    if (mda && !state?.prev) {
        state.prev = mda
    }
    const id = mda?.id
    const title = id ? 'Edit MDA' : 'Create New MDA'

    return (
        <Card title={title}>
            <form 
                action={formAction}
                className="overflow-x-hidden overflow-y-auto max-h-[80vh] relative w-full max-w-[700px] overflow-y-auto bg-white dark:bg-gray-900"
            >
                { state.error && 
                <div className="mb-6">
                    <Alert variant="error" title={state.error} />
                </div> 
                }

                { state.success && <Alert variant="success" title='MDA saved successfully' />}

                { id && <input type='hidden' name='id' value={id} /> }
                { ministries.length > 0 && <input type='hidden' name='ministries' value={ministries?.length > 0 ? JSON.stringify(ministries) : null} /> }
                { departments.length > 0 && <input type='hidden' name='departments' value={departments?.length > 0 ? JSON.stringify(departments) : null} /> }
                { agencies.length > 0 && <input type='hidden' name='agencies' value={agencies?.length > 0 ? JSON.stringify(agencies) : null} /> }
                { !isNullOrEmptyString(ministryItem) && <input type='hidden' name='ministryItem' value={ministryItem} /> }
                { !isNullOrEmptyString(departmentItem) && <input type='hidden' name='departmentItem' value={departmentItem} /> }
                { !isNullOrEmptyString(agencyItem) && <input type='hidden' name='agencyItem' value={agencyItem} /> }

                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                    <div className="col-span-1">
                        <Label
                            htmlFor="name"
                        >
                            Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            defaultValue={state?.prev?.name}
                            error={state?.errors?.name}
                            hint={state?.errors?.name}
                        />                    
                    </div>
                    <div className="col-span-1">
                        <Label
                            htmlFor="description"
                        >
                            Description
                        </Label>
                        <TextArea
                            placeholder="Mda description"
                            name='description'
                            rows={3}
                            defaultValue={state?.prev?.description}
                            error={state?.errors?.description}
                            hint={state?.errors?.description}
                        />
                    </div>
                    <div className="col-span-1">
                        <Label
                            htmlFor="email"
                        >
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            defaultValue={state?.prev?.email}
                            error={state?.errors?.email}
                            hint={state?.errors?.email}
                        />
                    </div>
                    <div className="col-span-1">
                        <Label
                            htmlFor="phone"
                        >
                            Phonne Number
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Phone Number"
                            defaultValue={state?.prev?.phone}
                            error={state?.errors?.phone}
                            hint={state?.errors?.phone}
                        />
                    </div>
                    <div className="col-span-1">
                        <Label
                            htmlFor="website"
                        >
                            Website
                        </Label>
                        <Input
                            id="website"
                            name="website"
                            type="url"
                            placeholder="Website"
                            defaultValue={state?.prev?.website}
                            error={state?.errors?.website}
                            hint={state?.errors?.website}
                        />                    
                    </div>
                    <div className="col-span-1">
                        <Label
                            htmlFor="address"
                        >
                            Address
                        </Label>
                        <Input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="address"
                            defaultValue={state?.prev?.address}
                            error={state?.errors?.address}
                            hint={state?.errors?.address}
                        />                    
                    </div>
                    <div className="col-span-1">
                        <Label
                            htmlFor="ministryItem"
                        >
                            Ministries
                        </Label>
                        { ministries.length > 0 && 
                            ministries.map((m, i) => 
                            <div key={m} className="flex flex-row items-center justify-between gap-[10px] border-b border-gray-300 dark:border-gray-700 mb-2">
                                <span className="flex flex-row gap-4"><span>{i+1}.</span> <span>{ m }</span></span>
                                <button onClick={() => removeMinistry( m )}><Close /></button>
                            </div>)
                        }
                        <div className="flex flex-row w-full items-center justify-start">
                            <div className="w-full">
                                <Input
                                    id="ministryItem"
                                    placeholder="Add Ministry"
                                    onChange={e => setMinistryItem(e?.target?.value)}
                                />
                            </div>
                            <Button type='button' size='sm' onClick={addMinistry}>
                                <Plus /> Add
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <Label
                            htmlFor="departmentItem"
                        >
                            Departments
                        </Label>
                        { departments.length > 0 && 
                            departments.map((d, i) => 
                            <div key={d} className="flex flex-row items-center justify-between gap-[10px] border-b border-gray-300 dark:border-gray-700 mb-2">
                                <span className="flex flex-row gap-4"><span>{i+1}.</span> <span>{ d }</span></span>
                                <button onClick={() => removeDepartment( d )}><Close /></button>
                            </div>)
                        }
                        <div className="flex flex-row w-full items-center justify-start">
                            <div className="w-full">
                                <Input
                                    id="departmentItem"
                                    placeholder="Add Department"
                                    onChange={e => setDepartmentItem(e?.target?.value)}
                                />
                            </div>
                            <Button type='button' size='sm' onClick={addDepartment}>
                                <Plus /> Add
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <Label
                            htmlFor="agencyItem"
                        >
                            Agencies
                        </Label>
                        { agencies.length > 0 && 
                            agencies.map((a, i) => 
                            <div key={a} className="flex flex-row items-center justify-between gap-[10px] border-b border-gray-300 dark:border-gray-700 mb-2">
                                <span className="flex flex-row gap-4"><span>{i+1}.</span> <span>{ a }</span></span>
                                <button onClick={() => removeAgency( a )}><Close /></button>
                            </div>)
                        }
                        <div className="flex flex-row w-full items-center justify-start">
                            <div className="w-full">
                                <Input
                                    id="agencyItem"
                                    placeholder="Add Agency"
                                    onChange={e => setAgencyItem(e?.target?.value)}
                                />
                            </div>
                            <Button type='button' size='sm' onClick={addAgency}>
                                <Plus /> Add
                            </Button>
                        </div>
                    </div>
                </div>

                { state.success && <Alert variant="success" title='MDA saved successfully' />}

                <div className="flex items-center justify-end w-full gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={closeModal}
                        isLoading={pending}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        isLoading={pending}
                    >
                        Save MDA
                    </Button>
                </div>
            </form >
        </Card>
    )
}
