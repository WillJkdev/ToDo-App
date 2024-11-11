import { useState, useCallback } from "react";

export function useTaskInput(dispatch) {
  const [newtask, setNewtask] = useState("");
  const [date, setDate] = useState(null);
  const [tag, setTag] = useState(null);
  const onDateChange = (newDate) => {
    setDate(newDate);
  };
  const handleTagChange = useCallback((newTag) => {
    setTag(newTag);
  }, []);
  const handleInsertarTarea = useCallback(() => {
    if (newtask.trim() !== "") {
      dispatch({
        type: "AGREGAR_TAREA",
        payload: { titulo: newtask, fecha: date, tag: tag },
      });
      setNewtask("");
    }
  }, [newtask, dispatch, setNewtask, date, tag]);
  return {
    newtask,
    setNewtask,
    handleInsertarTarea,
    onDateChange,
    handleTagChange,
  };
}
