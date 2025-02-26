"use client"
import Button from "@/components/atoms/Form/Button/Button"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import TextArea from "@/components/atoms/Form/Input/TextArea"
import Select from "@/components/atoms/Form/Select"

export default function NewRoleForm( { closeModal, submitAction, audiences } ) {

    const audienceOptions = audiences.map(a => ({
        value: a,
        label: a.replace('GOVERNOR', "GOVERNOR'S").replace("_", " ").replace(/\b\w/g, char => char.toUpperCase())
    }))

    const handleAudienceChange = (value) => {
        console.log(value)
    }

    return (
        <form 
            action={submitAction}
            className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                Create New Role
            </h4>

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
                        onChange={handleAudienceChange}
                    />
                </div>
            </div>

            <div className="flex items-center justify-end w-full gap-3 mt-6">
                <Button
                    variant="outline"
                    onClick={closeModal}
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                >
                    Save Changes
                </Button>
            </div>
        </form >
    )
}
