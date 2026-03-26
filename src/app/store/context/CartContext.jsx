import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isAddedPopupOpen, setIsAddedPopupOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  const addToCart = (product, weight, quantity = 1, notShowPopup = false) => {
    const newItem = {
        cartKey: `${product.id}-${weight}`,
        id: product.id,
        name: product.title || product.name,
        vendor: product.vendor,
        description: [weight, product.categories?.[0]].filter(Boolean).join(" • "),
        price: product.price,
        quantity,
        image: product.image,
        displayWeight: weight
    };

    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartKey === newItem.cartKey);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === newItem.cartKey ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, newItem];
    });

    if (!notShowPopup) {
        setLastAddedItem(newItem);
        setIsAddedPopupOpen(true);
        // Optional: auto-close after 5s? 
        // setTimeout(() => setIsAddedPopupOpen(false), 5000);
    }
  };

  const closeAddedPopup = () => setIsAddedPopupOpen(false);

  const removeFromCart = (cartKey) => {
    setCartItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey, delta) => {
    setCartItems((prev) =>
      prev
        .map((i) => i.cartKey === cartKey ? { ...i, quantity: i.quantity + delta } : i)
        .filter((i) => i.quantity > 0)
    );
  };

  const parsePrice = (p) => {
    if (typeof p === 'number') return p;
    if (typeof p !== 'string') return 0;
    return parseFloat(p.replace(/[$,]/g, '')) || 0;
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const subTotal = cartItems.reduce((sum, i) => sum + (parsePrice(i.price) * i.quantity), 0);

  return (
    <CartContext.Provider value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        cartCount, 
        subTotal,
        isAddedPopupOpen, 
        lastAddedItem, 
        closeAddedPopup 
    }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
