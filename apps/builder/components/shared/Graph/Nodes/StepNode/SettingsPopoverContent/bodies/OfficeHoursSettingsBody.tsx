import { FormLabel, Stack } from '@chakra-ui/react'
import { SwitchWithLabel } from 'components/shared/SwitchWithLabel'
<<<<<<< HEAD
import { AutoAssignToSelect } from './AssignToTeam/AutoAssignToSelect'
import { Input } from 'components/shared/Textbox'
import { VariableSearchInput } from 'components/shared/VariableSearchInput'
import { OfficeHoursOptions, Variable, ReturnOfficeHours } from 'models'
import React from 'react'

type OfficeHoursSettingsBodyProps = {
  options: OfficeHoursOptions
  onOptionsChange: (options: OfficeHoursOptions) => void
}

export const OfficeHoursSettingsBody = ({
  options,
  onOptionsChange,
}: OfficeHoursSettingsBodyProps) => {
  const handleDefaultOfficeHour = (officeHours: string) =>
    onOptionsChange({ ...options, officeHours })
    
    
  return (
    <Stack spacing={4}>
      <AutoAssignToSelect
        onSelect={handleDefaultOfficeHour}
        teamId={options.officeHours}
        placeholder="Opções"
        list={[{value:"nome", text:"Text"}, {value:"nome 2", text:"Text 2"}]}
      />
=======
import { Input } from 'components/shared/Textbox'
import { VariableSearchInput } from 'components/shared/VariableSearchInput'
import { TextInputOptions, Variable } from 'models'
import React from 'react'

type OfficeHoursSettingsBodyProps = {
  options: TextInputOptions
  onOptionsChange: (options: TextInputOptions) => void
}

export const TextInputSettingsBody = ({
  options,
  onOptionsChange,
}: OfficeHoursSettingsBodyProps) => {
  const handlePlaceholderChange = (placeholder: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, placeholder } })
  const handleButtonLabelChange = (button: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, button } })
  const handleLongChange = (isLong: boolean) =>
    onOptionsChange({ ...options, isLong })
  const handleVariableChange = (variable?: Variable) =>
    onOptionsChange({ ...options, variableId: variable?.id })

  return (
    <Stack spacing={4}>
      <SwitchWithLabel
        id="switch"
        label="Long text?"
        initialValue={options?.isLong ?? false}
        onCheckChange={handleLongChange}
      />
      <Stack>
        <FormLabel mb="0" htmlFor="placeholder">
          Placeholder:
        </FormLabel>
        <Input
          id="placeholder"
          defaultValue={options.labels.placeholder}
          onChange={handlePlaceholderChange}
        />
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          Button label:
        </FormLabel>
        <Input
          id="button"
          defaultValue={options.labels.button}
          onChange={handleButtonLabelChange}
        />
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="variable">
          Save answer in a variable:
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options.variableId}
          onSelectVariable={handleVariableChange}
        />
      </Stack>
>>>>>>> 630c94c79baaccb14e4513e6fe7cc4b37e3de2de
    </Stack>
  )
}
