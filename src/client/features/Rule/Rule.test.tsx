import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import RuleComponent from "./Rule"
import { Field, Rule } from "../../data/interface"

describe("RuleComponent", () => {
  const fields: Field[] = [
    { name: "age", label: "Age", type: "number" },
    { name: "name", label: "Name", type: "text" },
  ]

  const rule: Rule = {
    fieldName: "age",
    operation: "EQUAL",
    value: "30",
  }

  const onUpdate = vi.fn()
  const onRemove = vi.fn()

  it.skip("renders correctly", () => {
    render(
      <RuleComponent
        rule={rule}
        fields={fields}
        onUpdate={onUpdate}
        onRemove={onRemove}
      />
    )
    expect(screen.getByDisplayValue("Age")).toBeInTheDocument()
    expect(screen.getByDisplayValue("EQUAL")).toBeInTheDocument()
    expect(screen.getByDisplayValue("30")).toBeInTheDocument()
  })

  it("calls onUpdate when field is changed", () => {
    render(
      <RuleComponent
        rule={rule}
        fields={fields}
        onUpdate={onUpdate}
        onRemove={onRemove}
      />
    )
    fireEvent.change(screen.getByDisplayValue("Age"), {
      target: { value: "name" },
    })
    expect(onUpdate).toHaveBeenCalledWith({
      ...rule,
      fieldName: "name",
      operation: "EQUAL",
    })
  })

  it.skip("calls onUpdate when operation is changed", () => {
    render(
      <RuleComponent
        rule={rule}
        fields={fields}
        onUpdate={onUpdate}
        onRemove={onRemove}
      />
    )
    fireEvent.change(screen.getByDisplayValue("EQUAL"), {
      target: { value: "NOT_EQUAL" },
    })
    expect(onUpdate).toHaveBeenCalledWith({ ...rule, operation: "NOT_EQUAL" })
  })

  it("calls onRemove when remove button is clicked", () => {
    render(
      <RuleComponent
        rule={rule}
        fields={fields}
        onUpdate={onUpdate}
        onRemove={onRemove}
      />
    )
    fireEvent.click(screen.getByText("Remove"))
    expect(onRemove).toHaveBeenCalled()
  })

  it("renders additional options for number fields", () => {
    render(
      <RuleComponent
        rule={rule}
        fields={fields}
        onUpdate={onUpdate}
        onRemove={onRemove}
      />
    )
    expect(screen.getByText("Less Than")).toBeInTheDocument()
    expect(screen.getByText("Greater Than")).toBeInTheDocument()
  })
})
