import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useTasksContext } from "@/context/Tasks/useTasksContext";
import { useEffect, useState } from "react";

const ALERT_EXPIRATION_TIME = 4 * 60 * 60 * 1000;
export function useTaskToast() {
  const { toast } = useToast();
  const { state } = useTasksContext();
  const { tareas } = state;
  const [notifiedTasks, setNotifiedTasks] = useState(new Set());
  const getFromLocalStorage = (key) => {
    const item = localStorage.getItem(key);
    if (item) {
      const parsedItem = JSON.parse(item);
      const now = new Date().getTime();
      if (now - parsedItem.timestamp > ALERT_EXPIRATION_TIME) {
        localStorage.removeItem(key);
        return null;
      }
      return parsedItem.value;
    }
    return null;
  };
  const handleToastClick = (taskId) => {
    localStorage.setItem(
      `alertShown_${taskId}`,
      JSON.stringify({ value: "true", timestamp: new Date().getTime() })
    );
    setNotifiedTasks((prev) => new Set(prev.add(taskId)));
  };
  useEffect(() => {
    const checkTaskDue = () => {
      const now = new Date();
      tareas.forEach((tarea) => {
        if (tarea.fecha) {
          const dueDate = new Date(tarea.fecha);
          const timeDiff = dueDate - now;
          const daysLeft = timeDiff / (1000 * 3600 * 24);
          const alertShown = getFromLocalStorage(`alertShown_${tarea.id}`);
          if (
            daysLeft > 0 &&
            daysLeft <= 1 &&
            !alertShown &&
            !notifiedTasks.has(tarea.id)
          ) {
            const hoursLeft = Math.floor(timeDiff / (1000 * 3600));
            const minutesLeft = Math.floor(
              (timeDiff % (1000 * 3600)) / (1000 * 60)
            );
            const timeLeftText =
              hoursLeft > 0
                ? `${hoursLeft} hora${
                    hoursLeft !== 1 ? "s" : ""
                  } y ${minutesLeft} minuto${minutesLeft !== 1 ? "s" : ""}`
                : `${minutesLeft} minuto${minutesLeft !== 1 ? "s" : ""}`;
            toast({
              title: `Tarea a punto de vencer: ${tarea.titulo}`,
              description: `La tarea "${tarea.titulo}" vence en ${timeLeftText}.`,
              action: (
                <ToastAction
                  altText="OK"
                  onClick={() => {
                    handleToastClick(tarea.id);
                  }}
                >
                  OK
                </ToastAction>
              ),
            });
            setNotifiedTasks((prev) => new Set([...prev, tarea.id]));
          }
        }
      });
    };
    checkTaskDue();
  }, [tareas, toast, notifiedTasks]);
  return { handleToastClick };
}
