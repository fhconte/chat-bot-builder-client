import { Flex } from '@chakra-ui/layout'
import { Seo } from 'components/Seo'
//import hash from 'object-hash'
import {
  EditorContext,
  RightPanel as RightPanelEnum,
  useEditor,
} from 'contexts/EditorContext'
import { useEffect, useRef, useState } from 'react'
import { KBar } from 'components/shared/KBar'
import { BoardMenuButton } from 'components/editor/BoardMenuButton'
import { PreviewDrawer } from 'components/editor/preview/PreviewDrawer'
import { StepsSideBar } from 'components/editor/StepsSideBar'
import { Graph } from 'components/shared/Graph'
import { GraphProvider } from 'contexts/GraphContext'
import { GraphDndContext } from 'contexts/GraphDndContext'
import { useTypebot } from 'contexts/TypebotContext'
import { GettingStartedModal } from 'components/editor/GettingStartedModal'

function TypebotEditPage() {
  const { typebot, isReadOnly, save } = useTypebot()

  const [typebotInitialUpdatedAt, setTypebotInitialUpdatedAt] =
    useState<any>(null)
  const updatedTypebot = useRef(false)

  useEffect(() => {
    window.addEventListener('message', handleEventListeners)

    return () => window.removeEventListener('message', handleEventListeners)
  }, [])

  useEffect(() => {
    if (updatedTypebot.current) return

    if (typebot && !typebotInitialUpdatedAt) {
      setTypebotInitialUpdatedAt(typebot.updatedAt)
    } else if (typebot && typebot.updatedAt !== typebotInitialUpdatedAt) {
      updatedTypebot.current = true
    }
  }, [typebot])

  const handleEventListeners = (e: any): void => {
    if (e.data === 'backClick') {
      if (updatedTypebot.current) {
        const botEditedMessage = Object.assign({
          name: 'botEditedCannotSave',
        })

        window.parent.postMessage(botEditedMessage, '*')
      } else {
        const canGoBack = Object.assign({
          name: 'canGoBack',
        })

        window.parent.postMessage(canGoBack, '*')
      }
    }
    if (e.data === 'saveClick') {
      save().then((res) => {
        if (res.saved) {
          updatedTypebot.current = false
          setTypebotInitialUpdatedAt(res.updatedAt)

          const data = Object.assign({
            name: 'successSave',
          })

          window.parent.postMessage(data, '*')
        } else {
          const data = Object.assign({
            name: 'failedToSave',
          })

          window.parent.postMessage(data, '*')
        }
      })
    }
  }

  return !typebot ? (
    <></>
  ) : (
    <>
      <EditorContext>
        <Seo title="Editor" />
        <KBar />
        <Flex overflow="clip" h="100vh" flexDir="column" id="editor-container">
          <GettingStartedModal />
          <Flex
            flex="1"
            pos="relative"
            h="full"
            background="#f4f5f8"
            backgroundImage="radial-gradient(#c6d0e1 1px, transparent 0)"
            backgroundSize="40px 40px"
            backgroundPosition="-19px -19px"
          >
            <GraphDndContext>
              <StepsSideBar />
              <GraphProvider
                blocks={typebot?.blocks ?? []}
                isReadOnly={isReadOnly}
              >
                {typebot && <Graph flex="1" typebot={typebot} />}
                <BoardMenuButton pos="absolute" right="40px" top="20px" />
                <RightPanel />
              </GraphProvider>
            </GraphDndContext>
          </Flex>
        </Flex>
      </EditorContext>
    </>
  )
}

const RightPanel = () => {
  const { rightPanel } = useEditor()
  return rightPanel === RightPanelEnum.PREVIEW ? <PreviewDrawer /> : <></>
}

export default TypebotEditPage
