import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Asset Imports
import heroBg from '../assets/images/choosingyourproduct.png';
import microdosingcapsules from '../assets/images/microdosingcapsules.png';
import microdosingcapsules1 from '../assets/images/microdosingcapsules1.png';
import microdosingcapsules2 from '../assets/images/microdosingcapsules2.png';
import microdosingcapsules3 from '../assets/images/microdosingcapsules3.png';

const categories = [
    {
        id: 1,
        forLabel: 'FOR BEGINNERS',
        title: 'Microdosing Capsules',
        description: 'Precise doses for micro or macro experiences',
        tag: 'For Pain Relief',
        btnLabel: 'Shop Capsules',
        image: microdosingcapsules,
        path: '/store/category/micro-dosing',
    },
    {
        id: 2,
        forLabel: 'FOR VISUAL AND SPIRITUAL JOURNEYS',
        title: 'Mushroom Edibles',
        description: 'Ideal for experienced users seeking custom doses',
        tag: 'For Focus & Productivity',
        btnLabel: 'Shop Edibles',
        image: microdosingcapsules1,
        path: '/store/category/edibles',
    },
    {
        id: 3,
        forLabel: 'FOR A TASTY AND ENJOYABLE EXPERIENCE',
        title: 'Chocolates',
        description: 'Delicious, easy to dose, and beginner-friendly',
        tag: 'For Sleep & Relaxation',
        btnLabel: 'Shop Chocolates',
        image: microdosingcapsules2,
        path: '/store/category/edibles',
    },
    {
        id: 4,
        forLabel: 'FOR A DISCREET EXPERIENCE',
        title: 'Gummies',
        description: 'Tasty, consistent, and great for travel',
        tag: 'For Exploration & Spiritual Insight',
        btnLabel: 'Shop Gummies',
        image: microdosingcapsules3,
        path: '/store/category/gummies',
    },
];

const trustBadges = [
    { icon: 'ph:flask-bold', label: 'LAB-TESTED PRODUCTS' },
    { icon: 'ph:package-bold', label: 'SAFE PACKAGING' },
    { icon: 'ph:headset-bold', label: 'TRUSTED CUSTOMER SERVICE' },
];

const ChoosingYourProduct = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full font-sans bg-white overflow-x-hidden">
            {/* Hero Section */}
            <section
                className="relative py-10 md:py-32 px-6 sm:px-10 lg:px-10 min-h-[500px] flex items-center bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 max-w-[1700px] mx-auto w-full">
                    <div className="">
                        <h1 className="text-white font-bold text-4xl md:text-5xl leading-[1.1] mb-6 tracking-tight">
                            Welcome to Shroom <br className="hidden md:block" /> Express - Your Trusted <br className="hidden md:block" /> Source
                        </h1>
                        <p className="text-[#B2B2B2] text-base md:text-base leading-[1.6] mb-10 max-w-[55%] font-normal">
                            At Shroom Express, we offer a wide selection of premium psilocybin and cannabis products tailored to different experiences, preferences, and goals. Whether you're microdosing for mental clarity or looking for a deeply spiritual journey, we've made it easy to choose the right product with confidence.
                        </p>
                        <button
                            onClick={() => navigate('/store/category/magic-mushrooms')}
                            className="bg-[#E93E2B] text-white px-7 py-3 rounded-full font-bold flex items-center gap-4 hover:opacity-90 transition-all shadow-xl group"
                        >
                            <span className="text-base">Shop Now</span>
                            <div className=" rounded-full w-7 h-7 flex items-center justify-center transition-transform group-hover:translate-x-1">
                                <Icon icon="carbon:next-filled" width={25} className="text-[#FFFFFF]" />
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* Choose Your Starting Point */}
            <section className="bg-[#F8F6F6] py-20 px-6 sm:px-10 lg:px-10">
                <div className="w-full max-w-[1700px] mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-[#1C1B1B] font-extrabold text-3xl md:text-5xl mb-3 tracking-tight">
                            Choose Your Starting Point
                        </h2>
                        <p className="text-[#636363] text-base md:text-lg font-medium">
                            Find the right product and experience that fits your journey.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="bg-white rounded-md overflow-hidden flex flex-col group transition-all"
                            >
                                {/* Image */}
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/5"></div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col gap-4 flex-1">
                                    <div className="flex flex-col">
                                        <span className="text-[#E93E2B] text-[13px] font-bold uppercase tracking-widest leading-tight">
                                            {cat.forLabel}
                                        </span>
                                    </div>
                                    <h3 className="text-[#181211] font-extrabold text-2xl tracking-tight leading-tight">
                                        {cat.title}
                                    </h3>
                                    <p className="text-[#636363] text-base leading-relaxed font-medium">
                                        {cat.description}
                                    </p>
                                    <button className="text-[#004FBD] text-sm font-bold hover:underline transition-colors text-left">
                                        {cat.tag}
                                    </button>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => navigate(cat.path)}
                                        className="mt-auto w-full bg-black text-white py-3.5 rounded-full text-sm font-bold hover:bg-[#E93E2B] transition-all cursor-pointer shadow-lg"
                                    >
                                        {cat.btnLabel}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fast & Trusted Support */}
            <section className="bg-[#F8F6F6] py-4 px-6 sm:px-10 lg:px-10">
                <div className="w-full max-w-[1700px] mx-auto text-center">
                    <h2 className="text-[#181211] font-bold text-3xl md:text-[40px] mb-4 tracking-tight">
                        Fast & Trusted Support
                    </h2>
                    <p className="text-[#636363] text-sm md:text-base leading-relaxed mb-8  mx-auto font-medium">
                        All orders are shipped in discreet packaging, with tracking provided. From Toronto to Vancouver, we deliver across Canada.
                    </p>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 mb-15">
                        {trustBadges.map((badge) => (
                            <div key={badge.label} className="flex items-center gap-4 group cursor-default">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#E93E2B] shadow-[0_8px_20px_rgba(233,62,43,0.08)] border border-white group-hover:scale-110 transition-all">
                                    <Icon icon={badge.icon} width={24} />
                                </div>
                                <span className="text-[#181211] font-bold text-[13px] tracking-[0.05em] uppercase">
                                    {badge.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChoosingYourProduct;
