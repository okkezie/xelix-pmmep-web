"use client"
import Button from "@/components/atoms/Form/Button/Button"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import Select from "@/components/atoms/Form/Select"
import { genderOptions } from "@/data/genderOptions"

export default function NewUserForm( { closeModal, submitAction, userTypes } ) {

    const userTypeOptions = userTypes.map(ut => ({
        value: ut,
        label: ut?.replaceAll("_", " ")
    }))
  
    const handleUserTypeChange = (value) => {
        console.log(value)
    }

    const handleGenderChange = (value) => {
        console.log(value)
    }

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
                        Full Name
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
                        Phone Number
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Phone Number"
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
                        onChange={handleGenderChange}
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
                        onChange={handleUserTypeChange}
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
