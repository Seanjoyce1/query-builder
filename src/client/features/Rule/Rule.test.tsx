import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RuleComponent from "./Rule";
import { Field, Rule } from "../../data/interface";
import { FieldType, Operation } from "../../data/enums";

describe("RuleComponent", () => {
  const mockFields: Field[] = [
    { name: "amount", label: "Amount", type: FieldType.NUMBER },
    { name: "name", label: "Name", type: FieldType.TEXT },
  ];

  const mockRule: Rule = {
    fieldName: "amount",
    operation: Operation.EQUAL,
    value: "",
  };

  const mockOnUpdate = vi.fn();
  const mockOnRemove = vi.fn();

  it("renders correctly", () => {
    render(
      <RuleComponent
        rule={mockRule}
        fields={mockFields}
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByTestId("rule")).toBeInTheDocument();
    expect(screen.getByTestId("field")).toBeInTheDocument();
    expect(screen.getByTestId("operation")).toBeInTheDocument();
    expect(screen.getByTestId("remove-rule")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    render(
      <RuleComponent
        rule={mockRule}
        fields={mockFields}
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    fireEvent.click(screen.getByTestId("remove-rule"));

    expect(mockOnRemove).toHaveBeenCalled();
  });
});
