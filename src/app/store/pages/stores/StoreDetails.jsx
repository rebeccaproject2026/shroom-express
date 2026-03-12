import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import microDosingImg from "../../assets/images/microdosing.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import focusClarityImg from "../../assets/images/focusclarity.png";
import product1 from "../../assets/images/product1.png";
import storedetailbg from "../../assets/images/storedetailbg.jpg";
import storedetaillogo from "../../assets/images/storedetaillogo.png";
import creativeBoostImg from "../../assets/images/creative boost.png";
import StoreCard from '../../components/common/StoreCard';
import storecard1 from "../../assets/images/storecard1.png";
import background from "../../assets/images/background1.png";
import storecard2 from "../../assets/images/storecard2.png";
import background2 from "../../assets/images/background2.png";
import storecard3 from "../../assets/images/storecard3.png";
import background3 from "../../assets/images/background3.png";
import storecard4 from "../../assets/images/storecard4.png";
import background4 from "../../assets/images/Logo.png";
import Select from '../../components/common/Select';
const StoreDetails = () => {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('popularity');

    // Sort options
    const sortOptions = [
        { value: 'popularity', label: 'Sort by popularity' },
        { value: 'rating', label: 'Sort by average rating' },
        { value: 'latest', label: 'Sort by latest' },
        { value: 'price-low', label: 'Sort by Price: low to high' },
        { value: 'price-high', label: 'Sort by Price: high to low' }
    ];
    // Mock store data
    const storeData = {
        name: "micro zoomiez",
        logo: storedetaillogo,
        coverImage: storedetailbg,
        description: "Forest Oasis is a premium magic mushroom wellness store inspired by the purity and mystery of the forest. Our mission is to provide high-quality, carefully sourced psilocybin mushroom products in a safe, informed, and responsible environment",
        deliveryTime: "Under 2 Hours",
        phone: "(416)546-0998",
        website: "www.microzoomiez.com",
        rating: "4.8",
        reviewCount: "124"
    };

    // Mock products
    const products = [
        {
            id: 1,
            badge: { text: "BEST SELLER", colorClass: "bg-[#E93E2B]" },
            isWishlisted: false,
            image: product1,
            title: "Albino Choda",
            vendor: "Green Valley Organics",
            rating: '4.9',
            weights: ['3g', '10g'],
            price: 50.00,
            effects: [
                { image: microDosingImg, name: "Creative Boost", hasBorder: false }
            ]
        },
        {
            id: 2,
            badge: { text: "NEW", colorClass: "bg-[#059669]" },
            isWishlisted: true,
            image: product1,
            title: "Albino Penis Envy",
            vendor: "Elevated Solstice",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 55.00,
            effects: [
                { image: highPotencyImg, name: "High Potency" },
                { image: visualExperienceImg, name: "Visual Experience" }
            ]
        },
        {
            id: 3,
            badge: null,
            isWishlisted: false,
            image: product1,
            title: "Aztec God",
            vendor: "Green Valley Organics",
            rating: '4.7',
            weights: ['3g', '10g'],
            price: 45.00,
            effects: [
                { image: focusClarityImg, name: "Focus & Clarity" },
                { image: relaxChillImg, name: "Relax & Chill" }
            ]
        },
        {
            id: 4,
            badge: null,
            isWishlisted: false,
            image: product1,
            title: "Golden Teacher",
            vendor: "Aether Mushroom Labs",
            rating: '4.8',
            weights: ['3g', '10g'],
            price: 50.00,
            effects: [
                { image: beginnerFriendlyImg, name: "Beginner Friendly" },
                { image: microDosingImg, name: "Microdosing" }
            ]
        },
        {
            id: 5,
            badge: null,
            isWishlisted: false,
            image: product1,
            title: "Blue Meanies",
            vendor: "Green Valley Organics",
            rating: '4.9',
            weights: ['3g', '10g'],
            price: 50.00,
            effects: [
                { image: microDosingImg, name: "Creative Boost", hasBorder: false }
            ]
        },
        {
            id: 6,
            badge: { text: "NEW", colorClass: "bg-[#059669]" },
            isWishlisted: true,
            image: product1,
            title: "Melmac (Dried)",
            vendor: "Elevated Solstice",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 55.00,
            effects: [
                { image: highPotencyImg, name: "High Potency" }
            ]
        },
        {
            id: 7,
            badge: null,
            isWishlisted: false,
            image: product1,
            title: "Chocolate Bar Golden",
            vendor: "Green Valley Organics",
            rating: '4.7',
            weights: ['3g', '10g'],
            price: 45.00,
            effects: [
                { image: focusClarityImg, name: "Focus & Clarity" },
                { image: relaxChillImg, name: "Relax & Chill" }
            ]
        },
        {
            id: 8,
            badge: null,
            isWishlisted: false,
            image: product1,
            title: "Tidal Wave",
            vendor: "Aether Mushroom Labs",
            rating: '4.8',
            weights: ['3g', '10g'],
            price: 50.00,
            effects: [
                { image: beginnerFriendlyImg, name: "Beginner Friendly" },
                { image: microDosingImg, name: "Microdosing" }
            ]
        },
        {
            id: 9,
            badge: { text: "BEST SELLER", colorClass: "bg-[#E93E2B]" },
            isWishlisted: false,
            image: product1,
            title: "Albino Choda",
            vendor: "Green Valley Organics",
            rating: '4.9',
            weights: ['3g', '10g'],
            price: 50.00,
            effects: [
                { image: microDosingImg, name: "Creative Boost", hasBorder: false }
            ]
        },
        {
            id: 10,
            badge: { text: "NEW", colorClass: "bg-[#059669]" },
            isWishlisted: true,
            image: product1,
            title: "Albino Penis Envy",
            vendor: "Elevated Solstice",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 55.00,
            effects: [
                { image: highPotencyImg, name: "High Potency" },
                { image: visualExperienceImg, name: "Visual Experience" }
            ]
        },
        {
            id: 11,
            badge: null,
            isWishlisted: false,
            image: product1,
            title: "Aztec God",
            vendor: "Green Valley Organics",
            rating: '4.7',
            weights: ['3g', '10g'],
            price: 45.00,
            effects: [
                { image: focusClarityImg, name: "Focus & Clarity" },
                { image: relaxChillImg, name: "Relax & Chill" }
            ]
        },
        {
            id: 12,
            badge: null,
            isWishlisted: false,
            image: product1,
            title: "Golden Teacher",
            vendor: "Aether Mushroom Labs",
            rating: '4.8',
            weights: ['3g', '10g'],
            price: 50.00,
            effects: [
                { image: beginnerFriendlyImg, name: "Beginner Friendly" },
                { image: microDosingImg, name: "Microdosing" }
            ]
        },
    ];
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
    ];
    return (
        <div className="w-full bg-[#FAF8F5]">
            {/* Store Profile Header Section */}
            <div className="px-10 pt-11">
                {/* Banner with rounded corners */}
                <div className="relative rounded-[20px] overflow-visible h-[280px] bg-cover bg-center" style={{ backgroundImage: `url(${storeData.coverImage})` }}>
                    {/* Content Container */}
                    <div className="relative h-full flex items-end justify-between px-10 pb-4">
                        {/* Left side - Store Info (with space for logo) */}

                        <div className="flex items-center gap-6">

                            {/* Logo */}
                            <div className="absolute -bottom-22 left-7 w-[240px] h-[240px] rounded-full bg-white  flex items-center justify-center overflow-hidden z-20 ring-6 ring-[#F8F6F6]
                        ">
                                <img
                                    src={storeData.logo}
                                    alt={storeData.name}
                                    className="w-full h-full object-contain p-5 "
                                />
                            </div>

                            {/* Store Info */}
                            <div className="ml-[260px]">
                                <h1 className="text-white text-[40px] font-bold leading-tight">
                                    {storeData.name}
                                </h1>

                                <div className="flex items-center gap-1 text-lg">
                                    <button onClick={() => navigate('/store')} className="text-[var(--store-primary)] hover:underline font-semibold cursor-pointer">
                                        Home
                                    </button>
                                    <span className="text-white">/</span>
                                    <button onClick={() => navigate('/store/storeslists')} className="text-[var(--store-primary)] hover:underline font-medium cursor-pointer">
                                        Stores
                                    </button>
                                    <span className="text-white">/</span>
                                    <span className="text-white font-medium">{storeData.name}</span>
                                </div>
                            </div>

                        </div>

                        {/* Right side - Action Buttons */}
                        <div className="flex items-center mb-4.5 gap-3 shrink-0">
                            <button className="flex items-center gap-2 bg-white text-[#181211] px-5 py-2.5 rounded-full text-[14px] font-semibold hover:bg-gray-100 transition-colors shadow-md">
                                <Icon icon="hugeicons:truck-delivery" width={18} height={18} />
                                <span>Delivery {storeData.deliveryTime}</span>
                            </button>
                            <button className="flex items-center gap-2 bg-white text-[#181211] px-5 py-2.5 rounded-full text-[14px] font-semibold hover:bg-gray-100 transition-colors shadow-md">
                                <Icon icon="proicons:call" width={18} height={18} />
                                <span>{storeData.phone}</span>
                            </button>
                            <button className="flex items-center gap-2 bg-white text-[#181211] px-5 py-2.5 rounded-full text-[14px] font-semibold hover:bg-gray-100 transition-colors shadow-md">
                                <Icon icon="bitcoin-icons:globe-outline" width={18} height={18} />
                                <span>Website</span>
                            </button>
                            <button className="flex items-center gap-2 bg-white text-[#181211] px-5 py-2.5 rounded-full text-[14px] font-semibold hover:bg-gray-100 transition-colors shadow-md">
                                <Icon icon="ix:about" width={18} height={18} />
                                <span>About</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Store Description - Below banner */}
                <div className="flex justify-end px-30 w-[108%]">
                    <div className="w-[250px]"></div>
                    <p className="mt-5 text-[#777777] font-normal text-sm">
                        {storeData.description}
                    </p>
                </div>
            </div>

            {/* Products Section */}
            <div className="px-10 mt-30 pb-10">
                {/* Filter Bar */}
                <div className="flex items-center gap-3 mb-4.5" >

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
                        Best Seller
                    </button>
                    <div className=" w-[22%] ml-auto">
                        <Select
                            options={sortOptions}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            placeholder="Select your country"

                        />
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                    {products.map((product) => (
                        <div key={product.id} className="w-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-10 mt-3 mb-7">
                <div className="flex items-center justify-between mb-7">
                    <h2 className="text-2xl font-bold text-[#181211]">Similar Store</h2>
                    <button onClick={() => navigate('/store/storeslists')} className="flex items-center gap-2 text-[#E93E2B] font-semibold text-sm hover:opacity-80 transition-opacity cursor-pointer">
                        View All <Icon icon="streamline:next" width={17} height={17} />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                    {stores.map(store => (
                        <div key={store.id} className="w-full">
                            <StoreCard store={store} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StoreDetails;
