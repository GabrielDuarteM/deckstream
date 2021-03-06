import React from 'react'
import styled from 'styled-components/macro'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core'
import Select from '../Select'
import { TYPES } from '../../constants'

const MainFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin-bottom: 8px;
`

const AdditionalFields = styled.div`
  display: grid;
  grid-template: ${({ columns = 1 }) => `1fr / repeat(${columns}, 1fr)`};
  grid-gap: 8px;
  margin-top: 8px;
`

const DROPDOWN_TYPES = {
  [TYPES['OBS:CHANGE_SCENE']]: {
    value: TYPES['OBS:CHANGE_SCENE'],
    text: 'OBS: Change scene',
  },
  // [TYPES['OBS:TOGGLE_MIC_MUTE']]: {
  //   value: TYPES['OBS:TOGGLE_MIC_MUTE'],
  //   text: 'OBS: Toggle microphone mute',
  // },
  [TYPES.PRESS]: {
    value: TYPES.PRESS,
    text: 'Press',
  },
  [TYPES.FOLDER]: {
    value: TYPES.FOLDER,
    text: 'Folder',
  },
  // [TYPES.TEXT]: {
  //   value: TYPES.TEXT,
  //   text: 'Text',
  // },
}

const getAdditionalFieldsByType = (state) => {
  switch (state.type) {
    case DROPDOWN_TYPES['OBS:CHANGE_SCENE'].value:
      return {
        columns: 1,
        fields: [
          <Select
            id="action-scene"
            key="scene"
            label="Scene"
            value={state.scene}
            onChange={state.setScene}
            items={
              state.scenes &&
              state.scenes.map((item) => ({
                value: item.name,
                text: item.name,
              }))
            }
          />,
        ],
      }

    case DROPDOWN_TYPES.PRESS.value:
      return {
        columns: 2,
        fields: [
          <TextField
            id="action-key"
            key="key"
            label="Key"
            value={state.extras.key}
            onChange={(evt) => state.setKey(evt.target.value)}
          />,
          <Select
            id="action-modifiers"
            key="modifiers"
            label="Modifiers"
            multiple
            value={state.extras.modifier}
            onChange={state.setModifier}
            items={[
              { value: 'control', text: 'Ctrl' },
              { value: 'alt', text: 'Option' },
              { value: 'command', text: 'Command' },
              { value: 'shift', text: 'Shift' },
            ]}
          />,
        ],
      }

    case TYPES.FOLDER:
    case '':
    case undefined:
    case null:
      return {
        columns: 0,
        fields: [],
      }

    default:
      throw new Error(`Unknown type ${state.type}`)
  }
}

const MacroDetails = (props) => {
  const { name, type, setType, setName, open, onSave, onClose } = props
  const types = Object.values(DROPDOWN_TYPES)

  const additionalFields = getAdditionalFieldsByType(props)

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Action</DialogTitle>
      <DialogContent>
        <MainFields>
          <TextField
            id="action-name"
            label="Name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <Select
            id="action-type"
            label="Type"
            value={type}
            onChange={setType}
            items={types}
          />
        </MainFields>
        <AdditionalFields columns={additionalFields.columns}>
          {additionalFields.fields}
        </AdditionalFields>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" autoFocus onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MacroDetails
