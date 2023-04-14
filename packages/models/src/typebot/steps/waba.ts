import { TElement } from '@udecode/plate-core';
import { StepBase} from '.'
import { Variable } from '../variable';
import { TextBubbleContent } from './bubble'


export type WabaStep =
  | OptionsWabaStep
  | ButtonsWabaStep
  | OctaCommerceStep

export enum WabaStepType {
  OPTIONS = 'options',
  BUTTONS = 'buttons',
  COMMERCE = 'commerce'
}

export type WabaStepOptions = 
  | OptionsWabaOptions
  | ButtonsWabaOptions

export type WabaStepContent =
  // | OptionsWabaContent
  // | ButtonsWabaContent
  | OctaCommerceStep


export type OptionsWabaStep = StepBase & {
  type: WabaStepType.OPTIONS
  options: OptionsWabaOptions
}

export type ButtonsWabaStep = StepBase & {
  type: WabaStepType.BUTTONS
  options: ButtonsWabaOptions
}

export type OctaCommerceStep = StepBase &  {
  type: WabaStepType.COMMERCE
  content: OctaCommerceContent
}



export type OctaCommerceContent = StepBase & {
  catalogId: string;
  products: Array<String>;
}

export type ButtonsOptionsWaba = {
  id: string;
  value: string;
  label: string;
  selected?: boolean | undefined;
  description: string
}

export type MessagesWaba = {
  message?: TextBubbleContent;
  options?: Array<ButtonsOptionsWaba>;
}

type ListWaba = {
  actionLabel: string;
  sections: Array<MessagesWaba>
}

export type validationMessages = {
  id: string,
  level: number,
  message: string
}

type BaseOctaOptionsWaba = {
  id: string;
  presetName: string;
  displayName: string;
  type: string;
  isOnTree?: boolean;
  warning: boolean; 
}

export type OptionsWabaOptions = BaseOctaOptionsWaba & {
  content: {
    allowInteractiveMessage: boolean;
    allowUserInput: boolean;
    applicableFor: Array<any>;
    body?:  MessagesWaba;
    buttons: Array<ButtonsOptionsWaba>;
    delay: {
      time: number,
      style: string
    };
    delayContent: {
      time: number,
      style: string
    };
    footer?: MessagesWaba;
    header?: MessagesWaba;
    list: Array<ListWaba>
    messages: Array<any>;
    subType: string;
    property?: Variable;
    referenceProperty?: string;
    referenceValue?: string;
    setPropertyValue?: Object;
    validationMessage: string;
    validationMessages: Array<validationMessages>;
    warnings: Array<any>;
  }
}

export type ButtonsWabaOptions = BaseOctaOptionsWaba & {
  content: {
    allowInteractiveMessage: boolean;
    allowUserInput: boolean;
    applicableFor: Array<any>;
    body: MessagesWaba
    buttons: Array<ButtonsOptionsWaba>;
    delay: {
      time: number,
      style: string
    };
    delayContent: {
      time: number,
      style: string
    };
    footer: MessagesWaba;
    header: MessagesWaba;
    messages: Array<any>;
    warnings: Array<any>;
    subType: string;
    validationMessage: string;
    validationMessages: Array<validationMessages>;
    referenceProperty: string;
    referenceValue: string;
    setPropertyValue: Object;
  }
}

export const defaultOptionsWabaOptions: OptionsWabaOptions = {
  id: "",
  presetName: "question-interactive-list",
  displayName: "Pergunta com lista de opções",
  type: "quick-reply",
  isOnTree: true,
  warning: false, 
  content: {
    allowInteractiveMessage: true,
    allowUserInput: true,
    applicableFor: [],
    buttons: [],
    delay: {
      time: 500,
      style: "typing"
    },
    delayContent: {
      time: 500,
      style: "typing"
    },
    list: [],
    messages: [],
    subType: "interactive-list",
    validationMessage: "",
    validationMessages: [
      {
          id: "ab2e8e89-22da-4253-b527-6683f903afff",
          level: 0,
          message: " Hmmm, isso não se parece com uma data. Por favor, digite somente números e barras (/), por exemplo, <strong>07/02/2014</strong> para 7 de fevereiro de 2014."
      },
      {
          id: "e062b1cb-c8dc-4753-837e-b63f3dbe26f6",
          level: 1,
          message: "Desculpe, eu ainda não entendi. Usando apenas números e barras (/) sem espaços, digite uma data com dia, mês e ano. Por exemplo: digite <strong>29/08/1976</strong>, para 29 de agosto de 1976.<br/>Ah, essa data é só um exemplo, tá?"
      },
      {
          id: "924e7273-96a3-4979-85cd-ade043cb5f64",
          level: 2,
          message: "Ainda não consegui entender, mas fique tranquilo que vou chamar alguém pra te ajudar. Você será atendido o mais breve possível."
      }
    ],
    referenceProperty: "@GROUP",
    referenceValue: "",
    setPropertyValue: [],
    warnings: []
  }
}

export const defaultButtonsWabaOptions: ButtonsWabaOptions = {
  id: "",
  presetName: "question-interactive-multiple-choices",
  displayName: "Pergunta com botões interativos",
  type: "quick-reply",
  content: {
    allowInteractiveMessage: true,
    allowUserInput: false,
    applicableFor: [],
    body: {
      message: undefined,
      options: []
    },
    header: {
      message: undefined,
      options: []
    },
    footer: {
      message: undefined,
      options: []
    },
    buttons: [],
    delay: {
      time: 500,
      style: "typing"
    },
    delayContent: {
      time: 500,
      style: "typing"
    },
    warnings: [],
    messages: [],
    subType: "interactive-buttons",
    referenceProperty: "",
    referenceValue: "",
    setPropertyValue: {},
    validationMessage: "",
    validationMessages: [
      {
          id: "ab2e8e89-22da-4253-b527-6683f903afff",
          level: 0,
          message: " Hmmm, isso não se parece com uma data. Por favor, digite somente números e barras (/), por exemplo, <strong>07/02/2014</strong> para 7 de fevereiro de 2014."
      },
      {
          id: "e062b1cb-c8dc-4753-837e-b63f3dbe26f6",
          level: 1,
          message: "Desculpe, eu ainda não entendi. Usando apenas números e barras (/) sem espaços, digite uma data com dia, mês e ano. Por exemplo: digite <strong>29/08/1976</strong>, para 29 de agosto de 1976.<br/>Ah, essa data é só um exemplo, tá?"
      },
      {
          id: "924e7273-96a3-4979-85cd-ade043cb5f64",
          level: 2,
          message: "Ainda não consegui entender, mas fique tranquilo que vou chamar alguém pra te ajudar. Você será atendido o mais breve possível."
      }
    ],
  },
  warning: false,
  isOnTree: true
}
