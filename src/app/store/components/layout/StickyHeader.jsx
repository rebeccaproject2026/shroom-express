import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Search,
} from 'lucide-react';
import { Icon } from '@iconify/react';
import shroomLogo from "../../assets/images/Logo.png";
import microDosingImg from "../../assets/images/microdosing.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import creativeBoostImg from "../../assets/images/creativeboost.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import focusClarityImg from "../../assets/images/focusclarity.png";
import deepJourneyImg from "../../assets/images/deepjourney.png";
import { allProducts } from '../../data/productsData';
import { useCategory } from '../../context/CategoryContext';
import { useAuth } from '../../context/AuthContext';

const StickyHeader = ({ cartCount = 0, onCartClick, wishlistCount = 0 }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/store' || location.pathname === '/store/';
    const { selectedEffect, toggleEffect, deliveryMethod, setDeliveryMethod } = useCategory();
    const { user, logout } = useAuth();
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef(null);

    const allStores = [
        { id: 1, name: "micro zoomiez", type: 'store' },
        { id: 2, name: "The Mushroom", type: 'store' },
        { id: 3, name: "Psilovibin", type: 'store' },
        { id: 4, name: "Shroom Express", type: 'store' },
        { id: 5, name: "Shroom For Sale", type: 'store' },
        { id: 6, name: "Magic Mushroom Delivery", type: 'store' },
        { id: 7, name: "Planet 51", type: 'store' },
        { id: 8, name: "Toronto Magic Store", type: 'store' },
        { id: 9, name: "Magic Mushroom Danforth", type: 'store' },
    ];

    const searchResults = searchQuery.trim().length > 1 ? [
        ...allProducts
            .filter(p => (p.title || p.name || '').toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 4)
            .map(p => ({ id: p.id, name: p.title || p.name, image: p.image, type: 'product', vendor: p.vendor })),
        ...allStores
            .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 3),
    ] : [];

    const handleSelect = (result) => {
        setSearchQuery('');
        setSearchOpen(false);
        if (result.type === 'product') navigate(`/store/product/${result.id}`);
        else navigate(`/store/storeslists/${result.id}`);
    };

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
                setProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

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
                <Link to="/store/create-store" className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium">
                    <Icon icon="clarity:store-line" width={17} height={17} />
                    <span>Open Store</span>
                </Link>
                <div className="w-px h-5 bg-[#FFFFFFCC]"></div>
                <Link to="" className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium">
                    <Icon icon="fluent-mdl2:car" width={17} height={17} />
                    <span>Become Driver</span>
                </Link>
                <div className="w-px h-5 bg-[#FFFFFFCC]"></div>
                {user ? (
                    <div className="relative" ref={profileMenuRef}>
                        <button
                            onClick={() => setProfileMenuOpen(prev => !prev)}
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium"
                        >
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <span>{user.name}</span>
                            <Icon icon={profileMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down"} width={16} height={16} />
                        </button>

                        {profileMenuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-[0px_8px_32px_rgba(0,0,0,0.12)] border border-[#F1F5F9] z-[200] overflow-hidden">
                                {/* User info */}
                                <div className="px-4 py-3 border-b border-[#F1F5F9]">
                                    <p className="text-sm font-bold text-[#181211] truncate">{user.name}</p>
                                    <p className="text-xs text-[#94A3B8] truncate">{user.email}</p>
                                </div>

                                {/* Menu items */}
                                {[
                                    { label: "My Account", icon: "hugeicons:user-02", path: "/store/myaccount?tab=profile" },
                                    { label: "My Orders", icon: "mdi:package-variant-closed", path: "/store/myaccount?tab=orders" },
                                    { label: "Wishlist", icon: "ion:heart-outline", path: "/store/myaccount?tab=wishlist" },
                                    { label: "Payment Method", icon: "streamline-plump:payment-recieve-7", path: "/store/myaccount?tab=payment" },
                                ].map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => { setProfileMenuOpen(false); navigate(item.path); }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#181211] hover:bg-[#FAF8F5] transition-colors ${location.pathname === item.path ? 'bg-[#FFF0EE] text-[#E93E2B]' : ''}`}
                                    >
                                        <Icon icon={item.icon} width={17} height={17} className={location.pathname === item.path ? 'text-[#E93E2B]' : 'text-[#64748B]'} />
                                        {item.label}
                                    </button>
                                ))}

                                {/* Logout */}
                                <div className="border-t border-[#F1F5F9]">
                                    <button
                                        onClick={() => { logout(); setProfileMenuOpen(false); navigate('/store'); }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#E93E2B] hover:bg-[#FFF0EE] transition-colors"
                                    >
                                        <Icon icon="hugeicons:logout-02" width={17} height={17} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/store/login" className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium">
                        <Icon icon="hugeicons:user-02" width={17} height={17} />
                        <span>Login / Register</span>
                    </Link>
                )}
            </div>

            {/* SECTION 2: Main Header */}
            <div className="container mx-auto px-4 py-1 flex items-center justify-between gap-5">
                {/* Left: Logo and Toggle Group */}
                <div className="flex flex-1 items-center justify-start gap-5">
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
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full text-[15px] font-semibold transition-colors cursor-pointer ${deliveryMethod === 'delivery'
                                ? 'bg-[var(--store-primary)] text-white shadow-md'
                                : 'text-[#222222] '
                                }`}
                        >
                            <Icon icon="hugeicons:truck-delivery" width={24} height={24} />

                            <span>Delivery</span>
                        </button>
                        <button
                            onClick={() => setDeliveryMethod('shipping')}
                            className={`flex items-center gap-2 px-2 cursor-pointer py-1.5 rounded-full text-[15px] font-semibold transition-colors ${deliveryMethod === 'shipping'
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
                <div className="w-full max-w-[40rem] hidden md:block" ref={searchRef}>
                    <div className="relative">
                        <div className="relative flex items-center w-full h-11 rounded-full border border-gray-300 bg-white overflow-hidden transition-all shadow-sm">
                            <div className="pl-5 text-[#636363]">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search Products, Stores"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                                onFocus={() => setSearchOpen(true)}
                                className="w-full h-full px-4 text-sm text-gray-700 outline-none placeholder-[#636363] placeholder:text-center placeholder:leading-4"
                            />
                            {searchQuery && (
                                <button onClick={() => { setSearchQuery(''); setSearchOpen(false); }} className="pr-4 text-[#999] hover:text-[#E93E2B]">
                                    <Icon icon="mdi:close" width={18} />
                                </button>
                            )}
                        </div>

                        {/* Dropdown results */}
                        {searchOpen && searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#F1F5F9] z-[200] overflow-hidden">
                                {/* Products */}
                                {searchResults.filter(r => r.type === 'product').length > 0 && (
                                    <div>
                                        <p className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase px-4 pt-3 pb-1">Products</p>
                                        {searchResults.filter(r => r.type === 'product').map(r => (
                                            <div
                                                key={`p-${r.id}`}
                                                onClick={() => handleSelect(r)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFF5F4] cursor-pointer transition-colors"
                                            >
                                                <div className="w-9 h-9 rounded-lg bg-[#F5F0EB] overflow-hidden shrink-0">
                                                    <img src={r.image} alt={r.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-[#181211] truncate">{r.name}</p>
                                                    <p className="text-xs text-[#94A3B8] truncate">{r.vendor}</p>
                                                </div>
                                                <Icon icon="mdi:arrow-top-left" width={14} className="text-[#BDBDBD] ml-auto shrink-0" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* Stores */}
                                {searchResults.filter(r => r.type === 'store').length > 0 && (
                                    <div className="border-t border-[#F1F5F9]">
                                        <p className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase px-4 pt-3 pb-1">Stores</p>
                                        {searchResults.filter(r => r.type === 'store').map(r => (
                                            <div
                                                key={`s-${r.id}`}
                                                onClick={() => handleSelect(r)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFF5F4] cursor-pointer transition-colors"
                                            >
                                                <div className="w-9 h-9 rounded-lg bg-[#F5F0EB] flex items-center justify-center shrink-0">
                                                    <Icon icon="streamline:shopping-store-2-store-shop-shops-stores" width={18} className="text-[#E93E2B]" />
                                                </div>
                                                <p className="text-sm font-semibold text-[#181211] truncate flex-1">{r.name}</p>
                                                <Icon icon="mdi:arrow-top-left" width={14} className="text-[#BDBDBD] shrink-0" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="px-4 py-2.5 border-t border-[#F1F5F9]">
                                    <button
                                        onClick={() => { navigate('/store/storeslists'); setSearchOpen(false); }}
                                        className="text-xs font-semibold text-[#E93E2B] hover:underline"
                                    >
                                        View all results for "{searchQuery}"
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* No results */}
                        {searchOpen && searchQuery.trim().length > 1 && searchResults.length === 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#F1F5F9] z-[200] px-4 py-5 text-center">
                                <p className="text-sm text-[#94A3B8] font-medium">No results for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Wishlist & Cart */}
                <div className="flex flex-1 items-center justify-end gap-12 shrink-0">
                    <button
                        onClick={() => navigate('/store/myaccount?tab=wishlist')}
                        className="flex items-center cursor-pointer gap-2 text-[#181211] hover:text-[var(--store-primary)] transition-colors relative"
                    >
                        <div className="relative">
                            <Icon icon="mdi:heart-outline" width={26} height={26} strokeWidth={2} />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[var(--store-primary)] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {wishlistCount}
                                </span>
                            )}
                        </div>
                        <span className="text-sm font-semibold hidden sm:inline">Wishlist</span>
                    </button>

                    <div className="w-px h-5 bg-[#181211] hidden sm:block"></div>

                    <button onClick={onCartClick} className="flex items-center gap-2 text-[#181211] hover:text-[var(--store-primary)] cursor-pointer transition-colors relative">
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
                    <ul className="flex items-center justify-center space-x-12 h-10 w-full relative z-30">
                        {categories.map((cat, idx) => {
                            const categoryPath = cat.name === 'Stores'
                                ? '/store/storeslists'
                                : cat.name === 'Deals'
                                ? '/store/deals'
                                : `/store/category/${cat.name.toLowerCase().replace(' ', '-')}`;

                            const effectSlugs = ['micro-dosing', 'beginner-friendly', 'high-potency', 'creative-boost', 'relax-and-chill', 'visual-experience', 'focus-and-clarity', 'deep-journey'];
                            const isEffectSlug = effectSlugs.some(s => location.pathname === `/store/category/${s}`);
                            const isActive = location.pathname === categoryPath ||
                                (cat.name === 'Magic Mushrooms' && isEffectSlug);

                            if (!isHomePage && ['Magic Mushrooms', 'Microdose', 'Edibles'].includes(cat.name)) {
                                return (
                                    <li key={idx} className="shrink-0 flex items-center justify-center relative group">
                                        <div
                                            className={`flex items-center gap-2 text-[15px] font-bold transition-colors py-2 cursor-pointer ${isActive ? 'text-[var(--store-primary)]' : 'text-[#181211] hover:text-[var(--store-primary)]'}`}
                                        >
                                            <Icon icon={cat.icon} width={18} height={18} />
                                            <span>{cat.name}</span>
                                            <Icon icon="mdi:chevron-down" width={20} height={20} className="ml-0.5 group-hover:rotate-180 transition-transform duration-300" />
                                        </div>

                                        {/* Dropdown Menu */}
                                        <div className="absolute top-10 left-1/2 -translate-x-1/2 pt-2 w-56 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all z-50">
                                            <div className="bg-white border border-[#E5DCDC] shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-lg flex flex-col pt-1 pb-1 relative">
                                                {/* Arrow pointer */}
                                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-[#E5DCDC] rotate-45"></div>
                                                
                                                <Link 
                                                    to={categoryPath} 
                                                    className="px-5 py-3 text-[15px] text-[#181211] hover:bg-[#FFF5F4] hover:text-[#E93E2B] font-semibold border-b border-[#F1F5F9] transition-colors relative z-10"
                                                >
                                                    All ({cat.name})
                                                </Link>
                                                {categoryIcons.map((subItem, sIdx) => {
                                                    const slug = subItem.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
                                                    const iconPath = `${categoryPath}?effect=${slug}`;
                                                    return (
                                                        <Link 
                                                            key={sIdx}
                                                            to={iconPath}
                                                            className="px-5 py-3 text-[14px] text-[#444444] hover:bg-[#FFF5F4] border-[#F1F5F9] border-b last:border-0 hover:text-[#E93E2B] font-medium transition-colors relative z-10"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </li>
                                );
                            }

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
            {isHomePage && (
            <div className="w-full bg-[#FFFFFF]">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-center gap-10 overflow-x-auto no-scrollbar pb-1">
                        {categoryIcons.map((item, idx) => {
                            const slug = item.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
                            const iconPath = `/store/category/${slug}`;
                            const isActiveRoute = location.pathname === iconPath;
                            const isActiveContext = selectedEffect === item.name;
                            const isActive = isActiveRoute || isActiveContext;

                            const handleIconClick = () => {
                                toggleEffect(item.name);
                            };

                            return (
                                <div
                                    key={idx}
                                    onClick={handleIconClick}
                                    className="flex flex-col items-center gap-2.5 shrink-0 cursor-pointer group"
                                >
                                    <div className={`w-[58px] h-[58px] rounded-full flex items-center justify-center border overflow-hidden transition-colors bg-white border-[#E8E8E8]`}>
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className={`text-sm font-semibold whitespace-nowrap transition-colors ${isActive ? 'text-[var(--store-primary)]' : 'text-[#181211] group-hover:text-[var(--store-primary)]'}`}>
                                        {item.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            )}
        </header>
    );
};

export default StickyHeader;
