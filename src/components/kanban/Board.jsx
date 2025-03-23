import React, { useEffect, useState } from "react";
import Column from "./Column";
// import AddEditTaskModal from './AddEditTaskModal';
import { DragDropContext } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import CommonModal from "../common/CommonModal";
import TaskForm from "./TaskForm";
import { useDisclosure } from "@mantine/hooks";
import DeleteTask from "./DeleteTask";
import { useTaskStore } from "../../stores/task.store";
import { useShallow } from "zustand/react/shallow";

const initialData = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "Pending",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-3", "task-4"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-5", "task-6", "task-7"],
    },
  },
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Creating a new website",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      tag: "UI Design",
      date: "2024-08-25",
      image: "assets/images/kanban/kanban-1.png",
    },
    "task-2": {
      id: "task-2",
      title: "Creating a new website",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      tag: "UI Design",
      date: "2024-08-25",
      image: "assets/images/kanban/kanban-2.png",
    },
    "task-3": {
      id: "task-3",
      title: "Creating a new website",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      tag: "UI Design",
      date: "2024-08-25",
      image: null,
    },
    "task-4": {
      id: "task-4",
      title: "Creating a new website",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      tag: "UI Design",
      date: "2024-08-25",
      image: "assets/images/kanban/kanban-2.png",
    },
    "task-5": {
      id: "task-5",
      title: "Creating a new website",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      tag: "UI Design",
      date: "2024-08-25",
      image: null,
    },
    "task-6": {
      id: "task-6",
      title: "Creating a new website",
      description: "Lorem ipsum dolor sit amet, consectetur ",
      tag: "UI Design",
      date: "2024-08-25",
      image: null,
    },
    "task-7": {
      id: "task-7",
      title: "Creating a new website",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      tag: "UI Design",
      date: "2024-08-25",
      image: "assets/images/kanban/kanban-2.png",
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const generateKanbanData = (tasksArray) => {
  const columns = {};
  const tasks = {};
  const columnOrder = [];

  tasksArray.forEach((task, index) => {
    const taskId = task?._id;
    const columnId = task.status.replace(/\s+/g, "-").toLowerCase(); // Convert status to a valid ID format

    // Create task entry
    tasks[taskId] = {
      id: taskId,
      title: task.title,
      description: task.description,
      status: task.status, // Default tag, modify if needed
      date: task.createdAt,
      dueDate: task.dueDate, // Add image handling if applicable
    };

    // Create column if not exists
    if (!columns[columnId]) {
      columns[columnId] = {
        id: columnId,
        title: task.status,
        taskIds: [],
      };
      columnOrder.push(columnId);
    }

    // Assign task to the correct column
    columns[columnId].taskIds.push(taskId);
  });

  return { columns, tasks, columnOrder };
};

const KanbanBoard = () => {
  const {update, tasks } = useTaskStore(useShallow((state) => state));

  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
    useDisclosure(false);

  const [data, setData] = useState(initialData);
  const [currentTask, setCurrentTask] = useState(null);
 

  

  useEffect(() => {
    if (tasks) {
      setData(generateKanbanData(tasks));
    }
  }, [tasks]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // If no destination, do nothing
    if (!destination) {
      return;
    }

    // If dropped in the same place, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    // Moving within the same column
    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // Moving to a different column
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(endColumn.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...endColumn,
      taskIds: endTaskIds,
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd,
      },
    });
    let status = result?.destination?.droppableId == "in-progress" ? "In Progress" : result?.destination?.droppableId == "pending" ? "Pending" : "Done"
    await update({status:status} , result?.draggableId)
    
  };

  const handleAddTask = (columnId) => {
    setCurrentTask(null);
    setCurrentColumn(columnId);
    setShowModal(true);
  };

  const handleEditTask = (taskId, columnId) => {
    const task = data.tasks[taskId];
    setCurrentTask({ ...task, columnId });
 
    open();
  };

  const handleDeleteTask = (taskId, columnId) => {
    const task = data.tasks[taskId];
    setCurrentTask({ ...task, columnId });
   
    deleteOpen();
  };

  return (
    <div className="kanban-wrapper p-4 flex justify-center">
        {tasks.length?
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex items-start gap-4" style={{ overflowX: "auto" }}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            );
          })}
        </div>
      </DragDropContext>
      :(
        <div className="my-40">
            <p className="text-3xl text-center font-medium text-slate-800">No Task Found!</p>
            <p className="text-slate-500">There is no task found based on your search</p>
            </div>
      )
        }

      <CommonModal
        opened={opened}
        close={close}
        content={<TaskForm data={currentTask} close={close} />}
        title={<p className="text-xl font-medium">Edit task</p>}
      />
      <CommonModal
        opened={deleteOpened}
        close={deleteClose}
        content={<DeleteTask data={currentTask} close={deleteClose} />}
        title={<p className="text-xl font-medium">Delete task</p>}
      />
    </div>
  );
};

export default KanbanBoard;
