import { useContext } from "react";
import { TaskContext } from "@/context/Tasks/TaskContext";

export const useTasksContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasksContext debe ser usado dentro de un TaskProvider");
  }
  return context;
};
