import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import QueryBuilder from "./QueryBuilder";

describe("QueryBuilder", () => {
  it("renders correctly", () => {
    render(<QueryBuilder />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("displays the initial query state", () => {
    render(<QueryBuilder />);
    expect(screen.getByText(/"combinator": "AND"/)).toBeInTheDocument();
  });

  it("updates the query state", () => {
    render(<QueryBuilder />);
    const addButton = screen.getByText("Add Rule");
    fireEvent.click(addButton);
    expect(screen.getByText(/"fieldName": "amount"/)).toBeInTheDocument();
  });

  it("submits the query", async () => {
    const mockFetch = vi.fn(() => Promise.resolve(new Response()));
    global.fetch = mockFetch;

    render(<QueryBuilder />);
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith("/api/save-rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ combinator: "AND", rules: [] }),
    });
  });

  it("handles fetch error", async () => {
    const mockFetch = vi.fn(() => Promise.reject("API is down"));
    global.fetch = mockFetch;
    console.error = vi.fn();

    render(<QueryBuilder />);
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith("Error:", "API is down");
    });
  });
});
