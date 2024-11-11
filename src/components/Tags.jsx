import PropTypes from "prop-types";
import React, { useState, useMemo } from "react";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const Tags = React.memo(({ onTagChange, initialTag }) => {
  const [selectedTag, setSelectedTag] = useState(initialTag || null);
  const handleTagSelect = (tag) => {
    if (tag !== selectedTag) {
      setSelectedTag(tag);
      onTagChange(tag);
    }
  };
  const tagColor = useMemo(() => {
    switch (selectedTag) {
      case "Alta":
        return "text-red-500 [&>path]:fill-red-500/25";
      case "Media":
        return "text-yellow-500 [&>path]:fill-yellow-500/25";
      case "Baja":
        return "text-green-500 [&>path]:fill-green-500/25";
      default:
        return "text-gray-500";
    }
  }, [selectedTag]);
  return (
    <div className="relative group">
      <div className="space-y-4">
        <Select value={selectedTag} onValueChange={handleTagSelect}>
          <SelectTrigger
            className="w-10 p-[10px] flex items-center justify-center [&>svg:last-child]:hidden"
            aria-label={selectedTag || "Seleccionar tag"}
          >
            <Tag
              className={cn("h-6 w-6 transition-colors", tagColor)}
              strokeWidth={2}
            />
            <span className="sr-only">{selectedTag || "Seleccionar tag"}</span>
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Media">Media</SelectItem>
            <SelectItem value="Baja">Baja</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-500">
        Selecciona una etiqueta
      </div>
    </div>
  );
});
Tags.displayName = "Tags";
Tags.propTypes = {
  onTagChange: PropTypes.func.isRequired,
  initialTag: PropTypes.oneOf(["Alta", "Media", "Baja", null]),
};
