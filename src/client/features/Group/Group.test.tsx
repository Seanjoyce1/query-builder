import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import GroupComponent from "./Group"
import { Group, Field } from "../../data/interface"

const mockFields: Field[] = [
  { name: "field1", label: "Field 1", type: "text" },
  { name: "field2", label: "Field 2", type: "number" },
]

const mockGroup: Group = {
  combinator: "AND",
  rules: [],
}

describe("GroupComponent", () => {
  it("renders without crashing", () => {
    render(
      <GroupComponent
        group={mockGroup}
        fields={mockFields}
        onChange={vi.fn()}
      />
    )
    expect(screen.getByText("Add Rule")).toBeInTheDocument()
    expect(screen.getByText("Add Group")).toBeInTheDocument()
  })

  it("calls onChange when adding a rule", () => {
    const handleChange = vi.fn()
    render(
      <GroupComponent
        group={mockGroup}
        fields={mockFields}
        onChange={handleChange}
      />
    )
    fireEvent.click(screen.getByText("Add Rule"))
    expect(handleChange).toHaveBeenCalled()
  })

  it("calls onChange when adding a group", () => {
    const handleChange = vi.fn()
    render(
      <GroupComponent
        group={mockGroup}
        fields={mockFields}
        onChange={handleChange}
      />
    )
    fireEvent.click(screen.getByText("Add Group"))
    expect(handleChange).toHaveBeenCalled()
  })

  it("calls onChange when updating a combinator", () => {
    const handleChange = vi.fn()
    render(
      <GroupComponent
        group={mockGroup}
        fields={mockFields}
        onChange={handleChange}
      />
    )
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "OR" } })
    expect(handleChange).toHaveBeenCalledWith({
      ...mockGroup,
      combinator: "OR",
    })
  })

  it("calls onChange when removing a rule", () => {
    const mockGroupWithRule: Group = {
      combinator: "AND",
      rules: [{ fieldName: "field1", operation: "EQUAL", value: "value1" }],
    }
    const handleChange = vi.fn()
    render(
      <GroupComponent
        group={mockGroupWithRule}
        fields={mockFields}
        onChange={handleChange}
      />
    )
    fireEvent.click(screen.getByText("Remove"))
    expect(handleChange).toHaveBeenCalled()
  })
})
