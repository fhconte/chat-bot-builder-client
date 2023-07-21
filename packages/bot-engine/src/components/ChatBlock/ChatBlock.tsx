import React, { useEffect, useRef, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { AvatarSideContainer } from './AvatarSideContainer'
import { LinkedTypebot, useTypebot } from '../../contexts/TypebotContext'
import {
  isBubbleStep,
  isBubbleStepType,
  isChoiceInput,
  isDefined,
  isInputStep,
  isIntegrationStep,
  isLogicStep,
  isOctaBubbleStepType,
} from 'utils'
// import { executeLogic } from 'services/logic'
// import { executeIntegration } from 'services/integration'
import { parseRetryStep, stepCanBeRetried } from 'services/inputs'
import { parseVariables } from '../../services/variable'
import { useAnswers } from 'contexts/AnswersContext'
import {
  BubbleStep,
  BubbleStepType,
  EndConversationStep,
  InputOptions,
  InputStep,
  LogicStepType,
  OctaBubbleStepType,
  PublicTypebot,
  Step,
  StepWithOptions,
  TextBubbleStep,
} from 'models'
import { HostBubble } from './ChatStep/bubbles/HostBubble'
import { InputChatStep } from './ChatStep/InputChatStep'
import { getLastChatStepType } from '../../services/chat'

type ChatBlockProps = {
  steps: Step[]
  startStepIndex: number
  blockTitle: string
  keepShowingHostAvatar: boolean
  onScroll: () => void
  onBlockEnd: (
    edgeId?: string,
    updatedTypebot?: PublicTypebot | LinkedTypebot
  ) => void
}

type ChatDisplayChunk = { bubbles: BubbleStep[]; input?: InputStep }

export const ChatBlock = ({
  steps,
  startStepIndex,
  blockTitle,
  onScroll,
  onBlockEnd,
  keepShowingHostAvatar,
}: ChatBlockProps) => {
  const {
    currentTypebotId,
    typebot,
    updateVariableValue,
    createEdge,
    apiHost,
    isPreview,
    onNewLog,
    injectLinkedTypebot,
    linkedTypebots,
    setCurrentTypebotId,
    pushEdgeIdInLinkedTypebotQueue,
  } = useTypebot()
  const { resultValues, updateVariables, resultId } = useAnswers()
  const [processedSteps, setProcessedSteps] = useState<Step[]>([])
  const [displayedChunks, setDisplayedChunks] = useState<ChatDisplayChunk[]>([])
  const [usedSteps, setUsedSteps] = useState<Step[]>([])
  const [isAsking, setIsAsking] = useState<boolean>(false)
  const [conversationEnded, setConversationEnded] = useState<boolean>(false)

  const insertStepInStack = (nextStep: Step, isFakeStep = false) => {
    if (conversationEnded) return

    console.log('insertStepInStack', { nextStep, isFakeStep })

    setUsedSteps([...usedSteps, nextStep])

    if (nextStep.type === OctaBubbleStepType.END_CONVERSATION) {
      const fakeTextStep = { ...nextStep, type: BubbleStepType.TEXT, id: nextStep.id + '-fake' } as TextBubbleStep
      insertStepInStack(fakeTextStep, true)
      setConversationEnded(true)
    }

    //if (!isFakeStep) setProcessedSteps([...processedSteps, nextStep])

    //if (isBubbleStep(nextStep)) {
      // const lastStepType = getLastChatStepType(processedSteps)
      // !isFakeStep && lastStepType && (isBubbleStepType(lastStepType))
      //   ? setDisplayedChunks(
      //     displayedChunks.map((c, idx) =>
      //       idx === displayedChunks.length - 1
      //         ? { bubbles: [...c.bubbles, nextStep] }
      //         : c
      //     )
      //   )
      //   :
      //   setDisplayedChunks([...displayedChunks, { bubbles: [nextStep] }])
    //}
    if (isInputStep(nextStep)) {
      setIsAsking(true)
      // displayedChunks.length === 0 ||
      //   isDefined(displayedChunks[displayedChunks.length - 1].input)
      //   ? setDisplayedChunks([
      //     ...displayedChunks,
      //     { bubbles: [], input: nextStep },
      //   ])
      //   : setDisplayedChunks(
      //     displayedChunks.map((c, idx) =>
      //       idx === displayedChunks.length - 1 ? { ...c, input: nextStep } : c
      //     )
      //   )
    }
  }

  useEffect(() => {
    const nextStep = steps[startStepIndex]
    if (nextStep) insertStepInStack(nextStep)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   onScroll()
  //   onNewStepDisplayed()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [processedSteps])

  // const onNewStepDisplayed = async () => {
  //   const currentStep = [...processedSteps].pop()
  //   if (!currentStep) return
  //   // if (isLogicStep(currentStep)) {
  //   //   const { nextEdgeId, linkedTypebot } = await executeLogic(currentStep, {
  //   //     isPreview,
  //   //     apiHost,
  //   //     typebot,
  //   //     linkedTypebots,
  //   //     updateVariableValue,
  //   //     updateVariables,
  //   //     injectLinkedTypebot,
  //   //     onNewLog,
  //   //     createEdge,
  //   //     setCurrentTypebotId,
  //   //     pushEdgeIdInLinkedTypebotQueue,
  //   //     currentTypebotId,
  //   //   })
  //   //   const isRedirecting =
  //   //     currentStep.type === LogicStepType.REDIRECT &&
  //   //     currentStep.options.isNewTab === false
  //   //   if (isRedirecting) return
  //   //   nextEdgeId ? onBlockEnd(nextEdgeId, linkedTypebot) : displayNextStep()
  //   // }
  //   // if (isIntegrationStep(currentStep)) {
  //   //   const nextEdgeId = await executeIntegration({
  //   //     step: currentStep,
  //   //     context: {
  //   //       apiHost,
  //   //       typebotId: currentTypebotId,
  //   //       blockId: currentStep.blockId,
  //   //       stepId: currentStep.id,
  //   //       variables: typebot.variables,
  //   //       isPreview,
  //   //       updateVariableValue,
  //   //       updateVariables,
  //   //       resultValues,
  //   //       blocks: typebot.blocks,
  //   //       onNewLog,
  //   //       resultId,
  //   //     },
  //   //   })
  //   //   nextEdgeId ? onBlockEnd(nextEdgeId) : displayNextStep()
  //   // }
  //   if (currentStep.type === 'start') onBlockEnd(currentStep.outgoingEdgeId)
  // }

  const displayNextStep = (answerContent?: string, isRetry?: boolean, fakeStep?: Step) => {
    onScroll()
    if (fakeStep) {
      insertStepInStack(fakeStep, true)
      return
    }
    
    const currentStep = [...usedSteps].pop()
    if (currentStep) {
      if (isRetry && stepCanBeRetried(currentStep))
        return insertStepInStack(
          parseRetryStep(currentStep, typebot.variables, createEdge)
        )
      if (
        isInputStep(currentStep) &&
        answerContent
      ) {
        if (currentStep.options?.variableId)
          updateVariableValue(currentStep.options.variableId, answerContent)

        setIsAsking(false)
      }

      // const isSingleChoiceStep =
      //   isChoiceInput(currentStep) && !currentStep.options.isMultipleChoice
      // if (isSingleChoiceStep) {
      //   const nextEdgeId = currentStep.items.find(
      //     (i) => i.content === answerContent
      //   )?.outgoingEdgeId
      //   if (nextEdgeId) return onBlockEnd(nextEdgeId)
      // }

      if (currentStep?.outgoingEdgeId || usedSteps.length === steps.length)
        return onBlockEnd(currentStep.outgoingEdgeId)
    }
    //console.log('displayNextStep', { nextStep})
    const nextStep = steps[usedSteps.length + startStepIndex]
    console.log('displayNextStep', { nextStep })
    nextStep ? insertStepInStack(nextStep) : onBlockEnd()
  }

  const avatarSrc = typebot.theme.chat.hostAvatar?.url

  return (
    <div className="flex w-full" data-block-name={blockTitle}>
      <div className="flex flex-col w-full min-w-0">
        {/* {displayedChunks.map((chunk, idx) => ( */}
          <ChatChunks
            usedSteps={usedSteps}
            key={0}
            //displayChunk={chunk}
            hostAvatar={{
              isEnabled: typebot.theme.chat.hostAvatar?.isEnabled ?? true,
              src: avatarSrc && parseVariables(typebot.variables)(avatarSrc),
            }}
            hasGuestAvatar={typebot.theme.chat.guestAvatar?.isEnabled ?? false}
            onDisplayNextStep={displayNextStep}
            keepShowingHostAvatar={keepShowingHostAvatar}
          />
        {/* ))} */}

        {conversationEnded && <span>Conversa finalizada</span>}
      </div>
    </div>
  )
}

type Props = {
  displayChunk?: ChatDisplayChunk
  usedSteps: Step[]
  hostAvatar: { isEnabled: boolean; src?: string }
  hasGuestAvatar: boolean
  keepShowingHostAvatar: boolean
  onDisplayNextStep: (answerContent?: string, isRetry?: boolean, fakeStep?: Step) => void
}
const ChatChunks = ({
  //displayChunk: { bubbles, input },
  usedSteps,
  hostAvatar,
  hasGuestAvatar,
  keepShowingHostAvatar,
  onDisplayNextStep
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const avatarSideContainerRef = useRef<any>()

  useEffect(() => {
    refreshTopOffset()
  })

  useEffect(() => {

  }, [usedSteps])

  const refreshTopOffset = () =>
    avatarSideContainerRef.current?.refreshTopOffset()

  const bubbles = usedSteps.filter(u => isBubbleStep(u)) as BubbleStep[]
  const input = undefined

  return (
    <>
      <div className="flex">
        {hostAvatar.isEnabled && bubbles.length > 0 && (
          <AvatarSideContainer
            ref={avatarSideContainerRef}
            hostAvatarSrc={hostAvatar.src}
            keepShowing={keepShowingHostAvatar || isDefined(input)}
          />
        )}
        <div
          className="flex-1"
          style={{ marginRight: hasGuestAvatar ? '50px' : '0.5rem' }}
        >
          <TransitionGroup>
            {bubbles.map((step) => (
              <CSSTransition
                key={step.id}
                classNames="bubble"
                timeout={500}
                unmountOnExit
              >
                <HostBubble
                  step={step}
                  onTransitionEnd={() => {
                    onDisplayNextStep()
                    refreshTopOffset()
                  }}
                  onMiddleTransition={(fakeStep?: Step) => {
                    onDisplayNextStep(undefined, undefined, fakeStep)
                    refreshTopOffset()
                  }}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>

      {input && <ChatInputChunk input={input} hasAvatar={hostAvatar.isEnabled} hasGuestAvatar={hasGuestAvatar} onDisplayNextStep={onDisplayNextStep} refreshTopOffset={refreshTopOffset} />}
    </>
  )
}

type ChatInputChunkProps = {
  input: InputStep
  hasAvatar: boolean
  hasGuestAvatar: boolean
  onDisplayNextStep: (answerContent?: string, isRetry?: boolean, fakeStep?: Step) => void
  refreshTopOffset: () => void
}

const ChatInputChunk = ({
  input,
  hasAvatar,
  hasGuestAvatar,
  onDisplayNextStep,
  refreshTopOffset
}: ChatInputChunkProps) => {
  const resolveBubble = (step: InputStep) => {
    const inputOptions = step?.options as InputOptions
    if (inputOptions.message) {
      const { message } = inputOptions
      const fakeTextStep = { content: message, type: BubbleStepType.TEXT, id: step.id + '-fake' } as TextBubbleStep
      return fakeTextStep
    }
  }

  const bubble = resolveBubble(input)

  return (
    <TransitionGroup>
      {bubble && <CSSTransition
        key={bubble.id}
        classNames="bubble"
        timeout={500}
        unmountOnExit
      >
        <HostBubble
          step={bubble}
          onTransitionEnd={() => {
            onDisplayNextStep()
            refreshTopOffset()
          }}
          onMiddleTransition={(fakeStep?: Step) => {
            onDisplayNextStep(undefined, undefined, fakeStep)
            refreshTopOffset()
          }}
        />
      </CSSTransition>
      }

      <CSSTransition
        classNames="bubble"
        timeout={500}
        unmountOnExit
        in={isDefined(input)}
      >
        {input && (
          <InputChatStep
            step={input}
            onTransitionEnd={(answerContent, isRetry) => onDisplayNextStep(answerContent, isRetry)}
            hasAvatar={hasAvatar}
            hasGuestAvatar={hasGuestAvatar}
          />
        )}
      </CSSTransition>

    </TransitionGroup>
  )
}