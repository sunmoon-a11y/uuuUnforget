import { Coffee } from "@/entrypoints/popup/pages/home/Coffee.tsx";
import UpdateOp from "@/entrypoints/popup/pages/home/UpdateOp.tsx";
import DeleteOp from "@/entrypoints/popup/pages/home/DeleteOp.tsx";

function Index({ item }: { item: Record<string, any> }) {
  return (
    <div className={`un-forget-app-task-item ${item.status.toString() === '1' ? 'active' : ''}`}>
      <div className='un-forget-app-task-item-content'>
        <Coffee/>
        {item.value}
      </div>
      <div className='un-forget-app-task-item-btn'>
        <UpdateOp item={item} />
        <DeleteOp item={item} />
      </div>
    </div>
  );
}

export default Index;
