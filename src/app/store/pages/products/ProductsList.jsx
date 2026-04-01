/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import StoreCard from '../../components/common/StoreCard';
import Select from '../../components/common/Select';
import FilterDrawer from '../../components/products/FilterDrawer';
import { useCategory } from '../../context/CategoryContext';
import albinoChodaImg from "../../assets/images/Albinochoda.png";
import Aztecgod from "../../assets/images/Aztecgod.png";
import albinohillbilyImg from "../../assets/images/Albinohillbilly.png";
import albinopenisenvyImg from "../../assets/images/Albinopenisenvy.png";
import AmazonianImg from "../../assets/images/Amazonian.png";
import Jackfrost from "../../assets/images/Jackfrost.png";
import Bluemeanies from "../../assets/images/Bluemeanies.png";
import Penisenvy from "../../assets/images/Penisenvy.png";
import Shakti from "../../assets/images/Shakti.png";
import Tidalwave from "../../assets/images/Tidalwave.png";
import Trinity from "../../assets/images/Trinity.png";
import Truealbinoteacher from "../../assets/images/Truealbinoteacher.png";
import storecard1 from "../../assets/images/storecard1.png";
import background from "../../assets/images/background1.png";
import storecard2 from "../../assets/images/storecard2.png";
import background2 from "../../assets/images/background2.png";
import storecard3 from "../../assets/images/storecard3.png";
import background3 from "../../assets/images/background3.png";
import creativeBoostImg from "../../assets/images/creativeboost.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import microDosingImg from "../../assets/images/microdosing.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import focusClarityImg from "../../assets/images/focusclarity.png";
import deepjourneyImg from "../../assets/images/deepjourney.png";

