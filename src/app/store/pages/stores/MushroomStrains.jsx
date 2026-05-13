import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

// Asset Imports
import heroBg from "../../assets/images/mushroomstrain.png";
import knowbeforesection from "../../assets/images/knowbeforesection.png";
import strain1 from "../../assets/images/strain1.png";
import strain2 from "../../assets/images/strain2.png";
import strain3 from "../../assets/images/strain3.png";
import strain4 from "../../assets/images/strain4.png";
import strain5 from "../../assets/images/strain5.png";
import strain6 from "../../assets/images/strain6.png";
import strain7 from "../../assets/images/strain7.png";
import strain8 from "../../assets/images/strain8.png";

const STRAIN_CATEGORIES = [
    { icon: "ph:detective-bold", label: "Microdosing", color: "text-[#81C201]" },
    { icon: "ph:baby-bold", label: "Beginner Friendly", color: "text-[#E93E2B]" },
    { icon: "ph:lightning-bold", label: "High Potency", color: "text-[#007DA6]" },
    { icon: "ph:palette-bold", label: "Creative Boost", color: "text-[#FF053C]" },
    { icon: "ph:moon-bold", label: "Relax & Chill", color: "text-[#9041DE]" },
    { icon: "ph:eye-bold", label: "Visual Experience", color: "text-[#E19920]" },
    { icon: "ph:target-bold", label: "Focus & Clarity", color: "text-[#00A699]" },
    { icon: "ph:rocket-launch-bold", label: "Deep Journey", color: "text-[#181211]" },
];

const STRAINS = [
    { name: "Psilocybe Cubensis", potency: "MODERATE", desc: "The gold standard for beginners, known for its resilience and reliable effects.", image: strain1, potencyColor: "text-[#E93E2B]" },
    { name: "Penis Envy", potency: "VERY HIGH", desc: "Famed for its unique morphology and exceptionally high psilocybin content.", image: strain2, potencyColor: "text-[#E93E2B]" },
    { name: "Albino A+", potency: "HIGH", desc: "Striking white aesthetics matched with a potent, euphoric, and visual experience.", image: strain3, potencyColor: "text-[#E93E2B]" },
    { name: "B+ Strain", potency: "MODERATE", desc: "One of the most versatile and popular strains for home cultivators.", image: strain4, potencyColor: "text-[#E93E2B]" },
    { name: "Mazatapec", potency: "LOW-MOD", desc: "Deeply spiritual strain from Mexico, known for meditative peaks.", image: strain5, potencyColor: "text-[#E93E2B]" },
    { name: "Cambodian", potency: "MODERATE", desc: "Energetic and socially stimulating effects associated with SE Asian varieties.", image: strain6, potencyColor: "text-[#E93E2B]" },
    { name: "Blue Meanie", potency: "HIGH", desc: "Potent effects characterized by heavy visual distortions and intense physical euphoria.", image: strain7, potencyColor: "text-[#E93E2B]" },
    { name: "Tidal Wave", potency: "EXTREME", desc: "A hybrid cross known for record-breaking concentrations and mental intensity.", image: strain8, potencyColor: "text-[#E93E2B]" },
    // { name: "Albino Hillbilly", potency: "MODERATE", desc: "A powerful strain known for its fast colonization and great visuals.", image: strain9, potencyColor: "text-[#E93E2B]" }
];
const HOW_TO_CHOOSE = [
    {
        icon: "solar:users-group-rounded-linear",
        iconColor: "text-[#E93E2B]",
        label: "EXPERIENCE LEVEL",
        items: [
            { key: "Beginners", val: "Golden Teacher, B+, Mazatapec" },
            { key: "Experienced Users", val: "Penis Envy, Tidal Wave, Blue Meanie" },
        ]
    },
    {
        icon: "solar:compass-linear",
        iconColor: "text-[#E93E2B]",
        label: "PURPOSE",
        items: [
            { key: "Spiritual Journeys", val: "Albino A+, Mazatapec" },
            { key: "Emotional Healing", val: "Golden Teacher, Blue Meanie, Mazatapec" },
        ]
    },
    {
        icon: "solar:sun-linear",
        iconColor: "text-[#E93E2B]",
        label: "LIFESTYLE",
        items: [
            { key: "Creative Boosts", val: "Cambodian, Golden Teacher" },
            { key: "Social Settings", val: "Golden Teacher, Blue Meanie, Mazatapec" },
        ]
    },
];

