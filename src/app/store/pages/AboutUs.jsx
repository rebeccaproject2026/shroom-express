import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useStores } from '../context/StoresContext';
import StoreCard from '../components/common/StoreCard';

// Asset Imports
import heroVideo from "../assets/images/aboutuspage1.mp4";
import about1 from "../assets/images/about1.png";
import about2 from "../assets/images/about2.png";
import aboutImg3 from "../assets/images/product3.png";
import aboutImg4 from "../assets/images/product4.png";
import communityBg from "../assets/images/Magicmushroombanner.jpg";
import whyChooseBg from "../assets/images/topratestorebg.png";

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
            <section className="px-6 sm:px-10 lg:px-20 max-w-[1700px] mx-auto mb-20">
                <div className="bg-white rounded-[40px] p-8 md:px-12 md:py-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#F3F4F6] grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    {[
                        {
                            icon: 'solar:medal-ribbon-star-linear',
                            title: 'Premium Selection',
                            desc: 'Carefully chosen for the best experience'
                        },
                        {
                            icon: 'solar:star-fall-linear',
                            title: 'Top Quality',
                            desc: 'Trusted products with consistent standards'
                        },
                        {
                            icon: 'solar:delivery-linear',
                            title: 'Fast & Discreet Delivery',
                            desc: 'Your privacy is always our priority'
                        },
                        {
                            icon: 'solar:users-group-two-rounded-linear',
                            title: 'Trusted Community',
                            desc: 'Thousands of happy customers'
                        }
                    ].map((feature, i) => (
                        <div key={i} className="relative flex items-center gap-5 group">
                            {/* Divider Line */}
                            {i > 0 && <div className="hidden md:block absolute left-[-10px] top-1/2 -translate-y-1/2 w-[1px] h-16 bg-[#E5E7EB]"></div>}

                            <div className="w-16 h-16 rounded-full bg-[#F9FAF9] border border-[#F3F4F6] flex items-center justify-center text-[#3A6A3F] text-3xl shrink-0">
                                <Icon icon={feature.icon} />
                            </div>

                            <div className="flex flex-col gap-1">
                                <h3 className="text-[#111827] font-bold text-[17px] leading-tight">{feature.title}</h3>
                                <p className="text-[#6B7280] text-xs leading-relaxed font-medium max-w-[150px]">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 md:py-32 px-6 sm:px-10 lg:px-20 max-w-[1700px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="w-full lg:w-[45%] flex flex-col items-start">
                        <span className="text-[#E93E2B] text-xs md:text-sm font-bold uppercase tracking-[3px] mb-4">Our Story</span>
                        <h2 className="text-[#181211] font-extrabold text-4xl lg:text-[56px] tracking-tight leading-[1.1] mb-8">
                            Trusted Quality, <br />Driven by <span className="text-[#E93E2B]">Wellness</span>
                        </h2>
                        <p className="text-[#886663] text-base lg:text-lg leading-relaxed mb-6 font-medium">
                            We proudly serve Canadians coast-to-coast with an unmatched selection of psilocybin products, microdosing options, and lab-tested cannabis, all accessible through a clean, easy-to-navigate online experience.
                        </p>
                        <p className="text-[#886663] text-base leading-relaxed mb-10 opacity-80">
                            Our mission is to unlock the power of plant medicine, whether psilocybin or cannabis, safe, legal, and accessible to every Canadian adult seeking natural wellness, therapy, or creative exploration.
                        </p>
                        <div className="mt-4">
                            <span className="text-4xl lg:text-6xl font-signature text-[#181211] opacity-90 italic">Signature</span>
                        </div>
                    </div>
                    <div className="w-full lg:w-[55%] grid grid-cols-2 gap-6">
                        <div className="grid gap-6">
                            <div className="rounded-[32px] overflow-hidden shadow-lg h-72">
                                <img src={about1} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Story 1" />
                            </div>
                            <div className="rounded-[32px] overflow-hidden shadow-lg h-56">
                                <img src={about2} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Story 2" />
                            </div>
                        </div>
                        <div className="grid gap-6 pt-12">
                            <div className="rounded-[32px] overflow-hidden shadow-lg h-56">
                                <img src={aboutImg3} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Story 3" />
                            </div>
                            <div className="rounded-[32px] overflow-hidden shadow-lg h-72">
                                <img src={aboutImg4} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Story 4" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top-Rated Stores Section */}
            <section className="py-24 bg-[#FAF8F5]">
                <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-20">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#181211] tracking-tight">Top-Rated Stores</h2>
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
            <section
                className="py-24 md:py-32 relative overflow-hidden bg-[#0A1A0F] text-white"
            >
                <div className="absolute inset-0 opacity-20 z-0">
                    <img src={whyChooseBg} className="w-full h-full object-cover" alt="Background" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A0F] via-[#0A1A0F]/90 to-transparent z-0"></div>

                <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-20 relative z-10 flex flex-col lg:flex-row justify-between items-center gap-16">
                    <div className="max-w-2xl">
                        <span className="text-[#E93E2B] text-xs md:text-sm font-bold uppercase tracking-[3px] mb-4 inline-block">Why Choose Us</span>
                        <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-8">
                            Experience the <br />Shroom Express <span className="text-[#E93E2B]">Difference</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-16">
                        {[
                            { icon: 'solar:shield-check-bold-duotone', label: 'Top Quality Products' },
                            { icon: 'solar:box-bold-duotone', label: 'Discreet Packaging' },
                            { icon: 'solar:chat-round-dots-bold-duotone', label: 'Reliable Support' },
                            { icon: 'solar:smile-circle-bold-duotone', label: 'Customer Satisfaction' }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-5 text-center group">
                                <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-4xl group-hover:bg-[#E93E2B] group-hover:scale-110 transition-all duration-300">
                                    <Icon icon={item.icon} className="text-[#E93E2B] group-hover:text-white" />
                                </div>
                                <span className="font-bold text-sm lg:text-lg max-w-[140px] leading-tight">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Community Section */}
            <section className="py-24 md:py-32 px-6 sm:px-10 lg:px-20">
                <div
                    className="max-w-[1700px] mx-auto rounded-[48px] overflow-hidden relative min-h-[450px] flex items-center p-8 md:p-20 bg-cover bg-center shadow-2xl shadow-[#E93E2B]/5"
                    style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) 30%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0) 100%), url(${communityBg})` }}
                >
                    <div className="max-w-2xl relative z-10">
                        <span className="text-[#E93E2B] text-xs md:text-sm font-bold uppercase tracking-[3px] mb-4 inline-block">Join Our Community</span>
                        <h2 className="text-[#181211] text-4xl lg:text-[64px] font-extrabold mb-6 leading-[1.1] tracking-tight">
                            Be Part Of Our <br /> Growing <span className="text-[#E93E2B]">Family</span>
                        </h2>
                        <p className="text-[#886663] text-base lg:text-xl mb-10 font-medium opacity-90">Get exclusive offers, updates, and wellness tips straight to your inbox.</p>
                        <div className="flex flex-col sm:flex-row bg-white rounded-2xl md:rounded-full p-2 shadow-2xl shadow-black/5 border border-[#F4F1F0] max-w-lg">
                            <input
                                type="email"
                                placeholder="Personal Email"
                                className="flex-1 px-6 py-4 rounded-full outline-none text-[#181211] font-medium"
                            />
                            <button className="bg-[#E93E2B] text-white px-10 py-4 rounded-xl md:rounded-full font-bold hover:bg-[#181211] transition-all shadow-lg shadow-[#E93E2B]/20">
                                Join now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
