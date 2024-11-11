import React from "react";
import { Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Buscador } from "@/components/Buscador";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTasksContext } from "@/context/Tasks/useTasksContext";
import { useState } from "react";

const Filtros = React.memo(() => {
  const { state, dispatch } = useTasksContext();
  const { tareasFiltradas: tareas, filtroMode } = state;
  const [isCustomFilter, setIsCustomFilter] = useState(false);
  const handleSelectChange = (value) => {
    dispatch({ type: "SET_FILTRO", payload: value });
    setIsCustomFilter(value === "Personalizado");
  };
  return (
    <Card className="w-full p-3">
      <div className="flex items-center justify-between  space-x-2">
        <Badge variant="secondary" aria-live="polite">
          <span className="hidden md:block">
            {tareas.filter((tarea) => !tarea.completada).length} tareas
            pendientes
          </span>
          <span className="block md:hidden">
            {tareas.filter((tarea) => !tarea.completada).length} pendientes
          </span>
        </Badge>
        <div className="flex items-center space-x-2">
          <Select value={filtroMode} onValueChange={handleSelectChange}>
            <SelectTrigger
              className="w-auto md:min-w-44"
              aria-label="Filtrar tareas"
            >
              <SelectValue placeholder="Filtrar tareas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todas</SelectItem>
              <SelectItem value="Activos">Activas</SelectItem>
              <SelectItem value="Completados">Completadas</SelectItem>
              <SelectItem value="Personalizado">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="secondary"
            onClick={() => dispatch({ type: "BORRAR_TAREAS_COMPLETADAS" })}
            className=" cursor-pointer  group "
            aria-label="Borrar tareas completadas"
            title="Borrar tareas completadas"
          >
            <div className="transition-all duration-300 ease-i group-hover:animate-pulse group-hover:text-red-600">
              <Trash2 className="w-5 h-5" />
            </div>
          </Button>
        </div>
      </div>
      {isCustomFilter && <Buscador />}
    </Card>
  );
});
Filtros.displayName = "Filtros";
export default Filtros;
