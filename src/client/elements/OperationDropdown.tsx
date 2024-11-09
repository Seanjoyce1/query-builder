import React from "react"

interface OperationDropdownProps {
  fieldType: string
  selectedOperation: string
  onOperationChange: (operation: string) => void
}

function OperationDropdown({
  fieldType,
  selectedOperation,
  onOperationChange,
}: OperationDropdownProps) {
  const operations: { [key: string]: string[] } = {
    text: ["EQUAL", "NOT_EQUAL"],
    number: ["EQUAL", "NOT_EQUAL", "LESS_THAN", "GREATER_THAN"],
    enum: ["EQUAL", "NOT_EQUAL"],
  }
  const availableOperations = operations[fieldType] || []

  return (
    <select
      value={selectedOperation}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        onOperationChange(event.target.value)
      }
      className="border border-gray-300 p-2 rounded"
    >
      {availableOperations.map((operation: string) => (
        <option key={operation} value={operation}>
          {operation}
        </option>
      ))}
    </select>
  )
}

export default OperationDropdown
