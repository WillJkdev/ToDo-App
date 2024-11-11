import { useState } from "react";

const useTaskEdit = (tareas, setTareas) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const startEditing = (id, titulo) => {
    setEditingId(id);
    setEditText(titulo);
  };
  const saveEdit = () => {
    if (editingId !== null) {
      setTareas(
        tareas.map((tarea) =>
          tarea.id === editingId ? { ...tarea, titulo: editText } : tarea
        )
      );
      setEditingId(null);
      setEditText("");
    }
  };
  return {
    editingId,
    editText,
    setEditText,
    startEditing,
    saveEdit,
  };
};
export default useTaskEdit;
