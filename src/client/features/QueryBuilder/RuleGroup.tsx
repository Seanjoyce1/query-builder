import { ChangeEvent } from "react"
import { ConditionSet, FieldCriteria } from "../../data/interface"
import Rule from "./Rule"
import Button from "../../elements/Button"

interface RuleGroupProps {
  group: ConditionSet
  groupIndex: number
  parentIndex: number | null
  onAddRule: (parentIndex: number, groupIndex: number) => void
  onAddGroup: (parentIndex: number, groupIndex: number) => void
  onUpdate: (group: ConditionSet) => void
}

function RuleGroup(props: RuleGroupProps) {
  const { group, groupIndex, parentIndex, onAddRule, onAddGroup, onUpdate } =
    props

  const handleCombinatorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ ...group, combinator: e.target.value as "AND" | "OR" })
  }

  const handleOnUpdateGroup = (updatedGroup: ConditionSet) => {
    const newConditions = [...(group.conditions || [])]
    newConditions[groupIndex] = updatedGroup
    onUpdate({ ...group, conditions: newConditions })
  }

  const handleOnUpdateRule = (updatedRule: FieldCriteria) => {
    const newConditions = [...(group.conditions || [])]
    newConditions[groupIndex] = updatedRule
    onUpdate({ ...group, conditions: newConditions })
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
              groupIndex={index}
              parentIndex={groupIndex}
              onAddRule={onAddRule}
              onAddGroup={onAddGroup}
              onUpdate={handleOnUpdateGroup}
            />
          )
        } else {
          return (
            <Rule key={index} rule={condition} onChange={handleOnUpdateRule} />
          )
        }
      })}
      <div className="flex space-x-2 mt-2">
        <Button onClick={() => onAddRule(parentIndex, groupIndex)}>
          Add Rule
        </Button>
        <Button onClick={() => onAddGroup(parentIndex, groupIndex)}>
          Add Group
        </Button>
      </div>
    </div>
  )
}

export default RuleGroup
