import IndexDB from "@/support/IndexDB.ts";
import { mockGenerateUUID } from "@/support/helper.ts";
import { init, reducer, stateInit } from './reducer'
import { useImmerReducer } from "use-immer";
import { useTodosStore } from "@/support/store/useTodos.ts";

function Add({ onShowBox }: { onShowBox: (v: boolean) => void }) {
  const { updateListItem } = useTodosStore((state) => state)

  const [state, dispatch] = useImmerReducer(reducer, stateInit, init)

  const onAdd = async () => {
    dispatch({ type: 'loading', value: true })

    const instance = IndexDB.getInstance('works')
    const uuid = mockGenerateUUID()

    const isReady: any = await instance.add(uuid, state.textarea)

    if (isReady?.type === 'success') {
      updateListItem(uuid, 'add', {
        key: uuid, value: state.textarea, status: '0'
      })

      dispatch({ type: 'textarea', value: '' })

      browser.runtime.sendMessage({ value: state.textarea, uuid, status: 'ok', type: 'add_new_task' })
    }

    dispatch({ type: 'loading', value: false })
  }

  return (
    <section className='un-forget-app-task add'>
      <textarea rows={10} placeholder='Add what you want to do' value={state.textarea} onChange={(e) => {
        dispatch({ type: 'textarea', value: e.target.value })
      }}/>
      <div className='un-forget-app-task-add-btn'>
        <button disabled={!state.textarea || state.loading} onClick={onAdd}>OK
        </button>
        <button onClick={() => {
          onShowBox(false)
        }}>back
        </button>
      </div>
    </section>
  );
}

export default Add;
