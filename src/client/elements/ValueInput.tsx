interface ValueInputProps {
  fieldName: string
  value: any
  onChange: (value: any) => void
}

function ValueInput(props: ValueInputProps) {
  const { fieldName, value, onChange } = props
  switch (fieldName) {
    case "amount":
      return (
        <div className="flex space-x-2">
          <input
            type="number"
            value={value?.amount || ""}
            onChange={(e) =>
              onChange({ ...value, amount: Number(e.target.value) })
            }
            className="border border-gray-300 p-2 rounded"
          />
          <select
            onChange={(e) => onChange({ ...value, currency: e.target.value })}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      )
    default:
      return (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      )
  }
}

export default ValueInput
