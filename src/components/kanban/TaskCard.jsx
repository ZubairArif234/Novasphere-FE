import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TaskCard = ({ task, index, onEdit, onDelete, onDuplicate }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className="w-[450px]  kanban-card bg-cyan-500 p-3 rounded-lg mb-3"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: 'none',
                        background: snapshot.isDragging ? '#f0f0f0' : '#ffffff',
                        ...provided.draggableProps.style,
                    }}
                >
                   
                    <h6 className="kanban-title text-lg font-semibold pt-3 mb-2">{task.title}</h6>
                    <p className="kanban-desc text-slate-500">{task.description}</p>
                   
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 pt-3">

                            
                            <p className="start-date text-slate-500">
                                Due Date : 
                                <span className='ms-2'>

                                {new Date(task.dueDate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="cursor-pointer"
                                onClick={onEdit}
                            >

<FaEdit  color='green' size={24} stroke='2'/>
                            </button>
                            <button onClick={onDelete} type="button" className="cursor-pointer">
                                <FaTrashAlt color='red' size={24} stroke='2'/>
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;