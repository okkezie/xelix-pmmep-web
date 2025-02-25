import Card from "@/components/organisms/Card/Card"
import TableOne from "@/components/organisms/Table/BasicTableOne"
import Pagination from "@/components/organisms/Table/Pagination"
import SummaryCard from "@/components/organisms/SummaryCard/SummaryCard"

export default function HomePage() {

  return (
    <div>
      <Card className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          <SummaryCard title="Unique Visitors" value="24.7K" percentage="+20%" comment="Vs last month" />
          <SummaryCard title="Unique Visitors" value="24.7K" percentage="+20%" comment="Vs last month" />
          <SummaryCard title="Unique Visitors" value="24.7K" percentage="+20%" comment="Vs last month" />
          <SummaryCard title="Unique Visitors" value="24.7K" percentage="+20%" comment="Vs last month" />
        </div>
      </Card>
      <Card title="Table One" desc="Example of a table">
        <TableOne />
        <Pagination />
      </Card>
    </div>
  )
}
