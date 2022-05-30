import { StepBase } from '.'
import { TextBubbleContent } from './bubble'

// Regular steps
export type OctaStep = AssignToTeamStep

// Bubble steps (editado na árvore)
export type OctaBubbleStep = EndConversationStep

<<<<<<< HEAD
// Step options (modal options) usa no OctaStep
export type OctaStepOptions = AssignToTeamOptions | OfficeHoursOptions
=======
export type OctaStepWithOptions =
  | EndConversationStep
  | AssignToTeamStep
  | OfficeHoursStep
>>>>>>> 630c94c79baaccb14e4513e6fe7cc4b37e3de2de

// Steps that has variables on the popup modal
export type OctaStepWithOptions = AssignToTeamStep | OfficeHoursStep

// Steps that has variables on its body
export type OctaBubbleStepContent = EndConversationBubbleContent

// End conversation bubble content
export type EndConversationBubbleContent = TextBubbleContent

// Bubble step types
export enum OctaBubbleStepType {
  END_CONVERSATION = 'end conversation',
<<<<<<< HEAD
=======
  ASSIGN_TO_TEAM = 'assign to team',
  OFFICE_HOURS = 'office hours'
>>>>>>> 630c94c79baaccb14e4513e6fe7cc4b37e3de2de
}

// Regular step types
export enum OctaStepType {
  ASSIGN_TO_TEAM = 'assign to team',
  OFFICE_HOURS = 'office hours'
}

// Regular steps types that have options
export type OctaStepWithOptionsType = EndConversationStep

type OctaOptionBase = { variableId?: string }

export declare enum ReturnOfficeHours {
    EQUAL = "Equal to",
    NOT_EQUAL = "Not equal",
    CONTAINS = "Contains",
    GREATER = "Greater than",
    LESS = "Less than",
    IS_SET = "Is set"
}

export type EndConversationStep = StepBase & {
  type: OctaBubbleStepType.END_CONVERSATION
  content: TextBubbleContent
}

export type AssignToTeamStep = StepBase & {
  type: OctaStepType.ASSIGN_TO_TEAM
  options: AssignToTeamOptions
}

<<<<<<< HEAD
export type AssignToTeamOptions = BaseOctaOptions & {
  assignTo: string
  messages: {
    firstMessage?: {
      content?: TextBubbleContent
    }
    connectionSuccess?: {
      content?: TextBubbleContent
    }
    noAgentAvailable?: {
      content?: TextBubbleContent
    }
  }
  defaultArray: string
  isAvailable: boolean
  labels: {
    placeholder: { assignToTeam: string; connectionMessage: string }
    button: string
  }
}

export type OfficeHoursOptions = BaseOctaOptions & {
  officeHours: string
  withinTheSchedule: string
  outOfTime: string
  labels: {
    placeholder: { officehours: string }
    button: string
  }
=======
export type OfficeHoursStep = StepBase & {
  type: OctaStepType.OFFICE_HOURS
  options: AssignToTeamOptions
}

export type EndConversationOptions = OctaOptionBase & {
  labels: { placeholder: string; button: string }
>>>>>>> 630c94c79baaccb14e4513e6fe7cc4b37e3de2de
}

export type OfficeHoursStep = StepBase & {
  type: OctaStepType.OFFICE_HOURS
  options: AssignToTeamOptions
}

export type BaseOctaOptions = {
  name: string | 'default'
  subject: string
}

export const defaultAssignToTeamOptions: AssignToTeamOptions = {
  labels: {
    button: 'octa',
    placeholder: {
      assignToTeam: 'Direcione a conversa para o time',
      connectionMessage: 'Mensagem de conexão',
    },
  },
  messages: {
    firstMessage: {
      content: undefined
    },
    connectionSuccess: {
      content: undefined
    },
    noAgentAvailable: {
      content: undefined
    },
  },
  defaultArray: '',
  name: '',
  subject: '',
  assignTo: '',
  isAvailable: false,
}

export const defaultEndConversationBubbleContent: EndConversationBubbleContent =
  {
    html: '',
    richText: [],
    plainText: '',
  }

export const defaultOfficeHoursOptions: OfficeHoursOptions = {
  officeHours: 'Qual horário de expediente esse bot vai atender?',
  withinTheSchedule: 'Para conversas iniciadas dentro desse horário, ir para:',
  outOfTime: 'Para conversas iniciadas fora desse horário, ir para:',
  labels: {
    button: 'Salvar',
    placeholder: {
      officehours: 'Defina um horário de atendimento',
    },
  },
  name: '',
  subject: ''
}

<<<<<<< HEAD
=======
export const defaultAssignToTeamOptions: EndConversationOptions = {
  labels: { button: 'octa', placeholder: 'Type your answer...' },
}

export const defaultOfficeHoursOptions: EndConversationOptions = {
  labels: { button: 'octa', placeholder: 'Type your answer...' },
}
>>>>>>> 630c94c79baaccb14e4513e6fe7cc4b37e3de2de
