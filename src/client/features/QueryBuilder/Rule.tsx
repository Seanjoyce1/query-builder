import { Field, Rule } from "../../data/interface"
import { Operation } from "../../data/types"
import ValueInput from "../../elements/ValueInput"

interface RuleComponentProps {
  rule: Rule
  fields: Field[]
  onUpdate: (rule: Rule) => void
  onRemove: () => void
}

function RuleComponent(props: RuleComponentProps) {
  const { rule, fields, onUpdate, onRemove } = props

  const field = fields.find((f) => f.name === rule.fieldName)

  return (
    <div className="rule flex items-center space-x-2 mb-2">
      <select
        value={rule.fieldName}
        onChange={(e) =>
          onUpdate({
            ...rule,
            fieldName: e.target.value,
            operation: "EQUAL",
          })
        }
        className="border border-gray-300 p-2 rounded"
      >
        <option value="">Select field</option>
        {fields.map((field) => (
          <option key={field.name} value={field.name}>
            {field.label}
          </option>
        ))}
      </select>
      <select
        value={rule.operation}
        onChange={(e) =>
          onUpdate({ ...rule, operation: e.target.value as Operation })
        }
        className="border border-gray-300 p-2 rounded"
      >
        <option value="EQUAL">Equal</option>
        <option value="NOT_EQUAL">Not Equal</option>
        {field?.type === "number" && (
          <>
            <option value="LESS_THAN">Less Than</option>
            <option value="GREATER_THAN">Greater Than</option>
          </>
        )}
      </select>
      <ValueInput field={field} rule={rule} onUpdate={onUpdate} />
      <button
        onClick={onRemove}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Remove
      </button>
    </div>
  )
}

export default RuleComponent
