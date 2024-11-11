import { PlusIcon } from "@heroicons/react/20/solid"
import { Group, Field, Rule } from "../../data/interface"
import CombinatorSelector from "../../elements/CombinatiorSelector/CombinatiorSelector"
import RuleComponent from "../Rule/Rule"
import { Button, Card, Typography, useTheme } from "@mui/material"

interface GroupComponentProps {
  group: Group
  fields: Field[]
  onChange: (group: Group) => void
}

function GroupComponent(props: GroupComponentProps) {
  const { group, fields, onChange } = props

  const theme = useTheme()

  const addRule = () => {
    onChange({
      ...group,
      rules: [
        ...group.rules,
        { fieldName: "amount", operation: "EQUAL", value: "" },
      ],
    })
  }

  const addGroup = () => {
    onChange({
      ...group,
      rules: [...group.rules, { combinator: "AND", rules: [] }],
    })
  }

  const updateRule = (index: number, updatedRule: Rule) => {
    onChange({
      ...group,
      rules: group.rules.map((rule, i) => (i === index ? updatedRule : rule)),
    })
  }

  const updateGroup = (index: number, updatedGroup: Group) => {
    onChange({
      ...group,
      rules: group.rules.map((rule, i) => (i === index ? updatedGroup : rule)),
    })
  }

  const removeRule = (index: number) => {
    onChange({
      ...group,
      rules: group.rules.filter((_, i) => i !== index),
    })
  }

  return (
    <Card
      data-testid="group"
      className="flex flex-col gap-2 p-3 mb-4"
      variant="outlined"
      sx={{
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <div className="flex flex-row gap-2 mb-2">
        <Button
          variant="contained"
          color="info"
          data-testid="add-rule"
          onClick={addRule}
          type="button"
          startIcon={<PlusIcon className="size-6 text-white" />}
        >
          <Typography variant="button">Add Rule</Typography>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          data-testid="add-group"
          onClick={addGroup}
          type="button"
          startIcon={<PlusIcon className="size-6 text-white" />}
        >
          <Typography variant="button">Add Group</Typography>
        </Button>
      </div>
      <div className="flex gap-2">
        <CombinatorSelector
          combinator={group.combinator}
          onChange={(newCombinator) =>
            onChange({ ...group, combinator: newCombinator })
          }
        />
      </div>

      {group.rules.map((rule, index) => (
        <div key={index} data-testid="rule-or-group">
          {"combinator" in rule ? (
            <GroupComponent
              group={rule}
              fields={fields}
              onChange={(updatedGroup) => updateGroup(index, updatedGroup)}
            />
          ) : (
            <RuleComponent
              rule={rule}
              fields={fields}
              onUpdate={(updatedRule) => updateRule(index, updatedRule)}
              onRemove={() => removeRule(index)}
            />
          )}
        </div>
      ))}
    </Card>
  )
}

export default GroupComponent
