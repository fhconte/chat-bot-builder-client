import {
  EditablePreview,
  EditableInput,
  Editable,
  Fade,
  IconButton,
  Flex,
} from '@chakra-ui/react'
import { useTypebot } from 'contexts/TypebotContext'
import { PlusIcon } from 'assets/icons'
import { ButtonItem, Item, ItemIndices, ItemType, WhatsAppOptionsListStep } from 'models'
import React, { useEffect, useRef, useState } from 'react'
import { isNotDefined } from 'utils'

type Props = {
  item: Item
  step: WhatsAppOptionsListStep
  indices: ItemIndices
  isMouseOver: boolean
}

export const WhatsAppOptionsNodeContent = ({
  item,
  step,
  indices,
  isMouseOver,
}: Props) => {
  const { deleteItem, updateItem, createItem, updateStep } = useTypebot()
  const [initialContent] = useState(item.content ?? '')
  const [itemValue, setItemValue] = useState(
    item.content ?? 'Clique para editar'
  )
  const editableRef = useRef<HTMLDivElement | null>(null)
  // console.log('whats step', step)
  // console.log('whats item', item)
  useEffect(() => {
    if (itemValue !== item.content)
      setItemValue(item.content ?? 'Clique para editar')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  useEffect(() => {
    const { items } = step
    const listItems = items?.map((item) => ({
      description: '',
      id: item.id,
      label: item.content?.toString(),
      selected: true,
      value: item.content?.toString(),
    }))

    console.group('useEffect step.items')
    console.log('step', structuredClone(step))
    console.log('itemValue', itemValue)
    console.log('items', items)
    const updates: Partial<WhatsAppOptionsListStep> = {
      options: { ...step.options, listItems },
    }

    updateStep(indices, { ...step, ...updates })

    setTimeout(() => console.log('step after', structuredClone(step)), 1000)
    console.groupEnd()
  }, [step.items, itemValue])

  const handleInputSubmit = () => {
    console.log('handleInputSubmit', indices)
    if (itemValue === '') deleteItem(indices)
    else
      updateItem(indices, { content: itemValue === '' ? undefined : itemValue })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && itemValue === 'Clique para editar')
      deleteItem(indices)
    if (e.key === 'Enter' && itemValue !== '' && initialContent === '')
      handlePlusClick()
  }

  const handlePlusClick = () => {
    const itemIndex = indices.itemIndex + 1
    createItem(
      { stepId: item.stepId, type: ItemType.WHATSAPP_OPTIONS_LIST as ItemType.BUTTON},
      { ...indices, itemIndex }
    )
  }

  return (
    <Flex px={4} py={2} justify="center" w="90%" pos="relative">
      <Editable
        ref={editableRef}
        flex="1"
        startWithEditView={isNotDefined(item.content)}
        value={itemValue}
        onChange={setItemValue}
        onSubmit={handleInputSubmit}
        onKeyDownCapture={handleKeyPress}
        maxW="180px"
      >
        <EditablePreview
          w="full"
          color={item.content !== 'Clique para editar' ? 'inherit' : 'gray.500'}
          cursor="pointer"
        />
        <EditableInput />
      </Editable>
      <Fade
        in={isMouseOver}
        style={{
          position: 'absolute',
          bottom: '-15px',
          zIndex: 3,
          left: '90px',
        }}
        unmountOnExit
      >
        <IconButton
          aria-label="Add item"
          icon={<PlusIcon />}
          size="xs"
          shadow="md"
          colorScheme="gray"
          onClick={handlePlusClick}
        />
      </Fade>
    </Flex>
  )
}