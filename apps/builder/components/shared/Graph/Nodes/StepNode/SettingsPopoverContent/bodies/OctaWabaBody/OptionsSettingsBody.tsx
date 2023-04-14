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
import OctaButton from 'components/octaComponents/OctaButton/OctaButton'
import { Input } from 'components/shared/Textbox'
import { VariableSearchInput } from 'components/shared/VariableSearchInput/VariableSearchInput'
import { StepOptions, WabaStepContent, WabaStepOptions, OptionsWabaOptions, ButtonsWabaOptions } from 'models'
import { TextBubbleEditor } from '../../../TextBubbleEditor'
import React from 'react'

type OptionsSettingsBodyProps = {
  options: OptionsWabaOptions
  onOptionsChange: (options: OptionsWabaOptions) => void
}

export const OptionsSettingsBody = ({
  options,
  onOptionsChange,
}: OptionsSettingsBodyProps) => {
  const variableId = "ok"

  console.log(options)
  
  // const buttons = options.content

  // const handleBodyFormStateChange = (isCustomBody: boolean) =>
  // onOptionsChange({ options. })

  const handlerDefault = (e: any) => {
    // onOptionsChange({} as any)
    console.log('ex')
  }
  // const handleVariableChange = (variable?: Variable) =>
  // onOptionsChange({ ...options, variableId: variable?.id })
  // const handleVariableChange = (variable: Variable) => {
  //   onOptionsChange({
  //     ...options,
  //     property: {
  //       domain: "CHAT",
  //       name: variable.name,
  //       type: variable.type ? variable.type : "string",
  //       token: variable.token
  //     }
  //   })
  // }

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
              onClose={handlerDefault}
              initialValue={[]}
              onKeyUp={handlerDefault}
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
                onClose={handlerDefault}
                initialValue={[]}
                onKeyUp={handlerDefault}
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
              onClose={handlerDefault}
              initialValue={[]}
              onKeyUp={handlerDefault}
            />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
          {/* salvar resposta */}
        <Stack>
        <VariableSearchInput
          initialVariableId={variableId}
          onSelectVariable={handlerDefault}
        />
        </Stack>

        <Stack>
          <FormLabel mb="0" htmlFor="placeholder">
            Texto do botão
          </FormLabel>
          (
            <TextBubbleEditor
                onClose={handlerDefault}
                initialValue={[]}
                onKeyUp={handlerDefault}
              />
          )
        </Stack>

        <Stack>
          <FormLabel mb="0" htmlFor="placeholder">
            Titulo da lista
          </FormLabel>
          (
            <TextBubbleEditor
                onClose={handlerDefault}
                initialValue={[]}
                onKeyUp={handlerDefault}
              />
          )
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
              {/* <TextBubbleEditor
              onClose={handlerDefault}
              iinitialValue={options.messages.firstMessage?.content ? options.messages.firstMessage.content.richText : []}
              onKeyUp={handlerDefault}
            /> */}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* <FormLabel mb="0" htmlFor="placeholder">
          Mensagem do bot
        </FormLabel>
           (
           <TextBubbleEditor
             onClose={ButtonsOptionsContent}
             initialValue={options.content?.body ? options.content.body : ""}
             onKeyUp={handleCloseEditorBotMessage}
           />
           )
         </Stack>
         <Stack>
           <FormLabel mb="0" htmlFor="button">
             Atribuir automaticamente para:
           </FormLabel>
           <AutoAssignToSelect
             selectedUserGroup={options.assignTo || ASSIGN_TO.noOne}
             onSelect={handleDefaultAssignToChange}
           />
         </Stack>
         <Stack>
           <FormLabel mb="0" htmlFor="placeholder">
             Mensagem de conexão
           </FormLabel>
           (
           <TextBubbleEditor
             onClose={handleCloseEditorConnectionMessage}
             initialValue={options.messages.connectionSuccess?.content ? options.messages.connectionSuccess.content.richText : []}
             onKeyUp={handleCloseEditorConnectionMessage}
           />
           )
         </Stack>
         <SwitchWithLabel
           id="switch"
           label="Verificar disponibilidade dos usuários"
           initialValue={options?.isAvailable ?? false}
           onCheckChange={handleCheckAvailabilityChange}
         />
         <Stack>
           <FormLabel mb="0" htmlFor="placeholder">
             Mensagem de indisponibilidade
           </FormLabel>
           (
           <TextBubbleEditor
             onClose={handleCloseEditorUnavailability}
             initialValue={options.messages.noAgentAvailable?.content ? options.messages.noAgentAvailable.content.richText : []}
             onKeyUp={handleCloseEditorUnavailability}
           />
           )
         </Stack>
         <SwitchWithLabel
           id="switch"
           label="Redirecionar quando não houver usuários?"
           initialValue={options?.shouldRedirectNoneAvailable ?? false}
           onCheckChange={handleRedirectWhenNoneAvailable}
         /> */}
      </Stack>
  )
}
