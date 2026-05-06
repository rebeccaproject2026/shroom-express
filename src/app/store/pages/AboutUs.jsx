import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useStores } from '../context/StoresContext';
import StoreCard from '../components/common/StoreCard';

// Asset Imports
import heroVideo from "../assets/images/aboutuspage1.mp4";
import about1 from "../assets/images/about1.png";
import about2 from "../assets/images/about2.png";
import ourstory1 from "../assets/images/ourstoryImage1.png";
import ourstory2 from "../assets/images/ourstoryImage2.png";
import ourstory3 from "../assets/images/ourstoryImage3.png";
import signatureImg from "../assets/images/signatureaboutus.png";
import feature1 from "../assets/images/reward.png";
import feature2 from "../assets/images/feeback.png";
import feature3 from "../assets/images/DeliveryTruck.png";
import feature4 from "../assets/images/tradeunion.png";
import chooseUsImg from "../assets/images/chooseusimage.png";
import joinCommunityImg from "../assets/images/joincommunityimage.png";

const FEATURES = [
    {
        image: feature1,
        title: 'Premium Selection',
        desc: 'Carefully chosen for the best experience'
    },
    {
        image: feature2,
        title: 'Top Quality',
        desc: 'Trusted products with consistent standards'
    },
    {
        image: feature3,
        title: 'Fast & Discreet Delivery',
        desc: 'Your privacy is always our priority'
    },
    {
        image: feature4,
        title: 'Trusted Community',
        desc: 'Thousands of happy customers'
    }
];

