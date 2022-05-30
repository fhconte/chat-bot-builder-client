import { Select } from '@chakra-ui/react'
import { ValueTarget } from 'framer-motion'
import React, { ChangeEvent } from 'react'

type Props = {
  teamId?: string
  onSelect: (teamId: string) => void
  placeholder?: string
  list?: Array<ValueText>
}

type ValueText = {
  value?: string
  text?: string
}

export const AutoAssignToSelect = ({ teamId, onSelect, placeholder, list }: Props) => {
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value)
  }
  return (
    <Select
      placeholder={placeholder}
      value={teamId}
      onChange={handleOnChange}
    >
      {list?.map(listItem => (
        <option key={listItem.value}> {listItem.text} </option>
      ) )}
    </Select>
  )
}
