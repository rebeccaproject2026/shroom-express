import { createContext, useContext, useState, useEffect } from "react";
import storecard1 from "../assets/images/storecard1.png";
import background from "../assets/images/background1.png";
import storecard2 from "../assets/images/storecard2.png";
import background2 from "../assets/images/background2.png";
import storecard3 from "../assets/images/storecard3.png";
import background3 from "../assets/images/background3.png";
import beginnerFriendlyImg from "../assets/images/beginnerfriendly.png";
import highPotencyImg from "../assets/images/highpotency.png";
import microDosingImg from "../assets/images/microdosing.png";
import visualExperienceImg from "../assets/images/visualexperience.png";
import creativeBoostImg from "../assets/images/creativeboost.png";
import relaxChillImg from "../assets/images/relaxchill.png";
import Shroomforsalebanner from "../assets/images/Shroomforsalebanner.png";
import Shroomforsalelogo from "../assets/images/Shroomforsalebannerlogo.png";
import Magicmushroombanner from "../assets/images/Magicmushroombanner.jpg";
import Magicmushroomlogo from "../assets/images/Magicmushroomlogo.png";
import Planetbanner from "../assets/images/Planetbanner.png";
import Planetlogo from "../assets/images/Planetlogo.png";
import Torontomagiclogo from "../assets/images/Torontomagiclogo.png";
import Torontomagicbanner from "../assets/images/Torontomagicbanner.jpg";
import magicmashroombanner2 from "../assets/images/magicmashroombanner2.jpg";
import magicmashroomlogo2 from "../assets/images/magicmashroomlogo2.png";

const defaultStores = [
    { id: 1, name: "micro zoomiez", rating: "4.8", reviewCount: "124", estimatedDelivery: "Under 2 Hours", avgPrice: "$27.43", location: "45 Four Winds Dr, North York, ON M3J 2T6, Canada", coverImage: storecard1, logo: background, deliveryBadge: { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" }, isPrimary: false, avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg, creativeBoostImg, relaxChillImg] },
    { id: 2, name: "The Mushroom", rating: "5.0", reviewCount: "89 reviews", estimatedDelivery: "2 - 5 Hours", avgPrice: "$27.43", location: "779 Somerset St W. Centertown, Ottawa, Ontario", coverImage: storecard2, logo: background2, deliveryBadge: { text: "Express Delivery", color: "text-[#22C55E]", icon: "carbon:delivery" }, isPrimary: false, avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg, creativeBoostImg, relaxChillImg] },
    { id: 3, name: "Psilovibin", rating: "4.1", reviewCount: "210 reviews", estimatedDelivery: "1 - 2 Hours", avgPrice: "$27.43", location: "5.2 km away • Etobicoke", coverImage: storecard3, logo: background3, deliveryBadge: { text: "Nationwide Shipping", color: "text-[#3B82F6]", icon: "carbon:delivery" }, isPrimary: false, avatars: [] },
    { id: 5, name: "Shroom For Sale", rating: "4.8", reviewCount: "124", estimatedDelivery: "Under 2 Hours", avgPrice: "$27.43", location: "85a Bathurst St, Toronto, ON M5B 1C7", coverImage: Shroomforsalebanner, logo: Shroomforsalelogo, deliveryBadge: { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" }, isPrimary: false, avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg] },
    { id: 6, name: "Magic Mushroom...", rating: "5.0", reviewCount: "89 reviews", estimatedDelivery: "2 - 5 Hours", avgPrice: "$27.43", location: "85a Bathurst St, Toronto, ON M5B 1C7", coverImage: Magicmushroombanner, logo: Magicmushroomlogo, deliveryBadge: { text: "Express Delivery", color: "text-[#22C55E]", icon: "carbon:delivery" }, isPrimary: false, avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg] },
    { id: 7, name: "Planet 51", rating: "4.1", reviewCount: "210 reviews", estimatedDelivery: "1 - 2 Hours", avgPrice: "$27.43", location: "1/2 Geary Ave, Toronto, ON M6H 4H1", coverImage: Planetbanner, logo: Planetlogo, deliveryBadge: { text: "Nationwide Shipping", color: "text-[#3B82F6]", icon: "carbon:delivery" }, isPrimary: false, avatars: [] },
    { id: 8, name: "Toronto Magic...", rating: "4.7", reviewCount: "340 reviews", estimatedDelivery: "1 - 3 hours", avgPrice: "$27.43", location: "164 Bathurst St, Toronto, ON M5B 1C7", coverImage: Torontomagicbanner, logo: Torontomagiclogo, deliveryBadge: { text: "Express Delivery", color: "text-[#22C55E]", icon: "carbon:delivery" }, isPrimary: false, avatars: [beginnerFriendlyImg, highPotencyImg] },
    { id: 9, name: "Magic Mushroom...", rating: "4.8", reviewCount: "124", estimatedDelivery: "Under 2 Hours", avgPrice: "$27.43", location: "779 Somerset St W. Centertown, Ottawa, Ontario", coverImage: magicmashroombanner2, logo: magicmashroomlogo2, deliveryBadge: { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" }, isPrimary: false, avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg, creativeBoostImg, relaxChillImg] },
];

const StoresContext = createContext(null);

export const StoresProvider = ({ children }) => {
    const [stores, setStores] = useState(defaultStores);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Future API Integration: Fetch stores from backend
    const fetchStores = async () => {
        setLoading(true);
        try {
            // const response = await axios.get('/api/stores');
            // setStores(response.data);
            
            // Simulating API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            setStores(defaultStores);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    const addStore = async (formData) => {
        setLoading(true);
        try {
            // Future API Integration:
            // const response = await axios.post('/api/stores', formData);
            // const createdStore = response.data;

            // Simulating API delay and logic
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const storeName = formData.locations[0]?.storeName || "New Store";
            const locationStr = formData.locations[0] 
                ? `${formData.locations[0].streetAddress}, ${formData.locations[0].city}` 
                : "Location TBD";

            const newStore = {
                id: Date.now(),
                name: storeName,
                rating: "0.0",
                reviewCount: "0 reviews",
                estimatedDelivery: formData.sameDayEta || "TBD",
                avgPrice: "$0",
                location: locationStr,
                coverImage: formData.banner || null,
                logo: formData.logo || null,
                deliveryBadge: formData.sameDayDelivery 
                    ? { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" }
                    : formData.expressDelivery 
                        ? { text: "Express Delivery", color: "text-[#22C55E]", icon: "carbon:delivery" }
                        : { text: "Nationwide Shipping", color: "text-[#3B82F6]", icon: "carbon:delivery" },
                isPrimary: false,
                avatars: [],
                isUserCreated: true,
                ...formData // Keep raw data for CRM
            };

            setStores(prev => [...prev, newStore]);
            return newStore.id;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <StoresContext.Provider value={{ stores, addStore, loading, error, fetchStores }}>
            {children}
        </StoresContext.Provider>
    );
};

export const useStores = () => useContext(StoresContext);
