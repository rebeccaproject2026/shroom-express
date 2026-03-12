import React from 'react';
import { Icon } from '@iconify/react';
import StoreCard from '../../components/common/StoreCard';
import storecard1 from "../../assets/images/storecard1.png";
import background from "../../assets/images/background1.png";
import storecard2 from "../../assets/images/storecard2.png";
import background2 from "../../assets/images/background2.png";
import storecard3 from "../../assets/images/storecard3.png";
import background3 from "../../assets/images/background3.png";
import storecard4 from "../../assets/images/storecard4.png";
import background4 from "../../assets/images/Logo.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import microDosingImg from "../../assets/images/microdosing.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import creativeBoostImg from "../../assets/images/creative boost.png";
import relaxChillImg from "../../assets/images/relaxchill.png";

const StoresList = () => {
    const stores = [
        {
            id: 1,
            name: "micro zoomiez",
            rating: "4.8",
            reviewCount: "124",
            estimatedDelivery: "Under 2 Hours",
            avgPrice: "$27.43",
            location: "45 Four Winds Dr, North York, ON M3J 2T6, Canada",
            coverImage: storecard1,
            logo: background,
            deliveryBadge: { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" },
            isPrimary: true,
            avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg, creativeBoostImg, relaxChillImg]
        },
        {
            id: 2,
            name: "The Mushroom",
            rating: "5.0",
            reviewCount: "89 reviews",
            estimatedDelivery: "2 - 5 Hours",
            avgPrice: "$27.43",
            location: "779 Somerset St W. Centertown, Ottawa, Ontario",
            coverImage: storecard2,
            logo: background2,
            deliveryBadge: { text: "Express Delivery", color: "text-[#22C55E]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg, creativeBoostImg, relaxChillImg]
        },
        {
            id: 3,
            name: "Psilovibin",
            rating: "4.1",
            reviewCount: "210 reviews",
            estimatedDelivery: "1 - 2 Hours",
            avgPrice: "$27.43",
            location: "5.2 km away • Etobicoke",
            coverImage: storecard3,
            logo: background3,
            deliveryBadge: null,
            isPrimary: false,
            avatars: []
        },
        {
            id: 4,
            name: "Shroom Express",
            rating: "4.7",
            reviewCount: "340 reviews",
            estimatedDelivery: "1 - 3 hours",
            avgPrice: "$27.43",
            location: "5.2 km away • Medicinal - Vancouver",
            coverImage: storecard4,
            logo: background4,
            deliveryBadge: { text: "Express Delivery", color: "text-[#22C55E]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg, creativeBoostImg, relaxChillImg]
        },
        {
            id: 5,
            name: "Shroom For Sale",
            rating: "4.8",
            reviewCount: "124",
            estimatedDelivery: "Under 2 Hours",
            avgPrice: "$27.43",
            location: "164 Bathurst St, Toronto, ON M5B 1C7",
            coverImage: storecard1,
            logo: background,
            deliveryBadge: { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg]
        },
        {
            id: 6,
            name: "Magic Mushroom...",
            rating: "5.0",
            reviewCount: "89 reviews",
            estimatedDelivery: "2 - 5 Hours",
            avgPrice: "$27.43",
            location: "85a Bathurst St, Toronto, ON M5B 1C7",
            coverImage: storecard2,
            logo: background2,
            deliveryBadge: { text: "Express Delivery", color: "text-[#22C55E]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg]
        },
        {
            id: 7,
            name: "Planet 51",
            rating: "4.1",
            reviewCount: "210 reviews",
            estimatedDelivery: "1 - 2 Hours",
            avgPrice: "$27.43",
            location: "1/2 Geary Ave, Toronto, ON M6H 4H1",
            coverImage: storecard3,
            logo: background3,
            deliveryBadge: null,
            isPrimary: false,
            avatars: []
        },
        {
            id: 8,
            name: "Toronto Magic...",
            rating: "4.7",
            reviewCount: "340 reviews",
            estimatedDelivery: "1 - 3 hours",
            avgPrice: "$27.43",
            location: "164 Bathurst St, Toronto, ON M5B 1C7",
            coverImage: storecard4,
            logo: background4,
            deliveryBadge: { text: "Express Delivery", color: "text-[#22C55E]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [beginnerFriendlyImg, highPotencyImg]
        },
        {
            id: 9,
            name: "Magic Mushroom...",
            rating: "4.8",
            reviewCount: "124",
            estimatedDelivery: "Under 2 Hours",
            avgPrice: "$27.43",
            location: "779 Somerset St W. Centertown, Ottawa, Ontario",
            coverImage: storecard1,
            logo: background,
            deliveryBadge: { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg, creativeBoostImg, relaxChillImg]
        },
        {
            id: 10,
            name: "Danforth Weed",
            rating: "5.0",
            reviewCount: "89 reviews",
            estimatedDelivery: "2 - 5 Hours",
            avgPrice: "$27.43",
            location: "779 Somerset St W. Centertown, Ottawa, Ontario",
            coverImage: storecard2,
            logo: background2,
            deliveryBadge: { text: "Express Delivery", color: "text-[#22C55E]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg]
        }
    ];

    return (
        <div className="w-full px-10 py-20">

            {/* Page Header */}
            <h1 className="text-3xl font-bold text-[#0F3540] mb-3">
                Stores
            </h1>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-lg mb-3">
                <a
                    href="/store"
                    className="text-[var(--store-primary)] font-semibold hover:underline"
                >Home</a>
                <span className="text-[#777777]">/</span>
                <span className="text-[#777777] font-semibold">
                    Stores
                </span>
            </div>

            {/* Description */}
            <p className="text-[#777777] text-[15px] leading-[24px] tracking-normal w-full">
                Welcome to our marketplace, where you can explore a wide variety of premium
                mushroom products from multiple trusted stores. Our platform brings
                together carefully selected vendors who specialize in fresh, dried, and
                value-added mushroom products to ensure quality, variety, and reliability
                for every customer. Each store listed here offers its own unique selection,
                pricing, and specialties, allowing you to compare products and choose what
                best suits your needs.
            </p>
            {/* Trending Store Section */}
            <div className="mb-8 mt-10">

                {/* Title */}
                <h2 className="text-[22px] font-bold text-[#181211] mb-5">
                    Trending Store
                </h2>

                {/* Filter Bar */}
                <div className="flex items-center gap-3">

                    {/* Filter Icon */}
                    <div className="flex items-center gap-2 px-3 h-[40px] rounded-full bg-[var(--store-primary)] text-white">

                        <Icon icon="mage:filter" width={22} height={22} />

                        {/* Badge */}
                        <span className="bg-white text-[#222222] text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full">
                            1
                        </span>

                    </div>

                    {/* Pills */}
                    <button className="px-5 h-[40px] rounded-full bg-[#FFFFFF] border border-[#E8E8E8]  text-[15px] font-semibold text-[#222222]">
                        Category
                    </button>

                    <button className="px-5 h-[40px] rounded-full bg-[#FFFFFF] border border-[#E8E8E8]  text-[15px] font-semibold text-[#222222]">
                        Delivery
                    </button>

                    <button className="px-5 h-[40px] rounded-full bg-[#FFFFFF] border border-[#E8E8E8]  text-[15px] font-semibold text-[#222222]">
                        Shipping
                    </button>

                    {/* Search */}
                    <div className="w-[100%]">
                        <input
                            type="text"
                            placeholder="Search Store"
                            className="w-full h-[40px] rounded-full bg-[#FFFFFF] border border-[#E8E8E8]  px-5 text-[14px] outline-none placeholder:text-[#222222] font-semibold"
                        />
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 px-4 h-[40px] rounded-full bg-[#FFFFFF] border border-[#E8E8E8] w-[55%]">

                        <Icon icon="tabler:location" width={18} className="text-[#64748B]" />

                        <span className="text-lg font-semibold text-[#181211] flex-1">
                            Toronto Central
                        </span>

                        <button className="text-base font-semibold text-[var(--store-primary)]">
                            Change
                        </button>

                    </div>
                </div>
            </div>
            {/* Stores Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                {stores.map(store => (
                    <div key={store.id} className="w-full">
                        <StoreCard store={store} />
                    </div>
                ))}
            </div>

        </div >
    );
};

export default StoresList;
