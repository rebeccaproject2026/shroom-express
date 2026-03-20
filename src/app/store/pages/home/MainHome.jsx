import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import StoreCard from '../../components/common/StoreCard';

// Import Hero Images
import home1 from '../../assets/images/home1.png';
import home2 from '../../assets/images/home2.png';
import home3 from '../../assets/images/home3.png';
import product1 from "../../assets/images/product1.png";
import product2 from "../../assets/images/product2.png";
import product3 from "../../assets/images/product3.png";
import product4 from "../../assets/images/product4.png";
import product5 from "../../assets/images/product5.png";
import product6 from "../../assets/images/product6.png";
import product7 from "../../assets/images/product7.png";
import product8 from "../../assets/images/product8.png";
// import productEffectImg from "../../assets/images/producteffect1.png";
import microDosingImg from "../../assets/images/microdosing.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import creativeBoostImg from "../../assets/images/creative boost.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import focusClarityImg from "../../assets/images/focusclarity.png";
import topRateStoreBg from "../../assets/images/topratestorebg.png";
import storecard1 from "../../assets/images/storecard1.png";
import background from "../../assets/images/background1.png";
import storecard2 from "../../assets/images/storecard2.png";
import background2 from "../../assets/images/background2.png";
import storecard3 from "../../assets/images/storecard3.png";
import background3 from "../../assets/images/background3.png";
import storecard4 from "../../assets/images/storecard4.png";
import background4 from "../../assets/images/Logo.png";

// Import Promotional Banners
import price1 from "../../assets/images/price1.png";
import price2 from "../../assets/images/price2.png";
import price3 from "../../assets/images/price3.png";
import profileImg from "../../assets/images/profile.jpg";


// Import News images
import news1 from "../../assets/images/news1.png";
import news2 from "../../assets/images/news2.png";
import news3 from "../../assets/images/news3.png";

