import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import MobileLocationOverlay from '../../components/layout/MobileLocationOverlay';
import StoreCard from '../../components/common/StoreCard';
// import storecard1 from "../../assets/images/storecard1.png";
// import background from "../../assets/images/background1.png";
// import storecard2 from "../../assets/images/storecard2.png";
// import background2 from "../../assets/images/background2.png";
// import storecard3 from "../../assets/images/storecard3.png";
// import background3 from "../../assets/images/background3.png";
// import storecard4 from "../../assets/images/storecard4.png";
// import background4 from "../../assets/images/Logo.png";
// import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
// import highPotencyImg from "../../assets/images/highpotency.png";
// import microDosingImg from "../../assets/images/microdosing.png";
// import visualExperienceImg from "../../assets/images/visualexperience.png";
// import creativeBoostImg from "../../assets/images/creativeboost.png";
// import relaxChillImg from "../../assets/images/relaxchill.png";
import Shroomforsalebanner from "../../assets/images/Shroomforsalebanner.png";
import Shroomforsalelogo from "../../assets/images/Shroomforsalebannerlogo.png";
import Magicmushroombanner from "../../assets/images/Magicmushroombanner.jpg";
import Magicmushroomlogo from "../../assets/images/Magicmushroomlogo.png";
import Planetbanner from "../../assets/images/Planetbanner.png";
import Planetlogo from "../../assets/images/Planetlogo.png";
import Torontomagiclogo from "../../assets/images/Torontomagiclogo.png";
import Torontomagicbanner from "../../assets/images/Torontomagicbanner.jpg";
// import magicmashroombanner2 from "../../assets/images/magicmashroombanner2.jpg";
// import magicmashroomlogo2 from "../../assets/images/magicmashroomlogo2.png";
import StoreFilterDrawer from '../../components/stores/StoreFilterDrawer';
import { useStores } from '../../context/StoresContext';
const StoresList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [drawerFilters, setDrawerFilters] = useState({ selectedDelivery: 'All', selectedRating: 'All', isPrimary: false });
    const [activeExpressDelivery, setActiveExpressDelivery] = useState(false);
    const [activeDelivery, setActiveDelivery] = useState(false);
    const [activeShipping, setActiveShipping] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const { stores } = useStores();

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
        <div className="w-full px-4 sm:px-10 pt-10 sm:pt-16 md:pt-18 pb-10 sm:pb-20">
            <StoreFilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} onApply={setDrawerFilters} />

            {/* Page Header */}
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F3540] mb-3">
                Stores
            </h1>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-base sm:text-lg mb-6">
                <a
                    href="/store"
                    className="text-[#E93E2B] font-semibold hover:underline"
                >Home</a>
                <span className="text-[#777777]">/</span>
                <span className="text-[#777777] font-semibold">
                    Stores
                </span>
            </div>

            {/* Description */}
            <p className="text-[#777777] text-[15px] sm:text-[16px] leading-[26px] tracking-normal max-w-[200%] mb-12">
                Welcome to our marketplace, where you can explore a wide variety of premium
                mushroom products from multiple trusted stores. Our platform brings
                together carefully selected vendors who specialize in fresh, dried, and
                value-added mushroom products to ensure quality, variety, and reliability
                for every customer.
            </p>
            {/* Trending Store Section */}
            <div className="mb-8">
                <h2 className="text-[22px] sm:text-2xl font-bold text-[#181211] mb-6">
                    Trending Store
                </h2>

                {/* Desktop Filter Bar (UNTOUCHED) */}
                <div className="hidden md:flex items-center gap-3">
                    {/* Filter Icon */}
                    <div
                        onClick={() => setFilterOpen(true)}
                        className="flex items-center gap-2 px-3 h-[40px] rounded-full bg-[var(--store-primary)] text-white cursor-pointer hover:bg-red-600 transition-colors">
                        <Icon icon="mage:filter" width={22} height={22} />
                        <span className="bg-white text-[#222222] text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full">
                            {activeFilterCount || 1}
                        </span>
                    </div>

                    {/* Pills (Hidden on Tablet, shown on XL Desktop) */}
                    <button
                        onClick={() => setActiveExpressDelivery(p => !p)}
                        className={`hidden lg:block px-5 h-[40px] rounded-full border text-[15px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${activeExpressDelivery ? 'bg-[var(--store-primary)] text-white border-[var(--store-primary)]' : 'bg-[#FFFFFF] border-[#E8E8E8] text-[#222222]'}`}
                    >
                        Express Delivery
                    </button>

                    <button
                        onClick={() => setActiveDelivery(p => !p)}
                        className={`hidden lg:block px-5 h-[40px] rounded-full border text-[15px] font-semibold transition-colors cursor-pointer ${activeDelivery ? 'bg-[var(--store-primary)] text-white border-[var(--store-primary)]' : 'bg-[#FFFFFF] border-[#E8E8E8] text-[#222222]'}`}
                    >
                        Delivery
                    </button>

                    <button
                        onClick={() => setActiveShipping(p => !p)}
                        className={`hidden lg:block px-5 h-[40px] rounded-full border text-[15px] font-semibold transition-colors cursor-pointer ${activeShipping ? 'bg-[var(--store-primary)] text-white border-[var(--store-primary)]' : 'bg-[#FFFFFF] border-[#E8E8E8] text-[#222222]'}`}
                    >
                        Shipping
                    </button>

                    {/* Search */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search Store"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-[40px] rounded-full bg-[#FFFFFF] border border-[#E8E8E8] px-5 text-[14px] outline-none placeholder:text-[#BDBDBD] focus:border-[#E93E2B] transition-colors"
                        />
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 px-4 h-[40px] rounded-full bg-[#FFFFFF] border border-[#E8E8E8] md:w-60 lg:w-[350px]">
                        <Icon icon="tabler:location" width={18} className="text-[#64748B]" />
                        <span className="text-sm font-semibold text-[#181211] flex-1 truncate">
                            Toronto Central
                        </span>
                        <button onClick={() => setLocationOpen(true)} className="text-sm font-bold text-[#E93E2B] hover:underline whitespace-nowrap">
                            Change
                        </button>
                    </div>
                </div>

                {/* Mobile/Tablet Filter Bar (Visible below md) */}
                <div className="md:hidden flex flex-col md:flex-row gap-3 sm:gap-4">
                    {/* Location Block - Matching Image 1 */}
                    <div className="flex-1 flex items-center gap-3 sm:gap-4 bg-white border border-[#E5DCDC] rounded-xl px-4 sm:px-5 py-2    h-12 sm:h-14 shadow-sm">
                        <div className="shrink-0">
                            <Icon icon="tabler:location" width={22} className="sm:w-[24px] text-[#475569]" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <span className="text-[10px] sm:text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider leading-none mb-0.5">Current Location</span>
                            <span className="text-sm sm:text-base font-bold text-[#181211] leading-tight">Toronto Central</span>
                        </div>
                        <button
                            onClick={() => setLocationOpen(true)}
                            className="text-sm sm:text-base font-bold text-[#E93E2B] hover:underline whitespace-nowrap"
                        >
                            Change
                        </button>
                    </div>

                    {/* Search Block - Matching Image 1 */}
                    <div className="flex-1 relative">
                        <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2">
                            <Icon icon="mdi:magnify" width={22} className="sm:w-[24px] text-[#181211]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Store"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 sm:h-14 rounded-xl bg-white border border-[#E5DCDC] pl-11 sm:pl-14 pr-4 sm:pr-5 text-sm sm:text-base text-[#181211] font-semibold outline-none focus:border-[#E93E2B] shadow-sm placeholder:text-[#181211]"
                        />
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

            <MobileLocationOverlay
                isOpen={locationOpen}
                onClose={() => setLocationOpen(false)}
                onSelect={(city) => console.log('Location selected:', city)}
            />
        </div >
    );
};

export default StoresList;
