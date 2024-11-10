import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import QueryBuilder from "./QueryBuilder"

describe("QueryBuilder", () => {
  it("renders correctly", () => {
    render(<QueryBuilder />)
    expect(screen.getByText("Submit")).toBeInTheDocument()
  })

  it("displays the initial query state", () => {
    render(<QueryBuilder />)
    expect(screen.getByText(/"combinator": "AND"/)).toBeInTheDocument()
  })

  it.skip("handles fetch error", async () => {
    const mockFetch = vi.fn(() => Promise.reject("API is down"))
    global.fetch = mockFetch
    console.error = vi.fn()

    render(<QueryBuilder />)
    const submitButton = screen.getByText("Submit")
    fireEvent.click(submitButton)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith("Error:", "API is down")
  })
})
