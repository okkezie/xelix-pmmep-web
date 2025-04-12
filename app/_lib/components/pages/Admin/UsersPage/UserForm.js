"use client"
import Button from "@/components/atoms/Form/Button/Button"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import Select from "@/components/atoms/Form/Select"
import { genderOptions } from "@/data/genderOptions"
import { useActionState, useEffect, useState } from "react"
import { saveUser } from "@/actions/userActions"
import Alert from "@/components/molecules/Alert/Alert"

export default function UserForm( { userTypes, mdas, close, user, contractors } ) {
    const [selectedUserType, setSelectedUserType] = useState(null)
    const [isContractor, setIsContractor] = useState(false)
    const [isProject, setIsProject] = useState(false)
    const [isMda, setIsMda] = useState(true)
    const [isGovernor, setIsGovernor] = useState(false)

    const title = user ? "Edit User" : "Create New User"
    const [state, formAction, pending] = useActionState(saveUser, {errors: {}})
    if (state?.success) {
        console.log({state})
        alert(state?.message)
        close()
    }
    if (user && !state?.prev) {
        state.prev = user
        state.prev.mda = JSON.stringify(user?.mda ?? '{}')
    }
    const userTypeOptions = userTypes.map(ut => ({
        value: ut,
        label: ut?.replaceAll("_", " ")
    }))

    const mdaOptions = mdas?.map?.(m => ({id: m.id, name: m.name}))?.map?.(mda => ({
        value: JSON.stringify(mda),
        label: mda.name
    }))

    const contractorOptions = contractors?.map?.(c => ({id: c.id, name: c.name}))?.map?.(contractor => ({
        value: JSON.stringify(contractor),
        label: contractor.name
    }))
  
    const id = user?.id

    useEffect(() => {
        if (selectedUserType?.toLowerCase().includes("contractor")) {
            setIsGovernor(false);
            setIsMda(false)
            setIsProject(false)
            setIsContractor(true)
        }
        else if (selectedUserType?.toLowerCase().includes("project")) {
            setIsGovernor(false);
            setIsMda(false)
            setIsProject(true)
            setIsContractor(false)
        }
        else if (selectedUserType?.toLowerCase().includes("mda")) {
            setIsGovernor(false);
            setIsMda(true)
            setIsProject(false)
            setIsContractor(false)
        }
        else if (selectedUserType?.toLowerCase().includes("governor")) {
            setIsGovernor(true);
            setIsMda(false)
            setIsProject(false)
            setIsContractor(false)
        }
    }, [selectedUserType])

    return (
        <form 
            action={formAction}
            className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
        >
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                {title}
            </h4>

            { state.error && 
            <div className="mb-6">
                <Alert variant="error" title={state.error} />
            </div> 
            }

            {id && <input type='hidden' name='id' value={id} />}

            <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                <div className="col-span-1">
                    <Label
                        htmlFor="name"
                    >
                        Full Name
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
                        htmlFor="name"
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
                        htmlFor="name"
                    >
                        Phone Number
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
                        htmlFor="gender"
                    >
                        Gender
                    </Label>
                    <Select
                        id="gender"
                        name="gender"
                        placeholder="Select Gender"
                        options={genderOptions}
                        defaultValue={state?.prev?.gender}
                        error={state?.errors?.gender}
                        hint={state?.errors?.gender}
                    />
                </div>

                <div className="col-span-1">
                    <Label
                        htmlFor="userType"
                    >
                        User Type
                    </Label>
                    <Select
                        id="userType"
                        name="userType"
                        placeholder="Select User Type"
                        options={userTypeOptions}
                        defaultValue={state?.prev?.userType}
                        error={state?.errors?.userType}
                        hint={state?.errors?.userType}
                        onChange={value => setSelectedUserType(value)}
                    />
                </div>
                { isMda && 
                    <div className="col-span-1">
                        <Label
                            htmlFor="mda"
                        >
                            User MDA
                        </Label>
                        <Select
                            id="mda"
                            name="mda"
                            placeholder="Select MDA"
                            options={mdaOptions}
                            defaultValue={state?.prev?.mda}
                            error={state?.errors?.mda}
                            hint={state?.errors?.mda}
                        />
                    </div>
                }
                { isContractor && 
                    <div className="col-span-1">
                        <Label
                            htmlFor="contractor"
                        >
                            Company Name
                        </Label>
                        <Select
                            id="contractor"
                            name="contractor"
                            placeholder="Select Company"
                            options={contractorOptions}
                            defaultValue={state?.prev?.contractor}
                            error={state?.errors?.contractor}
                            hint={state?.errors?.contractor}
                        />
                    </div>
                }
                {(isGovernor || isProject) && 
                    <div className="col-span-1">
                        <Label
                            htmlFor="office"
                        >
                            Office Name
                        </Label>
                        { isGovernor && <Input
                                id="office"
                                type="text"
                                name="office"
                                placeholder="Office Name"
                                defaultValue="Governor's Office"
                            />
                        }
                        { isProject && <Input
                                id="office"
                                type="text"
                                name="office"
                                placeholder="Office Name"
                                defaultValue="Project Office"
                            />
                        }
                        { isMda && <Input
                                id="office"
                                type="text"
                                name="office"
                                placeholder="Office Name"
                                defaultValue={state?.prev?.office}
                                error={state?.errors?.office}
                                hint={state?.errors?.office}
                            />
                        }
                    </div>
                }
                
            </div>

            <div className="flex items-center justify-end w-full gap-3 mt-6">
                <Button
                    variant="outline"
                    onClick={close}
                    isLoading={pending}
                    type="button"
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    isLoading={pending}
                >
                    {id ? 'Update User' : 'Create User'}
                </Button>
            </div>
        </form >
    )
}
