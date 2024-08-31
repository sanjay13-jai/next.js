export const localStorageUtils = () => {
  const IS_SUPPORTS_LOCALSTORAGE =
    typeof window !== "undefined" && window.localStorage;

  const hasLocalStorage = () => {
    if (IS_SUPPORTS_LOCALSTORAGE) {
      return true;
    }
    return null;
  };

  const setItem = (key: string, value: unknown) => {
    if (hasLocalStorage()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const getItem = (key: string) => {
    if (hasLocalStorage()) {
      const value = localStorage.getItem(key);
      try {
        return value && JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  };

  const removeItem = (key: string) => {
    if (hasLocalStorage()) {
      localStorage.removeItem(key);
    }
  };

  return { setItem, getItem, removeItem };
};
