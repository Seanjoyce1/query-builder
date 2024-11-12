import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import GroupComponent from "./Group"
import { Group, Field } from "../../data/interface"
import { Combinator, FieldType } from "../../data/enums"

const mockFields: Field[] = [
  { name: "field1", label: "Field 1", type: FieldType.TEXT },
  { name: "field2", label: "Field 2", type: FieldType.NUMBER },
]

const mockGroup: Group = {
  combinator: Combinator.AND,
  conditions: [],
}

describe("GroupComponent", () => {
  it("should add group", () => {
    const onChange = vi.fn()
    render(
      <GroupComponent
        group={mockGroup}
        fields={mockFields}
        onChange={onChange}
      />
    )
    fireEvent.click(screen.getByTestId("add-group"))

    expect(onChange).toHaveBeenCalledWith({
      combinator: Combinator.AND,
      conditions: [{ combinator: Combinator.AND, conditions: [] }],
    })
  })
})
