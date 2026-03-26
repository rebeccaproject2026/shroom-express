import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/CouponsPanel.css";
import couponV1 from "../../assets/images/coupon-v1.webp";
import couponV2 from "../../assets/images/coupon-v2.webp";
import couponV3 from "../../assets/images/coupon-v3.webp";
import couponV4 from "../../assets/images/coupon-v4.webp";

const slides = [
    { image: couponV1, couponIdx: 0 },
    { image: couponV2, couponIdx: 1 },
    { image: couponV3, couponIdx: 2 },
    { image: couponV4, couponIdx: 3 },
];

const coupons = [
    {
        theme: 2, code: "REFERRAL20", icon: "🤝", badge: "$20",
        title: "GET $20 CREDIT",
        desc: "Refer a Friend & Get $20 CREDIT for both you and your friend! When you refer a friend to Shroom's, you'll both receive a $20 credit after their first purchase is completed. It's the perfect way to share your love for premium psilocybin products.",
        terms: "Credit applied automatically after friend's first purchase.",
        detail: "Refer a Friend & Get $20 CREDIT for both you and your friend! When you refer a friend to Shroom's, you'll both receive a $20 credit after their first purchase is completed. It's the perfect way to share your love for premium psilocybin products while enjoying a bonus for yourself. Once your friend's order is completed, credits will automatically be applied to both accounts. Start spreading the word today and earn extra rewards with Shroom's.",
        valid: "March 31st, 2026",
    },
    {
        theme: 1, code: "BONUS20", icon: "💰", badge: "$20 OFF",
        title: "GET $20 OFF",
        desc: "Enjoy a Shroom's Bonus Deal with $20 OFF your order when you spend over $200! This exclusive offer applies to any subtotal exceeding $200, giving you more value for your money. Excludes items already on sale.",
        terms: "Whether you're stocking up on magic mushrooms, the savings are real.",
        detail: "Enjoy a Shroom's Bonus Deal with $20 OFF your order when you spend over $200! This exclusive offer applies to any subtotal exceeding $200, giving you more value for your money. Excludes items already on sale. Whether you're stocking up on magic mushrooms, microdose capsules, or psilocybin edibles, this deal makes it easy to save big on your next order. Take advantage of this offer and elevate your experience with Shroom's today.",
        valid: "March 31st, 2026",
    },
    {
        theme: 3, code: "FLASH30", icon: "🍄", badge: "30%",
        title: "GET 30% OFF",
        desc: "For a limited time only, get 30% OFF all psilocybin products at Shroom's! This special offer applies to our entire premium selection, including magic mushrooms, microdose capsules, and delicious edibles. Stock up on your favorites or try something new.",
        terms: "First order only. Minimum order $100.",
        detail: "For a limited time only, get 30% OFF all psilocybin products at Shroom's! This special offer applies to our entire premium selection, including magic mushrooms, microdose capsules, and delicious edibles. Stock up on your favorites or try something new while saving big. This first time buyer deal is the perfect opportunity to enjoy more for less and explore the world of psilocybin. Don't wait, the clock is ticking, and your next adventure awaits.",
        valid: "March 31st, 2026",
    },
    {
        theme: 2, code: "EARNCASH", icon: "💵", badge: "CA$H",
        title: "EARN CA$H",
        desc: "Earn CA$H on every purchase you make at Shroom's! For every dollar you spend, you'll earn three cents in SHROOM CA$H. Your rewards add up fast, turning every order into an opportunity to save more on your next purchase. Whether you're buying shrooms.",
        terms: "CA$H rewards applied automatically to your account.",
        detail: "Earn CA$H on every purchase you make at Shroom's! For every dollar you spend, you'll earn three cents in SHROOM CA$H. Your rewards add up fast, turning every order into an opportunity to save more on your next purchase. Whether you're buying shrooms, microdose capsules, or psilocybin edibles, this loyalty program makes it easy to stack up savings. Start shopping today and watch your rewards grow with every order at Shroom's.",
        valid: "March 31st, 2026",
    },
];

