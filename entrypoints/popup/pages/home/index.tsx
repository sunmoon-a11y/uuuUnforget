import { motion } from "framer-motion";
import { Coffee } from "@/entrypoints/popup/pages/home/Coffee.tsx";
import { Complete } from "@/entrypoints/popup/pages/home/Complete.tsx";
import { Delete } from "@/entrypoints/popup/pages/home/Delete.tsx";
import Add from "@/entrypoints/popup/pages/home/Add.tsx";
import { useTodosStore } from "@/support/store/useTodos.ts";
import Updater from "@/entrypoints/popup/pages/home/Updater.tsx";
import Loading from "@/entrypoints/popup/pages/home/Loading.tsx";
import Nothing from "@/entrypoints/popup/pages/home/Nothing.tsx";
import Slogan from "@/entrypoints/popup/pages/home/Slogan.tsx";
import IndexDB from "@/support/IndexDB.ts";
import styled from "styled-components";
import { useState } from "react";

const Display = styled.div<{ show: boolean }>`
    display: ${props => props.show ? 'block' : 'none'};
`

function Index() {
  const [showBox, setShowBox] = useState<boolean>(false)

  const { pending, todoList, getTodoList } = useTodosStore((state) => state)

  const onDelete = async (key: string) => {
    const instance = IndexDB.getInstance('works')

    instance.del(key).then((r: any) => {
      if (r?.type === 'success') {
        void getTodoList()
      }
    })
  }

  const onUpdate = async (key: string) => {
    const instance = IndexDB.getInstance('works')

    instance.update(key, 1).then((r: any) => {
      if (r?.type === 'success') {
        void getTodoList()
      }
    })
  }

  return (
    <Updater>
      <section className='un-forget-app-task'>
        <Display show={pending}><Loading/></Display>
        <Display show={!pending && todoList.length === 0}><Nothing/></Display>
        <Display show={todoList.length > 0}><Slogan/></Display>
        <Display show={todoList.length > 0}>
          <div className='un-forget-app-task-wrap'>
            {
              todoList.map((item) => (
                <div key={item.key}
                     className={`un-forget-app-task-item ${item.status.toString() === '1' ? 'active' : ''}`}>
                  <div className='un-forget-app-task-item-content'>
                    <Coffee/>
                    {item.value}
                  </div>
                  <div className='un-forget-app-task-item-btn'>
                    {
                      item.status.toString() === '0' && (<Complete onClick={() => onUpdate(item.key)} stroke={'#000'}/>)
                    }
                    {
                      item.status.toString() === '1' && (<Complete/>)
                    }
                    <Delete onClick={() => onDelete(item.key)}/>
                  </div>
                </div>
              ))
            }
          </div>
        </Display>

        <motion.div
          className='un-forget-app-task-motion-div'
          initial={{ height: 0 }}
          animate={{ height: showBox ? 'auto' : 0 }}
          transition={{
            duration: 0.25,
          }}>
          <Add onShowBox={setShowBox}/>
        </motion.div>

        <motion.div
          className='un-forget-app-task-motion-div'
          initial={{ height: 'auto' }}
          animate={{ height: showBox ? 0 : 'auto' }}
          transition={{
            duration: 0.1,
          }}>
          <button className='un-forget-app-task-open' onClick={() => {
            setShowBox(true)
          }}>add something
          </button>
        </motion.div>
      </section>
    </Updater>
  );
}

export default Index;
