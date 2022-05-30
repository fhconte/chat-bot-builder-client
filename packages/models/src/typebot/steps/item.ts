import { ButtonItem, ConditionItem } from '.'
import { OfficeHoursStep } from './octaStep'

export type Item = ButtonItem | ConditionItem | OfficeHoursStep

export enum ItemType {
  BUTTON,
  CONDITION,
  OFFICE_HOURS
}

export type ItemBase = {
  id: string
  stepId: string
  outgoingEdgeId?: string
}

export type ItemIndices = {
  blockIndex: number
  stepIndex: number
  itemIndex: number
}

// export type ItemOffice = {
//   id: string
// }
