import SimpleTable from "@/components/organisms/Table/SimpleTable"

export default function InitiativeReport({initiative}) {
    const headers = null
    const body = []
    const name =  "Initiative Reports"
    return (
        <SimpleTable name={name} headers={headers} body={body} />
    )
}