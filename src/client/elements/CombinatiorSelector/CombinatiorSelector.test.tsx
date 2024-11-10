import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import CombinatorSelector from "./CombinatiorSelector"

describe("CombinatorSelector", () => {
  it("renders correctly with initial value", () => {
    render(<CombinatorSelector combinator="AND" onChange={() => {}} />)
    const selectElement = screen.getByRole("combobox")
    expect(selectElement).toBeInTheDocument()
    expect(selectElement).toHaveValue("AND")
  })

  it("calls onChange with the correct value when changed to OR", () => {
    const handleChange = vi.fn()
    render(<CombinatorSelector combinator="AND" onChange={handleChange} />)
    const selectElement = screen.getByRole("combobox")
    fireEvent.change(selectElement, { target: { value: "OR" } })
    expect(handleChange).toHaveBeenCalledWith("OR")
  })

  it("calls onChange with the correct value when changed to AND", () => {
    const handleChange = vi.fn()
    render(<CombinatorSelector combinator="OR" onChange={handleChange} />)
    const selectElement = screen.getByRole("combobox")
    fireEvent.change(selectElement, { target: { value: "AND" } })
    expect(handleChange).toHaveBeenCalledWith("AND")
  })
})
