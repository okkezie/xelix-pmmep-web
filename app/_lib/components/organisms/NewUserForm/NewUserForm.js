"use client"
import Button from "@/components/atoms/Form/Button/Button"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import Select from "@/components/atoms/Form/Select"
import { genderOptions } from "@/data/genderOptions"
import { useModal } from "@/hooks/useModal"
import { useActionState } from "react"
import { saveUser } from "@/app/_lib/actions/userActions"

export default function NewUserForm( { userTypes, mdas } ) {
    const { closeModal } = useModal()
    const [state, formAction, pending] = useActionState(saveUser, {errors: {}})

    const userTypeOptions = userTypes.map(ut => ({
        value: ut,
        label: ut?.replaceAll("_", " ")
    }))

    const mdaOptions = mdas?.map(mda => ({
        value: mda.id,
        label: mda.name
    }))
  
    return (
        <form 
            action={formAction}
            className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                Create New User
            </h4>

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
                        type="text"
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
                    />
                </div>
                <div className="col-span-1">
                    <Label
                        htmlFor="mda"
                    >
                        User Type
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
            </div>

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
                    Create User
                </Button>
            </div>
        </form >
    )
}
