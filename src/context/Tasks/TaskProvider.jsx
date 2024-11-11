import { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { TaskContext } from "@/context/Tasks/TaskContext";
import usePersistence from "@/hooks/usePersistence";

const initialState = {
  tareas: [
    {
      id: "uuidv4-1",
      titulo: "Tarea 1",
      completada: false,
      fecha: new Date(2024, 10, 1),
      tag: "Alta",
    },
    {
      id: "uuidv4-2",
      titulo: "Tarea 2",
      completada: false,
      fecha: null,
      tag: "Media",
    },
    {
      id: "uuidv4-3",
      titulo: "Tarea 3",
      completada: false,
      fecha: new Date(2025, 0, 7),
      tag: "Baja",
    },
    {
      id: "uuidv4-4",
      titulo: "Tarea 4",
      completada: false,
      fecha: new Date(2024, 10, 12),
      tag: null,
    },
    {
      id: "uuidv4-5",
      titulo: "Tarea 5",
      completada: false,
      fecha: new Date(2024, 10, 11),
      tag: null,
    },
  ],
  filtroMode: "Todos",
  tareasFiltradas: [],
  editingId: null,
  editText: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "AGREGAR_TAREA": {
      const nuevaTarea = {
        id: uuidv4(),
        titulo: action.payload.titulo,
        completada: false,
        fecha: action.payload.fecha,
        tag: action.payload.tag,
      };
      return { ...state, tareas: [...state.tareas, nuevaTarea] };
    }
    case "BORRAR_TAREA":
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
      };
    case "ACTUALIZAR_TAREA":
      return {
        ...state,
        tareas: state.tareas.map((tarea) =>
          tarea.id === action.payload.id
            ? { ...tarea, titulo: action.payload.titulo }
            : tarea
        ),
      };
    case "TOGGLE_COMPLETADA":
      return {
        ...state,
        tareas: state.tareas.map((tarea) =>
          tarea.id === action.payload
            ? { ...tarea, completada: !tarea.completada }
            : tarea
        ),
      };
    case "SET_TAREAS_FILTRADAS":
      return { ...state, tareasFiltradas: action.payload };
    case "SET_FILTRO":
      return { ...state, filtroMode: action.payload };
    case "INICIAR_EDICION":
      return {
        ...state,
        editingId: action.payload.id,
        editText: action.payload.titulo,
      };
    case "SALVAR_EDICION":
      return {
        ...state,
        editingId: null,
        editText: "",
        tareas: state.tareas.map((tarea) =>
          tarea.id === state.editingId
            ? {
                ...tarea,
                titulo: action.payload.titulo,
                fecha: action.payload.fecha,
                tag: action.payload.tag,
              }
            : tarea
        ),
      };
    case "BORRAR_TAREAS_COMPLETADAS":
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => !tarea.completada),
      };
    case "REORDENAR_TAREAS":
      return {
        ...state,
        tareas: action.payload,
      };
    default:
      return state;
  }
};
export function TaskProvider({ children }) {
  const [tareasBD, setBDTareas, isLoading] = usePersistence(
    "tareas",
    initialState.tareas
  );
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    tareas: tareasBD,
  });
  useEffect(() => {
    setBDTareas(state.tareas);
  }, [state.tareas, setBDTareas]);
  useEffect(() => {
    if (tareasBD && tareasBD.length > 0) {
      dispatch({ type: "REORDENAR_TAREAS", payload: tareasBD });
    }
  }, [tareasBD]);
  useEffect(() => {
    const filtrarTareas = () => {
      switch (state.filtroMode) {
        case "Activos":
          return state.tareas.filter((tarea) => !tarea.completada);
        case "Completados":
          return state.tareas.filter((tarea) => tarea.completada);
        default:
          return state.tareas;
      }
    };
    dispatch({ type: "SET_TAREAS_FILTRADAS", payload: filtrarTareas() });
  }, [state.filtroMode, state.tareas]);
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
