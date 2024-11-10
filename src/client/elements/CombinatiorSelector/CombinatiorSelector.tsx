import { Combinator } from "../../data/types"

interface CombinatorSelectorProps {
  combinator: Combinator
  onChange: (combinator: Combinator) => void
}

function CombinatorSelector(props: CombinatorSelectorProps) {
  const { combinator, onChange } = props
  return (
    <select
      value={combinator}
      onChange={(e) => onChange(e.target.value as Combinator)}
      className="border border-gray-300 p-2 rounded"
    >
      <option value="AND">AND</option>
      <option value="OR">OR</option>
    </select>
  )
}

export default CombinatorSelector
