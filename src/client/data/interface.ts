import { Combinator, FieldType, Operation } from "./enums"

export interface Field {
  name: string
  label: string
  type: FieldType
  options?: string[]
}

export interface Rule {
  fieldName: string
  operation: Operation
  value: string | number | { amount: number; currency: string }
}

export interface Group {
  combinator: Combinator
  rules: (Rule | Group)[]
}
