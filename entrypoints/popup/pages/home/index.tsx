import { motion } from "framer-motion";
import Add from "@/entrypoints/popup/pages/home/Add.tsx";
import { useTodosStore } from "@/support/store/useTodos.ts";
import Updater from "@/entrypoints/popup/pages/home/Updater.tsx";
import Loading from "@/entrypoints/popup/pages/home/Loading.tsx";
import Nothing from "@/entrypoints/popup/pages/home/Nothing.tsx";
import Slogan from "@/entrypoints/popup/pages/home/Slogan.tsx";
import styled from "styled-components";
import { useState } from "react";
import List from "@/entrypoints/popup/pages/home/List.tsx";

const Display = styled.div<{ show: boolean }>`
    display: ${props => props.show ? 'block' : 'none'};
`

function Index() {
  const [showBox, setShowBox] = useState<boolean>(false)

  const { firstPending, todoList, getTodoList } = useTodosStore((state) => state)

  return (
    <Updater>
      <section className='un-forget-app-task'>
        <Display show={firstPending}><Loading/></Display>
        <Display show={!firstPending && todoList.length === 0}><Nothing/></Display>
        <Display show={todoList.length > 0}><Slogan/></Display>
        <Display show={todoList.length > 0}>
          <List/>
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