const AboutUs = () => {
    const navigate = useNavigate();
    const { stores } = useStores();

    return (
        <div className="w-full bg-[#F8F6F6] font-sans overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative py-12 md:py-20 px-6 sm:px-10 lg:px-20 max-w-[1700px] mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2 flex flex-col items-start z-10">
                    <span className="text-[#E93E2B] text-md font-extrabold uppercase tracking-wider mb-7">About Us</span>
                    <h1 className="text-[#181211] font-extrabold text-5xl lg:text-5xl tracking-tight leading-none mb-2">
                        Shroom <span className="text-[#E93E2B]">Express</span>
                    </h1>
                    <h2 className="text-[22px] md:text-xl font-bold text-[#344B24] mb-4">Nature's Goodness, Delivered with Care</h2>

                    <div className="space-y-6 mb-8 max-w-xl">
                        <p className="text-[#636363] text-sm md:text-[15px] leading-relaxed font-semibold w-[100%] mb-3">
                            Welcome to Shroom Express, Canada's trusted source for magic mushrooms and premium cannabis products, built on the values of quality, education, safety, and community.
                        </p>
                        <p className="text-[#636363] text-sm md:text-[15px] leading-relaxed font-semibold w-[105%]">
                            Psilocybin Mushrooms (also called shrooms or mushrooms) are a type of mushroom that contain the chemicals to treat depression, anxiety, and addiction. Importantly, clinical improvements can last for months or years after.
                        </p>
                    </div>

                    <button className="bg-[#0D0D0D] text-white pl-4 pr-4 py-1.5 rounded-full font-semibold flex items-center gap-1 cursor-pointertransition-all group shadow-xl text-base">
                        Explore Our Story
                        <div className="w-9 h-9 flex items-center justify-center text-white">
                            <Icon icon="carbon:next-filled" className="text-2xl  transition-transform" />
                        </div>
                    </button>
                </div>

                {/* Composite Media Section */}
                <div className="w-full md:w-1/2 relative flex justify-center items-center h-[500px]">
                    {/* About1 Image Left */}
                    <div className="absolute left-[-18%] top-[58%] -translate-y-1/2 w-100 h-100  z-0">
                        <img src={about2} alt="" className="w-full h-full object-cover" />
                    </div>

                    {/* Main Video Card */}
                    <div className="relative w-[320px] h-[100%] rounded-xl overflow-hidden shadow-2xl z-10">
                        <video
                            src={heroVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    {/* About2 Image Right */}
                    <div className="absolute right-[-10%] bottom-[4%] w-100 h-100 z-0">
                        <img src={about1} alt="" className="w-full h-full object-contain" />
                    </div>
                </div>
            </section>

            {/* Features Bar Section */}
            <section className="px-6 sm:px-10 lg:px-20 max-w-[1700px] mx-auto">
                <div className="bg-white rounded-[30px] p-4 md:px-14 md:py-9 shadow-[0px_2px_20px_0px_#2546151A] border border-[#F3F4F6] grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                    {FEATURES.map((feature, i, arr) => (
                        <div
                            key={i}
                            className={`flex items-center gap-6 group pr-4 ${i !== arr.length - 1 ? "md:border-r border-[#E5E7EB]" : ""
                                }`}
                        >
                            <div className="w-20 h-20 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center shrink-0">
                                <img src={feature.image} alt={feature.title} className="w-12 h-12 object-contain" />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-[#181211] font-bold text-lg lg:text-[19px] leading-tight">{feature.title}</h3>
                                <p className="text-[#636363] text-sm leading-relaxed font-semibold max-w-[170px]">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 md:py-20 px-6 sm:px-10 lg:px-20 max-w-[1700px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="w-full lg:w-[45%] flex flex-col items-start">
                        <span className="text-[#E93E2B] text-md font-extrabold uppercase tracking-wider mb-7">Our Story</span>
                        <h1 className="text-[#181211] font-extrabold text-5xl lg:text-5xl tracking-tight leading-tight mb-7">
                            <span className="block mb-2">Trusted Quality,</span>
                            <span className="block">
                                Driven by <span className="text-[#E93E2B]">Wellness</span>
                            </span>
                        </h1>
                        <p className="text-[#636363] text-[15px] lg:text-[15px] leading-relaxed mb-6 font-semibold max-w-xl">
                            We proudly serve Canadians coast to coast with an unmatched selection of psilocybin products, microdosing options, and lab-tested cannabis, all accessible through a clean, easy-to-navigate online experience.
                        </p>
                        <p className="text-[#636363] text-[15px] leading-relaxed mb-10 font-semibold max-w-xl">
                            Our mission is to make the power of plant medicine, whether psilocybin or cannabis, safe, legal, and accessible to every Canadian adult seeking natural wellness, therapy, or creative exploration.
                        </p>
                        <div className="">
                            <img src={signatureImg} alt="Signature" className="h-16 lg:h-20 object-contain opacity-90" />
                        </div>
                    </div>
                    <div className="w-full lg:w-[55%] relative min-h-[450px] md:min-h-[600px] flex items-center justify-center">
                        {/* Main Image - White Mushrooms */}
                        <div className="w-[85%] h-[350px] md:h-[480px] rounded-md overflow-hidden  translate-x-[-5%] translate-y-[5%]">
                            <img src={ourstory1} className="w-full h-full object-cover" alt="Main Story" />
                        </div>

                        {/* Top Right Image - Jar */}
                        <div className="absolute top-[0%] right-[0%] w-[45%] aspect-square rounded-md overflow-hidden z-10">
                            <img src={ourstory2} className="w-full h-full object-cover" alt="Jar" />
                        </div>

                        {/* Bottom Center Image - Red Mushroom */}
                        <div className="absolute bottom-[0%] left-[5%] md:left-[10%] w-[40%]  rounded-md overflow-hidden  z-20">
                            <img src={ourstory3} className="w-full h-full object-cover" alt="Red Mushroom" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Top-Rated Stores Section */}
            <section className="py-10">
                <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-20">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[18px] sm:text-2xl font-bold text-[#181211]">Top-Rated Stores</h2>
                        <button
                            onClick={() => navigate('/store/storeslists')}
                            className="text-[#E93E2B] font-bold text-sm lg:text-base flex items-center gap-2 hover:translate-x-2 transition-transform"
                        >
                            View All <Icon icon="solar:arrow-right-linear" />
                        </button>
                    </div>
                    <div className="flex gap-7 overflow-x-auto pb-8 scroll-smooth [&::-webkit-scrollbar]:hidden">
                        {stores.slice(0, 4).map(store => (
                            <div key={store.id} className="min-w-[320px] max-w-[400px]">
                                <StoreCard store={store} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="w-full">
                <img src={chooseUsImg} className="w-full h-auto object-contain" alt="Why Choose Us" />
            </section>

            {/* Join Community Section */}
            <section className="w-full relative">
                <img src={joinCommunityImg} className="w-full h-auto object-contain" alt="Join Community" />

                <div className="absolute inset-0 flex items-center">
                    <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-20 flex items-center justify-between">
                        {/* Space for mushrooms on the left */}
                        <div className="hidden md:block md:w-[28%]"></div>

                        {/* Content Area */}
                        <div className="w-full md:w-[72%] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 h-full">
                            {/* Text Content */}
                            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-lg">
                                <span className="text-[#E93E2B] text-[10px] md:text-sm font-extrabold uppercase tracking-wider mb-3 lg:mb-5">JOIN OUR COMMUNITY</span>
                                <h1 className="text-[#181211] font-extrabold text-5xl lg:text-4xl  leading-tight mb-4">
                                    <span className="block mb-1">Be Part Of Our</span>
                                    <span className="block">
                                        Growing <span className="text-[#E93E2B]">Family</span>
                                    </span>
                                </h1>
                                <p className="text-[#636363] text-sm font-semibold w-[90%]">
                                    Get Exclusive offers, Updates, and wellness tips Straight to your inbox
                                </p>
                            </div>

                            {/* Subscription Form */}
                            <div className="flex bg-white rounded-full p-2 border border-[#E5DCDC] w-full max-w-[48%] items-center h-[65px] lg:h-[50px] mb-5">
                                <input
                                    type="email"
                                    placeholder="Corporate Email"
                                    className="flex-1 px-2 outline-none text-[#181211] text-sm  font-medium placeholder:text-[#181211] min-w-0"
                                />
                                <button className="bg-[#E93E2B] text-white px-5  h-[90%] rounded-full font-medium hover:bg-[#181211] transition-all uppercase text-[11px]  tracking-wider whitespace-nowrap">
                                    JOIN NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