function CouponCard({ c, index, onGetCoupon }) {
    const [open, setOpen] = useState(false);
    const detailRef = useRef(null);
    const navigate = useNavigate();
    const patternClass = c.theme === 2 ? "pattern-squares" : c.theme === 3 ? "pattern-circles" : "";

    useEffect(() => {
        if (detailRef.current) {
            detailRef.current.style.maxHeight = open ? detailRef.current.scrollHeight + "px" : "0px";
        }
    }, [open]);

    return (
        <div className="col-lg-6 couponspage-couponcol" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
            <div className={`modern-coupon-card modern-coupon-theme-${c.theme}`}>
                {/* Left */}
                <div className="coupon-left-section">
                    <div className={`coupon-pattern-overlay ${patternClass}`} />
                    <div className="confetti-container">
                        <span className="confetti confetti-1">✨</span>
                        <span className="confetti confetti-2">🎉</span>
                        <span className="confetti confetti-3">⭐</span>
                        <span className="confetti confetti-4">💫</span>
                        <span className="confetti confetti-5">🌟</span>
                    </div>
                    <div className="coupon-left-content">
                        <p className="coupon-label-small">PROMO CODE</p>
                        <h2 className="coupon-promo-code">{c.code}</h2>
                        <div className="coupon-gift-box">
                            <div className="gift-box-icon">{c.icon}</div>
                            {c.badge && <div className="gift-box-percent">{c.badge}</div>}
                        </div>
                    </div>
                </div>

                {/* Torn line */}
                <div className="coupon-torn-line"><div className="torn-line-dots" /></div>

                {/* Right */}
                <div className="coupon-right-section">
                    <div className="coupon-right-top">
                        <span className="coupon-type-badge">DISCOUNT COUPON</span>
                        <span className="coupon-validity-badge">⏰ Limited Time</span>
                    </div>
                    <h1 className="coupon-discount-amount">{c.title}</h1>
                    <div className="coupon-divider" />
                    <p className="coupon-desc-text text-truncate-2" style={{ minHeight: '32px' }}>{c.desc}</p>
                    <p className="coupon-terms">{c.terms}</p>

                    {/* VIEW PRODUCTS + ACTIVATE side by side */}
                    <div className="coupon-actions" style={{ gap: "12px", marginTop: "10px" }}>
                        <button
                            className="cou-vp-btn-link"
                            onClick={() => navigate("/store/category/magic-mushrooms")}
                        >
                            View Products
                        </button>
                        <button
                            className={`my-coupons-coupon-activate-btn`}
                            onClick={() => onGetCoupon(c)}
                        >
                            GET A COUPON
                        </button>
                    </div>

                    {/* Valid Until + Offer Details footer bar */}
                    <div className="coupon-footer-bar" style={{ marginTop: "12px" }}>
                        <span className="coupon-footer-valid">
                            <Icon icon="mdi:clock-outline" width={13} />
                            Valid Until {c.valid}
                        </span>
                        <button className="coupon-footer-toggle" onClick={() => setOpen(p => !p)}>
                            Offer Details
                            <Icon icon={open ? "mdi:chevron-up" : "mdi:chevron-down"} width={14} />
                        </button>
                    </div>

                    {/* Collapsible detail — integrated feel */}
                    <div ref={detailRef} className="coupon-collapsible-wrapper" style={{ maxHeight: "0px" }}>
                        <div className={`coupon-detail-panel coupon-detail-panel-theme-${c.theme}`}>
                            <p className="coupon-detail-text">
                                <strong>Offer:</strong> {c.detail}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const CouponModal = ({ coupon, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRedeem = () => {
        setLoading(true);
        // Simulate API call
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
    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    useEffect(() => {
        const sw = swiperRef.current;
        if (sw?.params?.navigation && typeof sw.params.navigation !== "boolean") {
            sw.params.navigation.prevEl = prevRef.current;
            sw.params.navigation.nextEl = nextRef.current;
            sw.navigation.destroy();
            sw.navigation.init();
            sw.navigation.update();
        }
    }, []);

    return (
        <div className="w-full px-10 py-10 bg-[#FAF8F5]">
            {/* Promo slider */}
            <div className="relative mb-8">
                <Swiper
                    className="offer-slider-1"
                    modules={[Navigation, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={4}
                    loop
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    onSwiper={sw => { swiperRef.current = sw; }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        900: { slidesPerView: 3 },
                        1200: { slidesPerView: 4 }
                    }}
                >
                    {[...slides, ...slides].map((s, i) => (
                        <SwiperSlide key={i}>
                            <div className="item text-center">
                                <div
                                    className="promo-card-image-wrap"
                                    onClick={() => setSelectedCoupon(coupons[s.couponIdx])}
                                >
                                    <img src={s.image} alt="promo coupon" className="promo-card-img-full" />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button ref={prevRef} className="offer-slider-1-arrow offer-slider-1-arrow-prev">
                    <Icon icon="mdi:chevron-left" width={20} />
                </button>
                <button ref={nextRef} className="offer-slider-1-arrow offer-slider-1-arrow-next">
                    <Icon icon="mdi:chevron-right" width={20} />
                </button>
            </div>

            {/* Hero section */}
            <div className="offers-hero-section mb-6">
                <div className="offers-hero-content">
                    <div className="offers-hero-header-row">
                        <div className="offers-hero-icon-wrapper">
                            <div className="offers-hero-icon">🎁</div>
                            <div className="offers-hero-icon-bg" />
                        </div>
                        <h1 className="offers-hero-title">Exclusive Shroom's Deals!</h1>
                    </div>
                    <p className="offers-hero-description">
                        Welcome to Shroom's deals page, where you can unlock incredible discounts and savings on our premium magic mushroom products!
                        We understand how important it is to enjoy the finest products while saving, which is why we've created these exclusive offers just for you.
                        Take advantage of these deals to indulge in our premium selection at discounted prices.
                    </p>
                </div>
            </div>

            {/* Coupon cards grid */}
            <div className="row clearfix couponspage-row mt-6">
                {coupons.map((c, i) => (
                    <CouponCard
                        key={c.code}
                        c={c}
                        index={i}
                        onGetCoupon={(coupon) => setSelectedCoupon(coupon)}
                    />
                ))}
            </div>

            {/* Coupon Modal */}
            {selectedCoupon && <CouponModal coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />}

            {/* CTA section */}
            <div className="offers-cta-section mt-1">
                <div className="offers-cta-content">
                    <p className="offers-cta-text">
                        At Shroom's, we offer a wide range of high-quality mushroom products to suit your needs, whether you're looking for relaxation, mental clarity, or a boost of inspiration. With our fast and reliable service, you can enjoy a seamless and enriching mushroom journey from the comfort of your home.
                    </p>
                    <p className="offers-cta-footer-text">
                        Don't miss out on these <b>exclusive offers</b> and incredible deals! Claim your coupon code today and take advantage of exclusive offers, and be sure to register to stay updated on our monthly specials. Get ready to elevate your experience with Shroom's.🍄✨.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DealsPage;
