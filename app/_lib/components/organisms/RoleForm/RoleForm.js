"use client"
import Button from "@/components/atoms/Form/Button/Button"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import TextArea from "@/components/atoms/Form/Input/TextArea"
import Select from "@/components/atoms/Form/Select"
import { useActionState, useEffect } from "react"
import { saveRole } from "@/actions/roleActions"
import Alert from "@/components/molecules/Alert/Alert"
import {toast} from 'react-toastify'
import { useRouter } from "next/navigation"
import { Constants } from "@/utils/Constants"

export default function RoleForm( { role, closeModal, audiences } ) {
    const [state, formAction, pending] = useActionState(saveRole, {errors: {}})
    const router = useRouter()
    
    const id = role?.id
    const title = role ? "Edit Role" : "Create New Role"
    if (role && !state?.prev) {
        state.prev = role
    }
    const audienceOptions = audiences.map(a => ({
        value: a,
        label: a.replace('GOVERNOR', "GOVERNOR'S").replace("_", " ").replace(/\b\w/g, char => char.toUpperCase())
    }))

    useEffect(() => {
        if (state?.success) {
            close()
            toast.success(state?.message)
            router.push(Constants.Paths.Roles)
            router.refresh()
        }
    }, [state?.success, router, state?.message])

    return (
        <form 
            action={formAction}
            className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                { title }
            </h4>

            { state.error && 
            <div className="mb-6">
                <Alert variant="error" title={state.error} />
            </div> 
            }

            { state.success && <Alert variant="success" title='Role saved successfully' />}

            {id && <input type='hidden' name='id' value={id} />}

            <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                <div className="col-span-1">
                    <Label
                        htmlFor="name"
                    >
                        Role Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Role Name"
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
                        id="description"
                        name="description"
                        placeholder="Role description"
                        rows={4}
                        defaultValue={state?.prev?.description}
                        error={state?.errors?.description}
                        hint={state?.errors?.description}
                    />
                </div>

                <div className="col-span-1">
                    <Label
                        htmlFor="audience"
                    >
                        Audience
                    </Label>
                    <Select
                        id="audience"
                        name="audience"
                        placeholder="Select Audience"
                        options={audienceOptions}
                        defaultValue={state?.prev?.audience}
                        error={state?.errors?.audience}
                        hint={state?.errors?.audience}
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
                    Save Changes
                </Button>
            </div>
        </form >
    )
}
