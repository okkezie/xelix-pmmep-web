
"use client"
import Button from "@/components/atoms/Form/Button/Button"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import TextArea from "@/components/atoms/Form/Input/TextArea"

export default function NewMdaForm( { closeModal, submitAction } ) {

    return (
        <form 
            action={submitAction}
            className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                Create New User
            </h4>

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
                    />                    
                </div>

                <div className="col-span-1">
                    <Label
                        htmlFor="userType"
                    >
                        Description
                    </Label>
                    <TextArea
                        placeholder="Mda description"
                        name='description'
                        rows={3}
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
                    />                    
                </div>

                <div className="col-span-1">
                    <Label
                        htmlFor="name"
                    >
                        Website
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Phone Number"
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
                    Create User
                </Button>
            </div>
        </form >
    )
}
