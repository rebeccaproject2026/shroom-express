import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import StoreCard from '../../components/common/StoreCard';
import Select from '../../components/common/Select';
import FilterDrawer from '../../components/products/FilterDrawer';
import microDosingImg from "../../assets/images/microdosing.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import creativeBoostImg from "../../assets/images/creative boost.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import focusClarityImg from "../../assets/images/focusclarity.png";
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

const ProductsList = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('popularity');
    const [filterOpen, setFilterOpen] = useState(false);

    // Category title mapping
    const categoryTitles = {
        'magic-mushrooms': 'The Magic Mushrooms',
        'microdose': 'Microdose',
        'edibles': 'Edibles',
        'deals': 'Deals',
    };

    const pageTitle = categoryTitles[category] || 'Products';

    // Sort options
    const sortOptions = [
        { value: 'popularity', label: 'Sort by popularity' },
        { value: 'rating', label: 'Sort by average rating' },
        { value: 'latest', label: 'Sort by latest' },
        { value: 'price-low', label: 'Sort by Price: low to high' },
        { value: 'price-high', label: 'Sort by Price: high to low' },
    ];

    // Mock products
    const products = [
        {
            id: 1,
            badge: { text: "BEST SELLER", colorClass: "bg-[#E93E2B]" },
            isWishlisted: false,
            image: albinoChodaImg,
            title: "Albino Choda",
            vendor: "Green Valley Organics",
            rating: '4.9',
            weights: ['3g', '10g'],
            price: 50.00,
            effects: [{ image: microDosingImg, name: "Creative Boost", hasBorder: false }]
        },
        {
            id: 2,
            badge: { text: "NEW", colorClass: "bg-[#059669]" },
            isWishlisted: true,
            image: albinohillbilyImg,
            title: "Albino Hillbilly",
            vendor: "Aether Mushroom Labs",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 50.00,
            effects: [
                { image: highPotencyImg, name: "High Potency" },
                { image: visualExperienceImg, name: "Visual Experience" }
            ]
        },
        {
            id: 3,
            badge: { text: "NEW", colorClass: "bg-[#059669]" },
            isWishlisted: true,
            image: albinopenisenvyImg,
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
            id: 4,
            badge: null,
            isWishlisted: false,
            image: Aztecgod,
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
            id: 5,
            badge: null,
            isWishlisted: false,
            image: Bluemeanies,
            title: "Blue Meanies",
            vendor: "Green Valley Organics",
            rating: '4.9',
            weights: ['3g', '10g'],
            price: 50.00,
            effects: [{ image: microDosingImg, name: "Creative Boost", hasBorder: false }]
        },
        {
            id: 6,
            badge: null,
            isWishlisted: false,
            image: Penisenvy,
            title: "Penis Envy",
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
            id: 7,
            badge: { text: "NEW", colorClass: "bg-[#059669]" },
            isWishlisted: true,
            image: Shakti,
            title: "Shakti",
            vendor: "Elevated Solstice",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 55.00,
            effects: [{ image: highPotencyImg, name: "High Potency" }]
        },

        {
            id: 8,
            badge: null,
            isWishlisted: false,
            image: Tidalwave,
            title: "Tidal Wave",
            vendor: "Green Valley Organics",
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
            badge: null,
            isWishlisted: false,
            image: Trinity,
            title: "Trinity",
            vendor: "Green Valley Organics",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 50.00,
            effects: [{ image: microDosingImg, name: "Creative Boost", hasBorder: false }]
        },
        {
            id: 10,
            badge: null,
            isWishlisted: false,
            image: Truealbinoteacher,
            title: "True Albino Teacher",
            vendor: "Aether Mushroom Labs",
            rating: '4.7',
            weights: ['3g', '10g'],
            price: 45.00,
            effects: [
                { image: focusClarityImg, name: "Focus & Clarity" },
                { image: relaxChillImg, name: "Relax & Chill" }
            ]
        },
        {
            id: 11,
            badge: { text: "NEW", colorClass: "bg-[#059669]" },
            isWishlisted: true,
            image: AmazonianImg,
            title: "Amazonian",
            vendor: "Elevated Solstice",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 50.00,
            effects: [{ image: highPotencyImg, name: "High Potency" }]
        },
        {
            id: 12,
            badge: null,
            isWishlisted: false,
            image: Jackfrost,
            title: "Jack Frost",
            vendor: "Green Valley Organics",
            rating: '5.0',
            weights: ['3g', '10g'],
            price: 45.00,
            effects: [{ image: microDosingImg, name: "Creative Boost", hasBorder: false }]
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
        }
    ];

    return (
        <div className="w-full px-12 py-10">
            <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />
            {/* Page Header - White Background Card */}
            <div className="bg-white rounded-[20px] p-12 mb-8  border border-[#E5DCDC]">
                <h1 className="text-3xl font-bold text-[#0F3540] mb-3">{pageTitle}</h1>

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-lg mb-4">
                    <button onClick={() => navigate('/store')} className="text-[var(--store-primary)] hover:underline font-semibold cursor-pointer">
                        Home
                    </button>
                    <span className="text-[#777777]">/</span>
                    <span className="text-[#777777] font-semibold">{pageTitle}</span>
                </div>

                {/* Description */}
                <p className="text-[#777777] text-sm tracking-wide pb-2.5">
                    Magic mushrooms are natural fungi containing psilocybin, a compound known for its psychoactive effects. For centuries, they have been used in traditional spiritual and cultural practices. When consumed, they can alter perception, mood, and thinking patterns, often leading to introspection and heightened awareness. In recent years, scientific research from institutions like Johns Hopkins University has explored their potential role in mental health treatments under controlled settings. While interest continues to grow, laws regarding magic mushrooms vary by region. Understanding their effects, risks, and legal status is essential before considering their use.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column - Products (3/4 width) */}
                <div className="lg:col-span-3 pr-8 border-r border-[#E8E8E8]">
                    {/* Most Popular Mushroom Section */}
                    <div className="mb-8">
                        <h2 className="text-[22px] font-bold text-[#181211] mb-6">Most popular Mushroom</h2>

                        {/* Filter Bar */}
                        <div className="px-2 py-2">
                            {/* Filter Bar */}
                            <div className="flex items-center gap-3 mb-4.5" >

                                {/* Filter Icon */}
                                <div
                                    onClick={() => setFilterOpen(true)}
                                    className="flex items-center gap-2 px-3 h-[40px] rounded-full bg-[var(--store-primary)] text-white cursor-pointer"
                                >

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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7">
                                {products.map((product) => (
                                    <div key={product.id} className="w-full">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Trending Stores (1/4 width) */}
                <div className="lg:col-span-1">
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
                            <div className="mb-4.5">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search Store"
                                        className="w-full px-5 h-[40px] rounded-full bg-[#FFFFFF] border border-[#E8E8E8]  text-[15px] font-semibold text-[#222222]  placeholder-[#222222] focus:outline-none focus:ring-2 focus:ring-[var(--store-primary)] focus:border-transparent"
                                    />
                                    <Icon icon="mdi:magnify" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width={20} height={20} />
                                </div>
                            </div>
                            {/* Stores List - Vertical Stack */}
                            <div className="flex flex-col gap-6">
                                {stores.map(store => (
                                    <div key={store.id} className="w-full">
                                        <StoreCard store={store} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsList;
