export function searchingTerm(query, tareas, filterMode, tag, pickDate) {
  const queryLowerCase = query.toLowerCase();
  return tareas.filter((tarea) => {
    const matchesQuery = tarea.titulo.toLowerCase().includes(queryLowerCase);
    switch (filterMode) {
      case "Titulo":
        return matchesQuery;
      case "Etiqueta":
        return (
          matchesQuery &&
          tarea.tag &&
          tarea.tag.toLowerCase().includes(tag?.toLowerCase() || "")
        );
      case "Fecha": {
        if (!pickDate) {
          return tarea.fecha && matchesQuery;
        }
        const matchesDate =
          tarea.fecha && tarea.fecha.toDateString() === pickDate.toDateString();
        return matchesDate && matchesQuery;
      }
      default:
        return matchesQuery;
    }
  });
}
