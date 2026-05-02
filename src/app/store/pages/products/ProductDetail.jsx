import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

import storecard1 from "../../assets/images/storecard1.png";
import background from "../../assets/images/background1.png";
import storecard2 from "../../assets/images/storecard2.png";
import background2 from "../../assets/images/background2.png";
import storecard3 from "../../assets/images/storecard3.png";
import background3 from "../../assets/images/background3.png";
import ProdSideCard from "../../components/common/ProdSideCard";
import SimilarProducts from "../../components/products/SimilarProducts";
import FAQ from "../../components/products/FAQ";
import { getProductById, allProducts } from "../../data/productsData";
import { mushroomOttawaProducts } from "../../data/mushroomOttawaProducts";

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();
    const { user } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState("description");
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [userReviews, setUserReviews] = useState([]);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [storesPanelOpen, setStoresPanelOpen] = useState(true);

    // Mock stores with per-store product pricing and delivery
    const stores = [
        {
            id: 2,
            name: "The Mushroom",
            rating: "4.8",
            reviewCount: "124",
            estimatedDelivery: "2 - 5 Hours",
            priceRange: "$29.00 - $150.00",
            price: 29.00,
            location: "779 Somerset St W • Ottawa",
            coverImage: storecard2,
            logo: background2,
            deliveryBadge: { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [],
        },
        {
            id: 3,
            name: "Psilovibin",
            rating: "5.0",
            reviewCount: "89 reviews",
            estimatedDelivery: "Under 2 Hours",
            priceRange: "$26.00 - $146.00",
            price: 26.00,
            location: "5.2 km away • Etobicoke",
            coverImage: storecard3,
            logo: background3,
            deliveryBadge: { text: "Express Delivery", color: "text-[#7F7F7F]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [],
        },
        {
            id: 1,
            name: "micro zoomiez",
            rating: "4.8",
            reviewCount: "124",
            estimatedDelivery: "Under 2 Hours",
            priceRange: "$27.00 - $147.00",
            price: 27.00,
            location: "45 Four Winds Dr • North York",
            coverImage: storecard1,
            logo: background,
            deliveryBadge: { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [],
        },
    ];

    const [selectedStore, setSelectedStore] = useState(stores[0]);
    const productData = getProductById(productId) || mushroomOttawaProducts.find(p => p.id === Number(productId)) || allProducts[0];
    const product = {
        ...productData,
        weights: productData.weights || ["3.5g", "7g", "14g", "28g"],
    };

    // Set default selected weight from product
    const activeWeight = selectedWeight || product.weights[0];

    const handleQuantityChange = (type) => {
        if (type === "increment") {
            setQuantity((prev) => prev + 1);
        } else if (type === "decrement" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart({ ...product }, activeWeight, quantity);
    };

    const handleBuyNow = () => {
        addToCart({ ...product }, activeWeight, quantity);
        navigate('/store/cart');
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title: product.name, url });
                // eslint-disable-next-line no-unused-vars, no-empty
            } catch (_) { }
        } else {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        }
    };

    const handleWishlist = () => {
        toggleWishlist({ ...product });
    };

    return (
        <div className="w-full px-4 sm:px-10 pt-10 sm:pt-16 md:pt-18  sm:pb-10 md:pb-10 lg:pb-12 xl:pb-35 bg-[#FAF8F5] relative">
            {/* Main Content Grid */}
            <div className={`grid grid-cols-1 gap-8 transition-all duration-300 ${storesPanelOpen ? 'lg:grid-cols-[3.1fr_1.1fr]' : 'lg:grid-cols-1'}`}>
                {/* Left Column - Product Details (3/4 width) */}
                <div>
                    {/* Breadcrumbs - Only for mobile and tablet */}
                    <nav className="flex lg:hidden items-center gap-1.5 text-[15px] pb-5 sm:pb-8">
                        <Link to="/store" className="text-(--store-primary) font-bold hover:underline transition-all">Home</Link>
                        <span className="text-[#181211] font-bold">/</span>
                        <Link to="/store/storeslists" className="text-(--store-primary) font-bold hover:underline transition-all">Stores</Link>
                        <span className="text-[#181211] font-bold">/</span>
                        <Link to={`/store/storeslists/${selectedStore.id}`} className="text-(--store-primary) font-bold hover:underline transition-all">{selectedStore.name}</Link>
                        <span className="text-[#181211] font-bold">/</span>
                        <span className="text-[#181211] font-bold">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Images and Gallery - Side-by-side on mobile/tablet, Stacked on desktop */}
                        <div className="flex flex-row lg:flex-col gap-4">
                            {/* Thumbnail Images - Vertical on Left (mobile), Horizontal at Bottom (desktop) */}
                            <div className="flex flex-col lg:flex-row gap-3 min-w-[80px] sm:min-w-[100px] lg:min-w-0 max-h-[480px] sm:max-h-[600px] lg:max-h-none overflow-y-auto lg:overflow-x-auto scrollbar-hide lg:order-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-20 h-20 sm:w-26 sm:h-26 lg:w-24 lg:h-24 shrink-0 bg-white rounded-2xl p-2 border-2 transition-all md:shadow-[0px_5px_16px_0px_#00000029] ${selectedImage === idx
                                            ? "border-(--store-primary)"
                                            : "border-[#E5DCDC] "
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${idx + 1}`}
                                            className="w-full h-full object-cover rounded-lg shadow-inner"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Main Image - Right on mobile, Top on desktop */}
                            <div className="bg-white border border-[#E5DCDC] rounded-3xl p-6 sm:p-10 shadow-[0px_0px_21px_0px_#0000001A] flex-1 flex items-center justify-center lg:order-1">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
                                    className="w-full h-auto object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <h1 className="text-3xl font-bold text-[#0F3540] mt-0.5 mb-3">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-2.5">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Icon
                                            key={i}
                                            icon={
                                                i < Math.floor(selectedStore.rating)
                                                    ? "flowbite:star-solid"
                                                    : "basil:star-outline"
                                            }
                                            className="text-[#FFE100]"
                                            width={20}
                                            height={20}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-[#777777] font-semibold">
                                    {selectedStore.rating} ({selectedStore.reviewCount} Review)
                                </span>
                            </div>

                            {/* Effects Icons */}
                            <div className="flex items-center gap-1 mb-3">
                                {product.effects.map((effect, idx) => (
                                    <div
                                        key={idx}
                                        className="w-9 h-9 rounded-full overflow-hidden "
                                    >
                                        <img
                                            src={effect.image}
                                            alt={effect.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Price and Social Actions Row */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-3xl font-bold text-(--store-primary)">
                                    {typeof product.price === 'string' ? `$${product.price.replace(' – ', ' – $')}` : `$${selectedStore.price.toFixed(2)}`}
                                </div>
                                <div className="flex gap-2.5 lg:hidden">
                                    <button onClick={handleWishlist} className="w-10 h-10 flex items-center justify-center border border-[#E5DCDC] rounded-full bg-white shadow-sm">
                                        <Icon
                                            icon={isWishlisted(product.id) ? "ion:heart" : "ion:heart-outline"}
                                            width={20}
                                            className={isWishlisted(product.id) ? "text-[#E93E2B]" : "text-[#181211]"}
                                        />
                                    </button>
                                    <button onClick={handleShare} className="w-10 h-10 flex items-center justify-center border border-[#E5DCDC] rounded-full bg-white shadow-sm">
                                        <Icon
                                            icon="majesticons:share-line"
                                            width={20}
                                            className="text-[#181211]"
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Vendor Info */}
                            <div className="flex flex-col gap-3 mb-6 p-4 border-y border-[#E5DCDC] bg-[#F1F5F9]/30 rounded-lg sm:bg-transparent sm:p-2 sm:border-x-0">
                                {/* Row 1: Store Name and Delivery Badge */}
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="iconoir:shop" width="18" height="18" className="text-[#0F3540]" />
                                        <Link to={`/store/storeslists/${selectedStore.id}`} className="text-[15px] font-bold text-[#181211] hover:text-(--store-primary) transition-colors">{selectedStore.name}</Link>
                                    </div>
                                    <button className="px-4 py-1.5 bg-[#D4E6D5] rounded-full text-[13px] font-bold flex items-center gap-1.5 whitespace-nowrap">
                                        <Icon icon="mdi:truck-outline" width={18} height={18} />
                                        {selectedStore.deliveryBadge?.text || "Delivery"}
                                    </button>
                                </div>

                                {/* Row 2: Address and Delivery Time */}
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-2">
                                        <Icon
                                            icon="streamline-sharp:mail-send-email-message"
                                            width="14"
                                            height="14"
                                            className="text-[#64748B]"
                                        />
                                        <p className="text-xs text-[#64748B] leading-tight">{selectedStore.location}</p>
                                    </div>
                                    <span className="text-[13px] text-[#64748B] flex items-center gap-1.5 font-medium whitespace-nowrap">
                                        <Icon
                                            icon="ic:outline-watch-later"
                                            width={16}
                                            height={16}
                                        />
                                        {selectedStore.estimatedDelivery}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                {product.description.map((item, idx) => (
                                    <div key={idx} className="mb-3">
                                        <p className="text-sm text-[#181211]">
                                            <span className="font-semibold">• {item.title}</span>{" "}
                                            {item.text}
                                            {item.icon && (
                                                <span className="inline-block ml-1">{item.icon}</span>
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Quantity and Actions - Hidden on mobile, shown on desktop */}
                            <div className="hidden lg:block mb-6">
                                <h3 className="text-base font-bold text-[#181211] mb-3">
                                    Quantity (Select Size)
                                </h3>

                                {/* Weight Options */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {product.weights.map((weight) => (
                                        <button
                                            key={weight}
                                            onClick={() => setSelectedWeight(weight)}
                                            className={`px-6 py-2 rounded-full text-[14px] font-bold transition-all cursor-pointer ${activeWeight === weight
                                                ? "bg-(--store-primary) text-white shadow-lg scale-105"
                                                : "bg-white border border-[#E5DCDC] text-[#181211] hover:border-(--store-primary)"
                                                }`}
                                        >
                                            {weight}
                                        </button>
                                    ))}
                                </div>

                                {/* Quantity Selector and Action Buttons Row */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        {/* Quantity Counter */}
                                        <div className="flex items-center justify-between border border-[#E5DCDC] bg-white rounded-full flex-1 h-12 overflow-hidden">
                                            <button
                                                onClick={() => handleQuantityChange("decrement")}
                                                className="w-14 h-full flex items-center justify-center text-black border-r border-[#E5DCDC] hover:bg-gray-50 transition-colors"
                                            >
                                                <Icon icon="mdi:minus" width={22} />
                                            </button>
                                            <span className="flex-1 text-center font-bold text-[#181211] text-lg">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange("increment")}
                                                className="w-14 h-full flex items-center justify-center text-black border-l border-[#E5DCDC] hover:bg-gray-50 transition-colors"
                                            >
                                                <Icon icon="mdi:plus" width={22} />
                                            </button>
                                        </div>

                                        {/* Wishlist and Share Mobile */}
                                        <div className="flex gap-2">
                                            <button onClick={handleWishlist} className="w-12 h-12 flex items-center justify-center border cursor-pointer border-[#E5DCDC] rounded-full bg-white hover:border-(--store-primary) transition-all">
                                                <Icon
                                                    icon={isWishlisted(product.id) ? "ion:heart" : "ion:heart-outline"}
                                                    width={22}
                                                    className={isWishlisted(product.id) ? "text-[#E93E2B]" : "text-[#181211]"}
                                                />
                                            </button>

                                            <button onClick={handleShare} className="w-12 h-12 flex items-center justify-center border cursor-pointer border-[#E5DCDC] rounded-full bg-white hover:border-(--store-primary) transition-all">
                                                <Icon
                                                    icon="majesticons:share-line"
                                                    width={22}
                                                    className="text-[#181211]"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Primary Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button onClick={handleAddToCart} className="flex-1 bg-(--store-primary) text-white h-14 rounded-xl cursor-pointer font-bold text-base hover:opacity-95 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98]">
                                            <Icon icon="proicons:cart" width="22" />
                                            Add to cart
                                        </button>
                                        <button onClick={handleBuyNow} className="flex-1 bg-white border-2 border-[#181211] cursor-pointer text-[#181211] h-14 rounded-xl font-bold text-base hover:bg-[#181211] hover:text-white transition-all flex items-center justify-center gap-2.5 active:scale-[0.98]">
                                            <Icon icon="iconamoon:shopping-bag-light" width="22" />
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Message */}
                            <div className="bg-[#2196531A] rounded-lg p-4 mb-4">
                                <p className="text-sm text-[#219653] font-semibold">
                                    Add $100.00 to cart and get free same day delivery, free
                                    shipping or Express Delivery for just $5!
                                </p>
                            </div>

                            {/* Product Meta */}
                            <div className="text-sm text-[#777777]">
                                <p className="mb-2">
                                    <span className="font-semibold text-[#222222]">SKU:</span>{" "}
                                    {product.sku}
                                </p>
                                <p>
                                    <span className="font-semibold text-[#222222]">
                                        Categories:
                                    </span>{" "}
                                    {product.categories.join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Related Stores (1/4 width) */}
                {storesPanelOpen ? (
                    <div className="flex flex-col lg:flex-row">
                        <div className="hidden lg:flex flex-col items-center w-8 shrink-0 mr-3">
                            <button
                                onClick={() => setStoresPanelOpen(prev => !prev)}
                                className="bg-white p-1 flex justify-center items-center rounded-full shadow-2xl cursor-pointer"
                            >
                                <Icon
                                    icon="si:double-arrow-right-duotone"
                                    width="26"
                                    height="26"
                                />
                            </button>
                            <div className="h-full w-px bg-[#BDBDD2]"></div>
                        </div>
                        <div className="sticky top-67.5 min-w-0 flex-1">
                            <h2 className="text-[20px] font-bold text-[#181211] mb-5 lg:hidden">Similar Dispensaries</h2>
                            <div className="flex flex-col gap-6">
                                {stores.map((store) => (
                                    <div key={store.id} className="w-full">
                                        <ProdSideCard
                                            store={store}
                                            onAddToCart={handleAddToCart}
                                            isSelected={selectedStore.id === store.id}
                                            onSelect={() => setSelectedStore(store)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="hidden lg:flex absolute top-12 right-10 flex-col items-center gap-2 z-10">
                        <button
                            onClick={() => setStoresPanelOpen(prev => !prev)}
                            className="bg-white p-1 flex justify-center items-center rounded-full shadow-2xl cursor-pointer"
                        >
                            <Icon
                                icon="si:double-arrow-right-duotone"
                                width="26"
                                height="26"
                                className="rotate-180"
                            />
                        </button>
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-px h-6 bg-[#BDBDD2]"></div>
                            <span className="text-xs font-semibold text-[#E93E2B] [writing-mode:vertical-rl] rotate-180 tracking-wider">
                                View Stores
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Tabs Section */}
            <div className="mt-12 overflow-hidden">
                {/* Tab Headers */}
                <div className="flex border-b border-[#E5DCDC] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <button
                        onClick={() => setActiveTab("description")}
                        className={`flex-1 px-2 sm:px-8 py-4 cursor-pointer text-sm sm:text-base font-bold transition-all relative whitespace-nowrap ${activeTab === "description"
                            ? "text-[#E85D4C]"
                            : "text-[#777777] hover:text-[#181211]"
                            }`}
                    >
                        Description
                        {activeTab === "description" && (
                            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E85D4C] rounded-t-full"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`flex-1 px-2 sm:px-8 py-4 cursor-pointer text-sm sm:text-base font-bold transition-all relative whitespace-nowrap ${activeTab === "reviews"
                            ? "text-[#E85D4C]"
                            : "text-[#777777] hover:text-[#181211]"
                            }`}
                    >
                        Reviews (124)
                        {activeTab === "reviews" && (
                            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E85D4C] rounded-t-full"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("shipping")}
                        className={`flex-1 px-2 sm:px-8 py-4 text-sm sm:text-base cursor-pointer font-bold transition-all relative whitespace-nowrap ${activeTab === "shipping"
                            ? "text-[#E85D4C]"
                            : "text-[#777777] hover:text-[#181211]"
                            }`}
                    >
                        Shipping & Delivery
                        {activeTab === "shipping" && (
                            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E85D4C] rounded-t-full"></div>
                        )}
                    </button>
                </div>

                {/* Tab Content */}
                <div className="px-8 py-6 border border-[#E5DCDC] rounded-bl-lg rounded-br-lg ">
                    {activeTab === "description" && (
                        <div className="text-[#777777]">
                            {product.description && product.description.length > 0 ? (
                                product.description.map((item, idx) => (
                                    <div key={idx} className="mb-6">
                                        <h3 className="text-lg font-bold text-[#181211] mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="leading-relaxed font-semibold">
                                            {item.text}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="mb-4 leading-relaxed font-semibold">
                                    No description available for this product.
                                </p>
                            )}

                            {product.effects && product.effects.length > 0 && (
                                <>
                                    <h3 className="text-lg font-bold text-[#181211] mb-3">
                                        Expected Experiences:
                                    </h3>
                                    <ul className="space-y-3">
                                        {product.effects.map((effect, idx) => (
                                            <li key={idx} className="leading-relaxed flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
                                                    <img src={effect.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-semibold text-[#181211]">
                                                    • {effect.name}:
                                                </span>{" "}
                                                Experience enhanced {effect.name.toLowerCase()} and well-being.
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Left Column - Rating Summary */}
                            <div className="lg:col-span-1 bg-white px-4 py-6 rounded-2xl border border-[#E8E8E8] h-fit">
                                <div className="flex flex-col items-center">
                                    {/* Overall Rating */}
                                    <div className="text-6xl font-bold text-[#181211] mb-2">
                                        4.9
                                    </div>

                                    {/* Stars */}
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Icon
                                                key={i}
                                                icon="flowbite:star-solid"
                                                className="text-[#FFE100]"
                                                width={20}
                                                height={20}
                                            />
                                        ))}
                                    </div>

                                    {/* Review Count */}
                                    <p className="text-sm text-[#181211] mb-6">
                                        Based on 124 verified reviews
                                    </p>

                                    {/* Rating Bars */}
                                    <div className="w-full space-y-2 mb-6">
                                        {[
                                            { stars: 5, percentage: 90 },
                                            { stars: 4, percentage: 60 },
                                            { stars: 3, percentage: 40 },
                                            { stars: 2, percentage: 30 },
                                            { stars: 1, percentage: 0 },
                                        ].map((rating) => (
                                            <div
                                                key={rating.stars}
                                                className="flex items-center gap-2"
                                            >
                                                <span className="text-sm font-semibold text-[#181211] w-6">
                                                    0{rating.stars}
                                                </span>
                                                <Icon
                                                    icon="flowbite:star-solid"
                                                    className="text-[#FFE100]"
                                                    width={16}
                                                    height={16}
                                                />
                                                <div className="flex-1 h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#FFE100] rounded-full"
                                                        style={{ width: `${rating.percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-semibold text-[#181211] w-10 text-right">
                                                    {rating.percentage}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Write Review Button */}
                                    <button onClick={() => user ? setShowLoginForm(true) : setShowLoginPrompt(true)} className="w-full py-3 border-2 border-[#E93E2B] text-[#E93E2B] rounded-lg font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-colors cursor-pointer">
                                        Write a Review
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Reviews List */}
                            <div className="lg:col-span-2">
                                {/* Login Prompt */}
                                <div className="bg-white border border-[#E8E8E8] rounded-lg p-8 mb-6 text-center">
                                    {user ? (
                                        showLoginForm ? (
                                            <>
                                                <h3 className="text-2xl font-bold text-[#0F172A] mb-4 text-left">
                                                    Write a Review
                                                </h3>
                                                <p className="text-sm text-[#64748B] text-left mb-4">Posting as <span className="font-semibold text-[#181211]">{user.name}</span></p>

                                                <div className="text-left mb-3.5">
                                                    <p className="text-base font-medium leading-1.5 text-[#334155] mb-3">Your Rating</p>
                                                    <div className="flex items-center gap-1">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() => setReviewRating(star)}
                                                                className="focus:outline-none focus:ring-2 focus:ring-[#E85D4C]"
                                                            >
                                                                <Icon
                                                                    icon={star <= reviewRating ? "flowbite:star-solid" : "basil:star-outline"}
                                                                    className={star <= reviewRating ? "text-[#FFE100]" : "text-[#181211]"}
                                                                    width={24} height={24}
                                                                />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="text-left mb-3 ml-0.5">
                                                    <p className="text-sm font-medium text-[#334155] mb-1">Review Content</p>
                                                    <textarea
                                                        value={reviewText}
                                                        onChange={(e) => setReviewText(e.target.value)}
                                                        placeholder="Share your experience with this product..."
                                                        className="w-full min-h-30 resize-none px-4 py-3 border border-[#E5DCDC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E85D4C]"
                                                    />
                                                </div>

                                                <div className="flex items-center justify-end gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => { setShowLoginForm(false); setReviewRating(0); setReviewText(""); }}
                                                        className="px-8 py-3.5 text-sm border border-[#E5E5E5] rounded-lg font-medium text-[#181211] hover:bg-[#F5F5F5] transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (!reviewText.trim()) return;
                                                            setUserReviews(prev => [{
                                                                id: Date.now(),
                                                                name: user.name,
                                                                rating: reviewRating || 5,
                                                                text: reviewText.trim(),
                                                                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                                                            }, ...prev]);
                                                            setShowLoginForm(false);
                                                            setReviewRating(0);
                                                            setReviewText("");
                                                        }}
                                                        className="px-8 py-3.5 text-sm bg-[#E93E2B] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                                                    >
                                                        Submit Review
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center">
                                                <p className="text-base text-[#181211] mb-4">Logged in as <span className="font-semibold">{user.name}</span></p>
                                                <button onClick={() => setShowLoginForm(true)} className="bg-[#E93E2B] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                                                    Write a Review
                                                </button>
                                            </div>
                                        )
                                    ) : (
                                        <>
                                            <div className="flex justify-center mb-4">
                                                <div className="w-16 h-16 flex items-center justify-center">
                                                    <Icon icon="bx:message-edit" width="32" height="32" className="text-[#7F7F7F]" />
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#181211] mb-2">
                                                Want to share your experience?
                                            </h3>
                                            <p className="text-base text-[#181211] mb-4">
                                                Please log in to write a review for this product.
                                            </p>
                                            {showLoginPrompt && (
                                                <p className="text-sm font-semibold text-[#E93E2B] mb-3 animate-pulse">
                                                    You must be logged in to write a review. Please login first.
                                                </p>
                                            )}
                                            <button
                                                onClick={() => navigate('/store/login')}
                                                className={`text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all mb-3 ${showLoginPrompt ? 'bg-[#E93E2B] ring-4 ring-[#E93E2B]/40 scale-105' : 'bg-[#E93E2B]'}`}
                                            >
                                                Login
                                            </button>
                                            <p className="text-sm text-[#777777]">
                                                Don&apos;t have an account?{" "}
                                                <a onClick={() => navigate('/store/register')} className="text-[#E93E2B] font-semibold hover:underline cursor-pointer">Register now</a>
                                            </p>
                                        </>
                                    )}
                                </div>

                                {/* Reviews List */}
                                <div className="space-y-6">
                                    {/* User submitted reviews */}
                                    {userReviews.map(r => (
                                        <div key={r.id} className="border-b border-[#E5DCDC] pb-6">
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="text-base font-bold text-[#181211]">{r.name}</h4>
                                            </div>
                                            <div className="flex items-center gap-1 mb-3">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Icon key={i} icon={i < r.rating ? "flowbite:star-solid" : "basil:star-outline"} className={i < r.rating ? "text-[#FFE100]" : "text-[#ccc]"} width={16} height={16} />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-[#7F7F7F] ml-2">• {r.date}</span>
                                            </div>
                                            <p className="text-sm text-[#181211] leading-relaxed">"{r.text}"</p>
                                        </div>
                                    ))}
                                    {/* Review 1 */}
                                    <div className="border-b border-[#E5DCDC] pb-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-base font-bold text-[#181211]">
                                                Sarah Jenkins
                                            </h4>
                                        </div>
                                        <div className="flex items-center gap-1  mb-3">

                                            {/* Stars */}
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Icon
                                                        key={i}
                                                        icon="flowbite:star-solid"
                                                        className="text-[#FFE100]"
                                                        width={16}
                                                        height={16}
                                                    />
                                                ))}
                                            </div>

                                            {/* Verified + Date */}
                                            <div className="flex items-center ml-2">
                                                <span className="text-xs text-[#7F7F7F] font-semibold">
                                                    Verified Buyer
                                                </span>

                                                <span className="text-xs text-[#7F7F7F] ml-0.5">
                                                    • Oct 12, 2025
                                                </span>
                                            </div>

                                        </div>
                                        <p className="text-sm text-[#181211] leading-relaxed">
                                            "I've been taking this for three weeks now and the
                                            difference in my morning brain fog is remarkable. It
                                            doesn't give me the jitters like caffeine does, just a
                                            clean sense of clarity."
                                        </p>
                                    </div>

                                    {/* Review 2 */}
                                    <div className="border-b border-[#E5DCDC] pb-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-base font-bold text-[#181211]">
                                                David Chen
                                            </h4>
                                        </div>
                                        <div className="flex items-center gap-1  mb-3">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Icon
                                                        key={i}
                                                        icon="flowbite:star-solid"
                                                        className="text-[#FFE100]"
                                                        width={16}
                                                        height={16}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex items-center ml-2">
                                                <span className="text-xs text-[#7F7F7F] font-semibold">
                                                    Verified Buyer
                                                </span>
                                                <span className="text-xs text-[#7F7F7F] ml-0.5">
                                                    • Sep 28, 2025
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-[#181211] leading-relaxed">
                                            "Top quality extract. You can tell by the dark color and
                                            the fine texture. I mix it into my morning smoothie and it
                                            dissolves perfectly. Highly recommended for students."
                                        </p>
                                    </div>

                                    {/* Review 3 */}
                                    <div className="pb-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-base font-bold text-[#181211]">
                                                Emily Rodriguez
                                            </h4>
                                        </div>
                                        <div className="flex items-center gap-1 mb-3">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Icon
                                                        key={i}
                                                        icon="flowbite:star-solid"
                                                        className="text-[#FFE100]"
                                                        width={16}
                                                        height={16}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex items-center ml-2">
                                                <span className="text-xs text-[#7F7F7F] font-semibold">
                                                    Verified Buyer
                                                </span>
                                                <span className="text-xs text-[#7F7F7F] ml-0.5">
                                                    • Sep 16, 2025
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-[#181211] leading-relaxed">
                                            "Great product, but I wish the packaging was a bit larger.
                                            The effects are subtle at first but build up over time.
                                            Customer service was very helpful when my first order was
                                            delayed."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "shipping" && (
                        <div>
                            {/* Two Column Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                {/* Left Column - Shipping Information */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Icon
                                            icon="ri:truck-line"
                                            width="24"
                                            height="24"
                                            className="text-[#E93E2B]"
                                        />
                                        <h3 className="text-lg font-bold text-[#181211]">
                                            Shipping Information
                                        </h3>
                                    </div>

                                    <p className="text-sm text-[#181211] leading-relaxed mb-4">
                                        We offer worldwide shipping with discreet, vacuum-sealed
                                        packaging. All orders are processed within 24 hours of
                                        payment confirmation. We utilize neutral packaging without
                                        any external branding or indications of content for your
                                        privacy.
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Icon
                                                icon="simple-line-icons:check"
                                                width="16"
                                                height="16"
                                                className="text-[#E93E2B]"
                                            />

                                            <p className="text-sm text-[#181211]">
                                                Discreet vacuum-sealed packaging
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icon
                                                icon="simple-line-icons:check"
                                                width="16"
                                                height="16"
                                                className="text-[#E93E2B]"
                                            />

                                            <p className="text-sm text-[#181211]">
                                                Tracking number provided for every order
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icon
                                                icon="simple-line-icons:check"
                                                width="16"
                                                height="16"
                                                className="text-[#E93E2B]"
                                            />
                                            <p className="text-sm text-[#181211]">
                                                Temperature-controlled shipping available
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Estimated Delivery Times */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Icon
                                            icon="mdi:clock-outline"
                                            width={24}
                                            height={24}
                                            className="text-[#E85D4C]"
                                        />
                                        <h3 className="text-lg font-bold text-[#181211]">
                                            Estimated Delivery Times
                                        </h3>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between py-3 bg-white px-4 border border-[#E8E8E8] rounded-lg">
                                            <span className="text-sm text-[#181211] font-medium">
                                                Local (Same City)
                                            </span>
                                            <span className="text-sm font-bold text-[#E93E2B] ">
                                                Same Day / 24h
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between py-3 bg-white px-4 border border-[#E8E8E8] rounded-lg">
                                            <span className="text-sm text-[#181211] font-medium">
                                                Domestic (National)
                                            </span>
                                            <span className="text-sm font-bold text-[#E93E2B]">
                                                2 - 3 Business Days
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between py-3 bg-white px-4 border border-[#E8E8E8] rounded-lg">
                                            <span className="text-sm text-[#181211] font-medium">
                                                International
                                            </span>
                                            <span className="text-sm font-bold text-[#E93E2B]">
                                                7 - 14 Business Days
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Terms & Conditions Section */}
                            <div className="border-t border-[#E5DCDC] pt-6">
                                <h3 className="text-lg font-bold text-[#181211] mb-4">
                                    Terms & Conditions
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-[#181211] leading-relaxed">
                                            <span className="font-semibold text-[#181211]">
                                                1. Age Restriction:
                                            </span>{" "}
                                            You must be at least 18 (or 21, depending on jurisdiction)
                                            to purchase from this store. By placing an order, you
                                            confirm you meet the legal age requirement.
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-[#181211] leading-relaxed">
                                            <span className="font-semibold text-[#181211]">
                                                2. Legality:
                                            </span>{" "}
                                            Customers are responsible for understanding the legal
                                            status of our products in their respective country/state.
                                            We do not provide legal advice.
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-[#181211] leading-relaxed">
                                            <span className="font-semibold text-[#181211]">
                                                3. Return Policy:
                                            </span>{" "}
                                            Due to the biological nature of our products, we do not
                                            accept returns. However, if an order arrives damaged or
                                            incorrect, please contact support within 48 hours for a
                                            replacement.
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-[#181211] leading-relaxed">
                                            <span className="font-semibold text-[#181211]">
                                                4. Lost Packages:
                                            </span>{" "}
                                            While we provide tracking, we are not responsible for
                                            packages seized by customs or lost due to incorrect
                                            address information provided by the customer.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Similar Products Section */}
            <SimilarProducts />

            {/* FAQ Section */}
            <FAQ />
            {/* Fixed Bottom Bar for Mobile/Tablet */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/50 backdrop-blur-xl border-t border-gray-100 px-2 py-2 pt-2 pb-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] lg:hidden z-50">
                <div className="flex flex-col gap-2.5 max-w-lg mx-auto">
                    {/* Row 1: Size Options */}
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-center">
                        {product.weights.map((weight) => (
                            <button
                                key={weight}
                                onClick={() => setSelectedWeight(weight)}
                                className={`px-5 py-1.5 rounded-full text-[13px] font-bold transition-all border ${activeWeight === weight
                                    ? "bg-(--store-primary) text-white border-(--store-primary)"
                                    : "bg-white border-[#E5DCDC] text-[#181211]"
                                    }`}
                            >
                                {weight}
                            </button>
                        ))}
                    </div>

                    {/* Row 2: Action Row */}
                    <div className="flex items-center gap-3">
                        {/* Compact Quantity Selector */}
                        <div className="flex items-center justify-between bg-[#FDF2F1]/30 rounded-2xl p-1 border border-[#FDBA74]/20 h-11 w-32 shadow-sm">
                            <button
                                onClick={() => handleQuantityChange("decrement")}
                                className="w-8 h-8 flex items-center justify-center text-[#181211]"
                            >
                                <Icon icon="mdi:minus" width={20} />
                            </button>
                            <span className="font-bold text-base text-[#181211]">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange("increment")}
                                className="w-9 h-9 flex items-center justify-center bg-[#E93E2B] text-white rounded-xl shadow-md active:scale-95 transition-all"
                            >
                                <Icon icon="mdi:plus" width={20} />
                            </button>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-[#E93E2B] text-white h-11 rounded-2xl font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
                        >
                            <Icon icon="proicons:cart" width={18} />
                            Add to cart
                        </button>

                        {/* Buy Now */}
                        <button
                            onClick={handleBuyNow}
                            className="px-4 border border-[#E5DCDC] h-11 rounded-2xl font-bold text-[13px] text-[#181211] bg-white flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
                        >
                            <Icon icon="iconamoon:shopping-bag-light" width={18} />
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
