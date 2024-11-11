import { MenuItem, Select } from "@mui/material"
import { Combinator } from "../../data/types"

interface CombinatorSelectorProps {
  combinator: Combinator
  onChange: (combinator: Combinator) => void
}

function CombinatorSelector(props: CombinatorSelectorProps) {
  const { combinator, onChange } = props
  return (
    <Select
      value={combinator}
      onChange={(e) => onChange(e.target.value as Combinator)}
      placeholder="AND"
      defaultValue="AND"
      size="small"
    >
      <MenuItem value="AND">AND</MenuItem>
      <MenuItem value="OR">OR</MenuItem>
    </Select>
  )
}

export default CombinatorSelector
