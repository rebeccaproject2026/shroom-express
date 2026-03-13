import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";

import product1 from "../../assets/images/product1.png";
import microDosingImg from "../../assets/images/microdosing.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import creativeBoostImg from "../../assets/images/creative boost.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import storecard1 from "../../assets/images/storecard1.png";
import background from "../../assets/images/background1.png";
import storecard2 from "../../assets/images/storecard2.png";
import background2 from "../../assets/images/background2.png";
import storecard3 from "../../assets/images/storecard3.png";
import background3 from "../../assets/images/background3.png";
import ProdSideCard from "../../components/common/ProdSideCard";
import SimilarProducts from "../../components/products/SimilarProducts";
import FAQ from "../../components/products/FAQ";

const ProductDetail = () => {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(4);
    const [selectedWeight, setSelectedWeight] = useState("3.5g");
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState("description");
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    // Mock product data
    const product = {
        id: productId,
        name: "Albino Choda",
        rating: 4.0,
        reviewCount: 120,
        price: 50.0,
        vendor: "Aether Mushroom Labs",
        location: "5.6 km away • Toronto Central",
        effects: [
            { image: microDosingImg, name: "Micro dosing" },
            { image: beginnerFriendlyImg, name: "Beginner Friendly" },
            { image: highPotencyImg, name: "High Potency" },
        ],
        images: [product1, product1, product1],
        description: [
            {
                title: "Blue Meanies Magic Mushrooms:",
                text: "Known for their distinctive deep blue , stain upon handling.",
            },
            {
                title: "Easily Bruised:",
                text: "High concentrations of psilocybin cause rapid bruising, altering the mushrooms' color.",
            },
            {
                title: "Potency:",
                text: "Average",
                icon: <Icon icon="noto:mushroom" width="16" height="16" />,
            },
        ],
        weights: ["3.5g", "7g", "14g", "28g"],
        sku: "N/A",
        categories: ["Shop Mushroom", "Shroom Strains"],
    };

    // Mock stores
    const stores = [
        {
            id: 1,
            name: "The Mushroom",
            rating: "4.8",
            reviewCount: "124",
            estimatedDelivery: "2 - 5 Hours",
            priceRange: "$29.00 - $150.00",
            location: "Delivery",
            coverImage: storecard1,
            logo: background,
            deliveryBadge: {
                text: "Same-day Delivery",
                color: "text-[#181211]",
                icon: "carbon:delivery",
            },
            isPrimary: false,
            avatars: [
                beginnerFriendlyImg,
                highPotencyImg,
                microDosingImg,
                visualExperienceImg,
                creativeBoostImg,
                relaxChillImg,
            ],
        },
        {
            id: 2,
            name: "Psilovibin",
            rating: "5.0",
            reviewCount: "89 reviews",
            estimatedDelivery: "Under 2 Hours",
            priceRange: "$26.00 - $146.00",
            location: "Delivery",
            coverImage: storecard2,
            logo: background2,
            deliveryBadge: {
                text: "Express Delivery",
                color: "text-[#7F7F7F]",
                icon: "carbon:delivery",
            },
            isPrimary: false,
            avatars: [
                beginnerFriendlyImg,
                highPotencyImg,
                microDosingImg,
                visualExperienceImg,
                creativeBoostImg,
                relaxChillImg,
            ],
        },
        {
            id: 3,
            name: "Shroom Express",
            rating: "4.1",
            reviewCount: "210 reviews",
            estimatedDelivery: "1 - 2 Hours",
            priceRange: "$26.00 - $146.00",
            location: "Delivery",
            coverImage: storecard3,
            logo: background3,
            deliveryBadge: {
                text: "Same-day Delivery",
                color: "text-[#181211]",
                icon: "carbon:delivery",
            },
            isPrimary: false,
            avatars: [],
        },
    ];

    const handleQuantityChange = (type) => {
        if (type === "increment") {
            setQuantity((prev) => prev + 1);
        } else if (type === "decrement" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <div className="w-full px-10 py-12 bg-[#FAF8F5]">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column - Product Details (3/4 width) */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Images */}
                        <div>
                            {/* Main Image */}
                            <div className="bg-white border border-[#E5DCDC] rounded-2xl p-8 mb-4 shadow-[0px_0px_21px_0px_#0000001A]">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            {/* Thumbnail Images */}
                            <div className="flex gap-3">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-26 h-26 bg-white rounded-lg p-2 border-2 transition-all shadow-[0px_5px_16px_0px_#00000029] ${selectedImage === idx
                                            ? "border-(--store-primary)"
                                            : "border-[#E5DCDC] "
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
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
                                                i < Math.floor(product.rating)
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
                                    {product.rating} ({product.reviewCount} Review)
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

                            {/* Price */}
                            <div className="text-xl font-bold text-(--store-primary) mb-3">
                                ${product.price.toFixed(2)}
                            </div>

                            {/* Vendor Info */}
                            <div className="flex items-center gap-1 mb-6 p-2 border-t border-b border-[#E5DCDC] ">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1">
                                        <Icon icon="iconoir:shop" width="16" height="16" />
                                        <p className="text-sm font-semibold text-[#181211]">
                                            {product.vendor}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Icon
                                            icon="streamline-sharp:mail-send-email-message"
                                            width="14"
                                            height="14"
                                            className="text-[#64748B]"
                                        />
                                        <p className="text-xs text-[#64748B]">{product.location}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-0.5 ml-auto mr-auto">
                                    <button className=" px-4 py-2 bg-[#D4E6D5] rounded-full text-[13px] font-semibold flex items-center gap-1">
                                        <Icon icon="mdi:truck-outline" width="18" height="18" />
                                        Same-day Delivery
                                    </button>
                                    <span className="text-[13px] text-[#64748B] flex items-center gap-1 ml-2">
                                        <Icon
                                            icon="ic:outline-watch-later"
                                            width="16"
                                            height="16"
                                        />
                                        1 - 3 Hours
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

                            {/* Quantity */}
                            <div className="mb-3">
                                <h3 className="text-base font-bold text-[#181211] mb-3">
                                    Quantity
                                </h3>

                                {/* Weight Options */}
                                <div className="flex gap-2 mb-4">
                                    {product.weights.map((weight) => (
                                        <button
                                            key={weight}
                                            onClick={() => setSelectedWeight(weight)}
                                            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${selectedWeight === weight
                                                ? "bg-(--store-primary) text-white"
                                                : "bg-white border border-gray-300 text-[#181211] hover:border-(--store-primary)"
                                                }`}
                                        >
                                            {weight}
                                        </button>
                                    ))}
                                </div>

                                {/* Quantity Counter */}
                                <div className="flex items-center gap-2 w-full">
                                    <div className="flex items-center justify-between border border-gray-300 bg-white rounded-full w-full">
                                        <button
                                            onClick={() => handleQuantityChange("decrement")}
                                            className="w-14 h-12 flex items-center justify-center text-black border-r border-gray-300"
                                        >
                                            <Icon icon="mdi:minus" width={24} height={24} />
                                        </button>
                                        <span className="w-16 text-center font-semibold text-[#181211]">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange("increment")}
                                            className="w-14 h-12 flex items-center justify-center text-black border-l border-gray-300"
                                        >
                                            <Icon icon="mdi:plus" width={24} height={24} />
                                        </button>
                                    </div>

                                    <button className="w-16 h-12 flex items-center justify-center border border-gray-300 rounded-full bg-white">
                                        <Icon
                                            icon="ion:heart-outline"
                                            width={24}
                                            height={24}
                                            className="text-gray-800"
                                        />
                                    </button>

                                    <button className="w-16 h-12 flex items-center justify-center border border-gray-300 rounded-full bg-white">
                                        <Icon
                                            icon="majesticons:share-line"
                                            width={24}
                                            height={24}
                                            className="text-gray-800"
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mb-4">
                                <button className="flex-1 bg-(--store-primary) text-white py-4 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                    <Icon icon="proicons:cart" width="22" height="22" />
                                    Add to cart
                                </button>
                                <button className="flex-1 bg-white border border-gray-300 text-black py-4 rounded-lg font-semibold text-base hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                    <Icon
                                        icon="iconamoon:shopping-bag-light"
                                        width="24"
                                        height="24"
                                        className="*:stroke-2"
                                    />
                                    Buy Now
                                </button>
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
                <div className="lg:col-span-1 grid grid-cols-[10%_90%] gap-3">
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-1 flex justify-center items-center rounded-full shadow-2xl">
                            <Icon
                                icon="si:double-arrow-right-duotone"
                                width="26"
                                height="26"
                            />
                        </div>
                        <div className=" h-full w-px bg-[#BDBDD2]"></div>
                    </div>
                    <div className="sticky top-67.5">
                        {/* Stores List */}
                        <div className="flex flex-col gap-6">
                            {stores.map((store) => (
                                <div key={store.id} className="w-full">
                                    <ProdSideCard store={store} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="mt-12">
                {/* Tab Headers */}
                <div className="flex ml-4">
                    <button
                        onClick={() => setActiveTab("description")}
                        className={`px-8 py-4 cursor-pointer text-base font-semibold transition-colors relative ${activeTab === "description"
                            ? "text-[#E85D4C]"
                            : "text-[#777777] hover:text-[#181211]"
                            }`}
                    >
                        Description
                        {activeTab === "description" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E85D4C]"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`px-8 py-4 cursor-pointer text-base font-semibold transition-colors relative ${activeTab === "reviews"
                            ? "text-[#E85D4C]"
                            : "text-[#777777] hover:text-[#181211]"
                            }`}
                    >
                        Reviews (124)
                        {activeTab === "reviews" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E85D4C]"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("shipping")}
                        className={`px-8 py-4 text-base cursor-pointer font-semibold transition-colors relative ${activeTab === "shipping"
                            ? "text-[#E85D4C]"
                            : "text-[#777777] hover:text-[#181211]"
                            }`}
                    >
                        Shipping & Delivery
                        {activeTab === "shipping" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E85D4C]"></div>
                        )}
                    </button>
                </div>

                {/* Tab Content */}
                <div className="px-8 py-6 border border-[#E5DCDC] rounded-bl-lg rounded-br-lg ">
                    {activeTab === "description" && (
                        <div className="text-[#777777]">
                            <p className="mb-4 leading-relaxed  font-semibold">
                                Introducing our Blue Meanies Magic Mushrooms, renowned for their
                                distinctive deep blue "stain" upon handling. These mushrooms are
                                characterized by their tendency to bruise easily, resulting in
                                the oxidation of high concentrations of psilocybin and a change
                                in color. With an average potency level, Blue Meanies offer a
                                balanced psychedelic experience.
                            </p>

                            <h3 className="text-lg font-bold text-[#181211] mb-2">
                                Expected Experiences:
                            </h3>

                            <ul className="space-y-2">
                                <li className="leading-relaxed">
                                    <span className="font-semibold text-[#181211]">
                                        • Enhanced Perception:
                                    </span>{" "}
                                    Blue Meanies may intensify sensory experiences, heightening
                                    visual, auditory, and tactile sensations.
                                </li>
                                <li className="leading-relaxed">
                                    <span className="font-semibold text-[#181211]">
                                        • Deep Introspection:
                                    </span>{" "}
                                    Users often report profound introspective journeys, leading to
                                    insights and self-discovery.
                                </li>
                                <li className="leading-relaxed">
                                    <span className="font-semibold text-[#181211]">
                                        • Mood Enhancement:
                                    </span>{" "}
                                    These mushrooms have been known to induce feelings of
                                    euphoria, joy, and emotional openness.
                                </li>
                                <li className="leading-relaxed">
                                    <span className="font-semibold text-[#181211]">
                                        • Creativity Boost:
                                    </span>{" "}
                                    Many users experience enhanced creativity and artistic
                                    inspiration while under the influence of Blue Meanies.
                                </li>
                                <li className="leading-relaxed">
                                    <span className="font-semibold text-[#181211]">
                                        • Spiritual Connection:
                                    </span>{" "}
                                    Blue Meanies may foster a sense of connection with nature, the
                                    universe, or a higher power.
                                </li>
                                <li className="leading-relaxed">
                                    <span className="font-semibold text-[#181211]">
                                        • Therapeutic Potential:
                                    </span>{" "}
                                    Some users utilize Blue Meanies in therapeutic settings to
                                    address issues such as anxiety, depression, and PTSD, under
                                    the guidance of a trained professional.
                                </li>
                            </ul>
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
                                    <button className="w-full py-3 border-2 border-[#E93E2B] text-[#E93E2B] rounded-lg font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-colors cursor-pointer">
                                        Write a Review
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Reviews List */}
                            <div className="lg:col-span-2">
                                {/* Login Prompt */}
                                <div className="bg-white border border-[#E8E8E8] rounded-lg p-8 mb-6 text-center">
                                    {showLoginForm ? (
                                        <>
                                            <h3 className="text-2xl font-bold text-[#0F172A] mb-4 text-left">
                                                Write a Review
                                            </h3>

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
                                                                icon={
                                                                    star <= reviewRating
                                                                        ? "flowbite:star-solid"
                                                                        : "basil:star-outline"
                                                                }
                                                                className={star <= reviewRating ? "text-[#FFE100]" : "text-[#181211]"}
                                                                width={24}
                                                                height={24}
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
                                                    onClick={() => {
                                                        setShowLoginForm(false);
                                                        setReviewRating(0);
                                                        setReviewText("");
                                                    }}
                                                    className="px-8 py-3.5 text-sm border border-[#E5E5E5] rounded-lg font-medium text-[#181211] hover:bg-[#F5F5F5] transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        // TODO: submit review
                                                        console.log("submit review", { reviewRating, reviewText });
                                                    }}
                                                    className="px-8 py-3.5 text-sm bg-[#E93E2B] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                                                >
                                                    Submit Review
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-center mb-4">
                                                <div className="w-16 h-16 flex items-center justify-center">
                                                    <Icon
                                                        icon="bx:message-edit"
                                                        width="32"
                                                        height="32"
                                                        className="text-[#7F7F7F]"
                                                    />
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#181211] mb-2">
                                                Want to share your experience?
                                            </h3>
                                            <p className="text-base text-[#181211] mb-4">
                                                Please log in to write a review for this product.
                                            </p>
                                            <button
                                                onClick={() => setShowLoginForm(true)}
                                                className="bg-[#E93E2B] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity mb-3"
                                            >
                                                Login
                                            </button>
                                            <p className="text-sm text-[#777777]">
                                                Don&apos;t have an account?{" "}
                                                <a
                                                    href="#"
                                                    className="text-[#E93E2B] font-semibold hover:underline"
                                                >
                                                    Register now
                                                </a>
                                            </p>
                                        </>
                                    )}
                                </div>

                                {/* Reviews List */}
                                <div className="space-y-6">
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
        </div>
    );
};

export default ProductDetail;
