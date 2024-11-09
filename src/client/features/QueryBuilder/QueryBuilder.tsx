import { useState } from "react"
import { ConditionSet, FieldCriteria } from "../../data/interface"
import RuleGroup from "./RuleGroup"
import Button from "../../elements/Button"

export default function QueryBuilder() {
  const [query, setQuery] = useState<ConditionSet>({
    combinator: "AND",
    conditions: [],
  })

  const addRule = (parentIndex: number | null, groupIndex: number) => {
    const newRule: FieldCriteria = {
      fieldName: "",
      operation: "",
      value: "",
    }

    const addRuleToGroup = (
      group: ConditionSet,
      index: number
    ): ConditionSet => {
      if (index === 0) {
        return { ...group, conditions: [...group.conditions, newRule] }
      }

      const newConditions = group.conditions.map((condition, i) => {
        if (i === index - 1 && "conditions" in condition) {
          return addRuleToGroup(condition, 0)
        }
        return condition
      })

      return { ...group, conditions: newConditions }
    }

    setQuery(addRuleToGroup(query, groupIndex))
  }

  const addGroup = (parentIndex: number | null, groupIndex: number) => {
    const newGroup: ConditionSet = {
      combinator: "AND",
      conditions: [],
    }

    const addGroupToGroup = (
      group: ConditionSet,
      index: number
    ): ConditionSet => {
      if (index === 0) {
        return { ...group, conditions: [...group.conditions, newGroup] }
      }

      const newConditions = group.conditions.map((condition, i) => {
        if (i === index - 1 && "conditions" in condition) {
          return addGroupToGroup(condition, 0)
        }
        return condition
      })

      return { ...group, conditions: newConditions }
    }

    setQuery(addGroupToGroup(query, groupIndex))
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
    <form
      onSubmit={handleSubmit}
      className="p-4 border border-gray-300 rounded"
    >
      <RuleGroup
        group={query}
        groupIndex={0}
        parentIndex={null}
        onAddRule={addRule}
        onAddGroup={addGroup}
        onUpdate={setQuery}
      />
      <div className="flex space-x-2 mt-4">
        <Button type="submit">Submit</Button>
      </div>
      <pre className="mt-4 p-2 bg-gray-100 rounded">
        {JSON.stringify(query, null, 2)}
      </pre>
    </form>
  )
}
