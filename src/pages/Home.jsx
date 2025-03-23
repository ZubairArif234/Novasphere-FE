import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { Button, TextInput } from "@mantine/core";
import KanbanBoard from "../components/kanban/Board";
import CommonModal from "../components/common/CommonModal";
import { useDisclosure } from "@mantine/hooks";
import TaskForm from "../components/kanban/TaskForm";
import { useTaskStore } from "../stores/task.store";
import { debounce } from "../helper";

const Home = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const {  getAll } = useTaskStore(useShallow((state) => state));

useEffect(() => {
    getAll();
  }, []);

  const handleSearch =  debounce(async (value)=>{
    console.log(value);
    
    await getAll({search:value})
  },500)

  return (
    <div className="md:p-6">
      <div className="flex justify-between flex-wrap px-4">
      <p className="text-2xl font-medium text-slate-700">Tasks Management</p>
      <div className="flex gap-4 mt-4 md:mt-0">

      <TextInput className="w-[200px] md:w-[320px]"  onChange={(e)=>handleSearch(e.target.value)} placeholder="Search..."  size="md" variant="filled" radius={30} />
<Button onClick={open} size="md" color="cyan">Add Task</Button>
      </div>
      </div>
      <KanbanBoard/>
      <CommonModal opened={opened} close={close} content={<TaskForm close={close}/>} title={<p className="text-xl font-medium">Add new task</p>}/>
    </div>
  );
};

export default Home;
