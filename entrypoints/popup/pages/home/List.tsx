import { useTodosStore } from "@/support/store/useTodos.ts";
import ListItem from "@/entrypoints/popup/pages/home/ListItem.tsx";

function Index() {
  const { todoList, getTodoList } = useTodosStore((state) => state)

  return (
    <div className='un-forget-app-task-wrap'>
      {
        todoList.map((item) => (
          <ListItem key={item.key} item={item}/>
        ))
      }
    </div>
  );
}

export default Index;
