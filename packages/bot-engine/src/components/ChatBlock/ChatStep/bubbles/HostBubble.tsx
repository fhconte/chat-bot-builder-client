import { BubbleStep, BubbleStepType, InputStepType, MediaBubbleStep, OctaBubbleStep, OctaBubbleStepType, Step, TextBubbleStep } from 'models'
import React from 'react'
import { EmbedBubble } from './EmbedBubble'
import { ImageBubble } from './ImageBubble'
import { TextBubble } from './TextBubble'
import { VideoBubble } from './VideoBubble'

type Props = {
  step: BubbleStep | OctaBubbleStep
  onTransitionEnd: () => void
  onMiddleTransition: (fakeStep?: Step) => void
}

export const HostBubble = ({ step, onTransitionEnd, onMiddleTransition }: Props) => {
  switch (step.type) {
    case BubbleStepType.TEXT:
    case OctaBubbleStepType.END_CONVERSATION:
      return <TextBubble step={step} onTransitionEnd={onTransitionEnd} />
    case BubbleStepType.IMAGE:
      return <ImageBubble step={step} onTransitionEnd={onTransitionEnd} />
    case BubbleStepType.VIDEO:
      return <VideoBubble step={step} onTransitionEnd={onTransitionEnd} />
    case BubbleStepType.EMBED:
      return <EmbedBubble step={step} onTransitionEnd={onTransitionEnd} />
    case BubbleStepType.MEDIA: {
      if (step.content.message) {
        const { message, ...content } = step.content
        const mediaStep = { ...step, content }

        const fakeTextStep = { content: message, type: BubbleStepType.TEXT, id: mediaStep.id + '-fake' } as TextBubbleStep
        return <TextBubble step={fakeTextStep} onTransitionEnd={() => onMiddleTransition(mediaStep as MediaBubbleStep)} />
      }
      return <ImageBubble step={step} onTransitionEnd={onTransitionEnd} />
    }
  }
}
