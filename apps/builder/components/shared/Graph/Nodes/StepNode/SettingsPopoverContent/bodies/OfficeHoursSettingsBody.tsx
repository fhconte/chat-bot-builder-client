import { FormLabel, Stack } from '@chakra-ui/react'
import { SwitchWithLabel } from 'components/shared/SwitchWithLabel'
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
    </Stack>
  )
}
