import { FormLabel, Stack } from '@chakra-ui/react'
import { WhatsAppButtonsListOptions } from 'models'
import React from 'react'
import { TextBubbleEditor } from 'components/shared/Graph/Nodes/StepNode/TextBubbleEditor'

type WhatsAppButtonsListSettingsBodyProps = {
  options: WhatsAppButtonsListOptions
  onOptionsChange: (options: WhatsAppButtonsListOptions) => void
}

export const WhatsAppButtonsListSettingsBody = ({
  options,
  onOptionsChange,
}: WhatsAppButtonsListSettingsBodyProps) => {

  const handleHeaderText = (content: any) => {
    onOptionsChange({
      ...options,
      header: content,
    })
  }

  const handleBodyText = (content: any) => {
    onOptionsChange({
      ...options,
      body: content,
    })
  }

  const handleFooterText = (content: any) => {
    onOptionsChange({
      ...options,
      footer: content,
    })
  }

  return (
    <Stack spacing={4}>
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          Texto do cabeçalho
        </FormLabel>

        <TextBubbleEditor
          increment={1}
          onClose={handleHeaderText}
          initialValue={
            options.header?.content ? options.header.content.richText : []
          }
          onKeyUp={handleHeaderText}
        />
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          Texto do corpo da mensagem
        </FormLabel>

        <TextBubbleEditor
          increment={1}
          onClose={handleBodyText}
          initialValue={
            options.body?.content ? options.body.content.richText : []
          }
          onKeyUp={handleBodyText}
        />
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          Texto do rodapé
        </FormLabel>

        <TextBubbleEditor
          increment={1}
          onClose={handleFooterText}
          initialValue={
            options.footer?.content ? options.footer.content.richText : []
          }
          onKeyUp={handleFooterText}
        />
      </Stack>
    </Stack>
  )
}
