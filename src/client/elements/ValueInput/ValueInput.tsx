import { MenuItem, Select, TextField } from "@mui/material"
import { Field, Rule } from "../../data/interface"

interface ValueInputProps {
  field: Field | undefined
  rule: Rule
  onUpdate: (rule: Rule) => void
}

interface CurrencyValue {
  amount: number
  currency: string
}

function ValueInput({ field, rule, onUpdate }: ValueInputProps) {
  if (!field) return null

  switch (field.type) {
    case "enum":
      return (
        <Select
          value={rule.value as string}
          onChange={(e) => onUpdate({ ...rule, value: e.target.value })}
          size="small"
        >
          {field.options?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      )
    case "number":
      if (field.name === "amount") {
        return (
          <>
            <TextField
              type="number"
              value={(rule.value as { amount: number }).amount || ""}
              size="small"
              onChange={(e) =>
                onUpdate({
                  ...rule,
                  value: {
                    ...(rule.value as { amount: number; currency: string }),
                    amount: Number(e.target.value),
                    currency: (rule.value as CurrencyValue).currency || "USD",
                  },
                })
              }
            />
            <Select
              value={(rule.value as { currency: string }).currency || ""}
              size="small"
              onChange={(e) =>
                onUpdate({
                  ...rule,
                  value: {
                    ...(rule.value as { amount: number; currency: string }),
                    currency: e.target.value,
                  },
                })
              }
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </Select>
          </>
        )
      }
      return (
        <TextField
          type="number"
          value={rule.value as number}
          onChange={(e) => onUpdate({ ...rule, value: Number(e.target.value) })}
        />
      )
    default:
      return (
        <TextField
          type="text"
          value={rule.value as string}
          onChange={(e) => onUpdate({ ...rule, value: e.target.value })}
        />
      )
  }
}

export default ValueInput
