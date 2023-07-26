import { InfoIcon } from '@chakra-ui/icons'
import {
  Link,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react'
import { isDefined } from '@udecode/plate-core'
import { Component, ReactElement, useState } from 'react'

interface OctaTooltipProps {
  contentText: string
  duration?: number
  hrefUrl?: string
  contentLink?: string
  popoverColor?: string
  textColor?: string
  tooltipPlacement?: PlacementWithLogical
  element?: ReactElement
}

const OctaTooltip = ({
  contentText,
  duration = 2000,
  hrefUrl,
  contentLink,
  popoverColor = '#ffffff',
  textColor = '#000000',
  tooltipPlacement = 'bottom',
  element
}: OctaTooltipProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleMouseEnter = () => {
    onOpen()
    setTimeout(() => onClose(), duration)    
  }

  const handleMouseLeave = () => {
    onClose()
  }

  return (
    <Popover 
      isOpen={isOpen} 
      onOpen={onOpen} 
      onClose={onClose} 
      placement={tooltipPlacement}>
      {isDefined(element) &&
        <PopoverTrigger><span onMouseEnter={() => handleMouseEnter()}>{element}</span></PopoverTrigger>
      }
      {!isDefined(element) &&
        <PopoverTrigger>
          <InfoIcon
            color={'gray.300'}
            onMouseEnter={() => handleMouseEnter()}
          />
        </PopoverTrigger>
      }
      <PopoverContent color={textColor} bg={popoverColor} width="100%">
        <PopoverArrow bg={popoverColor} />
        <PopoverBody onMouseLeave={() => handleMouseLeave()} onMouseEnter={onOpen}>
          <span>{contentText}</span>
          <Link href={hrefUrl} isExternal style={{ textDecoration: "underline" }}>
            {contentLink}
          </Link>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default OctaTooltip