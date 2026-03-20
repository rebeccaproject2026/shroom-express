import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, weight, quantity = 1) => {
    setCartItems((prev) => {
      const key = `${product.id}-${weight}`;
      const existing = prev.find((i) => i.cartKey === key);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      console.log("product.categories", product);
      return [
        ...prev,
        {
          cartKey: key,
          id: product.id,
          name: product.title || product.name,
          vendor: product.vendor,
          description: [weight, product.categories?.[0]].filter(Boolean).join(" • "),
          price: product.price,
          quantity,
          image: product.image,
        },
      ];
    });
  };

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

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
