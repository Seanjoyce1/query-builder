export interface FieldCriteria {
  fieldName: string
  operation: string
  value: string | number | boolean
}

export interface ConditionSet {
  index?: number
  combinator: "AND" | "OR"
  conditions: (FieldCriteria | ConditionSet)[]
  subConditions?: ConditionSet[]
}

export interface Field {
  label: string
  value: string
  type: "number" | "text" | "enum"
}
