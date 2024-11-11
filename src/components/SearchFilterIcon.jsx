import PropTypes from "prop-types";
import React, { useState } from "react";
import { Filter, Type, CalendarSearch, Tag } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tags } from "@/components/Tags";
import { CalendarPicker } from "@/components/CalendarPicker";

export const SearchFilterIcon = React.memo(
  ({
    onFilterChange,
    initialFilter,
    allowedDates = [],
    onTagChange,
    onDateChange,
  }) => {
    const [selectedFilter, setSelectedFilter] = useState(initialFilter || null);
    const handleFilterSelect = (filter) => {
      if (filter !== selectedFilter) {
        setSelectedFilter(filter);
        onFilterChange(filter);
      }
    };
    const [tag, setTag] = useState("Alta");
    const handleTagChange = (newTag) => {
      setTag(newTag);
      onTagChange(newTag);
    };
    const [date, setDate] = useState(null);
    const handleDateChange = (newDate) => {
      setDate(newDate);
      onDateChange(newDate);
    };
    const IconoCustom = ({ children }) => {
      return (
        <div className="relative group">
          <div className="h-9 whitespace-nowrap rounded-md border border-input bg-transparent text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring p-[10px] flex items-center justify-center">
            <div className="flex items-center justify-center w-5 h-5 opacity-50">
              {children}
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-500">
            Solo Texto
          </div>
        </div>
      );
    };
    const getIcon = () => {
      switch (selectedFilter) {
        case "Titulo":
          return (
            <IconoCustom>
              <Type />
            </IconoCustom>
          );
        case "Fecha":
          return (
            <CalendarPicker
              onDateChange={handleDateChange}
              initialDate={date}
              allowedDates={allowedDates}
            />
          );
        case "Etiqueta":
          return <Tags onTagChange={handleTagChange} initialTag={tag} />;
        default:
          return <Filter />;
      }
    };
    return (
      <div className="flex items-center space-x-1  mt-2 md:mt-0">
        <div className="relative group">
          <div className=" space-y-4">
            <div>
              <Select value={selectedFilter} onValueChange={handleFilterSelect}>
                <SelectTrigger className="w-10 p-[10px] flex items-center justify-center [&>svg:last-child]:hidden">
                  <Filter />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Titulo">
                    <div className="flex items-center">
                      <Type className="w-5 h-5" />
                      <span className=" ml-2">Titulo</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Fecha">
                    <div className="flex items-center">
                      <CalendarSearch className="w-5 h-5" />
                      <span className=" ml-2">Fecha</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Etiqueta">
                    <div className="flex items-center">
                      <Tag className="w-5 h-5" />
                      <span className=" ml-2">Etiqueta</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max bg-gray-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-500">
            Elige un filtro
          </div>
        </div>
        {getIcon()}
      </div>
    );
  }
);
SearchFilterIcon.displayName = "Filter";
SearchFilterIcon.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  initialFilter: PropTypes.oneOf(["Titulo", "Fecha", "Etiqueta", null]),
  children: PropTypes.node,
  allowedDates: PropTypes.array,
  onTagChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
};
