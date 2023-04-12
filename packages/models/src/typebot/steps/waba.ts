import { StepBase, OctaProperty } from '.'

export type WabaStep =
  | OptionsWabaStep
  | ButtonsWabaStep
  | OctaCommerceStep

export enum WabaStepType {
    OPTIONS = 'options',
    BUTTONS = 'buttons',
    COMMERCE = 'commerce'
  }

export type WabaStepContent =
  | OptionsWabaContent
  | ButtonsWabaContent
  | OctaCommerceStep


export type OptionsWabaStep = StepBase & {
  type: WabaStepType.OPTIONS
  content: OptionsWabaContent
}

export type ButtonsWabaStep = StepBase & {
  type: WabaStepType.BUTTONS
  content: ButtonsWabaContent
}

export type OctaCommerceStep = StepBase & {
  type: WabaStepType.COMMERCE
  content: OctaCommerceContent
}

export type BaseOctaOptionsWaba = {
  id: string;
  presetName: string;
  displayName: string;
  type: string;
}

export type OctaCommerceContent = StepBase & {
  catalogId: string;
  products: Array<String>;
}
export type BaseButtonsOptionsWaba = {
  id: string;
  value: string;
  label: string;
  selected: boolean | undefined;
  description: string
}

export type MessagesWaba = {
  message: string;
  options: Array<any>;
}

export type OptionsWabaContent = BaseOctaOptionsWaba & {
  content: {
    applicableFor: Array<any>;
    warnings: Array<any>;
    delay: {
      time: number,
      style: string
    };
    messages: Array<any>;
    subType: string;
    body:  MessagesWaba| undefined
    header: MessagesWaba | undefined;
    footer: MessagesWaba | undefined;
    prompt: string;
    buttons: Array<BaseButtonsOptionsWaba>;
    list: {
      actionLabel: string;
      sections: Array<{
        message: string,
        options: Array<BaseButtonsOptionsWaba>;
      }> | undefined
    
    },
    validationMessage: string;
    validationMessages: Array<any> | string;
    allowInteractiveMessage: boolean;
    property?: Array<OctaProperty>
  },
  warning: boolean;
  isOnTree: boolean;
}



export type ButtonsWabaContent = BaseOctaOptionsWaba & {
  content: {
    applicableFor: Array<any>;
    warnings: Array<any>;
    delay: {
      time: number,
      style: string
    };
    messages: Array<any> | string;
    subType: string;
    body: {
      
    }
    prompt: string;
    header: Array<any> | undefined;
    footer: Array<any> | undefined;
    buttons: Array<BaseButtonsOptionsWaba>;
    list: {
      actionLabel: string;
      sections: Array<{
        message: string,
        options: Array<BaseButtonsOptionsWaba>;
      }> | undefined
    
    },
    validationMessage?: string;
    validationMessages: Array<any> | string;
    allowInteractiveMessage: boolean;
    property?: Array<OctaProperty>
  },
  warning: boolean;
  isOnTree: boolean;
}

export const defaultOptionsWabaContent: OptionsWabaContent = {
  id: "",
  presetName: "question-interactive-list",
  displayName: "Pergunta com lista de opções",
  type: "quick-reply",
  content: {
    applicableFor: [],
    warnings: [],
    delay: {
      time: 500,
      style: "typing"
    },
    messages: [],
    subType: "interactive-list",
    body: {
      message: "",
      options: []
    },
    prompt: "",
    header: undefined,
    footer: undefined,
    buttons: [],
    list: {
      actionLabel: "",
      sections: [{
        message: "",
        options: [
          {
            id: '',
            label: '',
            value: '',
            description: '',
            selected: undefined
          }
        ],

      }]    
    },
    validationMessage: "",
    validationMessages: [],
    allowInteractiveMessage: true
  },
  warning: false,
  isOnTree: true
}

export const defaultButtonsWabaContent: ButtonsWabaContent = {
  id: "",
  presetName: "question-interactive-list",
  displayName: "Pergunta com lista de opções",
  type: "quick-reply",
  content: {
    applicableFor: [],
    warnings: [],
    delay: {
      time: 500,
      style: "typing"
    },
    messages: [],
    subType: "interactive-list",
    body: {
      message: "",
      options: []
    },
    prompt: "",
    header: undefined,
    footer: undefined,
    buttons: [],
    list: {
      actionLabel: "",
      sections: [{
        message: "",
        options: [
          {
            id: '',
            label: '',
            value: '',
            description: '',
            selected: undefined
          }
        ],

      }]    
    },
    validationMessage: "",
    validationMessages: [],
    allowInteractiveMessage: true
  },
  warning: false,
  isOnTree: true
}
