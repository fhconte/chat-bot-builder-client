import React from 'react'
import { Text, Wrap, WrapItem, Flex, Stack } from '@chakra-ui/react'
import { OfficeHoursOptions } from 'models'
import { SourceEndpoint } from '../../../../Endpoints'
import { AutoAssignToSelect } from '.'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  step: OfficeHoursOptions
}

export const AssignToTeamContent = ({ step }: Props) => (
  <Stack
    flex={1}
    spacing={1}
    maxW="full"
    pointerEvents={isReadOnly ? 'none' : 'all'}
  >
    <Stack spacing={4}>
      <AutoAssignToSelect
        onSelect={handleDefaultOfficeHour}
        teamId={options.officeHours}
        placeholder="Opções"
        list={[{value:"nome", text:"Text"}, {value:"nome 2", text:"Text 2"}]}
      />
    </Stack>
  </Stack>
)
