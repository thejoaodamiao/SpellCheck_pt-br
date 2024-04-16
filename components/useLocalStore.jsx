export const useLocalStore = () => {
    const setItem = (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        console.log(`"${key}" salvo na localStorage`);
      } catch (error) {
        console.log(error);
      }
    };
  
    const getItem = (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
      } catch (error) {
        console.log(error);
      }
    };
  
    return { setItem, getItem };
  };
  