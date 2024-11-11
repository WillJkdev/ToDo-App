export const loadLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
};
export const saveLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
