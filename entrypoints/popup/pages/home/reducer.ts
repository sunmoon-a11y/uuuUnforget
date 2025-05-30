type ActionType = {
  type: 'loading' | 'textarea' | 'pending'
  value: any
}

export interface StateType {
  loading: boolean
  pending: boolean
  textarea: string
}

const stateInit: StateType = {
  loading: false,
  pending: false,
  textarea: '',
}

const init = (): StateType => stateInit

function reducer(draft: StateType, action: ActionType) {
  switch (action.type) {
    case 'loading':
      draft.loading = action.value
      break
    case 'pending':
      draft.pending = action.value
      break
    case 'textarea':
      draft.textarea = action.value
      break
    default:
      throw new Error(`Unknown action: ${action}`)
  }
}

export { stateInit, reducer, init }
