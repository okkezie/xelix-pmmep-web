import { useActionState, useEffect, useRef, useState } from "react"
import Card from "@/components/organisms/Card/Card"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import Textarea from '@/components/atoms/Form/Input/TextArea'
import useGoBack from "@/hooks/useGoBack"
import Button from "@/components/atoms/Form/Button/Button"
import UnorderedList from "@/components/molecules/List/UnorderedList"
import { Constants } from "@/utils/Constants"
import Select from "@/components/atoms/Form/Select"
import DatePicker from 'react-date-picker'
import { format } from "date-fns"
import { createInitiative } from "@/actions/initiativeActions"
import { useAuthContext } from "@/contexts/AuthContext"

export default function CreateInitiative({ initiative, roadmaps, projects }) {
    const { userMda } = useAuthContext()
    const [state, formAction, pending] = useActionState(createInitiative, { errors: {}})
    const [submitAction, setSubmitAction] = useState(Constants.FormAction.Save)
    const [startDate, setStartDate] = useState(initiative?.startDate)
    const [endDate, setEndDate] = useState(initiative?.endDate)
    const formRef = useRef()
    const goBack = useGoBack()

    if (initiative && !state?.prev ) {
        state['prev'] = initiative
    }

    const roadmapsOptions = roadmaps?.map((roadmap) => ({
        label: roadmap.name,
        value: roadmap.id
    }))

    const projectsOptions = projects?.map((project) => ({
        label: project.name,
        value: project.id
    }))

    const id = initiative ? initiative.id : null

    const save = (e) => {
        e?.preventDefault()
        setSubmitAction(Constants.FormAction.Save)
        submitForm()
    }

    const submit = (e) => {
        e?.preventDefault()
        setSubmitAction(Constants.FormAction.Submit)
        submitForm()
    }

    const submitForm = () => {
        setTimeout(() => {
            formRef?.current?.requestSubmit()
        }, 1000)
    }

    useEffect(() => {
        if (!startDate && initiative?.startDate) {
            setStartDate(initiative?.startDate)
        }
        if (!endDate && initiative?.endDate) {
            setEndDate(initiative?.endDate)
        }
    }, [endDate, initiative, startDate])

    return (
        <Card title={'Create New Initiative'}>
            <form action={ formAction } ref={formRef}>
                <div className='flex flex-col lg:flex-row gap-4 w-full'>
                    <div className='w-full flex flex-col lg:flex-row gap-4'>
                        <Card className='w-full'>
                            <div className="">
                                <Label htmlFor="name">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter a name for your initiative"
                                    defaultValue={state?.prev?.name}
                                    error={state?.errors?.name || state?.errors?.Name}
                                    hint={state?.errors?.name}
                                />
                                <input type='hidden' value={JSON.stringify(userMda)} name='mda' />
                                <input type='hidden' value={submitAction} name='action' />
                                { startDate && <input type='hidden' value={format(startDate, "yyy-LL-dd")} name='startDate' /> }
                                { endDate && <input type='hidden' value={format(endDate, "yyyy-LL-dd")} name='endDate' /> }
                                { id && <input type="hidden" value={id} name="id" /> }
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="description"
                                >
                                    Description
                                    <br />
                                    <small>Describe the initiative in detail.</small>
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="Enter initiative description."
                                    defaultValue={state?.prev?.description}
                                    error={state?.errors?.description}
                                    hint={state?.errors?.description}
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="objectives"
                                >
                                    Objectives
                                    <br />
                                    <small>Specify the objectives for this initiative in detail.</small>
                                </Label>
                                <Textarea
                                    id="objectives"
                                    name="objectives"
                                    rows={4}
                                    placeholder="Enter initiative objectives."
                                    defaultValue={state?.prev?.objectives}
                                    error={state?.errors?.objectives}
                                    hint={state?.errors?.objectives}
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="beneficiaries"
                                >
                                    Beneficiaries
                                    <br />
                                    <small>Specify the objectives for this initiative in detail.</small>
                                </Label>
                                <Textarea
                                    id="beneficiaries"
                                    name="beneficiaries"
                                    rows={4}
                                    placeholder="Enter initiative's beneficiaries."
                                    defaultValue={state?.prev?.beneficiaries}
                                    error={state?.errors?.beneficiaries}
                                    hint={state?.errors?.beneficiaries}
                                />
                            </div>
                            
                        </Card>
                        <Card className='w-full'>
                            <div className="">
                                <Label
                                    htmlFor="startDate"
                                >
                                    Initiative Start Date
                                    <br />
                                    <small>Please specify the expected start date</small>
                                </Label>
                                <DatePicker value={startDate} onChange={setStartDate} />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="endDate"
                                >
                                    Initiative End Date
                                    <br />
                                    <small>Please specify the expected end date</small>
                                </Label>
                                <DatePicker value={endDate} onChange={setEndDate} />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="roadmap"
                                >
                                    Roadmap
                                    <br />
                                    <small>Which roadmap is this initiative attached to?</small>
                                </Label>
                                <Select
                                    id="roadmap"
                                    name="roadmap"
                                    rows={4}
                                    placeholder="Please select a roadmap"
                                    defaultValue={state?.prev?.roadmap}
                                    error={state?.errors?.roadmap}
                                    hint={state?.errors?.roadmap}
                                    options={roadmapsOptions}
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="project"
                                >
                                    Project
                                    <br />
                                    <small>Which project is this initiative attached to?</small>
                                </Label>
                                <Select
                                    id="project"
                                    name="project"
                                    rows={4}
                                    placeholder="Please select a project"
                                    defaultValue={state?.prev?.project}
                                    error={state?.errors?.project}
                                    hint={state?.errors?.project}
                                    options={projectsOptions}
                                />
                            </div>
                        </Card>
                    </div>
                    
                </div>

                { state?.error &&
                <Card title={state?.error} className="mt-6 border-red-500">
                    { state?.errors && 
                        <UnorderedList items={Object.entries(state?.errors).map((value) => `${value}`)} />
                    }
                </Card> 
                }

                <Card className="mt-6">
                    <div className="flex items-center justify-end w-full gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={goBack}
                            type='button'
                            name='cancel'
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outline_primary"
                            type="button"
                            isLoading={pending}
                            onClick={save}
                        >
                            Save As Draft
                        </Button>
                        <Button
                            variant="primary"
                            type="button"
                            isLoading={pending}
                            onClick={submit}
                        >
                            Submit For Approval
                        </Button>
                    </div>
                </Card>
            </form>
        </Card>
    )
}