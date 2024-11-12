import { Group, Field, Rule } from "../../data/interface";
import CombinatorSelector from "../../elements/CombinatiorSelector/CombinatiorSelector";
import RuleComponent from "../Rule/Rule";
import { Box, Button, Card, Stack, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCallback } from "react";

interface GroupComponentProps {
  group: Group;
  fields: Field[];
  onChange: (group: Group) => void;
  onAddRule: (group: Group) => void;
  onAddGroup: (group: Group) => void;
  onUpdateRule: (index: number, updatedRule: Rule, group: Group) => void;
  onUpdateGroup: (index: number, updatedGroup: Group, group: Group) => void;
  onRemoveRule: (index: number, group: Group) => void;
}

function GroupComponent(props: GroupComponentProps) {
  const {
    group,
    fields,
    onChange,
    onAddRule,
    onAddGroup,
    onUpdateRule,
    onUpdateGroup,
    onRemoveRule,
  } = props;

  const theme = useTheme();

  const handleAddRule = useCallback(() => {
    console.log("group", group);
    onAddRule({ ...group });
  }, [group, onAddRule]);

  const handleAddGroup = useCallback(() => {
    onAddGroup(group);
  }, [group, onAddGroup]);

  const handleUpdateRule = useCallback(
    (index: number, updatedRule: Rule) => {
      onUpdateRule(index, updatedRule, group);
    },
    [group, onUpdateRule]
  );

  const handleUpdateGroup = useCallback(
    (index: number, updatedGroup: Group) => {
      onUpdateGroup(index, updatedGroup, group);
    },
    [group, onUpdateGroup]
  );

  const handleRemoveRule = useCallback(
    (index: number) => {
      onRemoveRule(index, group);
    },
    [group, onRemoveRule]
  );

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
        {group.rules.map((rule, index) => (
          <Box key={index}>
            {"combinator" in rule ? (
              <GroupComponent
                group={rule}
                fields={fields}
                onChange={(updatedGroup) =>
                  handleUpdateGroup(index, updatedGroup)
                }
                onAddGroup={handleAddGroup}
                onAddRule={handleAddRule}
                onRemoveRule={handleRemoveRule}
                onUpdateRule={handleUpdateRule}
                onUpdateGroup={handleUpdateGroup}
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
  );
}

export default GroupComponent;
