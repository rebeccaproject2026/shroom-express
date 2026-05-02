import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import { allProducts } from '../../data/productsData';
import { mushroomOttawaProducts } from '../../data/mushroomOttawaProducts';
import { planet51Products } from '../../data/planet51Products';
import { psilovibinProducts } from '../../data/psilovibinProducts';
import { magicMushroomDeliveryProducts } from '../../data/magicMushroomDeliveryProducts';
import { magicMushroomDanforthProducts } from '../../data/magicMushroomDanforthProducts';
import storedetailbg from "../../assets/images/storedetailbg.jpg";
import storedetaillogo from "../../assets/images/storedetaillogo.png";
import StoreCard from '../../components/common/StoreCard';
import Select from '../../components/common/Select';
import Bg3 from '../../assets/images/bg3.svg';
import Bg2 from '../../assets/images/bg2.svg';
import Bg5 from '../../assets/images/bg5.svg';
import Bg6 from '../../assets/images/bg6.svg';
import Bg7 from '../../assets/images/bg7.svg';
import Bg8 from '../../assets/images/bg8.svg';
import Bg9 from '../../assets/images/bg9.svg';
import Bg10 from '../../assets/images/bg10.svg';
import Str3 from '../../assets/images/str3.png';
import Str2 from '../../assets/images/str2.png';
import Str5 from '../../assets/images/str5.png';
import Str6 from '../../assets/images/str6.png';
import Str7 from '../../assets/images/str7.png';
import Str8 from '../../assets/images/str8.png';
import Str9 from '../../assets/images/str9.png';
import Str10 from '../../assets/images/str10.png';
import FilterDrawer from '../../components/products/FilterDrawer';
import { useCategory } from '../../context/CategoryContext';
import { useStores } from '../../context/StoresContext';
import StoreAboutDrawer from '../../components/stores/StoreAboutDrawer';


