import Input from "@/components/atoms/Form/Input/InputField"
import TextArea from "@/components/atoms/Form/Input/TextArea"
import Label from "@/components/atoms/Form/Label"
import Card from "@/components/organisms/Card/Card"
import Button from "@/components/atoms/Form/Button/Button"
import { useState } from "react"
import Plus from "@/svgs/plus"
import { isNullOrEmptyString } from "@/utils/helpers"
import Close from "@/svgs/close-line"
import DatePicker from 'react-date-picker'

export default function MilestoneForm({ onSubmit, onCancel, selectedMilestone }) {
    const [deliverables, setDeliverables] = useState(selectedMilestone?.deliverables ?? [])
    const [deliverableItem, setDeliverableItem] = useState("")
    const [name, setName] = useState(selectedMilestone?.title)
    const [description, setDescription] = useState(selectedMilestone?.description)
    const [deadline, setDeadline] = useState(selectedMilestone?.deadline)

    const saveMilestone = (event) => {
        event.preventDefault()
        const data = {
            'name': name,
            'description': description,
            'deadline': deadline,
            'deliverables': deliverables
        }

        if (selectedMilestone) {
            data['id'] = selectedMilestone?.id
        }

        document.getElementById("mname").value = ""
        document.getElementById("mdescription").value = ""
        document.getElementById("deliverable").value = ""

        onSubmit(data)
    }

    const addDeliverableItem = () => {
        if (!isNullOrEmptyString(deliverableItem)) {
            const ds = new Set(deliverables)
            ds.add(deliverableItem)
            setDeliverables([...ds])
            setDeliverableItem("")
        }
        document.getElementById("deliverable").value = ""
    }

    const removeDeliverable = (item) => {
        const filtered = [...deliverables].filter(d => d !== item)
        setDeliverables(filtered)
    }

    return (
    <form onSubmit={saveMilestone}>
        <Card
            className="" 
            title={"Add new milestone"}
            description="Define a single milestone to add to your project."
        >
            <div>
                <Label htmlFor="mname">
                    Name
                </Label>
                <Input
                    id="mname"
                    name="mname"
                    type="text"
                    placeholder="Enter a name for your milestone"
                    onChange={(e) => setName(e?.target?.value)}
                    defaultValue={selectedMilestone?.name}
                />
            </div>
            <div className="">
                <Label
                    htmlFor="mdescription"
                >
                    Description
                    <br />
                    <small>Describe the milestone in detail</small>
                </Label>
                <TextArea
                    id="mdescription"
                    name="mdescription"
                    rows={3}
                    placeholder="Enter milestone description."
                    onChange={(value) => setDescription(value)}
                    defaultValue={selectedMilestone?.description}
                />
            </div>
            <div className="">
                <Label
                    htmlFor="mdeadline"
                >
                    Deadline
                    <br />
                    <small>By what date is this milestone supposed to be achnieved?</small>
                </Label>
                <DatePicker value={deadline} onChange={setDeadline} />
            </div>
            <div className="w-full">
                
                <Label
                    htmlFor="deliverable"
                >
                    Add Deliverables
                </Label>
                {deliverables.length > 0 && 
                    deliverables.map((d, i) => 
                    <div key={d} className="flex flex-row items-center justify-between gap-[10px] border-b border-gray-300 dark:border-gray-700">
                        <span className="flex flex-row gap-4"><span>{i+1}.</span> <span>{d}</span></span>
                        <button onClick={() => removeDeliverable(d)}><Close /></button>
                    </div>)
                }
                <div className="flex flex-row w-full items-center justify-start">
                    <div className="w-full">
                        <Input
                            id="deliverable"
                            name="deliverable"
                            placeholder="Enter deliverable item"
                            onChange={e => setDeliverableItem(e?.target?.value)}
                        />
                    </div>
                    <Button type='button' size='sm' onClick={addDeliverableItem}>
                        <Plus /> Add
                    </Button>
                </div>
            </div>
        </Card>
        <div className="flex items-center justify-end w-full gap-6 mt-6 p-8">
            <Button
                variant="outline"
                onClick={onCancel}
                type='button'
                name='cancel'
            >
                Cancel
            </Button>
            <Button
                variant="primary"
                type="submit"
            >
                Save
            </Button>
        </div>
    </form>
    )
}