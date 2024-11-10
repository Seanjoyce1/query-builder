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

  const handleSubmit = async () => {
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
    <div className="query-builder p-4 border border-gray-300 rounded">
      <GroupComponent group={query} fields={fields} onChange={setQuery} />
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>

      <pre className="mt-4 p-2 bg-gray-100 rounded">
        {JSON.stringify(query, null, 2)}
      </pre>
    </div>
  )
}

export default QueryBuilder
