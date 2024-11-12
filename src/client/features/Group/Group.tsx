import { Group, Field, Rule } from "../../data/interface"
import CombinatorSelector from "../../elements/CombinatiorSelector/CombinatiorSelector"
import RuleComponent from "../Rule/Rule"
import { Box, Button, Card, Stack, Typography, useTheme } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useCallback } from "react"
import { Combinator, Operation } from "../../data/enums"

interface GroupComponentProps {
  group: Group
  fields: Field[]
  onChange: (group: Group) => void
}

function GroupComponent(props: GroupComponentProps) {
  const { group, fields, onChange } = props

  const theme = useTheme()

  const handleAddRule = useCallback(() => {
    onChange({
      ...group,
      conditions: [
        ...group.conditions,
        { field: "amount", operation: Operation.EQUAL, value: "" },
      ],
    })
  }, [group, onChange])

  const handleAddGroup = useCallback(() => {
    onChange({
      ...group,
      conditions: [
        ...group.conditions,
        { combinator: Combinator.AND, conditions: [] },
      ],
    })
  }, [group, onChange])

  const handleUpdateRule = useCallback(
    (index: number, updatedRule: Rule) => {
      onChange({
        ...group,
        conditions: group.conditions.map((rule, i) =>
          i === index ? updatedRule : rule
        ),
      })
    },
    [group, onChange]
  )

  const handleUpdateGroup = useCallback(
    (index: number, updatedGroup: Group) => {
      onChange({
        ...group,
        conditions: group.conditions.map((rule, i) =>
          i === index ? updatedGroup : rule
        ),
      })
    },
    [group, onChange]
  )

  const handleRemoveRule = useCallback(
    (index: number) => {
      onChange({
        ...group,
        conditions: group.conditions.filter((_, i) => i !== index),
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
            onClick={handleAddRule}
            type="button"
            startIcon={<AddIcon />}
          >
            <Typography variant="button">Add Rule</Typography>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            data-testid="add-group"
            onClick={handleAddGroup}
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
        {group.conditions.map((rule, index) => (
          <Box key={index}>
            {"combinator" in rule ? (
              <GroupComponent
                group={rule}
                fields={fields}
                onChange={(updatedGroup) =>
                  handleUpdateGroup(index, updatedGroup)
                }
              />
            ) : (
              <RuleComponent
                rule={rule}
                fields={fields}
                onUpdate={(updatedRule) => handleUpdateRule(index, updatedRule)}
                onRemove={() => handleRemoveRule(index)}
              />
            )}
          </Box>
        ))}
      </Stack>
    </Card>
  )
}

export default GroupComponent
