"use client"
import Button from "@/components/atoms/Form/Button/Button"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import Select from "@/components/atoms/Form/Select"
import { genderOptions } from "@/data/genderOptions"
import { useActionState } from "react"
import { saveUser } from "@/actions/userActions"
import Alert from "@/components/molecules/Alert/Alert"

export default function NewUserForm( { userTypes, mdas, close, user } ) {
    const [state, formAction, pending] = useActionState(saveUser, {errors: {}})
    console.log({state})
    if (state?.success) {
        alert(state?.message)
        close()
    }
    if (user && !state?.prev) {
        state.prev = user
    }
    const userTypeOptions = userTypes.map(ut => ({
        value: ut,
        label: ut?.replaceAll("_", " ")
    }))

    const mdaOptions = mdas?.map?.(m => ({id: m.id, name: m.name}))?.map?.(mda => ({
        value: JSON.stringify(mda),
        label: mda.name
    }))
  
    const id = user?.id

    return (
        <form 
            action={formAction}
            className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
        >
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                Create New User
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
                    Create User
                </Button>
            </div>
        </form >
    )
}
