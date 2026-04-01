import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/common/ProductCard";

// Real Product Assets for Weekly Specials (from Home)
import product1 from "../../assets/images/product1.png";
import product2 from "../../assets/images/product2.png";
import product3 from "../../assets/images/product3.png";
import product4 from "../../assets/images/product4.png";
import product5 from "../../assets/images/product5.png";
import product6 from "../../assets/images/product6.png";
import product7 from "../../assets/images/product7.png";
import product8 from "../../assets/images/product8.png";
import microDosingImg from "../../assets/images/microdosing.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import deepJourneyImg from "../../assets/images/deepjourney.png";
import creativeBoostImg from "../../assets/images/creativeboost.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import focusClarityImg from "../../assets/images/focusclarity.png";
import dealsImg from "../../assets/images/deals.png";
// Store Banner Assets for Bundles
import storecard1 from "../../assets/images/storecard1.png";
import storecard2 from "../../assets/images/storecard2.png";





const CouponModal = ({ coupon, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRedeem = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 1500);
        }, 1200);
    };

    return (
        <div className="coupon-modal-overlay" onClick={onClose}>
            <div className={`coupon-modal-container theme-${coupon.theme}`} onClick={e => e.stopPropagation()}>
                <div className="coupon-modal-header">
                    <h2>Coupon</h2>
                    <button className="coupon-modal-close" onClick={onClose}>
                        <Icon icon="mdi:close" width={20} />
                    </button>
                </div>
                <div className="coupon-modal-body">
                    {success ? (
                        <div className="coupon-modal-success">
                            <Icon icon="mdi:check-circle" width={60} color="#2e7d32" />
                            <h3>Redeemed Successfully!</h3>
                            <p>Promotion code <strong>{coupon.code}</strong> has been applied to your account.</p>
                        </div>
                    ) : (
                        <>
                            <div className="coupon-modal-field-row">
                                <div className="coupon-modal-field">
                                    <label>First Name</label>
                                    <input type="text" placeholder="Enter Your First Name" />
                                </div>
                                <div className="coupon-modal-field">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Enter Your Last Name" />
                                </div>
                            </div>
                            <div className="coupon-modal-field full-width">
                                <label>Email</label>
                                <input type="email" placeholder="Enter Your Email" />
                            </div>
                            <div className="coupon-modal-field full-width">
                                <label>Available Coupons</label>
                                <input type="text" value={coupon.code} readOnly />
                            </div>

                            <div className="coupon-modal-redeem-row">
                                <div className="coupon-redeem-box">
                                    <div className="redeem-scissor-top">✂️</div>
                                    <p className="text-truncate-2">{coupon.desc}</p>
                                    <button
                                        className="coupon-redeem-btn"
                                        onClick={handleRedeem}
                                        disabled={loading}
                                    >
                                        <Icon icon={loading ? "mdi:loading" : "mdi:ticket-percent-outline"} className={loading ? "spin" : ""} />
                                        {loading ? "PROCESSING..." : "REDEEM"}
                                    </button>
                                    <div className="redeem-scissor-bottom">✂️</div>
                                </div>
                            </div>

                            <div className="coupon-modal-footer">
                                <span className="modal-valid-badge">
                                    <Icon icon="mdi:clock" width={14} />
                                    Valid Until {coupon.valid}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const DealsPage = () => {
    const navigate = useNavigate();
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    // Mock Timer Data for Mobile
    const [timeLeft, setTimeLeft] = useState({ hrs: "04", min: "22", sec: "59" });

    // Flash Sales Data (Hot Deals from Home)
    const flashSales = [
        {
            id: 1,
            badge: { text: "5% OFF", colorClass: "bg-[#E93E2B]" },
            isWishlisted: false, inStock: true, onSale: true,
            image: product1,
            title: "Albino Choda",
            vendor: "Green Valley Organics",
            rating: '4.9',
            weights: ['3g', '10g'],
            price: 50.00,
            categories: ["Micro dosing", "Creative Boost"],
            effects: [
                { image: creativeBoostImg, name: "Creative Boost" },
                { image: microDosingImg, name: "Micro dosing" }
            ]
        },
        {
            id: 2,
            badge: { text: "5% OFF", colorClass: "bg-[#E93E2B]" },
            isWishlisted: false, inStock: true, onSale: false,
            image: product1,
            title: "Albino Hillbilly",
            vendor: "Aether Mushroom Labs",
            rating: '4.8',
            weights: ['3g', '10g'],
            price: 50.00,
            categories: ["Beginner Friendly", "Micro dosing"],
            effects: [
                { image: beginnerFriendlyImg, name: "Beginner Friendly" },
                { image: microDosingImg, name: "Microdosing" }
            ]
        },
        {
            id: 3,
            badge: { text: "5% OFF", colorClass: "bg-[#E93E2B]" },
            isWishlisted: true, inStock: false, onSale: false,
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
            id: 4,
            badge: { text: "5% OFF", colorClass: "bg-[#E93E2B]" },
            isWishlisted: false, inStock: true, onSale: true,
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
        }
    ];

    const bundles = [
        {
            id: 1,
            name: "The Explorer Pack",
            desc: "3 strains + rolling accessories",
            price: 65.00,
            oldPrice: 85.00,
            badge: "VALUE",
            image: storecard1
        },
        {
            id: 2,
            name: "Zen Master Set",
            desc: "Tincture + Infusion Tea Pack",
            price: 82.00,
            oldPrice: 110.00,
            image: storecard2
        }
    ];

    // Weekly Specials Data (Best Sellers from Home)
    const bestSellers = [
        {
            id: 101, badge: { text: "5% OFF", colorClass: "bg-[#E93E2B]" }, isWishlisted: false, inStock: true, onSale: true, image: product1,
            title: "Blue Meanies", vendor: "Green Valley Organics", rating: '4.9', weights: ['3g', '10g'], price: 50.00,
            categories: ["Creative Boost", "Visual Experience", "High Potency"],
            effects: [{ image: microDosingImg, name: "Micro dosing" }, { image: visualExperienceImg, name: "Visual Experience" }, { image: highPotencyImg, name: "High Potency" }]
        },
        {
            id: 102, badge: { text: "5% OFF", colorClass: "bg-[#E93E2B]" }, isWishlisted: true, inStock: true, onSale: false, image: product2,
            title: "Melmac (Dried)", vendor: "Aether Mushroom Labs", rating: '4.8', weights: ['3g', '10g'], price: 35.00,
            categories: ["Creative Boost", "Relax & Chill"],
            effects: [{ image: creativeBoostImg, name: "Creative Boost" }, { image: relaxChillImg, name: "Relax & Chill" }]
        },
        {
            id: 103, badge: { text: "5% OFF", colorClass: "bg-[#E93E2B]" }, isWishlisted: false, inStock: false, onSale: false, image: product3,
            title: "Chocolate Bar Golden Teacher", vendor: "Elevated Solstice", rating: '5.0', weights: ['3g', '10g'], price: 45.00,
            categories: ["Beginner Friendly", "Micro dosing"],
            effects: [{ image: beginnerFriendlyImg, name: "Beginner Friendly" }, { image: microDosingImg, name: "Micro dosing" }]
        },
        {
            id: 104, badge: { text: "5% OFF", colorClass: "bg-[#E93E2B]" }, isWishlisted: false, inStock: true, onSale: true, image: product4,
            title: "Tidal Wave", vendor: "Green Valley Organics", rating: '4.7', weights: ['3g', '10g'], price: 60.00,
            categories: ["Focus & Clarity", "Relax & Chill"],
            effects: [{ image: focusClarityImg, name: "Focus & Clarity" }, { image: relaxChillImg, name: "Relax & Chill" }]
        }
    ];

    return (
        <div className="w-full bg-[#FAF8F5] overflow-x-hidden pt-10 sm:pt-16 md:pt-18">
            <div className="max-w-[1700px] mx-auto">
                {/* Header section - Unified for all screens */}
                <div className="px-5 lg:px-10 mb-8">
                    <h1 className="text-[32px] lg:text-[36px] font-bold text-[#181211] leading-tight mb-2">Hot Deals</h1>
                    <nav className="flex items-center gap-1.5 text-base mb-6">
                        <span className="text-[#E93E2B] font-bold cursor-pointer" onClick={() => navigate('/store')}>Home</span>
                        <span className="text-[#777777] font-semibold">/</span>
                        <span className="text-[#777777] font-semibold">Deals</span>
                    </nav>

                    <p className="text-[#64748B] text-[15px] leading-[1.6] max-w-8xl">
                        Welcome to our Hot Deals section, where you can discover the best discounts and limited-time offers on a wide range of mushroom products from our trusted stores. This page highlights special promotions, seasonal offers, and exclusive deals designed to help you get premium quality mushrooms at the best possible prices.
                        Our partner stores regularly update their offers to bring you fresh deals on popular mushroom varieties, gourmet selections, and specialty products. Whether you are purchasing for daily cooking, health benefits, or culinary experimentation, the Hot Deals section makes it easy to find great value while exploring high-quality products.
                    </p>
                </div>

                {/* Deal of the Day Hero card - Proportions matched to StoreDetails banner */}
                <div className="px-5 lg:px-10 mb-10">
                    <div
                        className="relative w-full rounded-[24px] overflow-hidden bg-[#181211] h-70 lg:h-80 shadow-xl p-6 lg:px-12 lg:py-8 flex flex-col justify-between bg-cover bg-center"
                        style={{
                            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 100%), url(${dealsImg})`
                        }}
                    >
                        {/* Top Badges */}
                        <div className="relative z-10 flex justify-between items-center">
                            <span className="bg-[#E93E2B] text-white text-[11px] lg:text-[13px] font-bold tracking-wider px-3.5 py-1.5 lg:px-5 lg:py-2 rounded-full uppercase shadow-lg shadow-[#E93E2B4D]">
                                Deal of the day
                            </span>
                            <span className="bg-[#FFFFFF1A] backdrop-blur-md text-white text-[13px] lg:text-[15px] font-bold px-4 py-1.5 lg:px-6 lg:py-2 rounded-xl border border-[#FFFFFF26]">
                                40% OFF
                            </span>
                        </div>

                        {/* Middle Content - Adjusted for compact h-70 */}
                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-2">
                            <div>
                                <h2 className="text-2xl lg:text-4xl font-bold text-white mb-1 lg:mb-2 max-w-[280px] lg:max-w-[450px] leading-tight">
                                    Golden Teacher Bundle
                                </h2>
                                <p className="text-[#FFFFFFCC] text-xs lg:text-base font-medium">
                                    Premium dried caps + infusion kit
                                </p>
                            </div>

                            {/* Timer Component - More compact */}
                            <div className="flex gap-3">
                                {[
                                    { val: timeLeft.hrs, label: "HRS" },
                                    { val: timeLeft.min, label: "MIN" },
                                    { val: timeLeft.sec, label: "SEC" }
                                ].map((t, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className="w-[48px] h-[48px] lg:w-[56px] lg:h-[56px] bg-[#FFFFFF12] backdrop-blur-xl border border-[#FFFFFF1A] rounded-xl flex items-center justify-center text-lg lg:text-xl font-bold text-white">
                                            {t.val}
                                        </div>
                                        <span className="text-[8px] lg:text-[9px] font-bold text-[#FFFFFF80] tracking-widest uppercase mt-1">
                                            {t.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="relative z-10 flex items-center justify-between gap-4">
                            <div className="flex flex-row items-center gap-3">
                                <span className="text-[#E93E2B] text-3xl lg:text-4xl font-bold">$80.00</span>
                                <span className="text-white opacity-50 text-sm lg:text-lg line-through font-medium">$120.00</span>
                            </div>
                            <button
                                className="bg-[#E93E2B] hover:bg-red-600 text-white font-bold py-3 lg:py-4 px-8 lg:px-10 rounded-[16px] text-base lg:text-lg shadow-lg active:scale-95 transition-all text-center"
                                onClick={() => navigate('/store/product/golden-teacher-bundle')}
                            >
                                Claim Deal
                            </button>
                        </div>
                    </div>
                </div>

                {/* Flash Sales Section - Hybrid Layout */}
                <div className="mb-10 px-5 lg:px-10">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2.5 text-[#181211]">
                            <Icon icon="iconoir:flash" className="text-[#E93E2B]" width={30} />
                            <h2 className="text-[18px] sm:text-2xl font-extrabold text-[#181211]">Flash Sales</h2>
                        </div>
                    </div>

                    {/* Desktop View (lg and up) - Grid of 4 */}
                    <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
                        {flashSales.slice(0, 4).map(item => (
                            <div key={item.id} className="w-full">
                                <ProductCard
                                    product={{
                                        ...item,
                                        isOverlayEffects: true
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Mobile/Tablet View (below lg) - Scrolling Row */}
                    <div 
                        className="lg:hidden flex gap-4 overflow-x-auto py-2 -mx-2 px-2 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {flashSales.map(item => (
                            <div key={item.id} className="min-w-[240px] sm:min-w-[280px]">
                                <ProductCard
                                    product={{
                                        ...item,
                                        isOverlayEffects: true
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bundle & Save Section - 1 Column Mobile, 2 Columns Desktop */}
                <div className="mb-10 px-5 lg:px-10">
                    <div className="flex items-center gap-2.5 text-[#181211] mb-5">
                        <Icon icon="mdi:stars-outline" className="text-[#E93E2B]" width={30} />
                        <h2 className="text-[18px] sm:text-2xl font-extrabold text-[#181211]">Bundle & Save</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        {bundles.map(bundle => (
                            <div key={bundle.id} className="bg-white rounded-[20px] p-3.5 lg:p-5 shadow-[0px_4px_25px_rgba(0,0,0,0.06)] border border-[#F1F5F9] flex gap-4 lg:gap-6 group hover:shadow-xl transition-all cursor-pointer items-center">
                                <div className="w-24 h-24 lg:w-32 lg:h-32 shrink-0 bg-[#FAF8F5] rounded-2xl overflow-hidden relative">
                                    {bundle.badge && (
                                        <span className="absolute top-1.5 right-1.5 bg-[#22C55E] text-white text-[9px] lg:text-[10px] font-bold px-2 py-0.5 rounded-md z-10 shadow-md uppercase">
                                            {bundle.badge}
                                        </span>
                                    )}
                                    <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between pt-1">
                                    <div>
                                        <h3 className="text-base lg:text-lg font-bold text-[#181211] mb-1">{bundle.name}</h3>
                                        <p className="text-xs lg:text-sm text-[#777777] font-medium leading-relaxed">{bundle.desc}</p>
                                    </div>
                                    <div className="flex items-end justify-between mt-3 lg:mt-4">
                                        <div className="flex flex-col">
                                            <span className="text-[#181211] text-xs font-medium mb-0.5 line-through opacity-60">${bundle.oldPrice.toFixed(2)}</span>
                                            <span className="text-xl lg:text-2xl font-bold text-[#E93E2B]">${bundle.price.toFixed(2)}</span>
                                        </div>
                                        <button className="bg-[#E93E2B] text-white px-5 py-2.5 lg:px-6 lg:py-2.5 rounded-xl text-sm font-bold shadow-md shadow-[#E93E2B33] active:scale-95 hover:bg-red-600 transition-all">
                                            Claim Bundle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Weekly Specials - Hybrid Layout */}
                <div className="pb-10 px-5 lg:px-10">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2.5 text-[#181211]">
                            <Icon icon="uil:calendar" className="text-[#E93E2B]" width={30} />
                            <h2 className="text-[18px] sm:text-2xl font-extrabold text-[#181211]">Weekly Specials</h2>
                        </div>
                    </div>

                    {/* Desktop View (lg and up) - Grid of 4 */}
                    <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
                        {bestSellers.slice(0, 4).map(item => (
                            <div key={item.id} className="w-full">
                                <ProductCard
                                    product={{
                                        ...item,
                                        isOverlayEffects: true
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Mobile/Tablet View (below lg) - Scrolling Row */}
                    <div 
                        className="lg:hidden flex gap-4 overflow-x-auto py-2 -mx-2 px-2 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {bestSellers.map(item => (
                            <div key={item.id} className="min-w-[240px] sm:min-w-[280px]">
                                <ProductCard
                                    product={{
                                        ...item,
                                        isOverlayEffects: true
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Coupon Modal (Shared for any manual code redemption) */}
            {selectedCoupon && <CouponModal coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />}
        </div>
    );
};

export default DealsPage;
