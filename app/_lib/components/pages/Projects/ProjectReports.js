import SimpleTable from "@/components/organisms/Table/SimpleTable"

export default function ProjectReport({project}) {
    const headers = null
    const body = []
    const name =  "Reports"
    return (
        <SimpleTable name={name} headers={headers} body={body} />
    )
}