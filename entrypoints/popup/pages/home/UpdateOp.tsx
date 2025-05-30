import { Complete } from "@/entrypoints/popup/pages/home/Complete.tsx";
import { useTodosStore } from "@/support/store/useTodos.ts";
import IndexDB from "@/support/IndexDB.ts";
import { useImmerReducer } from "use-immer";
import { init, reducer, stateInit } from "@/entrypoints/popup/pages/home/reducer.ts";

function Index({ item }: { item: Record<string, any> }) {
  const { updateListItem } = useTodosStore((state) => state)

  const [state, dispatch] = useImmerReducer(reducer, stateInit, init)

  const onUpdate = async (key: string, val: string) => {
    const instance = IndexDB.getInstance('works')

    dispatch({
      type: 'pending', value: true
    })

    const isReady: any = await instance.update(key, val)

    if (isReady?.type === 'success') updateListItem(key, 'update', {
      key, value: item.value, status: val
    })

    dispatch({
      type: 'pending', value: false
    })
  }

  return (
    <>
      {
        item.status.toString() === '0' && (
          (state.pending) ? '...' :
            <Complete onClick={() => onUpdate(item.key, '1')} stroke={'#000'}/>)
      }
      {
        item.status.toString() === '1' && ((state.pending) ? '...' :
          <Complete onClick={() => onUpdate(item.key, '0')}/>)
      }
    </>
  );
}

export default Index;
