import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarPicker } from "@/components/CalendarPicker";
import { Tags } from "@/components/Tags";
import { useTasksContext } from "@/context/Tasks/useTasksContext";
import { useTaskInput } from "@/hooks/useTaskInput";

const Inputs = React.memo(() => {
  const { dispatch } = useTasksContext();
  const {
    newtask,
    setNewtask,
    handleInsertarTarea,
    onDateChange,
    handleTagChange,
  } = useTaskInput(dispatch);
  return (
    <Card className="mb-4 p-3">
      <div className="flex flex-col md:flex-row md:space-x-2  justify-end">
        <Input
          type="text"
          placeholder="¿Qué tienes que hacer?"
          value={newtask}
          onChange={(e) => setNewtask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleInsertarTarea()}
        />
        <div className="flex justify-end space-x-2 pt-3 md:pt-0">
          <CalendarPicker onDateChange={onDateChange} />
          <Tags onTagChange={handleTagChange} initialTag={null} />
          <Button onClick={handleInsertarTarea}>Añadir</Button>
        </div>
      </div>
    </Card>
  );
});
Inputs.displayName = "Filtros";
export default Inputs;
