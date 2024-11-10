import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import ValueInput from "./ValueInput"
import { Field, Rule } from "../../data/interface"

describe("ValueInput", () => {
  const mockOnUpdate = vi.fn()

  beforeEach(() => {
    mockOnUpdate.mockClear()
  })

  it("renders null when field is undefined", () => {
    render(
      <ValueInput
        field={undefined}
        rule={{ value: "", fieldName: "", operation: "EQUAL" }}
        onUpdate={mockOnUpdate}
      />
    )
    expect(screen.queryByRole("textbox")).toBeNull()
  })

  it("renders enum select input", () => {
    const field: Field = {
      type: "enum",
      options: ["option1", "option2"],
      name: "enumField",
      label: "Enum Field",
    }
    const rule: Rule = {
      value: "option1",
      fieldName: "enumField",
      operation: "EQUAL",
    }
    render(<ValueInput field={field} rule={rule} onUpdate={mockOnUpdate} />)
    const select = screen.getByRole("combobox")
    expect(select).toBeInTheDocument()
    expect(select).toHaveValue("option1")
  })

  it("renders number input for amount with currency select", () => {
    const field: Field = { type: "number", name: "amount", label: "Amount" }
    const rule: Rule = {
      value: { amount: 100, currency: "USD" },
      fieldName: "amount",
      operation: "EQUAL",
    }
    render(<ValueInput field={field} rule={rule} onUpdate={mockOnUpdate} />)
    const numberInput = screen.getByRole("spinbutton")
    const currencySelect = screen.getByRole("combobox")
    expect(numberInput).toBeInTheDocument()
    expect(numberInput).toHaveValue(100)
    expect(currencySelect).toBeInTheDocument()
    expect(currencySelect).toHaveValue("USD")
  })

  it("renders number input for non-amount field", () => {
    const field: Field = { type: "number", name: "age", label: "Age" }
    const rule: Rule = { value: 30, fieldName: "age", operation: "EQUAL" }
    render(<ValueInput field={field} rule={rule} onUpdate={mockOnUpdate} />)
    const numberInput = screen.getByRole("spinbutton")
    expect(numberInput).toBeInTheDocument()
    expect(numberInput).toHaveValue(30)
  })
})
