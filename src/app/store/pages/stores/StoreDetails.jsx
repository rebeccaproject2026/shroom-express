import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import microDosingImg from "../../assets/images/microdosing.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import { allProducts } from '../../data/productsData';
import storedetailbg from "../../assets/images/storedetailbg.jpg";
import storedetaillogo from "../../assets/images/storedetaillogo.png";
import creativeBoostImg from "../../assets/images/creative boost.png";
import StoreCard from '../../components/common/StoreCard';
import storecard1 from "../../assets/images/storecard1.png";
import background from "../../assets/images/background1.png";
import storecard2 from "../../assets/images/storecard2.png";
import storecard3 from "../../assets/images/storecard3.png";
import storecard4 from "../../assets/images/storecard4.png";
import background4 from "../../assets/images/Logo.png";
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


const StoreDetails = () => {
    const navigate = useNavigate();
    const { storeId } = useParams();
    const [sortBy, setSortBy] = useState('popularity');

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
        4: {
            name: "Shroom Express",
            nameColor: "black",
            logo: background4,
            coverImage: storecard4,
            description: "Shroom Express is dedicated to fast, reliable delivery of premium psilocybin products. With our express delivery service and competitive pricing, we make quality mushrooms accessible to everyone. Your satisfaction is our priority.",
            deliveryTime: "1 - 3 Hours",
            phone: "(604)555-0789",
            website: "www.shroomexpress.com",
            rating: "4.7",
            reviewCount: "340"
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
    const products = allProducts;
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
            logo: Bg2,
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
            logo: Bg3,
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
                            <div
                                className="absolute -bottom-22 left-7 w-[240px] h-[240px] rounded-full flex items-center justify-center overflow-hidden z-20 ring-6 ring-[#F8F6F6]"
                                style={{ backgroundColor: storeData.logo === Bg2 ? '#96D6ED' : '#ffffff' }}
                            >
                                <img
                                    src={storeData.logo}
                                    alt={storeData.name}
                                    className="w-full h-full object-contain p-5 "
                                />
                            </div>

                            {/* Store Info */}
                            <div className="ml-[260px]">
                                <h1 className="text-[40px] font-bold leading-tight" style={{ color: storeData.nameColor }}>
                                    {storeData.name}
                                </h1>

                                <div className="flex items-center gap-1 text-lg">
                                    <button onClick={() => navigate('/store')} className="text-[var(--store-primary)] hover:underline font-semibold cursor-pointer">
                                        Home
                                    </button>
                                    <span  style={{ color: storeData.nameColor }}>/</span>
                                    <button onClick={() => navigate('/store/storeslists')} className="text-[var(--store-primary)] hover:underline font-medium cursor-pointer">
                                        Stores
                                    </button>
                                    <span style={{ color: storeData.nameColor }}>/</span>
                                    <span className="font-medium"  style={{ color: storeData.nameColor }}>{storeData.name}</span>
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
