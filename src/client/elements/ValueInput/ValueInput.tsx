import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material"
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  if (!field) return null

  switch (field.type) {
    case "enum":
      return (
        <FormControl
          sx={{
            my: 1,
            minWidth: 200,
          }}
          fullWidth={isMobile}
        >
          <InputLabel id="value">Value</InputLabel>
          <Select
            value={rule.value as string}
            onChange={(e) => onUpdate({ ...rule, value: e.target.value })}
            size="small"
            required
            label="Value"
            labelId="value"
            placeholder="Select value"
            defaultValue=""
          >
            {field.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )
    case "number":
      if (field.name === "amount") {
        return (
          <>
            <FormControl
              sx={{
                my: 1,
                minWidth: 120,
              }}
              fullWidth={isMobile}
            >
              <TextField
                type="number"
                value={(rule.value as { amount: number }).amount || ""}
                size="small"
                required
                label="Input"
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
            </FormControl>
            <FormControl
              sx={{
                my: 1,
                minWidth: 120,
              }}
              fullWidth={isMobile}
            >
              <InputLabel id="currency">Currency</InputLabel>
              <Select
                value={(rule.value as { currency: string }).currency || ""}
                size="small"
                required
                label="Currency"
                labelId="currency"
                placeholder="Select currency"
                defaultValue="USD"
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
            </FormControl>
          </>
        )
      }
      return (
        <FormControl
          sx={{
            my: 1,
            minWidth: 120,
          }}
        >
          <TextField
            type="number"
            size="small"
            fullWidth={isMobile}
            required
            label="Value"
            value={rule.value as number}
            onChange={(e) =>
              onUpdate({ ...rule, value: Number(e.target.value) })
            }
          />
        </FormControl>
      )
    default:
      return (
        <FormControl
          sx={{
            my: 1,
            minWidth: 120,
          }}
        >
          <TextField
            type="text"
            fullWidth={isMobile}
            size="small"
            label="Value"
            required
            value={rule.value as string}
            onChange={(e) => onUpdate({ ...rule, value: e.target.value })}
          />
        </FormControl>
      )
  }
}

export default ValueInput
