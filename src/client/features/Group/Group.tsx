import { Group, Field, Rule } from "../../data/interface"
import CombinatorSelector from "../../elements/CombinatiorSelector/CombinatiorSelector"
import RuleComponent from "../Rule/Rule"
import { Box, Button, Card, Stack, Typography, useTheme } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useCallback } from "react"

interface GroupComponentProps {
  group: Group
  fields: Field[]
  onChange: (group: Group) => void
}

function GroupComponent(props: GroupComponentProps) {
  const { group, fields, onChange } = props

  const theme = useTheme()

  const addRule = useCallback(() => {
    onChange({
      ...group,
      rules: [
        ...group.rules,
        { fieldName: "amount", operation: "EQUAL", value: "" },
      ],
    })
  }, [group, onChange])

  const addGroup = useCallback(() => {
    onChange({
      ...group,
      rules: [...group.rules, { combinator: "AND", rules: [] }],
    })
  }, [group, onChange])

  const updateRule = useCallback(
    (index: number, updatedRule: Rule) => {
      onChange({
        ...group,
        rules: group.rules.map((rule, i) => (i === index ? updatedRule : rule)),
      })
    },
    [group, onChange]
  )

  const updateGroup = useCallback(
    (index: number, updatedGroup: Group) => {
      onChange({
        ...group,
        rules: group.rules.map((rule, i) =>
          i === index ? updatedGroup : rule
        ),
      })
    },
    [group, onChange]
  )

  const removeRule = useCallback(
    (index: number) => {
      onChange({
        ...group,
        rules: group.rules.filter((_, i) => i !== index),
      })
    },
    [group, onChange]
  )
  return (
    <Card
      data-testid="group"
      variant="outlined"
      sx={{
        mb: 2,
      }}
    >
      <Stack
        direction={"column"}
        p={2}
        gap={3}
        bgcolor={theme.palette.grey[100]}
      >
        <Stack direction={"row"} gap={2}>
          <Button
            variant="contained"
            color="info"
            data-testid="add-rule"
            onClick={addRule}
            type="button"
            startIcon={<AddIcon />}
          >
            <Typography variant="button">Add Rule</Typography>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            data-testid="add-group"
            onClick={addGroup}
            type="button"
            startIcon={<AddIcon />}
          >
            <Typography variant="button">Add Group</Typography>
          </Button>
        </Stack>
        <Box>
          <CombinatorSelector
            combinator={group.combinator}
            onChange={(newCombinator) =>
              onChange({ ...group, combinator: newCombinator })
            }
          />
        </Box>
        {group.rules.map((rule, index) => (
          <Box key={index}>
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
          </Box>
        ))}
      </Stack>
    </Card>
  )
}

export default GroupComponent