const Home = () => {
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    const slideLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const slideRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };

    const handleViewAllStores = () => {
        navigate('/store/storeslists');
    };

    return (
        <div className="w-full pr-10 pl-10">
            {/* Hero Section */}
            <section className="font-sans pt-6 pb-4 md:pt-6 md:pb-10">
                <div className="container mx-auto ">
                    <div className="bg-[#E93E2B]/5 rounded-3xl flex flex-col md:flex-row items-center justify-between h-[40%]  relative overflow-hidden">

                        {/* Left Side */}
                        <div className="md:w-[55%] flex flex-col items-start z-10 w-full mb-10 md:mb-0 px-10">
                            {/* Badge */}
                            <div className="bg-[#E93E2B]/10 text-(--store-primary) text-[10px] md:text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6">
                                Premium Collection 2026
                            </div>

                            {/* Heading */}
                            <h1 className="text-[#181211] font-extrabold text-6xl md:text-6xl lg:text-6xl  tracking-tight">
                                Elevate Your <br />
                                <span className="text-(--store-primary) inline-block mt-2">Wellness Journey</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-[#886663] text-lg font-normal max-w-md mt-6 leading-relaxed">
                                Curated selections of premium cannabis and functional mushrooms. Lab tested, legally compliant, and discreetly shipped to your door.
                            </p>
                        </div>

                        {/* Right Side Container */}
                        <div className="md:w-[45%] h-[30%] flex justify-center items-center w-full relative z-10 ">
                            <div className="relative w-full max-w-110 aspect-square flex items-center justify-center">
                                <img
                                    src={home3}
                                    alt="Hero background right"
                                    className="absolute w-[85%] h-auto rounded-4xl rotate-3 right-9 bottom-8 z-0 object-cover"
                                />
                                <img
                                    src={home2}
                                    alt="Hero background left"
                                    className="absolute w-[85%] h-auto rounded-4xl -rotate-3 left-9 top-8 z-10 object-cover"
                                />
                                <img
                                    src={home1}
                                    alt="Premium Mushroom Coffee"
                                    className="w-[85%] h-auto rounded-4xl relative z-20 object-cover"
                                    id="hero-coffee-image"
                                    style={{ filter: "drop-shadow(0px 0px 30px 0px #000000)" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Hot Deal Section */}
            <section className="bg-[#FAF7F7] font-sans pb-7 md:pb-7">
                <div className="container mx-auto">
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2.5">
                            <Icon icon="solar:fire-bold-duotone" color='#E93E2B' width={30} height={30} />
                            <h2 className="text-2xl font-extrabold text-[#181211]">Hot Deal</h2>
                        </div>

                        {/* Carousel Controls */}
                        <div className="flex items-center gap-3">
                            <button onClick={slideLeft} className="w-10 h-10 rounded-full border border-(--store-primary) flex items-center cursor-pointer justify-center text-(--store-primary) hover:bg-(--store-primary) hover:text-white transition-colors bg-white shadow-sm">
                                <Icon icon="ep:arrow-left-bold" width={14} />
                            </button>
                            <button onClick={slideRight} className="w-10 h-10 rounded-full bg-(--store-primary) text-white flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shadow-sm">
                                <Icon icon="ep:arrow-right-bold" width={14} />
                            </button>
                        </div>
                    </div>

                    {/* Product Cards Row */}
                    <div ref={sliderRef} className="flex gap-7 overflow-x-auto py-4 -mx-4 px-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {/* Mock Products Array */}
                        {[
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
                                categories: ["Microdosing", "Creative Boost"],
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
                                categories: ["High Potency", "Visual Experience"],
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
                                categories: ["Focus & Clarity", "Relax & Chill"],
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
                                categories: ["Beginner Friendly", "Microdosing"],
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
                                title: "Golden Teacher",
                                vendor: "Aether Mushroom Labs",
                                rating: '4.8',
                                weights: ['3g', '10g'],
                                price: 50.00,
                                categories: ["Creative Boost"],
                                effects: [
                                    { image: creativeBoostImg, name: "Creative Boost" }
                                ]
                            },
                            {
                                id: 6,
                                badge: { text: "NEW", colorClass: "bg-[#059669]" },
                                isWishlisted: true,
                                image: product1,
                                title: "Albino Penis Envy",
                                vendor: "Elevated Solstice",
                                rating: '5.0',
                                weights: ['3g', '10g'],
                                price: 55.00,
                                categories: ["High Potency"],
                                effects: [
                                    { image: highPotencyImg, name: "High Potency" }
                                ]
                            },
                        ].map((prod) => (
                            <div key={prod.id} className="min-w-67.5 w-full max-w-85.25 shrink-0">
                                <ProductCard product={prod} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Top-Rated Stores Section */}
            <section
                className="bg-[#FCF9F9] font-sans py-9 md:py-9 relative -mx-10 px-10"
                style={{
                    backgroundImage: `url(${topRateStoreBg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="container mx-auto">
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-7">
                        <h2 className="text-2xl font-bold text-[#181211]">Top-Rated Stores</h2>
                        <button onClick={handleViewAllStores} className="flex items-center gap-2 text-[#E93E2B] font-semibold text-sm hover:opacity-80 transition-opacity cursor-pointer">
                            View All <Icon icon="streamline:next" width={17} height={17} />
                        </button>
                    </div>

                    {/* Store Cards Row */}
                    <div className="flex gap-7 overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {[
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
                                avatars: [beginnerFriendlyImg,
                                    highPotencyImg,
                                    microDosingImg,
                                    visualExperienceImg, creativeBoostImg, relaxChillImg,]
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
                                avatars: [beginnerFriendlyImg,
                                    highPotencyImg,
                                    microDosingImg,
                                    visualExperienceImg, creativeBoostImg, relaxChillImg,]
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
                                deliveryBadge: null, /* No badge for 3rd and 4th card based on screenshot crop */
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
                                avatars: [beginnerFriendlyImg,
                                    highPotencyImg,
                                    microDosingImg,
                                    visualExperienceImg, creativeBoostImg, relaxChillImg,]
                            }
                        ].map(store => (
                            <div key={store.id} className="min-w-77.5  w-full max-w-85.25 shrink-0">
                                <StoreCard store={store} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* High Vibes, Low Prices Section */}
            <section className="bg-[#F7ECEB] font-sans py-10 md:py-10 -mx-10 px-10">
                <div className="container mx-auto">
                    {/* Headers */}
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-[32px] font-extrabold text-[#181211] mb-1.5 tracking-tight">High Vibes, Low Prices</h2>
                        <p className="text-[#64748B] text-[17px] font-medium">Use these limited-time codes to stock up on your favorite strains and blends.</p>
                    </div>

                    {/* Banners Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="w-full shrink-0 group overflow-hidden bg-white shadow-sm border border-[#E5DCDC] cursor-pointer rounded-lg">
                            <img src={price1} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Magic Mushroom 20% OFF" />
                        </div>
                        <div className="w-full shrink-0 group overflow-hidden bg-white shadow-sm border border-[#E5DCDC] cursor-pointer rounded-lg">
                            <img src={price2} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="25% OFF Premium Cannabis" />
                        </div>
                        <div className="w-full shrink-0 group overflow-hidden bg-white shadow-sm border border-[#E5DCDC] cursor-pointer rounded-lg">
                            <img src={price3} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="20% OFF Shroom20" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Best Selling Products Section */}
            <section className="bg-[#FAF7F7] font-sans pt-16 pb-10 -mx-10 px-10">
                <div className="container mx-auto">
                    {/* Headers */}
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-[32px] font-extrabold text-[#181211] mb-1.5 tracking-tight">Best Selling Products</h2>
                        <p className="text-[#64748B] text-[17px] font-medium">Trusted quality chosen by our community over and over again.</p>
                    </div>

                    {/* Product Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                        {/* Mock Products Array (Using 8 cards) */}
                        {[
                            {
                                id: 101, badge: { text: "BEST SELLER", colorClass: "bg-[#E93E2B]" }, isWishlisted: false, image: product1,
                                title: "Blue Meanies", vendor: "Green Valley Organics", rating: '4.9', weights: ['3g', '10g'], price: 50.00,
                                categories: ["Creative Boost", "Visual Experience"],
                                effects: [{ image: microDosingImg, name: "Creative Boost", hasBorder: false }]
                            },
                            {
                                id: 102, badge: null, isWishlisted: true, image: product2,
                                title: "Melmac (Dried)", vendor: "Aether Mushroom Labs", rating: '4.8', weights: ['3g', '10g'], price: 35.00,
                                categories: ["Creative Boost", "Relax & Chill"],
                                effects: [{ image: creativeBoostImg, name: "Creative Boost" }, { image: relaxChillImg, name: "Relax & Chill" }]
                            },
                            {
                                id: 103, badge: { text: "NEW", colorClass: "bg-[#059669]" }, isWishlisted: false, image: product3,
                                title: "Chocolate Bar Golden Teacher", vendor: "Elevated Solstice", rating: '5.0', weights: ['3g', '10g'], price: 45.00,
                                categories: ["Beginner Friendly"],
                                effects: [{ image: beginnerFriendlyImg, name: "Beginner Friendly" }]
                            },
                            {
                                id: 104, badge: null, isWishlisted: false, image: product4,
                                title: "Tidal Wave", vendor: "Green Valley Organics", rating: '4.7', weights: ['3g', '10g'], price: 60.00,
                                categories: ["Focus & Clarity", "Relax & Chill"],
                                effects: [{ image: focusClarityImg, name: "Focus & Clarity" }, { image: relaxChillImg, name: "Relax & Chill" }]
                            },
                            {
                                id: 105, badge: { text: "BEST SELLER", colorClass: "bg-[#E93E2B]" }, isWishlisted: false, image: product5,
                                title: "Utopia Gummy Grape 10pcs", vendor: "Green Valley Organics", rating: '4.9', weights: ['3g', '10g'], price: 80.00,
                                categories: ["Microdosing", "Creative Boost"],
                                effects: [{ image: microDosingImg, name: "Creative Boost", hasBorder: false }]
                            },
                            {
                                id: 106, badge: null, isWishlisted: true, image: product6,
                                title: "Original OG Dummyz 1000mg...", vendor: "Aether Mushroom Labs", rating: '4.8', weights: ['3g', '10g'], price: 35.00,
                                categories: ["Creative Boost", "Relax & Chill"],
                                effects: [{ image: creativeBoostImg, name: "Creative Boost" }, { image: relaxChillImg, name: "Relax & Chill" }]
                            },
                            {
                                id: 107, badge: { text: "NEW", colorClass: "bg-[#059669]" }, isWishlisted: false, image: product7,
                                title: "Shakti Capsules", vendor: "Elevated Solstice", rating: '5.0', weights: ['3g', '10g'], price: 40.00,
                                categories: ["Beginner Friendly"],
                                effects: [{ image: beginnerFriendlyImg, name: "Beginner Friendly" }]
                            },
                            {
                                id: 108, badge: null, isWishlisted: false, image: product8,
                                title: "Toad Bites", vendor: "Green Valley Organics", rating: '4.7', weights: ['3g', '10g'], price: 10.00,
                                categories: ["Focus & Clarity", "Relax & Chill"],
                                effects: [{ image: focusClarityImg, name: "Focus & Clarity" }, { image: relaxChillImg, name: "Relax & Chill" }]
                            }
                        ].map((prod) => (
                            <div key={prod.id} className="w-full">
                                <ProductCard product={prod} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platform Features Section */}
            <section className="bg-[#F7ECEB] font-sans pt-16 pb-17 -mx-10 px-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center">
                        {/* Feature 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0px_0px_27px_0px_#E93E2B2B] mb-5">
                                <Icon icon="hugeicons:wellness" className="text-[#E93E2B] *:stroke-[1px]" width={28} height={28} />
                            </div>
                            <h3 className="text-[#181211] text-xl font-extrabold mb-2.5 tracking-tight">First-Time Customer?</h3>
                            <p className="text-[#886663] text-[16px] max-w-65 mx-auto leading-relaxed">
                                Enjoy 20% off your first order, your wellness journey starts here.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0px_0px_27px_0px_#E93E2B2B] mb-5">
                                <Icon icon="streamline-plump:shipping-box-1" className="text-[#E93E2B] *:stroke-[2px]" width={28} height={28} />
                            </div>
                            <h3 className="text-[#181211] text-xl font-extrabold mb-2.5 tracking-tight">Bundle & Save</h3>
                            <p className="text-[#886663] text-[16px] max-w-72.5 mx-auto leading-relaxed">
                                Curated mushroom & cannabis combos at up to 30% off.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0px_0px_27px_0px_#E93E2B2B] mb-5">
                                <Icon icon="la:shipping-fast" className="text-[#E93E2B] *:stroke-[0.5px]" width={28} height={28} />
                            </div>
                            <h3 className="text-[#181211] text-xl font-extrabold mb-2.5 tracking-tight">Free Shipping Canada-Wide</h3>
                            <p className="text-[#886663] text-[16px] max-w-65 mx-auto leading-relaxed">
                                On all orders over $150. Delivered discreetly to your door.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0px_0px_27px_0px_#E93E2B2B] mb-5">
                                <Icon icon="stash:data-date-light" className="text-[#E93E2B] *:stroke-[1px]" width={28} height={28} />
                            </div>
                            <h3 className="text-[#181211] text-xl font-extrabold mb-2.5 tracking-tight">Daily Dose Discount</h3>
                            <p className="text-[#886663] text-[16px] max-w-65 mx-auto leading-relaxed">
                                Subscribe & save 25% on your monthly microdosing essentials.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest News Section */}
            <section className="bg-[#FAF7F7] font-sans pt-14 pb-10  -mx-10 px-10">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-[#181211]">Latest News</h2>
                    </div>

                    {/* News Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* Featured Article (Left Side - Takes up 7 columns on LG screens) */}
                        <div className="lg:col-span-6 bg-white rounded-2xl p-5 pb-2 border border-[#E8E8E8] flex flex-col group cursor-pointer transition-all hover:shadow-md">
                            <h3 className="text-[#0F3540] text-lg font-bold mb-2 leading-snug ">
                                Cannabis Provincial News Roundup - July 2025
                            </h3>
                            <p className="text-[#777777] text-base mb-5 leading-relaxed">
                                Elementum vulputate platea pellentesque velit nisi id etiam donec felis viverra vel id sem nullus pellentesque mattis tempus ante adipiscing pellentesque ut eu interdum sit
                            </p>

                            <div className="w-full h-80 rounded-2xl overflow-hidden mb-6">
                                <img
                                    src={news1}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt="Featured news background"
                                />
                            </div>

                            {/* Author Row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={profileImg} className="w-10 h-10 rounded-full object-cover shadow-sm" alt="Author Sophia Martinez" />
                                    <span className="text-[#0F3540] font-bold text-base">Sophia Martinez</span>
                                </div>
                                <span className="text-[#777777] text-base font-semibold">July 4, 2025</span>
                            </div>
                        </div>

                        {/* Stacked Articles (Right Side - Takes up 5 columns on LG screens) */}
                        <div className="lg:col-span-6 flex flex-col gap-4">

                            {/* Standard Block 1 */}
                            <div className="bg-white rounded-2xl p-2 border border-[#E8E8E8] shadow-sm flex items-start gap-4 cursor-pointer group hover:shadow-md transition-all">
                                <div className="w-25 h-25 shrink-0 rounded-xl overflow-hidden">
                                    <img src={news2} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="News thumbnail" />
                                </div>
                                <div className="flex flex-col h-full py-1">
                                    <h4 className="text-[#0F3540] font-bold text-lg leading-snug mb-5">
                                        Why Cannabis Delivery Is Canada's New Normal, Shroom Express Leads the Way
                                    </h4>
                                    <span className="text-[#777777] text-base font-semibold mt-auto">July 4, 2025</span>
                                </div>
                            </div>

                            {/* Standard Block 2 */}
                            <div className="bg-white rounded-2xl p-2 border border-[#E8E8E8] shadow-sm flex items-start gap-4 cursor-pointer group hover:shadow-md transition-all">
                                <div className="w-25 h-25  shrink-0 rounded-xl overflow-hidden">
                                    <img src={news3} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="News thumbnail" />
                                </div>
                                <div className="flex flex-col h-full py-1">
                                    <h4 className="text-[#0F3540] font-bold text-lg leading-snug mb-5">
                                        Ontario's Green Shift: Cannabis Delivery Becomes the Province's Preferred Choice in 2025
                                    </h4>
                                    <span className="text-[#777777] text-base font-semibold mt-auto">July 4, 2025</span>
                                </div>
                            </div>

                            {/* Standard Block 3 (Landscape Layout variation) */}
                            <div className="bg-white rounded-2xl p-2 border border-[#E8E8E8] shadow-sm flex flex-col cursor-pointer group hover:shadow-md transition-all">
                                <div className="w-full h-40.5 rounded-xl overflow-hidden mb-4">
                                    <img src={news2} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="News thumbnail" />
                                </div>
                                <div className="flex items-end justify-between">
                                    <h4 className="text-[#0F3540] font-bold text-lg leading-snug  pr-4 max-w-[80%]">
                                        Ontario's Green Shift: Cannabis Delivery Becomes the Province's Preferred Choice in 2025
                                    </h4>
                                    <span className="text-[#777777] text-base font-semibold whitespace-nowrap mb-0.5">July 4, 2025</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
