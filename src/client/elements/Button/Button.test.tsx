import { render, screen, fireEvent } from "@testing-library/react"
import Button from "./Button"
import { describe, it, expect, vi } from "vitest"

describe("Button component", () => {
  it("renders the button with children", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText("Click me"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
