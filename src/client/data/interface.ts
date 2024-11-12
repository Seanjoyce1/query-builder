import { Combinator, FieldType, Operation } from "./enums"

export interface Field {
  name: string
  label: string
  type: FieldType
  options?: string[]
}

export interface Rule {
  field: string
  operation: Operation
  value: string | number | { amount: number; currency: string }
}

export interface Group {
  combinator: Combinator
  conditions: (Rule | Group)[]
  subCondition?: (Rule | Group)[]
}
