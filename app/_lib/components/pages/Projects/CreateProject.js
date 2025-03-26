
import { useActionState, useEffect, useRef, useState } from "react"
import Card from "@/components/organisms/Card/Card"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import Textarea from '@/components/atoms/Form/Input/TextArea'
import useGoBack from "@/hooks/useGoBack"
import Button from "@/components/atoms/Form/Button/Button"
import { createProject } from '@/actions/projectActions'
import UnorderedList from "@/components/molecules/List/UnorderedList"
import { Constants } from "@/utils/Constants"
import Select from "@/components/atoms/Form/Select"
import Alert from "@/components/molecules/Alert/Alert"
import { useModal } from "@/hooks/useModal"
import { Modal } from "@/components/templates/Modal/Modal"
import { 
    Table, 
    TableHeader, 
    TableBody, 
    TableCell, 
    TableRow 
} from "@/components/molecules/Table/Table"
import MilestoneForm from "@/components/organisms/Forms/MilestoneForm"
import { randomBytes } from "crypto"
import DatePicker from 'react-date-picker'
import { format } from "date-fns"
import { useAuthContext } from "@/contexts/AuthContext"
import Plus from "@/svgs/plus"
import Close from "@/svgs/close-line"
import Pencil from "@/svgs/pencil"

export default function CreateProject({ project }) {
    const { userMda } = useAuthContext()
    const {closeModal, isOpen, openModal} = useModal()
    const [milestones, setMilestones] = useState(project?.milestones ?? [])
    const [state, formAction, pending] = useActionState(createProject, { errors: {}})
    const [submitAction, setSubmitAction] = useState(Constants.FormAction.Save)
    const [selectedMilestone, setSelectedMilestone] = useState()
    const [startDate, setStartDate] = useState(project?.startDate)
    const [endDate, setEndDate] = useState(project?.endDate)

    const formRef = useRef(null)
    const goBack = useGoBack()

    if (project && !state?.prev ) {
        state['prev'] = project
    }

    const id = project ? project.id : null

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
            formRef?.current && formRef.current.requestSubmit()
        }, 1000)
    }

    const openNewMilestoneModal = () => {
        setSelectedMilestone(null)
        openModal()
    }

    const removeMilestone = (id) => {
        const filtered = milestones ? [...milestones].filter(m => m?.id !== id) : []
        setMilestones(filtered)
    }

    const saveMilestone = (m) => {
        if (!m) {
            return false
        }
        const existing = milestones ? [...milestones].find(ms => ms?.id === m?.id) : {}
        if (existing) {
            removeMilestone(m?.id)
        }
        m.id = randomBytes(10).toString('hex')
        setMilestones(ms => [...ms, m])
        closeModal()
    }

    useEffect(() => {
        if ((!milestones || milestones?.length === 0) && project?.milestones) {
            setMilestones(project.milestones)
        }
        if (!startDate && project?.startDate) {
            setStartDate(project?.startDate)
        }
        if (!endDate && project?.endDate) {
            setEndDate(project?.endDate)
        }
    }, [endDate, milestones, project, startDate])

    return (
        <>
        <Card title={'Create New Project'}>
            <form action={ formAction } ref={formRef}>
                <div className='flex flex-col lg:flex-row gap-4 w-full'>
                    <div className='w-full flex flex-col gap-4'>
                        <Card className='w-full' title={'Project Details'}>
                            <div className="">
                                <Label htmlFor="name">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter a name for your project"
                                    defaultValue={state?.prev?.name}
                                    error={state?.errors?.name || state?.errors?.Name}
                                    hint={state?.errors?.name}
                                />
                                <input type='hidden' value={JSON.stringify(userMda)} name='mda' />
                                <input type='hidden' value={submitAction} name='action' />
                                <input type="hidden" value={JSON.stringify(milestones)} name='milestones' />
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
                                    <small>Describe the project in detail.</small>
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="Enter project description."
                                    defaultValue={state?.prev?.description}
                                    error={state?.errors?.description}
                                    hint={state?.errors?.description}
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="startDate"
                                >
                                    Project Start Date
                                    <br />
                                    <small>Please specify the expected project start date</small>
                                </Label>
                                <DatePicker value={startDate} onChange={setStartDate} />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="endDate"
                                >
                                    Project End Date
                                    <br />
                                    <small>Please specify the expected project end date</small>
                                </Label>
                                <DatePicker value={endDate} onChange={setEndDate} />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="roadmap"
                                >
                                    Roadmap
                                    <br />
                                    <small>Which roadmap is this project attached to?</small>
                                </Label>
                                <Select
                                    id="roadmap"
                                    name="roadmap"
                                    rows={4}
                                    placeholder="Please select a roadmap"
                                    defaultValue={state?.prev?.roadmap}
                                    error={state?.errors?.roadmap}
                                    hint={state?.errors?.roadmap}
                                    options={[]}
                                />
                            </div>
                        </Card>
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <Card title={'Milestones'}>
                            <div className="flex flex-col gap-4">
                                { (milestones && milestones.length === 0) &&
                                <>
                                <Alert 
                                    variant="warning" 
                                    message={'Use the button below to add individual milestones for this project'} 
                                    title={"No milestones defined"}
                                />
                                <div className="w-full flex flex-row mt-4">
                                    <Button 
                                        onClick={openNewMilestoneModal} 
                                        type='button'
                                        variant="outline_primary"
                                    >
                                        <Plus />
                                        Add New Milestone
                                    </Button>
                                </div>
                                </>
                                }
                                
                                { (milestones && milestones.length > 0) &&
                                <>
                                <div className="w-full flex flex-row mb-4">
                                    <Button 
                                        onClick={openNewMilestoneModal} 
                                        type='button'
                                        variant="outline_primary"
                                    >
                                        <Plus />
                                        Add More Milestones
                                    </Button>
                                </div>
                                <div className="w-full mt-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>Milestone</TableCell>
                                                <TableCell>Deadline</TableCell>
                                                <TableCell>Deliverables</TableCell>
                                                <TableCell>Remove</TableCell>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                        { milestones.map( (m, index) => 
                                            <TableRow key={index+1}>
                                                <TableCell>{index+1}</TableCell>
                                                <TableCell>{m?.name}</TableCell>
                                                <TableCell>{format((m?.deadline ?? new Date()), "do LLL u")}</TableCell>
                                                <TableCell>
                                                    <UnorderedList items={m?.deliverables} />
                                                </TableCell>
                                                <TableCell className="flex flex-row items-center justify-center gap-4">
                                                    <Button 
                                                        onClick={() => removeMilestone(m?.id)}
                                                        type="button"
                                                        variant="outline_danger"
                                                        size="sm"
                                                    >
                                                        <Close />
                                                    </Button>
                                                    <Button 
                                                        onClick={() => {
                                                            setSelectedMilestone(m)
                                                            openModal()
                                                        }}
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Pencil />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        </TableBody>
                                    </Table>
                                </div>
                                </>
                                }
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
        <Modal isOpen={isOpen} onClose={closeModal} className={"max-w-[800px]"}>
            <MilestoneForm 
                onSubmit={saveMilestone}
                onCancel={closeModal}
                selectedMilestone={selectedMilestone}
            />
        </Modal>
        </>
    )
}