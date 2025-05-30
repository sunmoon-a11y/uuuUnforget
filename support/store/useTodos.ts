import { create } from 'zustand'
import IndexDB from "@/support/IndexDB.ts";

interface State {
  firstPending: boolean
  todoList: { key: string, value: string, status: string }[]
  getTodoList: () => void
  updateListItem: (key: string, op: 'add' | 'delete' | 'update', item?: { key: string, value: string, status: string }) => void
}

const useTodosStore = create<State>((set, get) => ({
    firstPending: true,
    todoList: [],
    getTodoList: async () => {
      const instance = IndexDB.getInstance('works')

      const todoList = await instance.all()

      new Promise<void>(async (resolve, reject) => {
        setTimeout(() => {
          set({ todoList, firstPending: false })
        }, 1_000)
      })
    },
    updateListItem: (key: string, op: 'add' | 'delete' | 'update', item?: {
      key: string,
      value: string,
      status: string
    }) => {
      const todoList = get().todoList
      const index = todoList.findIndex(({ key: _key }) => key === _key)

      if (op === 'add') {
        todoList.unshift(item!)
      }
      if (op === 'delete') {
        todoList.splice(index, 1)
      }
      if (op === 'update') {
        todoList.splice(index, 1, item!)
      }

      set({ todoList })
    }
  })
)

export { useTodosStore }
