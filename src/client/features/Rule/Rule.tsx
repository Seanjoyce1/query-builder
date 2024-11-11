import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Field, Rule } from "../../data/interface"
import { Operation } from "../../data/types"
import ValueInput from "../../elements/ValueInput/ValueInput"
import DeleteIcon from "@mui/icons-material/Delete"

interface RuleComponentProps {
  rule: Rule
  fields: Field[]
  onUpdate: (rule: Rule) => void
  onRemove: () => void
}

function RuleComponent(props: RuleComponentProps) {
  const { rule, fields, onUpdate, onRemove } = props

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const field = fields.find((f) => f.name === rule.fieldName)

  const handleFieldChange = (e: SelectChangeEvent<string>) => {
    const value =
      e.target.value === "amount"
        ? {
            amount: 0,
            currency: "USD",
          }
        : ""
    onUpdate({
      ...rule,
      fieldName: e.target.value as string,
      operation: "EQUAL",
      value: value,
    })
  }

  return (
    <Stack
      direction={{ xs: "column", xl: "row" }}
      justifyItems={{ xs: "center", lg: "start" }}
      mb={2}
      gap={2}
    >
      <FormControl
        sx={{
          minWidth: 120,
        }}
        fullWidth={isMobile}
      >
        <InputLabel id="combinator">Field</InputLabel>
        <Select
          value={rule.fieldName}
          labelId="field"
          defaultValue="amount"
          placeholder="amount"
          size="small"
          label="Field"
          required
          onChange={(e) => handleFieldChange(e)}
        >
          {fields.map((field) => (
            <MenuItem key={field.name} value={field.name}>
              {field.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{
          minWidth: 120,
        }}
        fullWidth={isMobile}
      >
        <InputLabel id="Operation">Operation</InputLabel>
        <Select
          value={rule.operation}
          size="small"
          label="Operation"
          labelId="operation"
          required
          onChange={(e) =>
            onUpdate({ ...rule, operation: e.target.value as Operation })
          }
        >
          <MenuItem value="EQUAL">Equal</MenuItem>
          <MenuItem value="NOT_EQUAL">Not Equal</MenuItem>
          {field?.type === "number" && (
            <>
              <MenuItem value="LESS_THAN">Less Than</MenuItem>
              <MenuItem value="GREATER_THAN">Greater Than</MenuItem>
            </>
          )}
        </Select>
      </FormControl>
      <ValueInput field={field} rule={rule} onUpdate={onUpdate} />
      <Button
        onClick={onRemove}
        color="error"
        size="medium"
        variant="contained"
        fullWidth={isMobile}
        startIcon={<DeleteIcon fontSize="medium" />}
      >
        <Typography variant="button"> Remove</Typography>
      </Button>
    </Stack>
  )
}

export default RuleComponent