const ProductsList = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { selectedEffect } = useCategory();
    const [sortBy, setSortBy] = useState('popularity');
    const [filterOpen, setFilterOpen] = useState(false);
    const [activeExpressDelivery, setActiveExpressDelivery] = useState(false);
    const [activeDelivery, setActiveDelivery] = useState(false);
    const [activeBestSeller, setActiveBestSeller] = useState(false);
    const [storeSearch, setStoreSearch] = useState('');
    const [drawerFilters, setDrawerFilters] = useState({ onSale: false, inStock: false, priceRange: [0, 200], selectedCategory: 'All' });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const effectQuery = queryParams.get('effect');

    // Category title mapping - only for main nav categories, effect slugs keep parent title
    const categoryTitles = {
        'magic-mushrooms': 'The Magic Mushrooms',
        'microdose': 'Microdose',
        'edibles': 'Edibles',
        'deals': 'Deals',
    };

    const pageTitle = categoryTitles[category] || 'The Magic Mushrooms';

    // Sort options
    const sortOptions = [
        { value: 'popularity', label: 'Sort by popularity' },
        { value: 'rating', label: 'Sort by average rating' },
        { value: 'latest', label: 'Sort by latest' },
        { value: 'price-low', label: 'Sort by Price: low to high' },
        { value: 'price-high', label: 'Sort by Price: high to low' },
    ];

    // Mock products
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const products = [
        {
            id: 1,
            badge: { text: "BEST SELLER", colorClass: "bg-[#E93E2B]" },
            isWishlisted: false, inStock: true, onSale: true,
            image: albinoChodaImg,
            title: "Albino Choda",
            vendor: "Green Valley Organics",
            rating: '4.9',
            weights: ['3g', '10g'],
            price: 50.00,
            categories: ["Microdosing", "Creative Boost"],
            effects: [
                { image: creativeBoostImg, name: "Creative Boost" },
                { image: microDosingImg, name: "Microdosing" }
            ]
        },
        {
            id: 2,
            badge: { text: "NEW", colorClass: "bg-[#059669]" },
            isWishlisted: true, inStock: true, onSale: false,
            image: albinohillbilyImg,
            title: "Albino Hillbilly",
            vendor: "Aether Mushroom Labs",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 50.00,
            categories: ["High Potency", "Visual Experience"],
            effects: [
                { image: highPotencyImg, name: "High Potency" },
                { image: visualExperienceImg, name: "Visual Experience" }
            ]
        },
        {
            id: 3,
            badge: { text: "NEW", colorClass: "bg-[#059669]" },
            isWishlisted: true, inStock: false, onSale: false,
            image: albinopenisenvyImg,
            title: "Albino Penis Envy",
            vendor: "Elevated Solstice",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 55.00,
            categories: ["High Potency", "Visual Experience"],
            effects: [
                { image: highPotencyImg, name: "High Potency" },
                { image: visualExperienceImg, name: "Visual Experience" }
            ]
        },
        {
            id: 4,
            badge: null,
            isWishlisted: false, inStock: true, onSale: true,
            image: Aztecgod,
            title: "Aztec God",
            vendor: "Green Valley Organics",
            rating: '4.7',
            weights: ['3g', '10g'],
            price: 45.00,
            categories: ["Focus & Clarity", "Relax & Chill"],
            effects: [
                { image: focusClarityImg, name: "Focus & Clarity" },
                { image: relaxChillImg, name: "Relax & Chill" }
            ]
        },
        {
            id: 5,
            badge: null,
            isWishlisted: false, inStock: true, onSale: false,
            image: Bluemeanies,
            title: "Blue Meanies",
            vendor: "Green Valley Organics",
            rating: '4.9',
            weights: ['3g', '10g'],
            price: 50.00,
            categories: ["Creative Boost", "Visual Experience"],
            effects: [{ image: creativeBoostImg, name: "Creative Boost" }, { image: visualExperienceImg, name: "Visual Experience" }]
        },
        {
            id: 6,
            badge: null,
            isWishlisted: false, inStock: false, onSale: false,
            image: Penisenvy,
            title: "Penis Envy",
            vendor: "Aether Mushroom Labs",
            rating: '4.8',
            weights: ['3g', '10g'],
            price: 50.00,
            categories: ["Beginner Friendly", "Microdosing"],
            effects: [
                { image: beginnerFriendlyImg, name: "Beginner Friendly" },
                { image: microDosingImg, name: "Microdosing" }
            ]
        },
        {
            id: 7,
            badge: { text: "NEW", colorClass: "bg-[#059669]" },
            isWishlisted: true, inStock: true, onSale: true,
            image: Shakti,
            title: "Shakti",
            vendor: "Elevated Solstice",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 55.00,
            categories: ["High Potency", "Deep Journey"],
            effects: [{ image: highPotencyImg, name: "High Potency" }, { image: deepjourneyImg, name: "Deep Journey" }]
        },
        {
            id: 8,
            badge: null,
            isWishlisted: false, inStock: true, onSale: false,
            image: Tidalwave,
            title: "Tidal Wave",
            vendor: "Green Valley Organics",
            rating: '4.8',
            weights: ['3g', '10g'],
            price: 50.00,
            categories: ["Beginner Friendly", "Microdosing"],
            effects: [
                { image: beginnerFriendlyImg, name: "Beginner Friendly" },
                { image: microDosingImg, name: "Microdosing" }
            ]
        },
        {
            id: 9,
            badge: null,
            isWishlisted: false, inStock: true, onSale: true,
            image: Trinity,
            title: "Trinity",
            vendor: "Green Valley Organics",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 50.00,
            categories: ["Creative Boost", "Microdosing"],
            effects: [{ image: creativeBoostImg, name: "Creative Boost" }, { image: microDosingImg, name: "Microdosing" }]
        },
        {
            id: 10,
            badge: null,
            isWishlisted: false, inStock: false, onSale: false,
            image: Truealbinoteacher,
            title: "True Albino Teacher",
            vendor: "Aether Mushroom Labs",
            rating: '4.7',
            weights: ['3g', '10g'],
            price: 45.00,
            categories: ["Focus & Clarity", "Relax & Chill"],
            effects: [
                { image: focusClarityImg, name: "Focus & Clarity" },
                { image: relaxChillImg, name: "Relax & Chill" }
            ]
        },
        {
            id: 11,
            badge: { text: "NEW", colorClass: "bg-[#059669]" },
            isWishlisted: true, inStock: true, onSale: false,
            image: AmazonianImg,
            title: "Amazonian",
            vendor: "Elevated Solstice",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 50.00,
            categories: ["High Potency"],
            effects: [{ image: highPotencyImg, name: "High Potency" }]
        },
        {
            id: 12,
            badge: null,
            isWishlisted: false, inStock: true, onSale: true,
            image: Jackfrost,
            title: "Jack Frost",
            vendor: "Green Valley Organics",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 45.00,
            categories: ["Creative Boost", "Microdosing"],
            effects: [{ image: creativeBoostImg, name: "Creative Boost" }, { image: microDosingImg, name: "Microdosing" }]
        },
    ];

    // Mock stores
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
            isPrimary: false,
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
        }
    ];

    const filteredProducts = useMemo(() => {
        let list = [...products];

        // Filter by URL category param (effect-based icon categories)
        const effectCategories = ['micro-dosing', 'beginner-friendly', 'high-potency', 'creative-boost', 'relax-and-chill', 'visual-experience', 'focus-and-clarity', 'deep-journey'];
        const slugToName = {
            'micro-dosing': 'Microdosing',
            'beginner-friendly': 'Beginner Friendly',
            'high-potency': 'High Potency',
            'creative-boost': 'Creative Boost',
            'relax-and-chill': 'Relax & Chill',
            'visual-experience': 'Visual Experience',
            'focus-and-clarity': 'Focus & Clarity',
            'deep-journey': 'Deep Journey',
        };

        if (effectCategories.includes(category)) {
            // Convert slug back to display name for matching
            const targetCategory = slugToName[category];
            if (targetCategory) list = list.filter(p => p.categories?.includes(targetCategory));
        }

        // Filter by query string effect mapping
        if (effectQuery && effectCategories.includes(effectQuery)) {
            const targetEffect = slugToName[effectQuery];
            if (targetEffect) list = list.filter(p => p.categories?.includes(targetEffect));
        }

        // Filter by context selectedEffect (from header icon click, no URL change)
        if (selectedEffect) {
            // "Micro dosing" in header maps to "Microdosing" in product data
            const effectAlias = selectedEffect === 'Micro dosing' ? 'Microdosing' : selectedEffect;
            list = list.filter(p => p.categories?.includes(effectAlias));
        }

        // Drawer filters
        if (drawerFilters.inStock) list = list.filter(p => p.inStock !== false);
        if (drawerFilters.onSale) list = list.filter(p => p.onSale === true);
        if (drawerFilters.selectedCategory && drawerFilters.selectedCategory !== 'All') {
            const catAlias = drawerFilters.selectedCategory === 'Micro dosing' ? 'Microdosing' : drawerFilters.selectedCategory;
            list = list.filter(p => p.categories?.includes(catAlias));
        }
        if (drawerFilters.priceRange) {
            list = list.filter(p => p.price >= drawerFilters.priceRange[0] && p.price <= drawerFilters.priceRange[1]);
        }

        if (activeExpressDelivery) list = list.filter(p => p.vendor === 'Elevated Solstice' || p.vendor === 'Aether Mushroom Labs');
        if (activeDelivery) list = list.filter(p => p.categories?.some(c => c === 'Beginner Friendly' || c === 'Microdosing'));
        if (activeBestSeller) list = list.filter(p => p.badge?.text === 'BEST SELLER');
        if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price);
        else if (sortBy === 'rating') list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        else if (sortBy === 'latest') list.sort((a, b) => b.id - a.id);
        return list;
    }, [activeExpressDelivery, activeDelivery, activeBestSeller, sortBy, products, category, effectQuery, selectedEffect, drawerFilters]);

    const filteredStores = useMemo(() =>
        stores.filter(s =>
            s.name.toLowerCase().includes(storeSearch.toLowerCase()) ||
            s.location.toLowerCase().includes(storeSearch.toLowerCase())
        ), [storeSearch, stores]);

    const activeFilterCount = [activeExpressDelivery, activeDelivery, activeBestSeller].filter(Boolean).length;

    return (
        <div className="w-full px-4 sm:px-6 lg:px-12 pt-10 sm:pt-16 md:pt-18">
            <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} onApply={setDrawerFilters} />

            {/* Page Header */}
            <div className="bg-transparent lg:bg-white lg:rounded-[20px] p-0 lg:p-12 mb-8 border-0 lg:border border-[#E5DCDC]">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0F3540] mb-3">{pageTitle}</h1>

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-base sm:text-lg mb-4">
                    <button onClick={() => navigate('/store')} className="text-[var(--store-primary)] hover:underline font-semibold cursor-pointer">
                        Home
                    </button>
                    <span className="text-[#BDBDBD]">/</span>
                    <span className="text-[#181211] font-semibold">{pageTitle}</span>
                </div>

                {/* Description */}
                <p className="text-[#777777] text-sm tracking-wide leading-relaxed font-normal">
                    Magic mushrooms are natural fungi containing psilocybin, a compound known for its psychoactive effects. For centuries, they have been used in traditional spiritual and cultural practices. When consumed, they can alter perception, mood, and thinking patterns, often leading to introspection and heightened awareness. In recent years, scientific research from institutions like Johns Hopkins University has explored their potential role in mental health treatments under controlled settings. While interest continues to grow, laws regarding magic mushrooms vary by region. Understanding their effects, risks, and legal status is essential before considering their use.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column - Products (3/4 width) */}
                <div className="lg:col-span-3 lg:pr-8 lg:border-r lg:border-[#E8E8E8]">
                    {/* Most Popular Mushroom Section */}
                    <div className="mb-8">
                        <h2 className="text-[20px] sm:text-[22px] font-bold text-[#181211] mb-6">Most popular Mushroom</h2>

                        {/* Filter Bar */}
                        <div className="flex items-center justify-between gap-4 mb-8">
                            {/* Filter Button with Badge */}
                            <button
                                onClick={() => setFilterOpen(true)}
                                className="flex items-center gap-2 px-4 h-11 rounded-full bg-[#E93E2B] text-white font-bold cursor-pointer transition-transform active:scale-95 shrink-0"
                            >
                                <Icon icon="mage:filter" width={20} />
                                <span className="bg-white text-[#E93E2B] text-[13px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {activeFilterCount || 1}
                                </span>
                            </button>

                            {/* Quick Pills - Desktop Only */}
                            <div className="hidden sm:flex items-center gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1">
                                <button
                                    onClick={() => setActiveExpressDelivery(p => !p)}
                                    className={`px-5 h-11 rounded-full border text-[14px] font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${activeExpressDelivery ? 'bg-[#E93E2B] text-white border-[#E93E2B]' : 'bg-white border-[#E8E8E8] text-[#181211]'}`}
                                >
                                    Express Delivery
                                </button>
                                <button
                                    onClick={() => setActiveBestSeller(p => !p)}
                                    className={`px-5 h-11 rounded-full border text-[14px] font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${activeBestSeller ? 'bg-[#E93E2B] text-white border-[#E93E2B]' : 'bg-white border-[#E8E8E8] text-[#181211]'}`}
                                >
                                    Best Seller
                                </button>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="flex-1 sm:w-64 sm:flex-none sm:ml-auto">
                                <Select
                                    options={sortOptions}
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="h-11 font-semibold text-sm"
                                />
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="px-0">

                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7">
                                {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                                    <div key={product.id} className="w-full">
                                        <ProductCard product={{ ...product, isVerticalOnMobile: true, isOverlayEffects: true }} />
                                    </div>
                                )) : (
                                    <div className="col-span-3 flex flex-col items-center justify-center py-16 text-center">
                                        <Icon icon="mdi:package-variant-remove" width={48} className="text-[#E5DCDC] mb-3" />
                                        <p className="text-sm font-semibold text-[#BDBDBD]">No products match the selected filters</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Trending Stores */}
                <div className="lg:col-span-1 mt-12 lg:mt-0">
                    <div className="mb-6">
                        {/* Trending Store Header */}
                        <div className="flex items-center justify-between mb-4.5">
                            <h2 className="text-[22px] font-bold text-[#181211]">Trending Store</h2>
                            <button onClick={() => navigate('/store/storeslists')} className="text-[var(--store-primary)] font-semibold text-base hover:opacity-80 transition-opacity cursor-pointer mr-2">
                                View All
                            </button>
                        </div>

                        {/* Search Store Input */}
                        <div className='px-2 py-2'>
                            <div className="mb-4.5 hidden lg:block">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search Store"
                                        value={storeSearch}
                                        onChange={(e) => setStoreSearch(e.target.value)}
                                        className="w-full px-5 h-[40px] rounded-full bg-[#FFFFFF] border border-[#E8E8E8]  text-[15px] font-semibold text-[#222222]  placeholder-[#222222] focus:outline-none focus:ring-2 focus:ring-[var(--store-primary)] focus:border-transparent"
                                    />
                                    <Icon icon="mdi:magnify" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width={20} height={20} />
                                </div>
                            </div>
                            {/* Stores List - Horizontal Scroll on Mobile, Vertical on Desktop */}
                            <div className="flex flex-row lg:flex-col gap-5 sm:gap-7 overflow-x-auto lg:overflow-visible pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {filteredStores.length > 0 ? filteredStores.map(store => (
                                    <div key={store.id} className="w-[84%] sm:w-[320px] lg:w-full shrink-0">
                                        <StoreCard store={store} />
                                    </div>
                                )) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <Icon icon="streamline:shopping-store-2-store-shop-shops-shops-stores" width={36} className="text-[#E5DCDC] mb-2" />
                                        <p className="text-xs font-semibold text-[#BDBDBD]">No stores found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsList;
