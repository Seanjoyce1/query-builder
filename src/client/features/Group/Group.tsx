import { PlusIcon } from "@heroicons/react/20/solid"
import { Group, Field, Rule } from "../../data/interface"
import CombinatorSelector from "../../elements/CombinatiorSelector/CombinatiorSelector"
import RuleComponent from "../Rule/Rule"

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
      <div
        data-testid="group-buttons"
        className="group-buttons flex space-x-2 mt-2"
      >
        <button
          data-testid="add-rule"
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={addRule}
        >
          Add Rule
          <PlusIcon className="size-6 text-white" />
        </button>
        <button
          data-testid="add-group"
          className="bg-green-500 text-white px-4 py-2 rounded flex"
          onClick={addGroup}
        >
          Add Group
          <PlusIcon className="size-6 text-white" />
        </button>
      </div>
    </div>
  )
}

export default GroupComponent
