import { useState } from "react"
import { ConditionSet, FieldCriteria } from "../../data/interface"
import RuleGroup from "./RuleGroup"
import Button from "../../elements/Button"
import JsonOutput from "../../elements/JsonOutput"

export default function QueryBuilder() {
  const [query, setQuery] = useState<ConditionSet>({
    combinator: "AND",
    conditions: [],
  })

  const addRule = (groupIndex: number) => {
    const newRule: FieldCriteria = {
      fieldName: "",
      operation: "",
      value: "",
    }

    const newConditions = [...query.conditions]
    newConditions.splice(groupIndex, 0, newRule)

    setQuery({ ...query, conditions: newConditions })
  }

  const addGroup = (groupIndex: number) => {
    const newGroup: ConditionSet = {
      combinator: "AND",
      conditions: [],
    }

    const newConditions = [...query.conditions]
    newConditions.splice(groupIndex, 0, newGroup)

    setQuery({ ...query, conditions: newConditions })
  }

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="flex justify-between">
      <form onSubmit={handleSubmit}>
        <RuleGroup
          group={query}
          onAddRule={addRule}
          onAddGroup={addGroup}
          onUpdate={setQuery}
        />
        <Button type="submit">Submit</Button>
      </form>
      <JsonOutput data={query} />
    </div>
  )
}
