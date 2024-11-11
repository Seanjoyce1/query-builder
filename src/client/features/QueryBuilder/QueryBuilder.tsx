import { Button, Typography } from "@mui/material"
import { Field, Group } from "../../data/interface"
import GroupComponent from "../Group/Group"
import { useState } from "react"

function QueryBuilder() {
  const [query, setQuery] = useState<Group>({
    combinator: "AND",
    rules: [],
  })

  const fields: Field[] = [
    { name: "amount", label: "Amount", type: "number" },
    { name: "name", label: "Name", type: "text" },
    { name: "id", label: "ID", type: "text" },
    {
      name: "transaction_state",
      label: "Transaction State",
      type: "enum",
      options: [
        "SUCCEEDED",
        "REJECTED",
        "ERROR",
        "TIMEOUT",
        "CANCELLED",
        "FAILED",
        "ABORTED",
      ],
    },
    { name: "device_ip", label: "Device IP", type: "text" },
    { name: "installments", label: "Installments", type: "number" },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await fetch("/api/save-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      })
      console.log("Query sent successfully")
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div
      data-testid="query-builder"
      className="flex flex-col lg:flex-row gap-4 "
    >
      <form className="w-full lg:w-1/2" onSubmit={handleSubmit}>
        <GroupComponent group={query} fields={fields} onChange={setQuery} />
        <Button variant="contained" type="submit">
          <Typography variant="button">Submit</Typography>
        </Button>
      </form>

      <pre className="p-2 bg-gray-100 rounded w-full lg:w-1/2">
        <Typography variant="body1">
          {JSON.stringify(query, null, 2)}
        </Typography>
      </pre>
    </div>
  )
}

export default QueryBuilder
