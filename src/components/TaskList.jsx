import React from "react";
import TaskItem from "@/components/TaskItem";
import { Separator } from "@/components/ui/separator";
import { useTasksContext } from "@/context/Tasks/useTasksContext";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

const TaskList = React.memo(() => {
  const { state, dispatch } = useTasksContext();
  const { tareasFiltradas: tareas } = state;
  const handleDragEnd = (event) => {
    const { active, over } = event;
    const oldIndex = tareas.findIndex((tarea) => tarea.id === active.id);
    const newIndex = tareas.findIndex((tarea) => tarea.id === over.id);
    const newOrder = arrayMove(tareas, oldIndex, newIndex);
    dispatch({ type: "SET_TAREAS_FILTRADAS", payload: newOrder });
    dispatch({ type: "REORDENAR_TAREAS", payload: newOrder });
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tareas} strategy={verticalListSortingStrategy}>
        {tareas.map((tarea, index) => (
          <React.Fragment key={tarea.id}>
            {index > 0 && <Separator className="my-2" />}
            <TaskItem tarea={tarea} />
          </React.Fragment>
        ))}
      </SortableContext>
    </DndContext>
  );
});
TaskList.displayName = "TaskList";
export default TaskList;
