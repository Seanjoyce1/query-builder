import { ConditionSet } from "../data/interface"

interface JsonOutputProps {
  data: ConditionSet
}

function JsonOutput(props: JsonOutputProps) {
  const { data } = props
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default JsonOutput
