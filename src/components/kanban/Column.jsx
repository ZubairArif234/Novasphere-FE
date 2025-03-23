import React from 'react';
import TaskCard from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';

const Column = ({
    column,
    tasks,
    onAddTask,
    onEditTask,
    onDeleteTask,
    onDuplicateTask,
}) => {
    return (
        <div className={`${column?.title === "In Progress" ? "bg-blue-100" : column?.title == "Pending" ? "bg-amber-100" : "bg-green-100"}`}>

        <div className="w-full kanban-item rounded-xl bg-light">
            <div className="card p-0 rounded-lg overflow-hidden shadow-none">
                <div className="card-body p-3 pb-3">
                    <div className="flex items-center justify-between px-3 py-2">
                        <h6 className="text-lg font-semibold mb-0">{column.title}</h6>
                       
                    </div>
                    <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                            <div
                                className="connectedSortable ps-3 pt-3 pe-3"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    background: snapshot.isDraggingOver ? '#e3f2fd' : 'inherit',
                                    minHeight: '100px',
                                }}
                            >
                                {tasks.map((task, index) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        index={index}
                                        onEdit={() => onEditTask(task.id, column.id)}
                                        onDelete={() => onDeleteTask(task.id, column.id)}
                                        onDuplicate={() => onDuplicateTask(task.id, column.id)}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    {/* Add Task Button */}
                    
                </div>
            </div>
        </div>
        </div>
    );
};

export default Column;