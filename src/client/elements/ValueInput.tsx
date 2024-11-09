import { Field, Rule } from "../data/interface"

interface ValueInputProps {
  field: Field | undefined
  rule: Rule
  onUpdate: (rule: Rule) => void
}

function ValueInput({ field, rule, onUpdate }: ValueInputProps) {
  if (!field) return null

  switch (field.type) {
    case "enum":
      return (
        <select
          value={rule.value as string}
          onChange={(e) => onUpdate({ ...rule, value: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        >
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )
    case "number":
      if (field.name === "amount") {
        return (
          <>
            <input
              type="number"
              value={(rule.value as { amount: number }).amount || ""}
              onChange={(e) =>
                onUpdate({
                  ...rule,
                  value: {
                    ...(rule.value as { amount: number; currency: string }),
                    amount: Number(e.target.value),
                  },
                })
              }
              className="border border-gray-300 p-2 rounded"
            />
            <select
              value={(rule.value as { currency: string }).currency || ""}
              onChange={(e) =>
                onUpdate({
                  ...rule,
                  value: {
                    ...(rule.value as { amount: number; currency: string }),
                    currency: e.target.value,
                  },
                })
              }
              className="border border-gray-300 p-2 rounded"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </>
        )
      }
      return (
        <input
          type="number"
          value={rule.value as number}
          onChange={(e) => onUpdate({ ...rule, value: Number(e.target.value) })}
          className="border border-gray-300 p-2 rounded"
        />
      )
    default:
      return (
        <input
          type="text"
          value={rule.value as string}
          onChange={(e) => onUpdate({ ...rule, value: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        />
      )
  }
}

export default ValueInput
