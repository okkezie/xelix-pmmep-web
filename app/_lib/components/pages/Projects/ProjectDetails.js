import Link from "next/link";
import Card from "@/components/organisms/Card/Card";
import Alert from "@/components/molecules/Alert/Alert";
import OrderedList from "@/components/molecules/List/OrderedList";
import Badge from "@/components/atoms/Badge/Badge";
import Carousel from "@/components/organisms/Carousel/Carousel";
import { formatFullDate } from "@/utils/helpers";
import { Constants } from "@/utils/Constants";

export default function ProjectDetails({project}) {
    const projectImages = [
        {
          thumbnail: "/assets/images/carousel/carousel-01.png",
        },
        {
          thumbnail: "/assets/images/carousel/carousel-02.png",
        },
        {
          thumbnail: "/assets/images/carousel/carousel-03.png",
        },
        {
          thumbnail: "/assets/images/carousel/carousel-04.png",
        },
    ]

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <Card className="w-full" contentClass="w-full flex flex-col divide-y divide-gray-300">
                        <div className="w-full flex flex-col">
                            <strong>Owner</strong>
                            <p>{ project?.mda?.name ?? 'None' }</p>
                        </div>
                        <div className="w-full flex flex-col pt-4">
                            <strong>Start Date</strong>
                            <p>{ formatFullDate(project?.startDate) }</p>
                        </div>
                        <div className="w-full flex flex-col pt-4">
                            <strong>End Date</strong>
                            <p>{ formatFullDate(project?.endDate) }</p>
                        </div>
                        <div className="w-full flex flex-col pt-4">
                            <strong>Roadmap</strong>
                            <p>
                                <Link
                                    href={Constants.Paths.RoadmapsView.replace(':slug', project?.roadmap?.id)}
                                >
                                    {project?.roadmap?.name ?? 'None'}
                                </Link>
                            </p>
                        </div>
                        <div className="w-full flex flex-col pt-4">
                            <strong>Contractor</strong>
                            <p>{ project?.contractor?.name ?? 'None'}</p>
                        </div>
                    </Card>
                </div>
                <div className="col-span-1">
                    <Carousel data={projectImages} />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="col-span-1">
                    <Card title={'Project Description'}>{project?.description}</Card>
                </div>
                <div className="col-span-1">
                    <Card title={'Milestones'}>
                        {project?.milestones?.length === 0 && 
                            <Alert 
                                title="No milestones defined for this project yet!" 
                                message={"Edit the project to define at least one milestone."}
                            />
                        }
                        {   project?.milestones &&
                            project?.milestones?.map((m, index) => 
                                <div key={index+1}>
                                    <div className="py-4">
                                        <div className="flex items-start gap-4">
                                            <div className="text-gray-700 dark:text-gray-500">
                                                <svg className="fill-current" width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 14C3.75 9.44365 7.44365 5.75 12 5.75C16.5563 5.75 20.25 9.44365 20.25 14C20.25 18.5563 16.5563 22.25 12 22.25C7.44365 22.25 3.75 18.5563 3.75 14ZM12 3.75C6.33908 3.75 1.75 8.33908 1.75 14C1.75 19.6609 6.33908 24.25 12 24.25C17.6609 24.25 22.25 19.6609 22.25 14C22.25 8.33908 17.6609 3.75 12 3.75ZM10.7491 9.52507C10.7491 10.2154 11.3088 10.7751 11.9991 10.7751H12.0001C12.6905 10.7751 13.2501 10.2154 13.2501 9.52507C13.2501 8.83472 12.6905 8.27507 12.0001 8.27507H11.9991C11.3088 8.27507 10.7491 8.83472 10.7491 9.52507ZM12.0001 19.6214C11.4478 19.6214 11.0001 19.1737 11.0001 18.6214V12.9449C11.0001 12.3926 11.4478 11.9449 12.0001 11.9449C12.5524 11.9449 13.0001 12.3926 13.0001 12.9449V18.6214C13.0001 19.1737 12.5524 19.6214 12.0001 19.6214Z" fill="">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="mb-3 font-medium text-gray-800 dark:text-white/90">{m?.name}</h4>
                                                <div className="text-base text-gray-500 dark:text-gray-400">
                                                    {m?.description}
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    { m?.deliverables &&
                                                    <>
                                                    <strong className="text-sm">Deliverables:</strong>
                                                    <OrderedList items={m?.deliverables} />
                                                    </>
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-2 mt-6 text-sm">
                                                    <strong>Deadline</strong>
                                                    <Badge variant="light" color='warning'>
                                                        {formatFullDate(m?.deadline)}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </Card>
                </div>
            </div>
        </div>
    )
}