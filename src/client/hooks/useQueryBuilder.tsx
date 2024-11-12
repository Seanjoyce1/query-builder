import { useCallback, useState } from "react"
import { Combinator } from "../data/enums"
import { Group, Rule } from "../data/interface"

function useQueryBuilder() {
  const [query, setQuery] = useState<Group>({
    combinator: Combinator.AND,
    conditions: [],
  })

  const findGroup = useCallback(
    (currentGroup: Group, targetGroup: Group): Group | null => {
      if (currentGroup === targetGroup) {
        return currentGroup
      }

      if (currentGroup.conditions.length === 0) {
        return currentGroup
      }

      for (const condition of currentGroup.conditions as (Rule | Group)[]) {
        if ("conditions" in condition) {
          const found = findGroup(condition, targetGroup)
          if (found) return found
        } else {
          return currentGroup
        }
      }
      return null
    },
    []
  )

  const addRule = useCallback(
    (parentGroup: Group, newRule: Rule) => {
      setQuery((prevQuery) => {
        const updatedQuery = { ...prevQuery }
        const group = findGroup(updatedQuery, parentGroup)
        if (group) {
          group.conditions.push(newRule)
        }
        return updatedQuery
      })
    },
    [findGroup]
  )

  const removeRule = useCallback(
    (parentGroup: Group, ruleToRemove: Rule | Group) => {
      setQuery((prevQuery) => {
        const updatedQuery = { ...prevQuery }
        const group = findGroup(updatedQuery, parentGroup)
        if (group) {
          group.conditions = group.conditions.filter(
            (rule) => rule !== ruleToRemove
          )
        }
        return updatedQuery
      })
    },
    [findGroup, setQuery]
  )

  const updateRule = useCallback(
    (parentGroup: Group, oldRule: Rule, newRule: Rule) => {
      setQuery((prevQuery) => {
        const updatedQuery = { ...prevQuery }
        const group = findGroup(updatedQuery, parentGroup)
        if (group) {
          const index = group.conditions.findIndex((rule) => rule === oldRule)
          if (index !== -1) {
            group.conditions[index] = newRule
          }
        }
        return updatedQuery
      })
    },
    [findGroup, setQuery]
  )

  const addGroup = useCallback(
    (parentGroup: Group, newGroup: Group) => {
      setQuery((prevQuery) => {
        const updatedQuery = { ...prevQuery }
        const group = findGroup(updatedQuery, parentGroup)
        if (group) {
          group.conditions.push(newGroup)
        }
        return updatedQuery
      })
    },
    [findGroup, setQuery]
  )

  const updateGroupCombinator = useCallback(
    (group: Group, newCombinator: Combinator) => {
      setQuery((prevQuery) => {
        const updatedQuery = { ...prevQuery }
        const foundGroup = findGroup(updatedQuery, group)
        if (foundGroup) {
          foundGroup.combinator = newCombinator
        }
        return updatedQuery
      })
    },
    [findGroup, setQuery]
  )

  return {
    query,
    addRule,
    removeRule,
    updateRule,
    addGroup,
    updateGroupCombinator,
  }
}

export default useQueryBuilder
