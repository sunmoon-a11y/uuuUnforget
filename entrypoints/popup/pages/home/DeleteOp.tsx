import { Delete } from "@/entrypoints/popup/pages/home/Delete.tsx";
import { useTodosStore } from "@/support/store/useTodos.ts";
import IndexDB from "@/support/IndexDB.ts";
import { useImmerReducer } from "use-immer";
import { init, reducer, stateInit } from "@/entrypoints/popup/pages/home/reducer.ts";

function Index({ item }: { item: Record<string, any> }) {
  const { updateListItem } = useTodosStore((state) => state)

  const [state, dispatch] = useImmerReducer(reducer, stateInit, init)

  const onDelete = async (key: string) => {
    const instance = IndexDB.getInstance('works')

    dispatch({
      type: 'pending', value: true
    })

    const isReady: any = await instance.del(key)

    if (isReady?.type === 'success') updateListItem(key, 'delete')

    dispatch({
      type: 'pending', value: false
    })
  }

  return (
    <>
      {(state.pending) ? '...' :
        <Delete onClick={() => onDelete(item.key)}/>}
    </>
  );
}

export default Index;
