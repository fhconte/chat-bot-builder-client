import { FormLabel, Stack } from '@chakra-ui/react'
import OctaButton from 'components/octaComponents/OctaButton/OctaButton'
import { Input } from 'components/shared/Textbox'
import { VariableSearchInput } from 'components/shared/VariableSearchInput/VariableSearchInput'
import { WabaStepContent, Variable } from 'models'
import React from 'react'

type OctaWabaBodyProps = {
  options: WabaStepContent
  onOptionsChange: (options: WabaStepContent) => void
}

export const OctaWabaBody = ({
  options,
  onOptionsChange,
}: OctaWabaBodyProps) => {
  // const handleVariableChange = (variable: Variable) => {
  //   onOptionsChange({
  //     ...options,
  //     property: {
  //       domain: "CHAT",
  //       name: variable.name,
  //       type: variable.type ? variable.type : "string",
  //       token: variable.token
  //     }
  //   })
  // }

  return (
    <Stack spacing={4}>
      <Stack>
        {/* <VariableSearchInput
          initialVariableId={options.variableId}
          onSelectVariable={handleVariableChange}
        /> */}
        <text>ok </text>
      </Stack>
    </Stack>
  )
}
