import PropTypes from "prop-types";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Tag } from "lucide-react";

export const TagIcon = ({ tag = null }) => {
  if (!tag) return null;
  const getTagColor = () => {
    switch (tag) {
      case "Alta":
        return { colorClass: "text-red-500", colorName: "Alta" };
      case "Media":
        return { colorClass: "text-yellow-500", colorName: "Media" };
      case "Baja":
        return { colorClass: "text-green-500", colorName: "Baja" };
      default:
        return { colorClass: "text-gray-500", colorName: "Ninguna" };
    }
  };
  const { colorClass, colorName } = getTagColor();
  return (
    <Tooltip>
      <TooltipTrigger>
        <Tag
          className={`h-4 w-4 ${colorClass}`}
          strokeWidth={2}
          aria-label={`Etiqueta de color: ${colorName}`}
        />
      </TooltipTrigger>
      <TooltipContent>
        <span>{colorName}</span>
      </TooltipContent>
    </Tooltip>
  );
};
TagIcon.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};
