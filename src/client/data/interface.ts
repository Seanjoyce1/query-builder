export interface FieldCriteria {
  fieldName: string
  operation: string
  value: string | number | boolean
}

export interface ConditionSet {
  combinator: "AND" | "OR"
  conditions: (FieldCriteria | ConditionSet)[]
  subConditions?: ConditionSet[]
}
