import { useState } from "react";
import "../../../styles/CouponsPanel.css";

/* ─── data ─── */
const allCoupons = [
    {
        theme: 1, code: "REFERRAL20", icon: "🍄", badge: "FREE",
        title: "GET $20 CREDIT",
        desc: "Refer a Friend & Get $20 Credit",
        terms: "Refer a Friend & Get $20 CREDIT for both you and your friend! When you refer a friend, you'll both receive a $20 credit after their first purchase is completed.",
        use: "ℹ Valid Until March 31st, 2026",
    },
    {
        theme: 2, code: "BONUS20", icon: "🌿", badge: "$20 OFF",
        title: "GET $20 OFF",
        desc: "Zoomiez Bonus Deal — Orders Over $200",
        terms: "Enjoy a Zoomiez Bonus Deal with $20 OFF your order when you spend over $200! This exclusive offer applies to any subtotal exceeding $200, giving you more value for your money.",
        use: "ℹ Valid Until March 31st, 2026",
    },
    {
        theme: 3, code: "FLASH30", icon: "🍄", badge: "30%",
        title: "GET 30% OFF",
        desc: "30% OFF On First Order Only — For All Products",
        terms: "For a limited time only, get 30% OFF all psilocybin products at Shroom's! This special offer applies to our entire premium selection, including magic mushrooms, microdose capsules, and delicious edibles.",
        use: "ℹ Valid Until March 31st, 2026",
    },
    {
        theme: 1, code: "EARNCASH", icon: "💰", badge: "CA$H",
        title: "EARN CA$H",
        desc: "Earn CA$H on Every Purchase",
        terms: "Earn CA$H on every purchase you make at Shroom's! For every dollar you spend, you'll earn three cents in SHROOM CA$H. Your rewards add up fast, turning every order into an opportunity to save more on your next purchase.",
        use: "ℹ Valid Until March 31st, 2026",
    },
];
const redeemedCoupons = [
    {
        theme: 2, code: "EDIBLE20", icon: "🍃", badge: "20%",
        title: "20% OFF",
        desc: "All Edible Products",
        terms: "On all edible products 20% OFF. Discount automatically reflected in the listed price. No coupon code is needed.",
        use: "",
    },
    {
        theme: 1, code: "WELCOME15", icon: "🌟", badge: "15%",
        title: "15% OFF",
        desc: "New Clients Exclusive",
        terms: "Welcome! Enjoy a generous 15% discount on any of our premium cannabis products. For new clients only. Grab this offer before it's gone!",
        use: "",
    },
    {
        theme: 3, code: "SAVE10", icon: "🎉", badge: "10%",
        title: "10% OFF",
        desc: "Shroom's Special Discount",
        terms: "10% off your entire order at Shroom's. Use at checkout with no minimum order required. Limited time offer.",
        use: "",
    },
];

/* ─── single card ─── */
function CouponCard({ c, expired = false, index = 0 }) {
    const [activated, setActivated] = useState(false);
    const patternClass = c.theme === 2 ? "pattern-squares" : c.theme === 3 ? "pattern-circles" : "";

    return (
        <div className="couponspage-couponcol mb-6 " style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
            <div className={`border border-[#E5DCDC] modern-coupon-card modern-coupon-theme-${c.theme}`}>

                {/* Left — promo code + icon */}
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

                {/* Right — details */}
                <div className="coupon-right-section">
                    {/* top badge row */}
                    <div className="coupon-right-top">
                        <span className="coupon-type-badge">DISCOUNT COUPON</span>
                        {!expired && <span className="coupon-validity-badge">⏰ Limited Time</span>}
                        {expired && <span className="coupon-expired-badge">✕ Expired</span>}
                    </div>

                    {/* big title */}
                    <h1 className="coupon-discount-amount">{c.title}</h1>

                    {/* divider */}
                    <div className="coupon-divider" />

                    {/* desc + terms */}
                    <p className="coupon-desc-text">{c.desc}</p>
                    <p className="coupon-terms">{c.terms}</p>
                    {c.use && <p className="coupon-use-hint">ℹ {c.use}</p>}

                    {/* button pinned to bottom */}
                    <div className="coupon-actions mr-0.5 mb-1.5">
                        {expired ? (
                            <div className="coupon-expired-label">Coupon Expired</div>
                        ) : (
                            <button
                                className={`my-coupons-coupon-activate-btn${activated ? " activated" : ""}`}
                                onClick={() => setActivated(p => !p)}
                            >
                                {activated ? "✓ Activated" : "Activate"}
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

/* ─── main panel ─── */
const CouponsPanel = () => {
    const [activeTab, setActiveTab] = useState("all");
    const list = activeTab === "all" ? allCoupons : redeemedCoupons;

    return (
        <div className="mycouponspage">

            {/* Header */}
            <div className="mycoupons-page-header">
                <div className="mycoupons-header-content">
                    <div>
                        <h2 className="mycoupons-header-title">My Coupons</h2>
                        <p className="mycoupons-header-sub">Your available discount coupons and promo codes</p>
                    </div>

                    {/* Filter toggle */}
                    <div className="mycoupons-filter-toggle">
                        <button
                            className={`mycoupons-filter-btn${activeTab === "all" ? " active" : ""}`}
                            onClick={() => setActiveTab("all")}
                        >All</button>
                        <button
                            className={`mycoupons-filter-btn${activeTab === "redeemed" ? " active" : ""}`}
                            onClick={() => setActiveTab("redeemed")}
                        >Redeemed</button>
                        <div
                            className="mycoupons-filter-active-bg"
                            style={{ left: activeTab === "all" ? "4px" : "calc(50%)" }}
                        />
                    </div>
                </div>
            </div>

            {/* Cards */}
            <div className="myfav-tabs-holder">
                <div className="myfav-tab">
                    <div className="coupons-row mt-3">
                        {list.map((c, i) => (
                            <CouponCard key={`${c.code}-${i}`} c={c} expired={activeTab === "redeemed"} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CouponsPanel;
