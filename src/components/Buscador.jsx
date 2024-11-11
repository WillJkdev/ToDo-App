import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SearchFilterIcon } from "@/components/SearchFilterIcon";
import { useTasksContext } from "@/context/Tasks/useTasksContext";
import { searchingTerm } from "@/hooks/useSearch";

export const Buscador = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("Titulo");
  const [selectedTag, setSelectedTag] = useState("Alta");
  const [allowedDates, setAllowedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { state, dispatch } = useTasksContext();
  const { tareas } = state;

  const onFilterChange = (newFilter) => {
    setFilterMode(newFilter);
  };
  const onTagChange = (newTag) => {
    setSelectedTag(newTag);
  };
  const onDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    const fechasPermitidas = tareas
      .filter((tarea) => tarea.fecha !== null)
      .map((tarea) => tarea.fecha);
    setAllowedDates(fechasPermitidas);
  }, [tareas]);

  useEffect(() => {
    let resultadosFiltrados = tareas;
    resultadosFiltrados = searchingTerm(
      searchQuery,
      tareas,
      filterMode,
      selectedTag,
      selectedDate
    );
    dispatch({ type: "SET_TAREAS_FILTRADAS", payload: resultadosFiltrados });
  }, [searchQuery, tareas, filterMode, selectedTag, selectedDate, dispatch]);
  return (
    <div className="flex flex-col md:flex-row space-x-2 mt-4 items-end">
      <Input
        placeholder="Buscar tareas..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SearchFilterIcon
        onFilterChange={onFilterChange}
        initialFilter="Titulo"
        allowedDates={allowedDates}
        onTagChange={onTagChange}
        onDateChange={onDateChange}
      />
    </div>
  );
};
