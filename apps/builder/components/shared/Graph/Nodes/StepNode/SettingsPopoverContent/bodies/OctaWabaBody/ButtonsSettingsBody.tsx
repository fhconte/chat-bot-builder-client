import { useState } from 'react'
import { 
  FormLabel, 
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'
import { Input, Textarea } from 'components/shared/Textbox'
import { VariableSearchInput } from 'components/shared/VariableSearchInput/VariableSearchInput'
import { ButtonsWabaOptions, ButtonsWabaStep, MessagesWaba, TextBubbleContent, StepOptions, WabaStepOptions, Variable } from 'models'
import { TextBubbleEditor } from '../../../TextBubbleEditor'
import { AutoAssignToSelect } from '../AssignToTeam/AutoAssignToSelect'
import { ASSIGN_TO } from 'enums/assign-to'

type ButtonsSettingsBodyProps = {
  options: ButtonsWabaStep
  onOptionsChange: (options: WabaStepOptions) => void
}

export const ButtonsSettingsBody = ({
  options,
  onOptionsChange,
}: ButtonsSettingsBodyProps) => {
  const content = options.options.content

  const handleChangeHeader = (header: TextBubbleContent) => {
    onOptionsChange(
      { 
        ...options.options,
        content:
        {
          ...options.options.content,
          header: {
            message: header,
            options: []
          }
        }
    })
  }

  const handlerTextBody = (body: TextBubbleContent) => {
    onOptionsChange(
      { 
        ...options.options,
        content:
        {
          ...options.options.content,
          body: {
            message: body,
            options: []
          }
        }
    })
  }

  const handlerTextFooter = (footer: TextBubbleContent) => {
    onOptionsChange(
      { 
        ...options.options,
        content:
        {
          ...options.options.content,
          footer: {
            message: footer,
            options: []
          }
        }
    })
  }

  const handleVariableChange = (variable: Variable) => {
    onOptionsChange(
      {
        ...options.options,
        content:
        {
          ...options.options.content,
          property: variable
        }
    })
  }

  const handleDefaultAssignToChange = (value: any ) => {
    const option = value
    onOptionsChange({ 
      ...options.options,
      content:
      {
        ...options.options.content,
        referenceProperty: option.assignType
      }
    })

    handleDefaultAssignPropertyChange(option.assignTo)
  }

  const handleDefaultAssignPropertyChange = ( reference: any) => {
    onOptionsChange({
      ...options.options,
       content:
        {
          ...options.options.content,
          referenceValue: reference
        }
    } as any )
  }

  const handlerDefault = (e: any) => {
    // onOptionsChange({} as any)
    console.log('ex', e)
  }

  const handleDescriptionChange = (description: any, index: number) =>{
    // console.log('desc')
  }
  //   onOptionsChange({
  //     ...options.options,
  //     content:
  //       {
  //         ...options.options.content.validationMessages,
  //         message: description
  //       }
  // } as any )

  // console.log('op', options)

 
  return (
    <Stack spacing={4}>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton >
                <Box as="span" flex='1' textAlign='left'>
                  Adicionar título
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            <TextBubbleEditor
              onClose={handleChangeHeader}
              initialValue={content?.header?.message ? content.header.message.richText : []}
              onKeyUp={handleChangeHeader}
            />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Stack>
          <FormLabel mb="0" htmlFor="placeholder">
            Texto da pergunta
          </FormLabel>
          (
            <TextBubbleEditor
                onClose={handlerTextBody}
                initialValue={content?.body?.message ? content.body.message.richText : [] }
                onKeyUp={handlerTextBody}
              />
          )
        </Stack>

      <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  Adicionar rodapé
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <TextBubbleEditor
              onClose={handlerTextFooter}
              initialValue={content?.footer?.message ? content.footer.message.richText : []}
              onKeyUp={handlerTextFooter}
            />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Stack>
          <VariableSearchInput
            initialVariableId={content?.property ? content.property.variableId : ''}
            onSelectVariable={handleVariableChange}
          />
        </Stack>

        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  Se o cliente não responder com nenhuma das opções:
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            <Stack spacing="4">
              {content.validationMessages.map((item, itemIndex) => (
                <Textarea
                  key={itemIndex}
                  id="description"
                  index={itemIndex}
                  defaultValue={item.message}
                  onChange={handleDescriptionChange(item.message, itemIndex)}
                  />
                ))
              }
            </Stack>
           
            <Box>
              <FormLabel mb="0" htmlFor="button">
                Se o cliente errar 3 vezes seguidas, atribuir automaticamente para:
              </FormLabel>
              <AutoAssignToSelect
                selectedUserGroup={content.referenceValue || ASSIGN_TO.noOne}
                onSelect={handleDefaultAssignToChange}
              />
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  )
}
