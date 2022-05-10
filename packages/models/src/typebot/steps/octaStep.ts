import { StepBase } from '.'

export type OctaStep =
  | EndConversationStep
  | AssignToTeamStep

export type OctaStepOptions =
  | EndConversationOptions
  | AssignToTeamOptions

export type OctaStepWithOptions =
  | EndConversationStep
  | AssignToTeamStep
  | OfficeHoursStep

export enum OctaStepType {
  END_CONVERSATION = 'end conversation',
  ASSIGN_TO_TEAM = 'assign to team',
  OFFICE_HOURS = 'office hours'
}

export type OctaStepWithOptionsType = 
 | EndConversationStep
type OctaOptionBase = { variableId?: string }

export type EndConversationStep = StepBase & {
  type: OctaStepType.END_CONVERSATION
  options: EndConversationOptions
}

export type AssignToTeamStep = StepBase & {
  type: OctaStepType.ASSIGN_TO_TEAM
  options: AssignToTeamOptions
}

export type OfficeHoursStep = StepBase & {
  type: OctaStepType.OFFICE_HOURS
  options: AssignToTeamOptions
}

export type EndConversationOptions = OctaOptionBase & {
  labels: { placeholder: string; button: string }
}

export type AssignToTeamOptions = BaseOctaOptions

export type BaseOctaOptions = {
  name: string | 'default'
  subject: string
  labels: { placeholder: string; button: string }
}

export const defaultEndConversationOptions: EndConversationOptions = {
  labels: { button: 'octa', placeholder: 'Type your answer...' },
}

export const defaultAssignToTeamOptions: EndConversationOptions = {
  labels: { button: 'octa', placeholder: 'Type your answer...' },
}

export const defaultOfficeHoursOptions: EndConversationOptions = {
  labels: { button: 'octa', placeholder: 'Type your answer...' },
}
