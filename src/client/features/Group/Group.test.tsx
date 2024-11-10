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
  it("renders GroupComponent with Add Rule and Add Group buttons", () => {
    render(
      <GroupComponent
        group={mockGroup}
        fields={mockFields}
        onChange={vi.fn()}
        addRule={vi.fn()}
        addGroup={vi.fn()}
        updateRule={vi.fn()}
        updateGroup={vi.fn()}
        removeRule={vi.fn()}
      />
    )
    expect(screen.getByText("Add Rule")).toBeInTheDocument()
    expect(screen.getByText("Add Group")).toBeInTheDocument()
  })

  it("calls addRule when Add Rule button is clicked", () => {
    const addRule = vi.fn()
    render(
      <GroupComponent
        group={mockGroup}
        fields={mockFields}
        onChange={vi.fn()}
        addRule={addRule}
        addGroup={vi.fn()}
        updateRule={vi.fn()}
        updateGroup={vi.fn()}
        removeRule={vi.fn()}
      />
    )
    fireEvent.click(screen.getByText("Add Rule"))
    expect(addRule).toHaveBeenCalledTimes(1)
  })

  it("calls addGroup when Add Group button is clicked", () => {
    const addGroup = vi.fn()
    render(
      <GroupComponent
        group={mockGroup}
        fields={mockFields}
        onChange={vi.fn()}
        addRule={vi.fn()}
        addGroup={addGroup}
        updateRule={vi.fn()}
        updateGroup={vi.fn()}
        removeRule={vi.fn()}
      />
    )
    fireEvent.click(screen.getByText("Add Group"))
    expect(addGroup).toHaveBeenCalledTimes(1)
  })
})
