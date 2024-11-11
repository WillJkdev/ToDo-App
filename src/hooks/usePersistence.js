import { useState, useEffect } from "react";
import { loadLocalStorage, saveLocalStorage } from "@/DataBase/localStorage";

const usePersistence = (key, defaultValue) => {
  const initialLoad = () => {
    try {
      const storedData = window.localStorage.getItem(key);
      if (storedData) {
        const parsedData = JSON.parse(storedData).map((tarea) => ({
          ...tarea,
          fecha: tarea.fecha ? new Date(tarea.fecha) : null,
        }));
        return parsedData.length ? parsedData : defaultValue;
      }
    } catch (error) {
      console.error("Error al cargar los datos de forma sincrónica", error);
    }
    return defaultValue;
  };
  const [data, setData] = useState(initialLoad);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = loadLocalStorage(key);
        const dataConFechas = storedData.map((tarea) => ({
          ...tarea,
          fecha: tarea.fecha ? new Date(tarea.fecha) : null,
        }));
        setData(dataConFechas.length ? dataConFechas : defaultValue);
      } catch (error) {
        console.error("Error al cargar los datos", error);
        setData(defaultValue);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [key, defaultValue]);
  useEffect(() => {
    const saveData = async () => {
      try {
        const dataConFechasComoString = data.map((tarea) => ({
          ...tarea,
          fecha: tarea.fecha ? tarea.fecha.toISOString() : null,
        }));
        saveLocalStorage(key, dataConFechasComoString);
      } catch (error) {
        console.error("Error al guardar los datos", error);
      }
    };
    saveData();
  }, [data, key]);

  return [data, setData, isLoading];
};
export default usePersistence;
