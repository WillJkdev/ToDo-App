import { useContext } from "react";
import { ThemeProviderContext } from "@/context/Themes/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }
  return context;
};
