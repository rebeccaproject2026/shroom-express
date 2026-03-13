import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import StoreCard from '../../components/common/StoreCard';
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

const ProductDetail = () => {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(4);
    const [selectedWeight, setSelectedWeight] = useState('3.5g');
    const [selectedImage, setSelectedImage] = useState(0);

    // Mock product data
    const product = {
        id: productId,
        name: "Albino Choda",
        rating: 4.0,
        reviewCount: 120,
        price: 50.00,
        vendor: "Aether Mushroom Labs",
        location: "5.6 km away • Toronto Central",
        effects: [
            { image: microDosingImg, name: "Micro dosing" },
            { image: beginnerFriendlyImg, name: "Beginner Friendly" },
            { image: highPotencyImg, name: "High Potency" }
        ],
        images: [product1, product1, product1],
        description: [
            {
                title: "Blue Meanies Magic Mushrooms:",
                text: "Known for their distinctive deep blue , stain upon handling."
            },
            {
                title: "Easily Bruised:",
                text: "High concentrations of psilocybin cause rapid bruising, altering the mushrooms' color."
            },
            {
                title: "Potency:",
                text: "Average 🔥"
            }
        ],
        weights: ['3.5g', '7g', '14g', '28g'],
        sku: "N/A",
        categories: ["Shop Mushroom", "Shroom Strains"]
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
            deliveryBadge: { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg, creativeBoostImg, relaxChillImg]
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
            deliveryBadge: { text: "Express Delivery", color: "text-[#22C55E]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: [beginnerFriendlyImg, highPotencyImg, microDosingImg, visualExperienceImg, creativeBoostImg, relaxChillImg]
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
            deliveryBadge: { text: "Same-day Delivery", color: "text-[#181211]", icon: "carbon:delivery" },
            isPrimary: false,
            avatars: []
        }
    ];

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(prev => prev - 1);
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
                                            ? 'border-[var(--store-primary)]'
                                            : 'border-[#E5DCDC] '
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
                            <h1 className="text-3xl font-bold text-[#0F3540] mt-0.5 mb-3">{product.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-2.5">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Icon
                                            key={i}
                                            icon={i < Math.floor(product.rating) ? "flowbite:star-solid" : "basil:star-outline"}
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
                                    <div key={idx} className="w-9 h-9 rounded-full overflow-hidden ">
                                        <img src={effect.image} alt={effect.name} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>

                            {/* Price */}
                            <div className="text-xl font-bold text-[var(--store-primary)] mb-3">
                                ${product.price.toFixed(2)}
                            </div>

                            {/* Vendor Info */}
                            <div className="flex items-center gap-1 mb-6 p-2 border-t border-b border-[#E5DCDC] ">
                                <Icon icon="mdi:store-outline" className="text-gray-600" width={20} height={20} />
                                <div>
                                    <p className="text-sm font-semibold text-[#181211]">{product.vendor}</p>
                                    <p className="text-xs text-[#64748B]">{product.location}</p>
                                </div>
                                <button className="ml-auto px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors">
                                    <Icon icon="carbon:delivery" className="inline mr-1" width={16} height={16} />
                                    Same-day Delivery
                                </button>
                                <span className="text-sm text-[#64748B]">2 - 5 Hours</span>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                {product.description.map((item, idx) => (
                                    <div key={idx} className="mb-3">
                                        <p className="text-sm text-[#181211]">
                                            <span className="font-semibold">• {item.title}</span> {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Quantity */}
                            <div className="mb-6">
                                <h3 className="text-base font-bold text-[#181211] mb-3">Quantity</h3>

                                {/* Weight Options */}
                                <div className="flex gap-2 mb-4">
                                    {product.weights.map((weight) => (
                                        <button
                                            key={weight}
                                            onClick={() => setSelectedWeight(weight)}
                                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${selectedWeight === weight
                                                ? 'bg-[var(--store-primary)] text-white'
                                                : 'bg-white border border-gray-300 text-[#181211] hover:border-[var(--store-primary)]'
                                                }`}
                                        >
                                            {weight}
                                        </button>
                                    ))}
                                </div>

                                {/* Quantity Counter */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => handleQuantityChange('decrement')}
                                            className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                                        >
                                            <Icon icon="mdi:minus" width={20} height={20} />
                                        </button>
                                        <span className="w-16 text-center font-semibold text-[#181211]">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange('increment')}
                                            className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                                        >
                                            <Icon icon="mdi:plus" width={20} height={20} />
                                        </button>
                                    </div>

                                    <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        <Icon icon="mdi:heart-outline" width={24} height={24} className="text-gray-600" />
                                    </button>

                                    <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        <Icon icon="mdi:share-variant-outline" width={24} height={24} className="text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mb-6">
                                <button className="flex-1 bg-[var(--store-primary)] text-white py-4 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                    <Icon icon="mdi:cart-outline" width={20} height={20} />
                                    Add to cart
                                </button>
                                <button className="flex-1 bg-white border-2 border-[#181211] text-[#181211] py-4 rounded-lg font-semibold text-base hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                    <Icon icon="mdi:credit-card-outline" width={20} height={20} />
                                    Buy Now
                                </button>
                            </div>

                            {/* Promo Message */}
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-green-700">
                                    Add $100.00 to cart and get free same day delivery, free shipping or Express Delivery for just $5!
                                </p>
                            </div>

                            {/* Product Meta */}
                            <div className="text-sm text-[#64748B]">
                                <p className="mb-2"><span className="font-semibold text-[#181211]">SKU:</span> {product.sku}</p>
                                <p><span className="font-semibold text-[#181211]">Categories:</span> {product.categories.join(', ')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Related Stores (1/4 width) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-[270px]">
                        {/* Stores List */}
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
    );
};

export default ProductDetail;