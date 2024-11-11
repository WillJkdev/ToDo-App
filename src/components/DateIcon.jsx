import PropTypes from "prop-types";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Clock, AlarmClockOff } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const DateIcon = ({ fecha }) => {
  if (!fecha) return null;
  const esFechaVencida = fecha < new Date();
  const Icono = esFechaVencida ? AlarmClockOff : Clock;
  return (
    <Tooltip>
      <TooltipTrigger
        aria-label={`Fecha de vencimiento: ${format(new Date(fecha), "PPP", {
          locale: es,
        })}`}
      >
        <Icono
          className={`h-5 w-5 ${
            esFechaVencida ? "text-red-500" : "text-gray-600"
          }`}
        />
      </TooltipTrigger>
      <TooltipContent>
        <span>{format(new Date(fecha), "PPP", { locale: es })}</span>
      </TooltipContent>
    </Tooltip>
  );
};
DateIcon.propTypes = {
  fecha: PropTypes.instanceOf(Date),
};
