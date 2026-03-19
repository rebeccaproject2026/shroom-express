import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Search,
    Heart,
    ShoppingCart,
} from 'lucide-react';
import { Icon } from '@iconify/react';
import shroomLogo from "../../assets/images/Logo.png";
import microDosingImg from "../../assets/images/microdosing.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import creativeBoostImg from "../../assets/images/creative boost.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import focusClarityImg from "../../assets/images/focusclarity.png";
import deepJourneyImg from "../../assets/images/deepjourney.png";

const StickyHeader = ({ cartCount = 0, onCartClick }) => {
    const [deliveryMethod, setDeliveryMethod] = useState('delivery');
    const location = useLocation();
    const isHomePage = location.pathname === '/store' || location.pathname === '/store/';

    const categories = [
        { name: 'Magic Mushrooms', icon: "hugeicons:mushroom" },
        { name: 'Microdose', icon: "streamline-plump:tablet-capsule" },
        { name: 'Edibles', icon: "hugeicons:mushroom-01" },
        { name: 'Deals', icon: "streamline-plump:leaf-protect" },
        { name: 'Stores', icon: "streamline:shopping-store-2-store-shop-shops-stores" },
    ];

    const categoryIcons = [
        { name: 'Micro dosing', img: microDosingImg },
        { name: 'Beginner Friendly', img: beginnerFriendlyImg },
        { name: 'High Potency', img: highPotencyImg },
        { name: 'Creative Boost', img: creativeBoostImg },
        { name: 'Relax & Chill', img: relaxChillImg },
        { name: 'Visual Experience', img: visualExperienceImg },
        { name: 'Focus & Clarity', img: focusClarityImg },
        { name: 'Deep Journey', img: deepJourneyImg },
    ];

    return (
        <header className={`${isHomePage ? 'relative' : 'fixed top-0 left-0 right-0'} z-[100] bg-white  flex flex-col w-full font-sans`}>
            {/* SECTION 1: Top Red Bar */}
            <div className="bg-[var(--store-primary)] text-white text-sm py-2 px-4 flex justify-center items-center gap-6">
                <Link to="" className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium">
                    <Icon icon="clarity:store-line" width={17} height={17} />

                    <span>Open Store</span>
                </Link>
                <div className="w-px h-5 bg-[#FFFFFFCC]"></div>
                <Link to="" className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium">
                    <Icon icon="fluent-mdl2:car" width={17} height={17} />
                    <span>Become Driver</span>
                </Link>
                <div className="w-px h-5 bg-[#FFFFFFCC]"></div>
                <Link to="/store/login" className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium">
                    <Icon icon="hugeicons:user-02" width={17} height={17} />
                    <span>Login / Register</span>
                </Link>
            </div>

            {/* SECTION 2: Main Header */}
            <div className="container mx-auto px-6 py-2 flex items-center justify-between gap-6">
                {/* Logo and Toggle Group */}
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link to="/store" className="flex flex-col items-center justify-center shrink-0">
                        <div className="flex justify-center my-2">
                            <img
                                src={shroomLogo}
                                alt="shroomLogo"
                                className="h-12 w-auto cursor-pointer"
                            />
                        </div>
                    </Link>

                    {/* Delivery/Shipping Toggle */}
                    <div className="hidden lg:flex items-center bg-white border border-[#D1D5DB] rounded-full p-0.5 shadow-sm shrink-0">
                        <button
                            onClick={() => setDeliveryMethod('delivery')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[15px] font-semibold transition-colors cursor-pointer ${deliveryMethod === 'delivery'
                                ? 'bg-[var(--store-primary)] text-white shadow-md'
                                : 'text-[#222222] '
                                }`}
                        >
                            <Icon icon="hugeicons:truck-delivery" width={24} height={24} />

                            <span>Delivery</span>
                        </button>
                        <button
                            onClick={() => setDeliveryMethod('shipping')}
                            className={`flex items-center gap-2 px-4 cursor-pointer py-2 rounded-full text-[15px] font-semibold transition-colors ${deliveryMethod === 'shipping'
                                ? 'bg-[var(--store-primary)] text-white shadow-md'
                                : 'text-[#222222]'
                                }`}
                        >
                            <Icon icon="stash:pin-place-duotone" width={25} height={25} />
                            <span>Shipping</span>
                        </button>
                    </div>
                </div>

                {/* Center: Search Bar */}
                <div className="flex-1 max-w-xl px-4 hidden md:block">
                    <div className="relative flex items-center w-full h-12 rounded-full border border-gray-300 bg-white overflow-hidden transition-all shadow-sm">
                        <div className="pl-5 text-[#636363]">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Products, Stores"
                            className="w-full h-full px-4 text-sm text-gray-700 outline-none placeholder-[#636363] placeholder:text-center placeholder:leading-4"
                        />
                    </div>
                </div>

                {/* Right: Wishlist & Cart */}
                <div className="flex items-center gap-12 shrink-0">
                    <button className="flex items-center gap-2 text-[#181211] hover:text-[var(--store-primary)] transition-colors">
                        <Icon icon="mdi:heart-outline" width={26} height={26} strokeWidth={2} />

                        <span className="text-sm font-semibold hidden sm:inline">Wishlist</span>
                    </button>

                    <div className="w-px h-5 bg-[#181211] hidden sm:block"></div>

                    <button onClick={onCartClick} className="flex items-center gap-2 text-[#181211] hover:text-[var(--store-primary)] transition-colors relative">
                        <div className="relative">
                            <Icon icon="mdi:cart-outline" width={26} height={26} strokeWidth={2} />
                            <span className="absolute -top-2 -right-2 bg-[var(--store-primary)] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                {cartCount}
                            </span>
                        </div>
                        <span className="text-sm font-semibold   hidden sm:inline">My Cart</span>
                    </button>
                </div>
            </div>

            {/* SECTION 3: Category Navigation */}
            <div className="w-full border-t border-b border-[#E5DCDC]">
                <div className="container mx-auto px-4">
                    <ul className="flex items-center justify-center space-x-12 h-10 overflow-x-auto no-scrollbar">
                        {categories.map((cat, idx) => {
                            const categoryPath = `/store/category/${cat.name.toLowerCase().replace(' ', '-')}`;
                            const isActive = location.pathname === categoryPath;

                            return (
                                <li key={idx} className="shrink-0 flex items-center justify-center">
                                    <Link
                                        to={categoryPath}
                                        className={`flex items-center gap-2 text-[15px] font-bold transition-colors py-2 ${isActive
                                            ? 'text-[var(--store-primary)]'
                                            : 'text-[#181211] hover:text-[var(--store-primary)]'
                                            }`}
                                    >
                                        <Icon
                                            icon={cat.icon}
                                            width={18}
                                            height={18}
                                        />
                                        <span>{cat.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* SECTION 4: Category Icons Row */}
            <div className="w-full bg-[#FFFFFF]">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-center gap-10 overflow-x-auto no-scrollbar pb-1">
                        {categoryIcons.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2.5 shrink-0 cursor-pointer group">
                                <div className="w-[58px] h-[58px] rounded-full bg-white flex items-center justify-center border border-[#E8E8E8] overflow-hidden ">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-sm font-semibold text-[#181211] whitespace-nowrap group-hover:text-[var(--store-primary)] transition-colors">
                                    {item.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default StickyHeader;
