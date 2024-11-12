import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GroupComponent from "./Group";
import { Group, Field } from "../../data/interface";
import { Combinator, FieldType, Operation } from "../../data/enums";

const mockFields: Field[] = [
  { name: "field1", label: "Field 1", type: FieldType.TEXT },
  { name: "field2", label: "Field 2", type: FieldType.NUMBER },
];

const mockGroup: Group = {
  combinator: Combinator.AND,
  rules: [],
};

describe("GroupComponent", () => {
  it("renders without crashing", () => {
    render(
      <GroupComponent
        group={mockGroup}
        fields={mockFields}
        onChange={vi.fn()}
      />
    );
    expect(screen.getByTestId("group")).toBeInTheDocument();
  });

  it("calls onChange when adding a rule", () => {
    const handleChange = vi.fn();
    render(
      <GroupComponent
        group={mockGroup}
        fields={mockFields}
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByTestId("add-rule"));

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith({
      ...mockGroup,
      rules: [{ fieldName: "amount", operation: "EQUAL", value: "" }],
    });
  });

  it("calls onChange when adding a group", () => {
    const handleChange = vi.fn();
    render(
      <GroupComponent
        group={mockGroup}
        fields={mockFields}
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByTestId("add-group"));

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith({
      ...mockGroup,
      rules: [{ combinator: "AND", rules: [] }],
    });
  });

  it("calls onChange when removing a rule", () => {
    const handleChange = vi.fn();
    const groupWithRule = {
      ...mockGroup,
      rules: [
        { fieldName: "field1", operation: Operation.EQUAL, value: "test" },
      ],
    };
    render(
      <GroupComponent
        group={groupWithRule}
        fields={mockFields}
        onChange={handleChange}
      />
    );

    const removeButton = screen.getByTestId("remove-rule");
    fireEvent.click(removeButton);

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith({
      ...mockGroup,
      rules: [],
    });
  });
});
