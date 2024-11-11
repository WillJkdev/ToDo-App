import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CalendarPicker({ onDateChange, initialDate, allowedDates }) {
  const [selectedDate, setSelectedDate] = useState(initialDate || null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };
  return (
    <div className="relative group">
      <div className="space-y-4">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "transition-all duration-200",
                isOpen ? "w-auto pl-3 text-left font-normal" : "w-10 p-2"
              )}
              aria-label={
                isOpen
                  ? selectedDate
                    ? `Fecha seleccionada: ${format(selectedDate, "PPP", {
                        locale: es,
                      })}`
                    : "Seleccionar fecha de vencimiento"
                  : "Abrir calendario"
              }
            >
              {isOpen ? (
                selectedDate ? (
                  <div className="flex items-center gap-2">
                    <span>{format(selectedDate, "PPP", { locale: es })}</span>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Fecha de vencimiento</span>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </div>
                )
              ) : (
                <CalendarIcon className="h-4 w-4" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) =>
                allowedDates && Array.isArray(allowedDates)
                  ? !allowedDates.some((allowedDate) =>
                      isSameDay(date, allowedDate)
                    )
                  : date < new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-500 ">
        Selecciona una fecha
      </div>
    </div>
  );
}
CalendarPicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  initialDate: PropTypes.instanceOf(Date),
  allowedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};
