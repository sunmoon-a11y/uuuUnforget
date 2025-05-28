import { create } from 'zustand'
import IndexDB from "@/support/IndexDB.ts";

interface State {
  pending: boolean
  todoList: { key: string, value: string, status: string }[]
  getTodoList: () => void
}

const useTodosStore = create<State>((set) => ({
    pending: true,
    todoList: [],
    getTodoList: async () => {
      const instance = IndexDB.getInstance('works')

      const todoList = await instance.all()

      new Promise<void>(async (resolve, reject) => {
        setTimeout(() => {
          set({ todoList, pending: false })
        }, 1_000)
      })
    }
  })
)

export { useTodosStore }
