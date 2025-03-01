
import { useActionState, useRef, useState } from "react"
import Card from "@/components/organisms/Card/Card"
import Label from "@/components/atoms/Form/Label"
import Input from "@/components/atoms/Form/Input/InputField"
import { RoadmapPeriods } from "@/data/roadmapPeriods"
import Textarea from '@/components/atoms/Form/Input/TextArea'
import useGoBack from "@/hooks/useGoBack"
import Button from "@/components/atoms/Form/Button/Button"
import { createRoadmap } from '@/actions/roadmapActions'
import UnorderedList from "@/components/molecules/List/UnorderedList"
import { Constants } from "@/utils/Constants"

export default function CreateRoadmap({roadmap}) {
    const [state, formAction, pending] = useActionState(createRoadmap, { errors: {}})
    const [submitAction, setSubmitAction] = useState(Constants.FormAction.Save)
    const roadmapRef = useRef(null)
    const currentPeriod = RoadmapPeriods.current
    const mda = "Default MDA"
    const goBack = useGoBack()

    if (roadmap && !state?.prev ) {
        state['prev'] = roadmap
    }

    const id = roadmap ? roadmap.id : null

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
            roadmapRef?.current && roadmapRef.current.requestSubmit()
        }, 1000)
    }

    return (
        <Card title={'Create New Roadmap'}>
            <form action={ formAction } ref={roadmapRef}>
                <div className='flex flex-col lg:flex-row gap-4 w-full'>
                    <div className='w-full flex flex-col gap-4'>
                        <Card className='w-full' title={'Heading'}>
                            <div className="">
                                <Label htmlFor="name">
                                    Period
                                </Label>
                                <Input
                                    id="period"
                                    type="text"
                                    readOnly
                                    defaultValue={`${currentPeriod.title}-${currentPeriod.start}-${currentPeriod.end}`}
                                    placeholder="Current Period"
                                />
                                <input type="hidden" value={`${currentPeriod.title}`} name="period" />
                                <input type="hidden" value={`${currentPeriod.type}`} name="periodType" />
                                <input type="hidden" value={`${currentPeriod.start}`} name="startDate" />
                                <input type="hidden" value={`${currentPeriod.end}`} name="endDate" />
                                <input type='hidden' value={mda} name='mda' />
                                <input type='hidden' value={submitAction} name='action' />
                                {id && <input type="hidden" value={id} name="id" />}
                            </div>
                            <div className="">
                                <Label htmlFor="title">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter a title for your roadmap"
                                    defaultValue={state?.prev?.title}
                                    error={state?.errors?.title || state?.errors?.Title}
                                    hint={state?.errors?.title}
                                />
                            </div>
                        </Card>
                        <Card title={'Objectives And Impact'}>
                            <div className="">
                                <Label
                                    htmlFor="goals"
                                >
                                    Goals
                                    <br />
                                    <small>Enter all your goals for this period here. Clearly state all the goals you are setting for your organization this period.</small>
                                </Label>
                                <Textarea
                                    id="goals"
                                    name="goals"
                                    rows={4}
                                    placeholder="Enter goals."
                                    defaultValue={state?.prev?.goals}
                                    error={state?.errors?.goals}
                                    hint={state?.errors?.goals}
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="proposedProjects"
                                >
                                    Proposed Projects
                                    <br />
                                    <small>List out in complete detail all the proposed projects for the year.</small>
                                </Label>
                                <Textarea
                                    id="proposedProjects"
                                    name="proposedProjects"
                                    rows={4}
                                    placeholder="List out all the proposed projects for the year."
                                    defaultValue={state?.prev?.proposedProjects}
                                    error={state?.errors?.proposedProjects}
                                    hint={state?.errors?.proposedProjects}
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="proposedInitiatives"
                                >
                                    Proposed Initiatives
                                    <br />
                                    <small>List out in complete detail all the proposed initiatives for the period.</small>
                                </Label>
                                <Textarea
                                    id="proposedInitiatives"
                                    name="proposedInitiatives"
                                    rows={4}
                                    placeholder="List out all the proposed initiatives for the period"
                                    defaultValue={state?.prev?.proposedInitiatives}
                                    error={state?.errors?.proposedInitiatives}
                                    hint={state?.errors?.proposedInitiatives}
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="projectedImpacts"
                                >
                                    Projected Impacts
                                    <br />
                                    <small>What impact do you forsee these goals to have if achieved?</small>
                                </Label>
                                <Textarea
                                    id="projectedImpacts"
                                    name="projectedImpacts"
                                    rows={4}
                                    placeholder="Enter projected impacts"
                                    defaultValue={state?.prev?.projectedImpacts}
                                    error={state?.errors?.projectedImpacts}
                                    hint={state?.errors?.projectedImpacts}
                                />
                            </div>

                        </Card>
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <Card title={'Factors / Conditions'}>
                            <div className="">
                                <Label
                                    htmlFor="assumptions"
                                >
                                    Assumptions<br />
                                    <small>
                                        What are some of the assumptions made in articulating this roadmap?
                                    </small>
                                </Label>
                                <Textarea
                                    id="assumptions"
                                    name="assumptions"
                                    rows={4}
                                    placeholder="Enter assumptions"
                                    defaultValue={state?.prev?.assumptions}
                                    error={state?.errors?.assumptions}
                                    hint={state?.errors?.assumptions}
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="dependencies"
                                >
                                    Dependencies<br />
                                    <small>
                                    What are the dependencies for the actualization of your goal?
                                    </small>
                                </Label>
                                <Textarea
                                    id="dependencies"
                                    name="dependencies"
                                    rows={4}
                                    placeholder="Enter dependencies"
                                    defaultValue={state?.prev?.dependencies}
                                    error={state?.errors?.dependencies}
                                    hint={state?.errors?.dependencies}
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="forseenChallenges"
                                >
                                    Forseen Challenges<br />
                                    <small>
                                    What challenges do you forsee that might prevent the actualization of the above goals?
                                    </small>
                                </Label>
                                <Textarea
                                    id="foreseenChallenges"
                                    name="foreseenChallenges"
                                    rows={4}
                                    placeholder="Enter forseen challenges"
                                    defaultValue={state?.prev?.foreseenChallenges}
                                    error={state?.errors?.foreseenChallenges}
                                    hint={state?.errors?.foreseenChallenges}
                                />
                            </div>
                        </Card>
                        <Card title={'Hard Requirements'}>
                            <div className="">
                                <Label
                                    htmlFor="financialRequirements"
                                >
                                    Financial Requirements<br />
                                    <small>
                                    Provide a detailed breakdown of the financial requirements attached to your goals for this period.
                                    </small>
                                </Label>
                                <Textarea
                                    id="financialRequirements"
                                    name="financialRequirements"
                                    rows={4}
                                    placeholder="Enter a breakdown of the financial requirements"
                                    defaultValue={state?.prev?.financialRequirements}
                                    error={state?.errors?.financialRequirements}
                                    hint={state?.errors?.financialRequirements}
                                />
                            </div>
                            <div className="">
                                <Label
                                    htmlFor="nonFinancialRequirements"
                                >
                                    Non Financial Requirements<br />
                                    <small>
                                    Provide a detailed breakdown of the non-financial requirements attached to your goals for this period.
                                    </small>
                                </Label>
                                <Textarea
                                    id="nonFinancialRequirements"
                                    name="nonFinancialRequirements"
                                    rows={4}
                                    placeholder="Enter a breakdown of the non financial requirements"
                                    defaultValue={state?.prev?.nonFinancialRequirements}
                                    error={state?.errors?.nonFinancialRequirements}
                                    hint={state?.errors?.nonFinancialRequirements}
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
                            type="abutton"
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