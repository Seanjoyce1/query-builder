import { IconButton, MenuItem, Select } from "@mui/material"
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

  const field = fields.find((f) => f.name === rule.fieldName)

  return (
    <div className="flex items-center gap-3 mb-2">
      <Select
        value={rule.fieldName}
        defaultValue="amount"
        placeholder="amount"
        size="small"
        onChange={(e) =>
          onUpdate({
            ...rule,
            fieldName: e.target.value,
            operation: "EQUAL",
          })
        }
      >
        {fields.map((field) => (
          <MenuItem key={field.name} value={field.name}>
            {field.label}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={rule.operation}
        size="small"
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
      <ValueInput field={field} rule={rule} onUpdate={onUpdate} />
      <IconButton onClick={onRemove} color="error" size="medium">
        <DeleteIcon fontSize="medium" />
      </IconButton>
    </div>
  )
}

export default RuleComponent
