import {
  Editable,
  EditableInput,
  EditablePreview,
  SlideFade,
  Stack,
  useOutsideClick,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { Block } from 'models'
import { useGraph } from 'contexts/GraphContext'
import { useStepDnd } from 'contexts/GraphDndContext'
import { StepNodesList } from '../StepNode/StepNodesList'
import { isDefined, isNotDefined } from 'utils'
import { useTypebot } from 'contexts/TypebotContext/TypebotContext'
import { ContextMenu } from 'components/shared/ContextMenu'
import { BlockNodeContextMenu } from './BlockNodeContextMenu'
import { useDebounce } from 'use-debounce'
import { setMultipleRefs } from 'services/utils'
import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable'
import { BlockFocusToolbar } from './BlockFocusToolbar'

type Props = {
  block: Block
  blockIndex: number
}

export const BlockNode = ({ block, blockIndex }: Props) => {
  const {
    connectingIds,
    setConnectingIds,
    previewingEdge,
    blocksCoordinates,
    updateBlockCoordinates,
    isReadOnly,
    focusedBlockId,
    setFocusedBlockId,
    graphPosition,
  } = useGraph()
  const { typebot, updateBlock, deleteBlock, duplicateBlock } = useTypebot()
  const { setMouseOverBlock, mouseOverBlock } = useStepDnd()
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const isPreviewing =
    previewingEdge?.from.blockId === block.id ||
    (previewingEdge?.to.blockId === block.id &&
      isNotDefined(previewingEdge.to.stepId))
  const isStartBlock =
    isDefined(block.steps[0]) && block.steps[0].type === 'start'

  const blockCoordinates = blocksCoordinates[block.id]
  const blockRef = useRef<HTMLDivElement | null>(null)
  const [debouncedBlockPosition] = useDebounce(blockCoordinates, 100)
  useEffect(() => {
    if (!debouncedBlockPosition || isReadOnly) return
    if (
      debouncedBlockPosition?.x === block.graphCoordinates.x &&
      debouncedBlockPosition.y === block.graphCoordinates.y
    )
      return
    updateBlock(blockIndex, { graphCoordinates: debouncedBlockPosition })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedBlockPosition])

  useEffect(() => {
    setIsConnecting(
      connectingIds?.target?.blockId === block.id &&
        isNotDefined(connectingIds.target?.stepId)
    )
  }, [block.id, connectingIds])

  const handleTitleSubmit = (title: string) =>
    updateBlock(blockIndex, { title })

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleMouseEnter = () => {
    if (isReadOnly) return
    if (mouseOverBlock?.id !== block.id && !isStartBlock)
      setMouseOverBlock({ id: block.id, ref: blockRef })
    if (connectingIds)
      setConnectingIds({ ...connectingIds, target: { blockId: block.id } })
  }

  const handleMouseLeave = () => {
    if (isReadOnly) return
    setMouseOverBlock(undefined)
    if (connectingIds) setConnectingIds({ ...connectingIds, target: undefined })
  }

  const onDrag = (_: DraggableEvent, draggableData: DraggableData) => {
    const { deltaX, deltaY } = draggableData
    updateBlockCoordinates(block.id, {
      x: blockCoordinates.x + deltaX / graphPosition.scale,
      y: blockCoordinates.y + deltaY / graphPosition.scale,
    })
  }

  const onDragStart = () => {
    setFocusedBlockId(block.id)
    setIsMouseDown(true)
  }

  useOutsideClick({
    handler: () => setIsFocused(false),
    ref: blockRef,
  })

  const onDragStop = () => setIsMouseDown(false)
  return (
    <ContextMenu<HTMLDivElement>
      renderMenu={() => <BlockNodeContextMenu blockIndex={blockIndex} />}
      isDisabled={isReadOnly || isStartBlock}
    >
      {(ref, isOpened) => (
        <div onClick={() => setIsFocused(true)}>
          <DraggableCore
            enableUserSelectHack={false}
            onDrag={onDrag}
            onStart={onDragStart}
            onStop={onDragStop}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <Stack
              ref={setMultipleRefs([ref, blockRef])}
              data-testid="block"
              p="4"
              rounded="xl"
              bgColor="#ffffff"
              borderWidth="2px"
              borderColor={
                isConnecting || isOpened || isPreviewing || isFocused
                  ? 'blue.400'
                  : '#ffffff'
              }
              w="300px"
              transition="border 300ms, box-shadow 200ms"
              pos="absolute"
              style={{
                transform: `translate(${blockCoordinates?.x ?? 0}px, ${
                  blockCoordinates?.y ?? 0
                }px)`,
              }}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              cursor={isMouseDown ? 'grabbing' : 'pointer'}
              shadow="md"
              _hover={{ shadow: 'lg' }}
              zIndex={focusedBlockId === block.id ? 10 : 1}
            >
              <Editable
                defaultValue={block.title}
                onSubmit={handleTitleSubmit}
                fontWeight="semibold"
                pointerEvents={isReadOnly || isStartBlock ? 'none' : 'auto'}
              >
                <EditablePreview
                  _hover={{ bgColor: 'gray.200' }}
                  px="1"
                  userSelect={'none'}
                />
                <EditableInput
                  minW="0"
                  px="1"
                  onMouseDown={(e) => e.stopPropagation()}
                />
              </Editable>
              {typebot && (
                <StepNodesList
                  blockId={block.id}
                  steps={block.steps}
                  blockIndex={blockIndex}
                  blockRef={ref}
                  isStartBlock={isStartBlock}
                />
              )}
              {isFocused && !isStartBlock && (
                <SlideFade
                in={isFocused}
                style={{
                  position: 'absolute',
                  top: '-50px',
                  right: 0,
                }}
                unmountOnExit
              >
                <BlockFocusToolbar
                  onDuplicateClick={() => {
                    setIsFocused(false)
                    duplicateBlock(blockIndex)
                  }}
                  onDeleteClick={() => deleteBlock(blockIndex)}
                />
              </SlideFade>
              )}
            </Stack>
          </DraggableCore>
        </div>
      )}
    </ContextMenu>
  )
}
