import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import whatToExpectImg from "../assets/images/whattoexpect.png";

const cards = [
    {
        icon: "uil:setting",
        iconColor: "text-[#81C201]",
        cardBg: "bg-[#F9FAF7]",
        iconShadow: "shadow-[0px_0px_27px_0px_#3F6A6D2B]",
        title: "Setting the Scene for a Psilocybin Trip",
        desc: "Mindset and environment matter. Prepare a safe space, fast for 3–4 hours prior, and consider a sober guide if it's your first experience. Use soft lighting and soothing music to create comfort.",
    },
    {
        icon: "ion:alarm-outline",
        iconColor: "text-[#9041DE]",
        cardBg: "bg-[#F9F6FC]",
        iconShadow: "shadow-[0px_0px_27px_0px_#6015AA2B]",
        title: "Timeline of a Psilocybin Trip",
        desc: "Onset begins around 30–60 minutes post-ingestion. Peak effects occur between 90 minutes to 3 hours. A full experience lasts 4–6 hours with afterglow effects for several more.",
    },
    {
        icon: "solar:users-group-rounded-linear",
        iconColor: "text-[#FF053C]",
        cardBg: "bg-[#FEF5F7]",
        iconShadow: "shadow-[0px_0px_27px_0px_#E580962B]",
        title: "Common Experiences with Psilocybin",
        desc: "Expect shifts in perception, enhanced colors, deep emotional insights, creative thoughts, time distortion, and a feeling of connection with nature or the universe.",
    },
    {
        icon: "fluent:target-arrow-16-regular",
        iconColor: "text-[#E19920]",
        cardBg: "bg-[#FDFAF5]",
        iconShadow: "shadow-[0px_0px_27px_0px_#9A85622B]",
        title: "Possible Challenges During a Psilocybin Trip",
        desc: "Some users face anxiety or emotional intensity. Stay grounded by lying down, changing music, or focusing on breath. Most discomfort passes and leads to clarity.",
    },
    {
        icon: "solar:shield-check-linear",
        iconColor: "text-[#007DA6]",
        cardBg: "bg-[#F2F8FA]",
        iconShadow: "shadow-[0px_0px_27px_0px_#2879942B]",
        title: "Post-Trip Integration",
        desc: "Journaling, quiet reflection, and open conversations can help integrate lessons. Expect heightened emotions, sensitivity, and introspection in the days after.",
    },
];

const WhatToExpect = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-[#FEFEFE] font-sans overflow-x-hidden min-h-screen">
            {/* Hero Section */}
            <section
                className="relative py-12 md:py-20 px-6 sm:px-10 lg:px-20 min-h-[500px] md:min-h-[650px] flex items-center overflow-hidden bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${whatToExpectImg})`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="max-w-[1700px] mx-auto w-full flex flex-col md:flex-row items-center">
                    {/* Left Content */}
                    <div className="w-full md:w-1/2 flex flex-col items-start z-10">
                        <span className="bg-[#E93E2B]/10 text-[#E93E2B] text-[10px] md:text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full mb-8">What to Expect</span>
                        <h1 className="text-[#181211] font-extrabold text-5xl lg:text-5xl tracking-tight leading-none mb-3">
                            Psilocybin <span className="text-[#E93E2B]">Experiences</span>
                        </h1>
                        <h2 className="text-[22px] md:text-xl font-bold text-[#344B24] mb-4">Nature's Goodness, Delivered with Care</h2>

                        <div className="space-y-6 mb-8 max-w-xl">
                            <p className="text-[#636363] text-sm md:text-[15px] leading-relaxed font-semibold">
                                Magic mushrooms, or psilocybin mushrooms, are a powerful tool for healing, self-discovery, and altered states of consciousness.
                                But not all mushrooms are created equal. Each strain has its own potency, personality, and experience profile.
                                Knowing the difference between mushroom strains can help you choose the right one for your intention, whether it's for microdosing,
                                creative flow, deep therapy, or mystical exploration.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate('/store')}
                            className="bg-[#0D0D0D] text-white pl-6 pr-6 py-1.5 rounded-full font-semibold flex items-center gap-2 cursor-pointer transition-all group shadow-xl text-base hover:bg-[#E93E2B]"
                        >
                            Shop Now
                            <div className="w-9 h-9 flex items-center justify-center text-white">
                                <Icon icon="carbon:next-filled" className="text-2xl transition-transform group-hover:translate-x-1" />
                            </div>
                        </button>
                    </div>

                    {/* Right space for background image mushrooms */}
                    <div className="hidden md:block md:w-1/2"></div>
                </div>
            </section>

            {/* Cards Section */}
            <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-20 py-16">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <p className="text-[#E93E2B] font-bold text-base mb-4">Psilocybin</p>
                    <h2 className="text-[#181211] font-bold text-[30px]">
                        What to Expect from the <span className="text-[#E93E2B]">Experience</span>
                    </h2>
                </div>

                {/* Cards Container */}
                <div className="flex flex-wrap justify-center gap-6">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`${card.cardBg} rounded-[30px] border border-[#ECECEC] p-6 flex items-start gap-4 transition-all   w-full md:w-[calc(50%-10px)] lg:w-[calc(30.33%-16px)]`}
                        >
                            <div className={`w-[64px] h-[64px] rounded-full bg-white ${card.iconShadow} flex items-center justify-center shrink-0 `}>
                                <Icon icon={card.icon} width={28} className={card.iconColor} />
                            </div>
                            <div className="flex flex-col pt-1">
                                <h3 className="text-[#181211] font-bold text-lg leading-tight mb-2">{card.title}</h3>
                                <p className="text-[#886663] text-xs md:text-sm leading-relaxed font-medium">{card.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatToExpect;
