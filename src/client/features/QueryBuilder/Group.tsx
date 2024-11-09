import { Group, Field, Rule } from "../../data/interface"
import Button from "../../elements/Button"
import CombinatorSelector from "../../elements/CombinatiorSelector"
import RuleComponent from "./Rule"

interface GroupComponentProps {
  group: Group
  fields: Field[]
  onChange: (group: Group) => void
}

function GroupComponent(props: GroupComponentProps) {
  const { group, fields, onChange } = props
  const addRule = () => {
    onChange({
      ...group,
      rules: [...group.rules, { fieldName: "", operation: "EQUAL", value: "" }],
    })
  }

  const addGroup = () => {
    onChange({
      ...group,
      rules: [...group.rules, { combinator: "AND", rules: [] }],
    })
  }

  const updateRule = (index: number, updatedRule: Rule) => {
    onChange({
      ...group,
      rules: group.rules.map((rule, i) => (i === index ? updatedRule : rule)),
    })
  }

  const updateGroup = (index: number, updatedGroup: Group) => {
    onChange({
      ...group,
      rules: group.rules.map((rule, i) => (i === index ? updatedGroup : rule)),
    })
  }

  const removeRule = (index: number) => {
    onChange({
      ...group,
      rules: group.rules.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="group p-4 border border-gray-300 rounded mb-4">
      <CombinatorSelector
        combinator={group.combinator}
        onChange={(newCombinator) =>
          onChange({ ...group, combinator: newCombinator })
        }
      />
      {group.rules.map((rule, index) => (
        <div key={index} className="rule-or-group mb-2">
          {"combinator" in rule ? (
            <GroupComponent
              group={rule}
              fields={fields}
              onChange={(updatedGroup) => updateGroup(index, updatedGroup)}
            />
          ) : (
            <RuleComponent
              rule={rule}
              fields={fields}
              onUpdate={(updatedRule) => updateRule(index, updatedRule)}
              onRemove={() => removeRule(index)}
            />
          )}
        </div>
      ))}
      <div className="group-buttons flex space-x-2 mt-2">
        <Button onClick={addRule}>Add Rule</Button>
        <Button onClick={addGroup}>Add Group</Button>
      </div>
    </div>
  )
}

export default GroupComponent
