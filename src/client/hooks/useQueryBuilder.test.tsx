import { describe, it, expect } from "vitest"
import useQueryBuilder from "./useQueryBuilder"
import { Combinator, Operation } from "../data/enums"
import { Group, Rule } from "../data/interface"
import { act, renderHook } from "@testing-library/react"

describe("useQueryBuilder", () => {
  it("should initialize with default query", () => {
    const { result } = renderHook(() => useQueryBuilder())
    expect(result.current.query).toEqual({
      combinator: Combinator.AND,
      conditions: [],
    })
  })

  it("should add a rule to a group", () => {
    const { result } = renderHook(() => useQueryBuilder())
    const newRule: Rule = {
      field: "amount",
      operation: Operation.EQUAL,
      value: 30,
    }
    const parentGroup: Group = result.current.query

    act(() => {
      result.current.addRule(parentGroup, newRule)
    })

    console.log(result.current.query)

    expect(result.current.query.conditions).toContain(newRule)
  })

  it("should add a rule to a child group", () => {
    const { result } = renderHook(() => useQueryBuilder())
    const newGroup: Group = { combinator: Combinator.AND, conditions: [] }
    const parentGroup: Group = result.current.query
    const newRule: Rule = {
      field: "amount",
      operation: Operation.EQUAL,
      value: 30,
    }

    act(() => {
      result.current.addGroup(parentGroup, newGroup)
    })

    act(() => {
      result.current.addRule(newGroup, newRule)
    })

    console.log(result.current.query)

    expect(result.current.query.conditions).toContain(newRule)
  })

  it("should remove a rule from a group", () => {
    const { result } = renderHook(() => useQueryBuilder())
    const newRule: Rule = {
      field: "age",
      operation: Operation.EQUAL,
      value: 30,
    }
    const parentGroup: Group = result.current.query

    act(() => {
      result.current.addRule(parentGroup, newRule)
    })

    act(() => {
      result.current.removeRule(parentGroup, newRule)
    })

    expect(result.current.query.conditions).not.toContain(newRule)
  })

  it("should update a rule in a group", () => {
    const { result } = renderHook(() => useQueryBuilder())
    const oldRule: Rule = {
      field: "age",
      operation: Operation.EQUAL,
      value: 30,
    }
    const newRule: Rule = {
      field: "age",
      operation: Operation.EQUAL,
      value: 40,
    }
    const parentGroup: Group = result.current.query

    act(() => {
      result.current.addRule(parentGroup, oldRule)
    })

    act(() => {
      result.current.updateRule(parentGroup, oldRule, newRule)
    })

    expect(result.current.query.conditions).toContain(newRule)
    expect(result.current.query.conditions).not.toContain(oldRule)
  })

  it("should add a group to a parent group", () => {
    const { result } = renderHook(() => useQueryBuilder())
    const newGroup: Group = { combinator: Combinator.OR, conditions: [] }
    const parentGroup: Group = result.current.query

    act(() => {
      result.current.addGroup(parentGroup, newGroup)
    })

    expect(result.current.query.conditions).toContain(newGroup)
  })

  it("should update a group's combinator", () => {
    const { result } = renderHook(() => useQueryBuilder())
    const parentGroup: Group = result.current.query

    act(() => {
      result.current.updateGroupCombinator(parentGroup, Combinator.OR)
    })

    expect(result.current.query.combinator).toBe(Combinator.OR)
  })
})
