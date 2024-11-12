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

  it("should clear value on field change", () => {
    render(
      <RuleComponent
        rule={mockRule}
        fields={mockFields}
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    const inputElement = screen.getByTestId("field").querySelector("input");
    if (inputElement) {
      fireEvent.change(inputElement, {
        target: { value: "name" },
      });
    }

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockRule,
      fieldName: "name",
      value: "",
    });
  });

  it("should update rule operation", () => {
    render(
      <RuleComponent
        rule={mockRule}
        fields={mockFields}
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    const inputElement = screen.getByTestId("operation").querySelector("input");
    if (inputElement) {
      fireEvent.change(inputElement, {
        target: { value: Operation.NOT_EQUAL },
      });
    }

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockRule,
      operation: Operation.NOT_EQUAL,
    });
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
