import { Text } from '@chakra-ui/react'
import { WabaStep, StepOptions } from 'models'

type Props = {
  step: WabaStep,
  options: StepOptions,
  onOptionsChange: (options: WabaStep) => void
}

const ButtonsOptionsContent = (
  { step, options}: Props) => {
    
    return (
      <Text>{step.type === "options" ? ("Pergunta com lista de opções") : ("Pergunta com botões interativos") }</Text>
      
    )
}


export default ButtonsOptionsContent
