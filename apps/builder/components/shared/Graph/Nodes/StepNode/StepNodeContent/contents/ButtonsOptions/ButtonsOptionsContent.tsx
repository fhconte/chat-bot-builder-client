import { Text } from '@chakra-ui/react'
import { WabaStep } from 'models'


type Props = {
  step: WabaStep
}

export const ButtonsOptionsContent = (
  { step }: Props) => {
    console.log('OK', step)
    
  return (
    <Text color="gray.500">Pergunta com lista de opções</Text>
  )
}


