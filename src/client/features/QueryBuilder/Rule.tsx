import React from "react"
import ValueInput from "../../elements/ValueInput"
import { FieldCriteria } from "../../data/interface"
import OperationDropdown from "../../elements/OperationDropdown"
import { fields } from "../../mocks/fields"

interface RuleProps {
  rule: FieldCriteria
  onChange: (updatedRule: FieldCriteria) => void
}

function Rule({ rule, onChange }: RuleProps) {
  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFieldName = e.target.value
    onChange({ ...rule, fieldName: newFieldName, operation: "", value: "" })
  }

  return (
    <div className="flex flex-col space-y-2 p-4 border border-gray-300 rounded">
      <select
        value={rule.fieldName}
        onChange={handleFieldChange}
        className="border border-gray-300 p-2 rounded"
      >
        {fields.map((field) => (
          <option key={field.value} value={field.value}>
            {field.label}
          </option>
        ))}
      </select>
      <OperationDropdown
        fieldType={rule.fieldName}
        selectedOperation={rule.operation}
        onOperationChange={(op) => onChange({ ...rule, operation: op })}
      />
      <ValueInput
        fieldName={rule.fieldName}
        value={rule.value}
        onChange={(val) => onChange({ ...rule, value: val })}
      />
    </div>
  )
}

export default Rule
