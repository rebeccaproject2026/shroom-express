import { createContext, useContext, useState } from "react";

const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
  const [selectedEffect, setSelectedEffect] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');

  const toggleEffect = (effectName) => {
    setSelectedEffect(prev => prev === effectName ? null : effectName);
  };

  const clearEffect = () => setSelectedEffect(null);

  return (
    <CategoryContext.Provider value={{ selectedEffect, toggleEffect, clearEffect, deliveryMethod, setDeliveryMethod }}>
      {children}
    </CategoryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCategory = () => useContext(CategoryContext);
