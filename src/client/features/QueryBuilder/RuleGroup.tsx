import React from "react"
import { ConditionSet } from "../../data/interface"
import Rule from "./Rule"
import Button from "../../elements/Button"

interface RuleGroupProps {
  group: ConditionSet
  onAddRule: (groupIndex: number) => void
  onAddGroup: (groupIndex: number) => void
  onUpdate: (group: ConditionSet) => void
}

function RuleGroup(props: RuleGroupProps) {
  const { group, onAddRule, onAddGroup, onUpdate } = props

  const handleCombinatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ ...group, combinator: e.target.value as "AND" | "OR" })
  }

  return (
    <div className="p-4 border border-gray-300 rounded mb-4">
      <select
        value={group.combinator}
        onChange={handleCombinatorChange}
        className="border border-gray-300 p-2 rounded mb-2"
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </select>
      {group.conditions?.map((condition, index) => {
        if ("conditions" in condition) {
          return (
            <RuleGroup
              key={index}
              group={condition}
              onAddRule={(subIndex) => onAddRule(index)}
              onAddGroup={(subIndex) => onAddGroup(index)}
              onUpdate={(updatedGroup) => {
                const newConditions = [...(group.conditions || [])]
                newConditions[index] = updatedGroup
                onUpdate({ ...group, conditions: newConditions })
              }}
            />
          )
        } else {
          return (
            <Rule
              key={index}
              rule={condition}
              onChange={(updatedRule) => {
                const newConditions = [...(group.conditions || [])]
                newConditions[index] = updatedRule
                onUpdate({ ...group, conditions: newConditions })
              }}
            />
          )
        }
      })}
      <div className="flex space-x-2 mt-2">
        <Button onClick={() => onAddRule(group.index)}>Add Rule</Button>
        <Button onClick={() => onAddGroup(group.index)}>Add Group</Button>
      </div>
    </div>
  )
}

export default RuleGroup
