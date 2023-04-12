import { FormLabel, Stack } from '@chakra-ui/react'
import { WabaStep, StepIndices, TextBubbleContent, OptionsWabaContent } from 'models'
import { TextBubbleEditor } from '../../../TextBubbleEditor'


type Props = {
  step: WabaStep,
  options: OptionsWabaContent,
  onOptionsChange: (options: OptionsWabaContent) => void
}

// type wabaSettingsBodyProps = {
//   options: OptionsWabaContent
//   onOptionsChange: (options: OptionsWabaContent) => void
// }

const ButtonsOptionsContent = (
  { step, options}: Props) => {
    
    return (
      <text>{step.type === "options" ? ("Pergunta com lista de opções") : ("Pergunta com botões interativos") }</text>
      
    )
}


export default ButtonsOptionsContent