const POTENCY_LEVELS = [
    { label: "MICRODOSE / LOW", strains: "B+, Mazatapec, Cambodian", width: "w-1/4" },
    { label: "MODERATE POTENCY", strains: "Golden Teacher, Albino A+", width: "w-2/4" },
    { label: "HIGH POTENCY", strains: "Blue Meanie, Tidal Wave", width: "w-3/4" },
    { label: "VERY HIGH POTENCY", strains: "Penis Envy, PE Hybrid Strains", width: "w-full" },
];

const BENEFITS = [
    {
        icon: "solar:heart-pulse-linear",
        title: "Emotional & Mental Wellness",
        points: ["Emotional release and processing trauma", "Enhanced mood and reduced depression", "Reduced anxiety and OCD symptoms"],
    },
    {
        icon: "solar:atom-linear",
        title: "Mind Expansion & Awareness",
        points: ["Increased empathy and connection", "Deeper spiritual awareness"],
    },
    {
        icon: "solar:palette-linear",
        title: "Creativity & Physical Relief",
        points: ["Creative thinking and inspiration", "Relief from cluster headaches (anecdotally)"],
    },
];
const MushroomStrains = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-[#F8F6F6] font-sans overflow-x-hidden min-h-screen">
            {/* Hero Section */}
            <section
                className="relative py-12 md:py-20 px-6 sm:px-10 lg:px-20 min-h-[500px] md:min-h-[650px] flex items-center overflow-hidden bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="max-w-[1700px] mx-auto w-full flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 flex flex-col items-start z-10">
                        <span className="bg-[#E93E2B]/10 text-[#E93E2B] text-[10px] md:text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
                            MUSHROOM STRAINS
                        </span>
                        <h1 className="text-[#181211] font-extrabold text-5xl lg:text-5xl tracking-tight leading-tight mb-3">
                            Understanding Magic <br />
                            <span className="text-[#E93E2B] mt-0.5 inline-block">Mushroom Strains</span>
                        </h1>
                        <h2 className="text-[22px] md:text-xl font-bold text-[#344B24] mb-4">Nature's Goodness, Delivered with Care</h2>

                        <div className="space-y-6 mb-8 max-w-xl">
                            <p className="text-[#636363] text-sm md:text-[15px] leading-relaxed font-semibold">
                                Magic mushrooms, or psilocybin mushrooms, are a powerful tool for healing, self-discovery, and altered states of consciousness. But not all mushrooms are created equal. Each strain has its own potency, personality, and experience profile.
                                Knowing the difference between mushroom strains can help you choose the right one for your intention, whether it's for microdosing, creative flow, deep therapy, or mystical exploration.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate('/store')}
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

            {/* Section 2: Why Strains Matter */}
            <section className="py-10 px-6 sm:px-10 lg:px-10 bg-[#F8F6F6]">
                <div className=" mx-auto text-center">
                    <span className="text-[#E93E2B] text-xs font-extrabold uppercase tracking-widest mb-4 block">Strain</span>
                    <h2 className="text-[#181211] font-bold text-3xl md:text-4xl mb-6">Why Strain Matter.</h2>
                    <p className="text-[#636363] text-sm md:text-base leading-relaxed font-medium">
                        While all magic mushrooms contain psilocybin, the specific strain can influence the potency, duration, and nuances of the experience. Just as different grape varieties produce distinct wines, mushroom strains offer unique profiles—some leaning towards visual stimulation, others toward deep philosophical introspection. Understanding these differences is essential for safe and intentional research.
                    </p>
                </div>
            </section>

            {/* Section 3: Top Documented Strains */}
            <section className="py-10 px-6 sm:px-10 lg:px-10 bg-[#F8F6F6]">
                <div className="max-w-[1700px] mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-[#E93E2B] text-xs font-extrabold uppercase tracking-widest mb-4 block">The Index</span>
                        <h2 className="text-[#181211] font-bold text-3xl md:text-4xl">Top Documented Strains</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
                        {STRAINS.map((strain, idx) => (
                            <div key={idx} className="bg-white  overflow-hidden flex flex-col group transition-all">
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={strain.image}
                                        alt={strain.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/5"></div>
                                </div>
                                <div className="p-6 flex flex-col gap-3">
                                    <span className={`text-sm font-bold uppercase tracking-widest ${strain.potencyColor}`}>
                                        POTENCY: {strain.potency}
                                    </span>
                                    <h3 className="text-[#181211] font-extrabold text-2xl tracking-tight transition-colors">{strain.name}</h3>
                                    <p className="text-[#636363] text-sm leading-relaxed font-regular">
                                        {strain.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* How to Choose + Potency Scale */}
            <section className="py-16 px-6 sm:px-10 bg-[#F8F6F6]">
                <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row gap-8">

                    {/* How to Choose */}
                    <div className="w-full lg:w-1/2">
                        <span className="text-[#E93E2B] text-xs font-bold uppercase tracking-widest mb-3 block">Selection Protocol</span>
                        <h2 className="text-[#181211] font-semibold text-3xl mb-8">How to Choose.</h2>
                        <div className="flex flex-col gap-5">
                            {HOW_TO_CHOOSE.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4 bg-[#FFFFFF] rounded-2xl p-5 border border-[#D9D9D9]">
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0px_0px_27px_0px_#E580962B] mt-2">
                                        <Icon icon={item.icon} width="30" height="30" className={item.iconColor} />
                                    </div>
                                    <div>
                                        <p className="text-base font-bold uppercase tracking-widest text-[#E93E2B] mb-2">{item.label}</p>
                                        {item.items.map((row, i) => (
                                            <p key={i} className="text-[#636363] text-sm mb-0.5">
                                                <span className="font-bold">{row.key} → </span>
                                                <span className="text-[#636363]">{row.val}</span>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Potency Scale */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-[#000000] py-8 px-10 h-full flex flex-col">
                            <h3 className="text-white font-medium text-3xl mb-4">Potency Scale</h3>
                            <p className="text-[#B2B2B2] text-sm mb-10">Magic Mushroom Strains Vary Widely In Potency. Here's A Basic Scale Of Effects By Strength.</p>
                            <div className="flex flex-col gap-6">
                                {POTENCY_LEVELS.map((level, idx) => (
                                    <div key={idx}>
                                        <p className="text-[#F5F5F4] text-xs font-extrabold uppercase tracking-widest mb-2">{level.label}</p>
                                        <div className="w-full bg-[#292524] rounded-full h-1.5 mb-1.5">
                                            <div className={`${level.width} bg-[#E93E2B] h-1.5 rounded-full`} />
                                        </div>
                                        <p className="text-[#B2B2B2] text-xs">{level.strains}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Common Benefits */}
            <section className="py-10 px-6 sm:px-10 lg:px-10 mb-18 bg-[#F8F6F6]">
                <div className="max-w-[1700px] mx-auto">
                    <h2 className="text-[#181211] font-bold text-3xl md:text-4xl text-center mb-14">
                        Common Benefits of <span className="text-[#E93E2B]">Psilocybin Mushroom Strains</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {BENEFITS.map((b, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0px_0px_27px_0px_#9A85622B] mt-2">
                                    <Icon icon={b.icon} width={26} className="text-[#E93E2B]" />
                                </div>
                                <h3 className="text-[#1C1B1B] font-bold text-2xl">{b.title}</h3>
                                <ul className="text-[#636363] font-medium text-base space-y-1">
                                    {b.points.map((p, i) => <li key={i}>{p}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Know Before You Grow Section */}
            <section
                className="relative py-20 md:py-22 px-6 sm:px-10 lg:px-20 text-center text-white overflow-hidden"
                style={{
                    backgroundImage: `url(${knowbeforesection})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight">
                        Know Before <span className="underline decoration-[#E93E2B] decoration-2 underline-offset-8">You Grow</span> or Consume
                    </h2>
                    <div className="space-y-8 mx-auto">
                        <p className="text-sm md:text-base  max-w-[95%] font-normal text-[#D4D4D4] leading-relaxed">
                            Choosing the right mushroom strain is as important as picking the right dose or setting. At Shroom Express, we provide detailed information and strain options to match your journey.
                        </p>
                        <p className="text-sm md:text-base max-w-[115%] text-[#D4D4D4] leading-relaxed font-normal">
                            Always start with a small amount, especially with high-potency strains, and keep your intention clear. Whether you're looking to microdose for clarity or experience a full spiritual breakthrough, understanding mushroom strains gives you the knowledge to make empowered decisions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Explore Premium Strains Section */}
            <section className="py-20 md:py-22 px-6 sm:px-10 lg:px-20 bg-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-[#181211] font-bold text-3xl md:text-5xl mb-7 leading-tight">
                        Explore Premium <span className="text-[#E93E2B]">Psilocybin <br className="hidden md:block" /> Strains</span> at Shroom Express
                    </h2>
                    <p className="text-[#636363] text-base md:text-lg leading-relaxed font-medium max-w-3xl mx-auto">
                        Browse our online collection of lab-tested, carefully curated mushroom strains, each listed with potency, recommended dose, and trip duration. We deliver discreetly across Canada with quality and safety you can trust.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default MushroomStrains;
