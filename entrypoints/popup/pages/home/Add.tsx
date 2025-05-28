import IndexDB from "@/support/IndexDB.ts";
import { mockGenerateUUID } from "@/support/helper.ts";
import { init, reducer, stateInit } from './reducer'
import { useImmerReducer } from "use-immer";
import { useTodosStore } from "@/support/store/useTodos.ts";

function Add({ onShowBox }: { onShowBox: (v: boolean) => void }) {

  const [state, dispatch] = useImmerReducer(reducer, stateInit, init)

  const { getTodoList } = useTodosStore((state) => state)

  return (
    <section className='un-forget-app-task add'>
      <textarea rows={10} placeholder='Add what you want to do' value={state.textarea} onChange={(e) => {
        dispatch({ type: 'textarea', value: e.target.value })
      }}/>
      <div className='un-forget-app-task-add-btn'>
        <button disabled={!state.textarea || state.loading} onClick={() => {
          dispatch({ type: 'loading', value: true })

          const instance = IndexDB.getInstance('works')
          const uuid = mockGenerateUUID()

          instance.add(uuid, state.textarea).then((r: any) => {
            if (r?.type === 'success') {
              dispatch({ type: 'textarea', value: '' })
              void getTodoList()
            }
          })

          dispatch({ type: 'loading', value: false })
        }}>OK
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
