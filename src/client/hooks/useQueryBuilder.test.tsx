import { act, renderHook } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import useQueryBuilder from "./useQueryBuilder"
import { beforeEach } from "node:test"

vi.mock("@testing-library/react-hooks", () => ({
  renderHook: vi.fn(),
  act: vi.fn(),
}))

describe("useQueryBuilder", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useQueryBuilder())
    expect(result.current.query).toEqual({
      combinator: "AND",
      rules: [],
    })
  })

  it("should add a rule", () => {
    const { result } = renderHook(() => useQueryBuilder())
    act(() => {
      result.current.addRule()
    })
    expect(result.current.query.rules).toHaveLength(1)
  })

  it("should add a group", () => {
    const { result } = renderHook(() => useQueryBuilder())
    act(() => {
      result.current.addGroup()
    })
    expect(result.current.query.rules).toHaveLength(1)
  })

  it("should update a rule", () => {
    const { result } = renderHook(() => useQueryBuilder())
    act(() => {
      result.current.addRule()
    })
    act(() => {
      result.current.updateRule(0, {
        fieldName: "name",
        operation: "EQUAL",
        value: "John",
      })
    })
    expect(result.current.query.rules[0]).toEqual({
      fieldName: "name",
      operation: "EQUAL",
      value: "John",
    })
  })

  it("should update a group", () => {
    const { result } = renderHook(() => useQueryBuilder())
    act(() => {
      result.current.addGroup()
    })
    act(() => {
      result.current.updateGroup(0, {
        combinator: "OR",
        rules: [],
      })
    })
    expect(result.current.query.rules[0]).toEqual({
      combinator: "OR",
      rules: [],
    })
  })

  it("should remove a rule", () => {
    const { result } = renderHook(() => useQueryBuilder())
    act(() => {
      result.current.addRule()
    })
    act(() => {
      result.current.removeRule(0)
    })
    expect(result.current.query.rules).toHaveLength(0)
  })
})
