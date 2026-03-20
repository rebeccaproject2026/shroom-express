import { createContext, useContext, useState } from "react";
import Product1 from "../assets/images/wishlist1.png";
import Product4 from "../assets/images/wishlist4.jpg";

const DEFAULT_ITEMS = [
  {
    id: "default-1",
    title: "Blue Dream Flower",
    name: "Blue Dream Flower",
    vendor: "Sativa Dominant • 24% THC",
    price: 45.00,
    weights: ["3.5g"],
    image: Product1,
    inStock: true,
    isDefault: true,
  },
  {
    id: "default-2",
    title: "Golden Teacher Truffles",
    name: "Golden Teacher Truffles",
    vendor: "Artisan Chocolate • 250mg",
    price: 25.00,
    weights: ["pack"],
    image: Product4,
    inStock: false,
    isDefault: true,
  },
];

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(DEFAULT_ITEMS);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlistItems.some((p) => p.id === id);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isWishlisted, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);
