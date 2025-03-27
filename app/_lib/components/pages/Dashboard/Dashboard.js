'use client'
import Card from "@/components/organisms/Card/Card"
import TableOne from "@/components/organisms/Table/BasicTableOne"
import Pagination from "@/components/organisms/Table/Pagination"
import SummaryCard from "@/components/organisms/SummaryCard/SummaryCard"
import dynamic from "next/dynamic";
const Chart = dynamic(() => import('react-apexcharts'), {ssr: false})

export default function Dashboard() {
    const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
        }
    }

    const series = [
        {
          name: "series-1",
          data: [20, 59, 32, 60, 30, 63, 45, 91, 49, 60, 70, 80]
        }
    ]

    const pieSeries = [44, 55, 41, 17, 15]
    const pieOptions = {
        chart: {
            width: 380,
            type: 'donut',
        },
        colors: ["#9b8afb", "#fd853a", "#fdb022", "#32d583", "gray"],
        labels: ['Ministry of Information', 'Ministry of Agriculture', 'Ministry of Education', 'Ministry of Works', 'Ministry of Health'],
        stroke: {
            show: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    lineCap: "smooth",
                    size: "65%",
                    background: "transparent",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            offsetY: 0,
                            fontSize: "12px",
                            fontWeight: "normal",
                            text: "Total 135GB"
                        },
                        value: {
                            show: true,
                            offsetY: 10,
                            fontSize: "14px",
                            formatter: () => "Used of 135 GB"
                        },
                        total: {
                            show: true,
                            label: "Total 135 GB",
                            fontSize: "24px",
                            fontWeight: "bold"
                        }
                    }
                },
                expandOnClick: false
            }
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "left",
            fontFamily: "Outfit",
            fontSize: "14px",
            fontWeight: 400,
            markers: {
                size: 5,
                shape: "circle",
                radius: 999,
                strokeWidth: 0
            },
            itemMargin: {
                horizontal: 10,
                vertical: 6
            }
        },
        fill: {
            type: 'gradient',
        },
    }

    const pieSeries2 = [47, 18, 35]
    const pieOptions2 = {
        chart: {
            width: 380,
            type: 'pie',
        },
        stroke: {
            show: false,
        },
        labels: ['Ongoing', 'Completed', 'Delayed'],
        title: {
            text: 'Projects status breakdown'
        },
        startAngle: 0,
        endAngle: 360,
        expandOnClick: true,
        offsetX: 0,
        offsetY: 0,
        customScale: 1,
        dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10
        }
    }

    return (
        <div>
            <Card contentClass="w-full flex flex-col lg:flex-row items-center justify-between flex-wrap">
                <div className="">
                    <Chart
                        options={pieOptions2}
                        series={pieSeries2}
                        type="pie"
                        width="500"
                    />
                </div>
                <div className="">
                    <Chart
                        options={pieOptions}
                        series={pieSeries}
                        type="donut"
                        width="500"
                    />
                </div>
            </Card>
            <Card className="mb-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                    <SummaryCard title="Total Projects" value="200" percentage="20%" comment="completed" />
                    <SummaryCard title="Total Initiatives" value="430" percentage="40%" comment="completed" />
                    <SummaryCard title="Total Budget" value="₦100B" percentage="60%" comment="allocated" />
                    <SummaryCard title="Total Spent" value="₦42.5B" percentage="43%" comment="of total" />
                </div>
            </Card>
            <Card title={'Project Completion Trend'}>
                <div className="">
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        width="100%"
                        height={'350'}
                    />
                </div>
            </Card>
            <Card title="Ongoing Projects">
                <TableOne />
                <Pagination />
            </Card>
        </div>
    )
}
