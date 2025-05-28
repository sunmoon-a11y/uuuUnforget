import { useTodosStore } from "@/support/store/useTodos.ts";
import { ReactNode, useEffect } from "react";

function Updater({ children }: { children: ReactNode }) {
  const getTodoList = useTodosStore((state) => state.getTodoList)

  useEffect(() => {
    void getTodoList()
  }, [])

  return (
    children
  );
}

export default Updater;
