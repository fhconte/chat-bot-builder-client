import { WritableDraft } from "immer/dist/internal";
import { BubbleStepType, DraggableStep, InputStepType, Typebot, WabaStepType } from "models";
import { parseNewStep } from "services/typebots";

// templateTextBot
const templateWabatBot = (typebot: WritableDraft<Typebot>, blockId: string, placeholder: string): Array<DraggableStep> => {
  const ButtonsStep = [
    {
      ...parseNewStep(BubbleStepType.TEXT, blockId),
        content: {
        html: `<div>${placeholder}</div>`,
        richText: [{
          children: [{
            text: `${placeholder}`,
          }],
          type: "p"
        }],
        plainText: `${placeholder}`,
      }
    } as DraggableStep,
    parseNewStep(WabaStepType.BUTTONS, blockId)
  ];

  return ButtonsStep.reverse();
}

export { templateWabatBot };
