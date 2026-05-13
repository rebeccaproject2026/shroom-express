import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

// Import Assets
import heroBg from '../assets/images/safemicrodosingpractices.png';
import bannerBg from '../assets/images/beautifulnaturalgreenplant 1.png';
import benefitsImg from '../assets/images/benefitsofmicrodosingpsilocybin.png';
import expectBg from '../assets/images/tinymushroomforestfloor 1.png';
import mindfulImg from '../assets/images/safemicrodosingpractices2.png';

const SafeMicrodosingPractices = () => {
    const navigate = useNavigate();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const guidelines = [
        {
            icon: 'ph:gauge-bold',
            title: 'Measure Accurately',
            description: 'Always weigh your dose using a precision scale to ensure safety.'
        },
        {
            icon: 'ph:arrow-counter-clockwise-bold',
            title: 'Start Low, Go Slow',
            description: 'Avoid microdosing every day to prevent tolerance buildup.'
        },
        {
            icon: 'ph:drop-bold',
            title: 'Stay Hydrated & Nourished',
            description: 'Stay hydrated and eat clean, balanced meals.'
        },
        {
            icon: 'ph:flask-bold',
            title: 'Avoid Substances',
            description: 'Avoid alcohol and recreational drugs during your regimen.'
        },
        {
            icon: 'ph:note-pencil-bold',
            title: 'Track Your Progress',
            description: 'Keep a journal to track mood, focus, and behavior changes.'
        }
    ];

    return (
        <div className="w-full bg-[#F8F6F6] font-sans overflow-x-hidden">
            {/* Hero Section */}
            <section
                className="relative py-12 md:py-20 px-6 sm:px-10 lg:px-10 min-h-[500px] md:min-h-[650px] flex items-center overflow-hidden bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="max-w-[1700px] mx-auto w-full flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 flex flex-col items-start z-10">
                        <span className="bg-[#E93E2B]/10 text-[#E93E2B] text-[10px] md:text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
                            LEARN & GROW
                        </span>
                        <h1 className="text-[#181211] font-extrabold text-5xl lg:text-5xl tracking-tight leading-tight mb-3">
                            Understanding Safe <br />
                            <span className="text-[#E93E2B] mt-1.5 inline-block">Microdosing</span> <span className="text-[#181211] mt-1.5 inline-block">Practices</span>
                        </h1>
                        <h2 className="text-[22px] md:text-xl font-bold text-[#344B24] mb-4">Elevating Wellness Through Precision</h2>

                        <div className="space-y-6 mb-8 max-w-xl">
                            <p className="text-[#636363] text-sm md:text-[15px] leading-relaxed font-semibold">
                                Microdosing involves taking sub-perceptual doses of psilocybin, typically between 0.05g and 0.3g, to enhance mood, focus, creativity, and overall well-being without experiencing hallucinations. It's an increasingly popular practice among professionals, creatives, and individuals seeking emotional balance.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate('/store/category/magic-mushrooms')}
                            className="bg-[#0D0D0D] text-white pl-6 pr-6 py-1 rounded-full font-semibold flex items-center gap-2 cursor-pointer transition-all group shadow-xl text-base hover:bg-[#E93E2B]"
                        >
                            Shop Now
                            <div className="w-9 h-9 flex items-center justify-center text-white">
                                <Icon icon="carbon:next-filled" className="text-2xl transition-transform group-hover:translate-x-1" />
                            </div>
                        </button>
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
                </div>
            </section>

            {/* Banner Section: Choosing the Right Dose */}
            <section className="py-8 px-6 sm:px-10 lg:px-10">
                <div className="max-w-[1700px] mx-auto overflow-hidden relative group">
                    {/* Original Quality Image */}
                    <img
                        src={bannerBg}
                        className="w-full h-full"
                        alt="Choosing the Right Dose"
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex items-center px-10 md:px-10">
                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="max-w-[58%] text-left">
                                <h2 className="text-white font-extrabold text-3xl md:text-4xl mb-4 tracking-tight leading-tight">
                                    Choosing the Right Dose
                                </h2>
                                <p className="text-[#B2B2B2] text-sm md:text-base leading-relaxed font-medium">
                                    Start low. A standard microdose is between 0.1g and 0.25g of dried psilocybin mushrooms. New users should begin at the lower end to assess their sensitivity. Use accurately weighed psilocybin capsules for consistent dosing.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate('/store/category/magic-mushrooms')}
                                className="bg-[#E93E2B] text-white pl-6 pr-6 py-1 rounded-full font-semibold flex items-center gap-2 cursor-pointer transition-all group shadow-xl text-base hover:bg-[#E93E2B]"
                            >
                                <span className="text-base font-bold">Shop Now</span>
                                <div className="w-9 h-9 flex items-center justify-center text-white">
                                    <Icon icon="carbon:next-filled" width={22} className="text-white" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-4 px-6 sm:px-10 lg:px-10">
                <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full lg:w-[60%] flex flex-col items-start px-15">
                        <span className="bg-[#E93E2B]/10 text-[#E93E2B] text-[10px] md:text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full mb-8 inline-block">
                            BENEFITS
                        </span>
                        <h2 className="text-[#181211] font-extrabold text-4xl md:text-5xl leading-[1.1] mb-8 tracking-tight">
                            Benefits of <br />
                            <span className="text-[#E93E2B] mt-1 inline-block">Microdosing</span> <br />
                            <span className="text-[#181211]">Psilocybin</span>
                        </h2>
                        <p className="text-[#636363] text-base md:text-[17px] leading-relaxed font-semibold max-w-[120%]">
                            Microdosing psilocybin may offer subtle but powerful benefits that support your mental, emotional, and creative well-being.
                        </p>
                    </div>
                    <div className="w-full lg:w-[60%] flex justify-center lg:justify-end">
                        <img
                            src={benefitsImg}
                            alt="Benefits of Microdosing Psilocybin"
                            className="w-full h-auto max-w-[750px] object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* Safe Usage Guidelines Section */}
            <section className="py-20 px-6 sm:px-10 lg:px-10 bg-[#F8F6F6]">
                <div className="w-full max-w-[1700px] mx-auto">
                    <h2 className="text-[#181211] font-extrabold text-4xl md:text-[42px] mb-16 tracking-tight text-center">
                        Safe Usage Guideline
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {guidelines.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#FFFFFF] p-5 rounded-xl text-left border border-[#DDDDDD] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="mb-5">
                                    <Icon icon={item.icon} width={42} className="text-[#E93E2B]" />
                                </div>
                                <h3 className="text-[#1B1C1C] font-bold text-xl mb-3 tracking-tight leading-tight">{item.title}</h3>
                                <p className="text-[#636363] text-sm leading-relaxed font-medium">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* What to Expect Section */}
            <section className="py-8 px-6 sm:px-10 lg:px-10">
                <div className="max-w-[1700px] mx-auto overflow-hidden relative rounded-xl group">
                    {/* Background Image */}
                    <img
                        src={expectBg}
                        className="w-full h-auto"
                        alt="What to Expect During a Microdose"
                    />

                    {/* Side-Fade Gradient Overlay */}
                    <div
                        className="absolute inset-0 z-10"
                        style={{ background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000000 100%)' }}
                    ></div>

                    {/* Content Overlay - Right Aligned */}
                    <div className="absolute inset-0 z-20 flex items-center justify-end px-10 md:px-24">
                        <div className="max-w-xl text-left md:text-left">
                            <h2 className="text-white font-extrabold text-3xl md:text-[44px] mb-6 tracking-tight leading-tight">
                                What to <span className="text-[#E93E2B]">Expect</span> <br />
                                During a <span className="text-[#E93E2B]">Microdose</span>
                            </h2>
                            <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium mb-8">
                                You should not feel high. You may notice subtle improvements in motivation, energy, and mood. If you notice strong visuals or emotional intensity, you may have taken too much.
                            </p>
                            <button
                                onClick={() => navigate('/store/category/magic-mushrooms')}
                                className="bg-[#E93E2B] text-white pl-6 pr-6 py-1 rounded-full font-semibold flex items-center gap-2 cursor-pointer transition-all group shadow-xl text-base hover:bg-white hover:text-[#E93E2B]"
                            >
                                <span className="text-base font-bold">Shop Now</span>
                                <div className="w-9 h-9 flex items-center justify-center text-white group-hover:text-[#E93E2B]">
                                    <Icon icon="carbon:next-filled" className="text-2xl transition-transform group-hover:translate-x-1" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safe & Mindful Microdosing Section */}
            <section className="py-24 px-6 sm:px-10 lg:px-10">
                <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-[#181211] font-extrabold text-4xl md:text-[50px] mb-8 tracking-tight leading-tight">
                            Safe & Mindful Microdosing
                        </h2>
                        <div className="space-y-6 text-[#636363] text-base md:text-[17px] leading-relaxed font-semibold">
                            <p>
                                Microdosing can support focus, balance, and wellness when done responsibly. Start with a low dose on a weekend or day off, store products safely away from children and pets, and consult a healthcare professional if you are on medication. Avoid psilocybin if you have a history of psychosis or bipolar disorder.
                            </p>
                            <p>
                                Pause or reduce usage if you experience mood swings, headaches, fatigue, or disruptions to daily life. Always listen to your body and prioritize safety.
                            </p>
                            <p>
                                At Shroom Express, explore pre-measured psilocybin capsules and microdose-friendly edibles crafted for a safe and effective experience.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 mt-12">
                            <button
                                onClick={() => navigate('/store/category/magic-mushrooms')}
                                className="bg-[#E93E2B] text-white pl-6 pr-6 py-1 rounded-full font-semibold flex items-center gap-2 cursor-pointer transition-all group shadow-xl text-base hover:bg-[#181211]"
                            >
                                <span className="text-base font-bold">Shop Mushrooms</span>
                                <div className="w-9 h-9 flex items-center justify-center text-white">
                                    <Icon icon="carbon:next-filled" className="text-2xl transition-transform group-hover:translate-x-1" />
                                </div>
                            </button>

                            <button
                                onClick={() => navigate('/store/category/edibles')}
                                className="bg-[#181211] text-white pl-6 pr-6 py-1 rounded-full font-semibold flex items-center gap-2 cursor-pointer transition-all group shadow-xl text-base hover:bg-[#E93E2B]"
                            >
                                <span className="text-base font-bold">Shop Edibles</span>
                                <div className="w-9 h-9 flex items-center justify-center text-white">
                                    <Icon icon="carbon:next-filled" className="text-2xl transition-transform group-hover:translate-x-1" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <img
                            src={mindfulImg}
                            alt="Safe and Mindful Microdosing"
                            className="w-full h-auto max-w-[600px] rounded-[32px] shadow-2xl"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SafeMicrodosingPractices;
