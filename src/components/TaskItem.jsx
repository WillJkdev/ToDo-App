import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { CalendarPicker } from "@/components/CalendarPicker";
import { Tags } from "@/components/Tags";
import { DateIcon } from "@/components/DateIcon";
import { Trash2, Edit2, GripVertical } from "lucide-react";
import { useTasksContext } from "@/context/Tasks/useTasksContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TagIcon } from "@/components/TagIcon";
const TaskItem = ({ tarea }) => {
  const { id, titulo, completada, fecha, tag } = tarea;
  const { state, dispatch } = useTasksContext();
  const { editingId, editText } = state;
  const [tempDate, setTempDate] = useState(fecha);
  const [tempTag, setTempTag] = useState(tag);
  const saveEdit = (nuevoTitulo) => {
    dispatch({
      type: "SALVAR_EDICION",
      payload: { titulo: nuevoTitulo, fecha: tempDate, tag: tempTag },
    });
  };
  const handleSetCompletada = (id) => {
    dispatch({ type: "TOGGLE_COMPLETADA", payload: id });
  };
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const labelRef = useRef(null);
  const checkIfTruncated = () => {
    if (labelRef.current) {
      const isTruncated =
        labelRef.current.scrollWidth > labelRef.current.offsetWidth;
      setTooltipVisible(isTruncated);
    }
  };
  useEffect(() => {
    checkIfTruncated();
  }, [titulo]);
  return (
    <TooltipProvider>
      <div
        style={style}
        ref={setNodeRef}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-2 flex-grow p-1">
          <Checkbox
            id={`tarea-${id}`}
            checked={completada}
            onCheckedChange={() => handleSetCompletada(id)}
            aria-label={
              completada
                ? "Marcar tarea como incompleta"
                : "Marcar tarea como completa"
            }
          />
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical
              className="h-4 w-4 text-gray-600"
              aria-label="Arrastrar tarea"
            />
          </div>
          {editingId === id ? (
            <>
              <Input
                value={editText}
                onChange={(e) =>
                  dispatch({
                    type: "INICIAR_EDICION",
                    payload: { id, titulo: e.target.value },
                  })
                }
                onBlur={() => saveEdit(editText)}
                onKeyPress={(e) => e.key === "Enter" && saveEdit(editText)}
                className="flex-grow"
                aria-label="Editar tarea"
              />
              <CalendarPicker
                initialDate={tempDate}
                onDateChange={(newDate) => setTempDate(newDate)}
              />
              <Tags
                initialTag={tempTag}
                onTagChange={(newTag) => setTempTag(newTag)}
              />
            </>
          ) : (
            <Tooltip visible={isTooltipVisible} delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="cursor-default">
                  <label
                    ref={labelRef}
                    className={`text-sm font-medium leading-none truncate cursor-default inline-block max-w-24 md:max-w-48 ${
                      completada ? "line-through text-muted-foreground" : ""
                    }`}
                    aria-label={`Tarea: ${titulo}`}
                  >
                    {titulo}
                  </label>
                </span>
              </TooltipTrigger>
              {isTooltipVisible && (
                <TooltipContent>
                  <span>{titulo}</span>
                </TooltipContent>
              )}
            </Tooltip>
          )}
          {editingId !== id && (
            <div className="flex space-x-2">
              <TagIcon tag={tag} />
              <DateIcon fecha={fecha} />
            </div>
          )}
        </div>
        <div className="flex space-x-1">
          {editingId !== id && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  dispatch({ type: "INICIAR_EDICION", payload: { id, titulo } })
                }
                aria-label="Editar tarea"
              >
                <Edit2 className="h-5 w-5" />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch({ type: "BORRAR_TAREA", payload: id })}
            aria-label="Eliminar tarea"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};
TaskItem.propTypes = {
  tarea: PropTypes.shape({
    id: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    completada: PropTypes.bool.isRequired,
    fecha: PropTypes.instanceOf(Date),
    tag: PropTypes.string,
  }).isRequired,
};
export default TaskItem;
