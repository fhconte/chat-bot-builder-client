import { InputOptions, Variable } from 'models'
import React from 'react'
import { Stack } from '@chakra-ui/react'
import { WithVariableContent } from '../WithVariableContent'
import { useTypebot } from 'contexts/TypebotContext'
import { OctaDivider } from 'components/octaComponents/OctaDivider/OctaDivider'
import { TextHtmlContent } from '../TextHtmlContent'

type Props = {
  step: {
    type: string
    options: InputOptions
  },
  onUpdateStep: (options: InputOptions) => void
}

const InputContent = ({ step, onUpdateStep }: Props) => {
  const { typebot } = useTypebot()

  const handleVariableChange = (variable: Variable) => {
    if (variable) {
      onUpdateStep({
        ...step.options, variableId: variable?.id, property: {
          domain: "CHAT",
          name: variable.name,
          type: variable.type ? variable.type : "string",
          token: variable.token
        }
      })
    }
  }

  if (!step.options.variableId && step.options.initialVariableToken) {
    let myVariable = typebot?.variables?.find(v => v.token === step.options.initialVariableToken)
    if (myVariable) {
      step.options.variableId = myVariable.id
      handleVariableChange(myVariable)
    }
  }

  return (
    <Stack>
      <TextHtmlContent html={step?.options?.message?.html} />
      
      <OctaDivider />
      <WithVariableContent variableId={step.options?.variableId} property={step.options?.property} />
    </Stack>
  )
}

export default InputContent