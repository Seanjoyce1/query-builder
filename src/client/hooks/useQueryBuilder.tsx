import { useState } from "react";
import { Combinator, Operation } from "../data/enums";
import { Group, Rule } from "../data/interface";

function useQueryBuilder() {
  const [query, setQuery] = useState<Group>({
    combinator: Combinator.AND,
    rules: [],
  });

  const handleAddRule = (group: Group) => {
    console.log("group", group);
    setQuery({
      ...group,
      rules: [
        ...group.rules,
        { fieldName: "amount", operation: Operation.EQUAL, value: "" },
      ],
    });
  };

  const handleAddGroup = (group: Group) => {
    setQuery({
      ...group,
      rules: [...group.rules, { combinator: Combinator.AND, rules: [] }],
    });
  };

  const handleUpdateRule = (index: number, updatedRule: Rule, group: Group) => {
    setQuery({
      ...group,
      rules: group.rules.map((rule, i) => (i === index ? updatedRule : rule)),
    });
  };

  const handleUpdateGroup = (
    index: number,
    updatedGroup: Group,
    group: Group
  ) => {
    setQuery({
      ...group,
      rules: group.rules.map((rule, i) => (i === index ? updatedGroup : rule)),
    });
  };

  const handleRemoveRule = (index: number, group: Group) => {
    setQuery({
      ...group,
      rules: group.rules.filter((_, i) => i !== index),
    });
  };

  return {
    query,
    setQuery,
    handleAddRule,
    handleAddGroup,
    handleUpdateRule,
    handleUpdateGroup,
    handleRemoveRule,
  };
}

export default useQueryBuilder;
