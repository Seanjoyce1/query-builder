import { useState } from "react"
import { Group, Rule } from "../data/interface"

function useQueryBuilder() {
  const [query, setQuery] = useState<Group>({
    combinator: "AND",
    rules: [],
  })

  const addRule = () => {
    setQuery({
      ...query,
      rules: [...query.rules, { fieldName: "", operation: "EQUAL", value: "" }],
    })
  }

  const addGroup = () => {
    setQuery({
      ...query,
      rules: [...query.rules, { combinator: "AND", rules: [] }],
    })
  }

  const updateRule = (index: number, updatedRule: Rule) => {
    setQuery({
      ...query,
      rules: query.rules.map((rule, i) => (i === index ? updatedRule : rule)),
    })
  }

  const updateGroup = (index: number, updatedGroup: Group) => {
    setQuery({
      ...query,
      rules: query.rules.map((rule, i) => (i === index ? updatedGroup : rule)),
    })
  }

  const removeRule = (index: number) => {
    setQuery({
      ...query,
      rules: query.rules.filter((_, i) => i !== index),
    })
  }

  return {
    query,
    setQuery,
    addRule,
    addGroup,
    updateRule,
    updateGroup,
    removeRule,
  }
}

export default useQueryBuilder
