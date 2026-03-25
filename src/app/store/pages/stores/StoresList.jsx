import React, { useState } from 'react';
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
import creativeBoostImg from "../../assets/images/creativeboost.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import Shroomforsalebanner from "../../assets/images/Shroomforsalebanner.png";
import Shroomforsalelogo from "../../assets/images/Shroomforsalebannerlogo.png";
import Magicmushroombanner from "../../assets/images/Magicmushroombanner.jpg";
import Magicmushroomlogo from "../../assets/images/Magicmushroomlogo.png";
import Planetbanner from "../../assets/images/Planetbanner.png";
import Planetlogo from "../../assets/images/Planetlogo.png";
import Torontomagiclogo from "../../assets/images/Torontomagiclogo.png";
import Torontomagicbanner from "../../assets/images/Torontomagicbanner.jpg";
import magicmashroombanner2 from "../../assets/images/magicmashroombanner2.jpg";
import magicmashroomlogo2 from "../../assets/images/magicmashroomlogo2.png";
import StoreFilterDrawer from '../../components/stores/StoreFilterDrawer';




const StoresList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [drawerFilters, setDrawerFilters] = useState({ selectedDelivery: 'All', selectedRating: 'All', isPrimary: false });
    const [activeExpressDelivery, setActiveExpressDelivery] = useState(false);
    const [activeDelivery, setActiveDelivery] = useState(false);
    const [activeShipping, setActiveShipping] = useState(false);
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
            deliveryBadge: { text: "Nationwide Shipping", color: "text-[#3B82F6]", icon: "carbon:delivery" },
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
            coverImage: Shroomforsalebanner,
            logo: Shroomforsalelogo,
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
            coverImage: Magicmushroombanner,
            logo: Magicmushroomlogo,
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
            coverImage: Planetbanner,
            logo: Planetlogo,
            deliveryBadge: { text: "Nationwide Shipping", color: "text-[#3B82F6]", icon: "carbon:delivery" },
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
            coverImage: Torontomagicbanner,
            logo: Torontomagiclogo,
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
            coverImage: magicmashroombanner2,
            logo: magicmashroomlogo2,
            deliveryBadge: { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg, creativeBoostImg, relaxChillImg]
        },
        // {
        //     id: 10,
        //     name: "Danforth Weed",
        //     rating: "5.0",
        //     reviewCount: "89 reviews",
        //     estimatedDelivery: "2 - 5 Hours",
        //     avgPrice: "$27.43",
        //     location: "779 Somerset St W. Centertown, Ottawa, Ontario",
        //     coverImage: storecard2,
        //     logo: background2,
        //     deliveryBadge: { text: "Express Delivery", color: "text-[#22C55E]", icon: "carbon:delivery" },
        //     isPrimary: false,
        //     avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg]
        // }
    ];

    const filteredStores = stores.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesExpressDelivery = !activeExpressDelivery || s.deliveryBadge?.text === "Express Delivery";
        const matchesDelivery = !activeDelivery || (s.deliveryBadge?.text === "Same-day Delivery");
        const matchesShipping = !activeShipping || (s.deliveryBadge?.text === "Nationwide Shipping");
        const matchesDrawerDelivery = drawerFilters.selectedDelivery === 'All' || s.deliveryBadge?.text === drawerFilters.selectedDelivery;
        const matchesDrawerRating = drawerFilters.selectedRating === 'All' ||
            (drawerFilters.selectedRating === '5.0' ? parseFloat(s.rating) === 5.0 :
                drawerFilters.selectedRating === '4.5+' ? parseFloat(s.rating) >= 4.5 :
                    parseFloat(s.rating) >= 4.0);
        const matchesDrawerPrimary = !drawerFilters.isPrimary || s.isPrimary === true;
        return matchesSearch && matchesExpressDelivery && matchesDelivery && matchesShipping && matchesDrawerDelivery && matchesDrawerRating && matchesDrawerPrimary;
    });

    const activeFilterCount = [activeExpressDelivery, activeDelivery, activeShipping].filter(Boolean).length;

    return (
        <div className="w-full px-10 py-20">
            <StoreFilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} onApply={setDrawerFilters} />

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
                    <div
                        onClick={() => setFilterOpen(true)}
                        className="flex items-center gap-2 px-3 h-[40px] rounded-full bg-[var(--store-primary)] text-white cursor-pointer">
                        <Icon icon="mage:filter" width={22} height={22} />
                        {/* Badge */}
                        <span className="bg-white text-[#222222] text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full">
                            {activeFilterCount || 1}
                        </span>
                    </div>

                    {/* Pills */}
                    <button
                        onClick={() => setActiveExpressDelivery(p => !p)}
                        className={`px-5 h-[40px] rounded-full border text-[15px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${activeExpressDelivery ? 'bg-[var(--store-primary)] text-white border-[var(--store-primary)]' : 'bg-[#FFFFFF] border-[#E8E8E8] text-[#222222]'}`}
                    >
                        Express Delivery
                    </button>

                    <button
                        onClick={() => setActiveDelivery(p => !p)}
                        className={`px-5 h-[40px] rounded-full border text-[15px] font-semibold transition-colors cursor-pointer ${activeDelivery ? 'bg-[var(--store-primary)] text-white border-[var(--store-primary)]' : 'bg-[#FFFFFF] border-[#E8E8E8] text-[#222222]'}`}
                    >
                        Delivery
                    </button>

                    <button
                        onClick={() => setActiveShipping(p => !p)}
                        className={`px-5 h-[40px] rounded-full border text-[15px] font-semibold transition-colors cursor-pointer ${activeShipping ? 'bg-[var(--store-primary)] text-white border-[var(--store-primary)]' : 'bg-[#FFFFFF] border-[#E8E8E8] text-[#222222]'}`}
                    >
                        Shipping
                    </button>

                    {/* Search */}
                    <div className="w-[100%]">
                        <input
                            type="text"
                            placeholder="Search Store"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-[40px] rounded-full bg-[#FFFFFF] border border-[#E8E8E8]  px-5 text-[14px] outline-none placeholder:text-[#222222] font-semibold"
                        />
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 px-4 h-[40px] rounded-full bg-[#FFFFFF] border border-[#E8E8E8] w-[55%]">

                        <Icon icon="tabler:location" width={18} className="text-[#64748B]" />

                        <span className="text-lg font-semibold text-[#181211] flex-1">
                            Toronto Central
                        </span>

                        <button onClick={() => alert('Location change coming soon.')} className="text-base font-semibold text-[var(--store-primary)]">
                            Change
                        </button>

                    </div>
                </div>
            </div>
            {/* Stores Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                {filteredStores.length > 0 ? filteredStores.map(store => (
                    <div key={store.id} className="w-full">
                        <StoreCard store={store} />
                    </div>
                )) : (
                    <div className="col-span-4 flex flex-col items-center justify-center py-20 text-center">
                        <Icon icon="streamline:shopping-store-2-store-shop-shops-stores" width={48} className="text-[#E5DCDC] mb-3" />
                        <p className="text-sm font-semibold text-[#BDBDBD]">No stores found for "{searchQuery}"</p>
                    </div>
                )}
            </div>

        </div >
    );
};

export default StoresList;
