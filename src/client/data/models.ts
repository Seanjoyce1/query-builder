export interface Field {
  label: string
  value: string
  type: "number" | "text" | "enum"
}

export const fields: Field[] = [
  { label: "Amount", value: "amount", type: "number" },
  { label: "Name", value: "name", type: "text" },
  { label: "ID", value: "id", type: "text" },
  { label: "Transaction State", value: "transaction_state", type: "enum" },
  { label: "Device IP", value: "device_ip", type: "text" },
  { label: "Installments", value: "installments", type: "number" },
]

export const operations: { [key: string]: string[] } = {
  text: ["EQUAL", "NOT_EQUAL"],
  number: ["EQUAL", "NOT_EQUAL", "LESS_THAN", "GREATER_THAN"],
  enum: ["EQUAL", "NOT_EQUAL"],
}

export enum TransactionState {
  SUCCEEDED = "SUCCEEDED",
  REJECTED = "REJECTED",
  ERROR = "ERROR",
  TIMEOUT = "TIMEOUT",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
  ABORTED = "ABORTED",
}

export const transactionStates: TransactionState[] = [
  TransactionState.SUCCEEDED,
  TransactionState.REJECTED,
  TransactionState.ERROR,
  TransactionState.TIMEOUT,
  TransactionState.CANCELLED,
  TransactionState.FAILED,
  TransactionState.ABORTED,
]