const StoreDetails = () => {
    const navigate = useNavigate();
    const { storeId } = useParams();
    const [sortBy, setSortBy] = useState('popularity');
    const [filterOpen, setFilterOpen] = useState(false);
    const [isAboutDrawerOpen, setIsAboutDrawerOpen] = useState(false);
    const [activeDelivery, setActiveDelivery] = useState(false);
    const [activeBestSeller, setActiveBestSeller] = useState(false);
    const { selectedEffect } = useCategory();
    const { stores: contextStores } = useStores();
    const [drawerFilters, setDrawerFilters] = useState({ onSale: false, inStock: false, priceRange: [0, 200], selectedCategory: 'All' });
    // All stores data
    const allStoresData = {
        1: {
            name: "micro zoomiez",
            nameColor: "#ffffff",
            logo: storedetaillogo,
            coverImage: storedetailbg,
            description: "Forest Oasis is a premium magic mushroom wellness store inspired by the purity and mystery of the forest. Our mission is to provide high-quality, carefully sourced psilocybin mushroom products in a safe, informed, and responsible environment.",
            deliveryTime: "Under 2 Hours",
            phone: "(416)546-0998",
            website: "www.microzoomiez.com",
            rating: "4.8",
            reviewCount: "124"
        },
        2: {
            name: "The Mushroom",
            nameColor: "black",
            logo: Bg2,
            coverImage: Str2,
            description: "The Mushroom is your trusted source for premium quality psilocybin products. We pride ourselves on rigorous quality control, discreet shipping, and exceptional customer service. Every product is carefully selected and tested for potency and purity.",
            deliveryTime: "2 - 5 Hours",
            phone: "(613)555-0123",
            website: "www.themushroom.com",
            rating: "5.0",
            reviewCount: "89"
        },
        3: {
            name: "Psilovibin",
            nameColor: "black",
            logo: Bg3,
            coverImage: Str3,
            description: "Psilovibin specializes in rare and exotic mushroom strains sourced from trusted cultivators worldwide. We are committed to providing the highest quality products with complete transparency and customer satisfaction guaranteed.",
            deliveryTime: "1 - 2 Hours",
            phone: "(416)555-0456",
            website: "www.psilovibin.com",
            rating: "4.1",
            reviewCount: "210"
        },
        5: {
            name: "Shroom For Sale",
            nameColor: "#ffffff",
            logo: Bg5,
            coverImage: Str5,
            description: "Shroom For Sale offers a wide selection of premium dried and fresh mushroom products at competitive prices. Located in the heart of Toronto, we are committed to providing safe, high-quality products with fast same-day delivery.",
            deliveryTime: "Under 2 Hours",
            phone: "(416)555-0111",
            website: "www.shroomforsale.com",
            rating: "4.8",
            reviewCount: "124"
        },
        6: {
            name: "Magic Mushroom Delivery",
            nameColor: "black",
            logo: Bg6,
            coverImage: Str6,
            description: "Magic Mushroom Store is a premier destination for psilocybin enthusiasts. We carry an extensive catalog of strains, edibles, and microdose capsules, all sourced from certified cultivators with a focus on safety and quality.",
            deliveryTime: "2 - 5 Hours",
            phone: "(416)555-0222",
            website: "www.magicmushroomstore.com",
            rating: "5.0",
            reviewCount: "89"
        },
        7: {
            name: "Planet 51",
            nameColor: "white",
            logo: Bg7,
            coverImage: Str7,
            description: "Planet 51 brings you an out-of-this-world selection of magic mushroom products. Our knowledgeable staff curates only the finest strains to ensure every customer has a safe, informed, and transformative experience.",
            deliveryTime: "1 - 2 Hours",
            phone: "(416)555-0333",
            website: "www.planet51shrooms.com",
            rating: "4.1",
            reviewCount: "210"
        },
        8: {
            name: "Toronto Magic Store",
            nameColor: "white",
            logo: Bg8,
            coverImage: Str8,
            description: "Toronto Magic Store is your local go-to for premium psilocybin mushroom products. We offer a carefully curated selection of dried mushrooms, edibles, and microdose options with express delivery across the GTA.",
            deliveryTime: "1 - 3 Hours",
            phone: "(416)555-0444",
            website: "www.torontomagicstore.com",
            rating: "4.7",
            reviewCount: "340"
        },
        9: {
            name: "Magic Mushroom Danforth",
            nameColor: "#000000",
            logo: Bg9,
            coverImage: Str9,
            description: "Magic Mushroom Ottawa serves the Ottawa community with a passion for wellness and natural healing. Our store offers a diverse range of psilocybin products, from classic dried strains to innovative edibles and tinctures.",
            deliveryTime: "Under 2 Hours",
            phone: "(613)555-0555",
            website: "www.magicmushroomottawa.com",
            rating: "4.8",
            reviewCount: "124"
        },
        10: {
            name: "Danforth Weed",
            nameColor: "white",
            logo: Bg10,
            coverImage: Str10,
            description: "Danforth Weed combines a welcoming atmosphere with an exceptional product lineup. We specialize in premium mushroom strains and wellness products, serving the Danforth community with fast, discreet delivery and expert guidance.",
            deliveryTime: "2 - 5 Hours",
            phone: "(416)555-0666",
            website: "www.danforthweed.com",
            rating: "5.0",
            reviewCount: "89"
        }
    };

    // Get current store data based on storeId
    const storeData = useMemo(() => {
        return allStoresData[storeId] || allStoresData[1];
    }, [storeId]);

    // Sort options
    const sortOptions = [
        { value: 'popularity', label: 'Sort by popularity' },
        { value: 'rating', label: 'Sort by average rating' },
        { value: 'latest', label: 'Sort by latest' },
        { value: 'price-low', label: 'Sort by Price: low to high' },
        { value: 'price-high', label: 'Sort by Price: high to low' }
    ];
    const products = useMemo(() => {
        let list = [...allProducts];

        // Custom products for The Mushroom / Mushroom Ottawa
        if (storeId === '2' || storeId === '9') {
            list = [...mushroomOttawaProducts];
        }
        // Custom products for Planet 51
        if (storeId === '7') {
            list = [...planet51Products];
        }
        // Custom products for Psilovibin
        if (storeId === '3') {
            list = [...psilovibinProducts];
        }
        // Custom products for Magic Mushroom Delivery
        if (storeId === '6') {
            list = [...magicMushroomDeliveryProducts];
        }
        // Custom products for Magic Mushroom Danforth
        if (storeId === '9') {
            list = [...magicMushroomDanforthProducts];
        }
        // Filter by header icon selectedEffect from context
        if (selectedEffect) {
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
            list = list.filter(p => {
                const price = typeof p.price === 'string' ? parseFloat(p.price.split('–')[0]) : p.price;
                return price >= drawerFilters.priceRange[0] && price <= drawerFilters.priceRange[1];
            });
        }

        // Category = High Potency products
        // if (activeCategory === 'mushrooms') {
        //     list = list.filter(p => p.categories?.some(c =>
        //         c === 'High Potency' || c === 'Visual Experience' || c === 'Focus & Clarity'
        //     ));
        // }

        // Delivery = fast/beginner-friendly products (Beginner Friendly or Microdosing)
        if (activeDelivery) {
            list = list.filter(p => p.categories?.some(c =>
                c === 'Beginner Friendly' || c === 'Microdosing'
            ));
        }

        if (activeBestSeller) {
            list = list.filter(p => p.badge?.text === 'BEST SELLER');
        }

        if (sortBy === 'price-low') {
            list.sort((a, b) => {
                const priceA = typeof a.price === 'string' ? parseFloat(a.price.split('–')[0]) : a.price;
                const priceB = typeof b.price === 'string' ? parseFloat(b.price.split('–')[0]) : b.price;
                return priceA - priceB;
            });
        }
        else if (sortBy === 'price-high') {
            list.sort((a, b) => {
                const priceA = typeof a.price === 'string' ? parseFloat(a.price.split('–')[0]) : a.price;
                const priceB = typeof b.price === 'string' ? parseFloat(b.price.split('–')[0]) : b.price;
                return priceB - priceA;
            });
        }
        else if (sortBy === 'rating') list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        else if (sortBy === 'latest') list.sort((a, b) => b.id - a.id);
        else list.sort((a, b) => a.id - b.id); // Default sequence: 201, 202, 203...

        return list;
    }, [activeDelivery, activeBestSeller, sortBy, selectedEffect, drawerFilters]);
    // Get 4 similar stores from context (excluding the current store)
    const similarStores = useMemo(() => {
        return contextStores
            .filter(s => s.id.toString() !== storeId)
            .slice(0, 4);
    }, [contextStores, storeId]);
    return (
        <div className="w-full bg-[#FAF8F5] overflow-x-hidden">
            {/* Desktop Header Section (Visible on lg and up) */}
            <div className="hidden lg:block px-6 lg:px-10 pt-10 sm:pt-16 md:pt-12">
                {/* Banner with rounded corners */}
                <div className="relative rounded-[20px] overflow-visible h-70 bg-cover bg-center" style={{ backgroundImage: `url(${storeData.coverImage})` }}>
                    {/* Content Container */}
                    <div className="relative h-full flex items-end justify-between px-6 lg:px-10 pb-4">
                        {/* Left side - Store Info (with space for logo) */}
                        <div className="flex-1 flex items-center min-w-0">
                            {/* Logo */}
                            <div
                                className="absolute -bottom-22 left-4 lg:left-7 w-48 lg:w-60 h-48 lg:h-60 rounded-full flex items-center justify-center overflow-hidden z-20 ring-4 lg:ring-6 ring-[#FAF8F5]"
                                style={{ backgroundColor: storeData.logo === Bg2 ? '#96D6ED' : '#FAF8F5' }}
                            >
                                <img
                                    src={storeData.logo}
                                    alt={storeData.name}
                                    className={`w-full h-full object-contain ${storeData.logo === Bg5 || storeData.logo === Bg6
                                        || storeData.logo === Bg7 || storeData.logo === Bg8 || storeData.logo === Bg9
                                        ? "p-0"
                                        : "p-4 lg:p-5"
                                        }`}
                                />
                            </div>

                            {/* Store Info - Responsive Margin-Left to clear absolute logo */}
                            <div className="ml-56 lg:ml-65 flex-1 min-w-0 pb-1">
                                <h1 className="text-xl md:text-2xl xl:text-[40px] font-bold leading-tight truncate" style={{ color: storeData.nameColor }}>
                                    {storeData.name}
                                </h1>

                                <div className="flex items-center gap-1 text-[12px] md:text-sm xl:text-lg">
                                    <button onClick={() => navigate('/store')} className="text-(--store-primary) hover:underline font-semibold cursor-pointer">
                                        Home
                                    </button>
                                    <span style={{ color: storeData.nameColor }}>/</span>
                                    <button onClick={() => navigate('/store/storeslists')} className="text-(--store-primary) hover:underline font-medium cursor-pointer">
                                        Stores
                                    </button>
                                    <span style={{ color: storeData.nameColor }}>/</span>
                                    <span className="font-medium truncate" style={{ color: storeData.nameColor }}>{storeData.name}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Action Buttons (Tiered max-width for wrapping and improved vertical spacing) */}
                        <div className="flex items-center mb-2 md:mb-4.5 gap-x-1.5 lg:gap-x-3 gap-y-2.5 flex-wrap justify-end max-w-[300px] md:max-w-[285px] lg:max-w-[380px] xl:max-w-[580px] 2xl:max-w-none ml-auto">
                            <button className="flex items-center gap-1 lg:gap-2 bg-white text-[#181211] px-2.5 lg:px-4 xl:px-5 py-1.5 lg:py-2 xl:py-2.5 rounded-full text-[11px] lg:text-[13px] xl:text-[14px] font-semibold hover:bg-gray-100 transition-colors shadow-md whitespace-nowrap">
                                <Icon icon="hugeicons:truck-delivery" width={16} height={16} className="xl:w-[18px] xl:h-[18px]" />
                                <span>Delivery {storeData.deliveryTime}</span>
                            </button>
                            <button onClick={() => window.open(`tel:${storeData.phone}`)} className="flex items-center gap-1 lg:gap-2 bg-white text-[#181211] px-2.5 lg:px-4 xl:px-5 py-1.5 lg:py-2 xl:py-2.5 rounded-full text-[11px] lg:text-[13px] xl:text-[14px] font-semibold hover:bg-gray-100 transition-colors shadow-md whitespace-nowrap">
                                <Icon icon="proicons:call" width={16} height={16} className="xl:w-[18px] xl:h-[18px]" />
                                <span>{storeData.phone}</span>
                            </button>
                            <button className="flex items-center gap-1 lg:gap-2 bg-white text-[#181211] px-2.5 lg:px-4 xl:px-5 py-1.5 lg:py-2 xl:py-2.5 rounded-full text-[11px] lg:text-[13px] xl:text-[14px] font-semibold hover:bg-gray-100 transition-colors shadow-md whitespace-nowrap">
                                <Icon icon="bitcoin-icons:globe-outline" width={16} height={16} className="xl:w-[18px] xl:h-[18px]" />
                                <span>Website</span>
                            </button>
                            <button onClick={() => setIsAboutDrawerOpen(true)} className="flex items-center gap-1 lg:gap-2 bg-white text-[#181211] px-2.5 lg:px-4 xl:px-5 py-1.5 lg:py-2 xl:py-2.5 rounded-full text-[11px] lg:text-[13px] xl:text-[14px] font-semibold hover:bg-gray-100 transition-colors shadow-md whitespace-nowrap">
                                <Icon icon="ix:about" width={16} height={16} className="xl:w-[18px] xl:h-[18px]" />
                                <span>About</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Store Description - Refined Layout without hacks */}
                <div className="flex px-6 lg:px-10 mt-4">
                    <div className="w-56 lg:w-65 shrink-0"></div>
                    <p className="text-[#777777] font-normal text-sm lg:text-base leading-relaxed max-w-6xl">
                        {storeData.description}
                    </p>
                </div>
            </div>

            {/* Mobile/Tablet Header Section (Visible below lg) */}
            <div className="lg:hidden px-4 pt-6 sm:pt-13 md:pt-17">
                {/* Banner with rounded corners */}
                <div className="relative rounded-[20px] overflow-visible h-40 bg-cover bg-center" style={{ backgroundImage: `url(${storeData.coverImage})` }}>
                    <div className="relative h-full flex items-end justify-end px-4 pb-4">
                        {/* Logo (Responsive size for small mobile) */}
                        <div
                            className="absolute -bottom-14 sm:-bottom-16 left-4 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center overflow-hidden z-20 ring-4 ring-[#FAF8F5] shadow-lg"
                            style={{ backgroundColor: storeData.logo === Bg2 ? '#96D6ED' : '#FAF8F5' }}
                        >
                            <img
                                src={storeData.logo}
                                alt={storeData.name}
                                className={`w-full h-full object-contain ${storeData.logo === Bg5 || storeData.logo === Bg6
                                    || storeData.logo === Bg7 || storeData.logo === Bg8 || storeData.logo === Bg9
                                    ? "p-0"
                                    : "p-4"
                                    }`}
                            />
                        </div>

                        {/* Action Buttons on Banner (Responsive for small mobile) */}
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                            <button className="flex items-center gap-1 sm:gap-2 bg-white text-[#181211] px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-[13px] font-semibold shadow-md active:scale-95 transition-transform">
                                <Icon icon="bitcoin-icons:globe-outline" width={16} height={16} className="sm:w-[18px] sm:h-[18px]" />
                                <span>Website</span>
                            </button>
                            <button onClick={() => setIsAboutDrawerOpen(true)} className="flex items-center gap-1 sm:gap-2 bg-white text-[#181211] px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-[13px] font-semibold shadow-md active:scale-95 transition-transform">
                                <Icon icon="ix:about" width={16} height={16} className="sm:w-[18px] sm:h-[18px]" />
                                <span>About</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Store Info Stack */}
                <div className="mt-20 flex flex-col gap-2">
                    <h1 className="text-3xl font-bold leading-tight text-[#181211]">
                        {storeData.name}
                    </h1>

                    <div className="flex items-center gap-2 text-sm mb-2">
                        <button onClick={() => navigate('/store')} className="text-[#E93E2B] font-semibold hover:underline">Home</button>
                        <span className="text-[#777777]">/</span>
                        <button onClick={() => navigate('/store/storeslists')} className="text-[#777777] font-semibold hover:underline">Stores</button>
                        <span className="text-[#777777]">/</span>
                        <span className="text-[#777777] font-semibold">{storeData.name}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-1">
                        <div className="flex items-center gap-2 bg-white border border-[#E8E8E8] px-4 py-2 rounded-full shadow-sm">
                            <Icon icon="hugeicons:truck-delivery" width={18} height={18} />
                            <span className="text-sm font-bold text-[#181211]">Delivery {storeData.deliveryTime}</span>
                        </div>
                        <div onClick={() => window.open(`tel:${storeData.phone}`)} className="flex items-center gap-2 bg-white border border-[#E8E8E8] px-4 py-2 rounded-full shadow-sm">
                            <Icon icon="proicons:call" width={18} height={18} />
                            <span className="text-sm font-bold text-[#181211]">{storeData.phone}</span>
                        </div>
                    </div>

                    <p className="mt-4 text-[#777777] font-normal text-sm leading-relaxed">
                        {storeData.description}
                    </p>
                </div>
            </div>

            {/* Products Section */}
            <div className="px-4 lg:px-10 mt-10 lg:mt-10 pb-10">
                {/* Desktop Filter Bar (UNTOUCHED) */}
                <div className="hidden lg:flex items-center gap-3 mb-4.5" >
                    {/* Filter Icon */}
                    <div className="flex items-center gap-2 px-3 h-10 rounded-full bg-(--store-primary) text-white cursor-pointer"
                        onClick={() => setFilterOpen(true)}
                    >
                        <Icon icon="mage:filter" width={22} height={22} />
                        {/* Badge */}
                        <span className="bg-white text-[#222222] text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full">
                            {[activeDelivery, activeBestSeller].filter(Boolean).length || 1}
                        </span>
                    </div>
                    {/* Pills */}
                    {/* <button
                        onClick={() => setActiveCategory(p => p === 'mushrooms' ? null : 'mushrooms')}
                        className={`px-5 h-10 rounded-full border text-[15px] font-semibold transition-colors cursor-pointer ${activeCategory === 'mushrooms' ? 'bg-[var(--store-primary)] text-white border-[var(--store-primary)]' : 'bg-[#FFFFFF] border-[#E8E8E8] text-[#222222]'}`}
                    >
                        Category
                    </button> */}

                    <button
                        onClick={() => setActiveDelivery(p => !p)}
                        className={`px-5 h-10 rounded-full border text-[15px] font-semibold transition-colors cursor-pointer ${activeDelivery ? 'bg-[var(--store-primary)] text-white border-[var(--store-primary)]' : 'bg-[#FFFFFF] border-[#E8E8E8] text-[#222222]'}`}
                    >
                        Delivery
                    </button>

                    <button
                        onClick={() => setActiveBestSeller(p => !p)}
                        className={`px-5 h-10 rounded-full border text-[15px] font-semibold transition-colors cursor-pointer ${activeBestSeller ? 'bg-[var(--store-primary)] text-white border-[var(--store-primary)]' : 'bg-[#FFFFFF] border-[#E8E8E8] text-[#222222]'}`}
                    >
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

                {/* Mobile Filter Bar (Visible below lg) */}
                <div className="lg:hidden flex items-center justify-between gap-3 mb-8">
                    {/* Filter Button - Circular Red (Standardized with ProductsList) */}
                    <button
                        onClick={() => setFilterOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 h-11 rounded-full bg-[#E93E2B] text-white font-bold cursor-pointer transition-transform active:scale-95 shrink-0 shadow-sm"
                    >
                        <Icon icon="mage:filter" width={20} />
                        <span className="bg-white text-[#E93E2B] text-[13px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {[activeDelivery, activeBestSeller].filter(Boolean).length || 1}
                        </span>
                    </button>

                    {/* Sort Dropdown - Large Rounded */}
                    <div className="flex-1 min-w-0">
                        <Select
                            options={sortOptions}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full h-11 rounded-full bg-white border border-[#E8E8E8] text-sm font-semibold px-5 shadow-sm"
                        />
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-7">
                    {products.map((product) => (
                        <div key={product.id} className="w-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-4 md:px-10 mt-3 mb-7">
                <div className="flex items-center justify-between mb-7">
                    <h2 className="text-2xl font-bold text-[#181211]">Similar Store</h2>
                    <button onClick={() => navigate('/store/storeslists')} className="flex items-center gap-2 text-[#E93E2B] font-semibold text-sm hover:opacity-80 transition-opacity cursor-pointer">
                        View All <Icon icon="streamline:next" width={17} height={17} />
                    </button>
                </div>
                {/* Similar Stores: Desktop Grid (lg and up) */}
                <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-7">
                    {similarStores.map(store => (
                        <div key={store.id} className="w-full">
                            <StoreCard store={store} />
                        </div>
                    ))}
                </div>

                {/* Similar Stores: Mobile Scroller (under lg) */}
                <div className="lg:hidden flex gap-4 md:gap-5 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 scroll-smooth">
                    {similarStores.map(store => (
                        <div key={store.id} className="min-w-[285px] sm:min-w-77.5 w-[80vw] sm:w-full max-w-[320px] sm:max-w-85.25 shrink-0">
                            <StoreCard store={store} />
                        </div>
                    ))}
                </div>
            </div>
            <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} onApply={setDrawerFilters} />

            {/* Store About Drawer */}
            <StoreAboutDrawer
                open={isAboutDrawerOpen}
                onClose={() => setIsAboutDrawerOpen(false)}
                storeData={storeData}
            />
        </div>
    );
};

export default StoreDetails;
