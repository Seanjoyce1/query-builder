import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Combinator } from "../../data/enums"

interface CombinatorSelectorProps {
  combinator: Combinator
  onChange: (combinator: Combinator) => void
}

function CombinatorSelector(props: CombinatorSelectorProps) {
  const { combinator, onChange } = props
  return (
    <FormControl
      sx={{
        minWidth: 120,
      }}
    >
      <InputLabel id="combinator">Combinator</InputLabel>
      <Select
        labelId="combinator"
        value={combinator}
        onChange={(e) => onChange(e.target.value as Combinator)}
        placeholder="AND"
        defaultValue="AND"
        label="Combinator"
        size="small"
      >
        <MenuItem value="AND">AND</MenuItem>
        <MenuItem value="OR">OR</MenuItem>
      </Select>
    </FormControl>
  )
}

export default CombinatorSelector
