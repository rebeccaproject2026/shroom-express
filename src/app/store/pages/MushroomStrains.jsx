import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

// Asset Imports
import heroBg from "../assets/images/mushroomstrain.png";
import strain1 from "../assets/images/strain1.png";
import strain2 from "../assets/images/strain2.png";
import strain3 from "../assets/images/strain3.png";
import strain4 from "../assets/images/strain4.png";
import strain5 from "../assets/images/strain5.png";
import strain6 from "../assets/images/strain6.png";
import strain7 from "../assets/images/strain7.png";
import strain8 from "../assets/images/strain8.png";

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
                        <h1 className="text-[#181211] font-extrabold text-5xl lg:text-5xl tracking-tight leading-none mb-3">
                            Understanding Magic <br />
                            <span className="text-[#E93E2B]">Mushroom Strains</span>
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
                            className="bg-[#0D0D0D] text-white pl-6 pr-6 py-1.5 rounded-full font-semibold flex items-center gap-2 cursor-pointer transition-all group shadow-xl text-base hover:bg-[#E93E2B]"
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
            <section className="py-20 px-6 sm:px-10 lg:px-20 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-[#E93E2B] text-xs font-extrabold uppercase tracking-widest mb-4 block">Strain</span>
                    <h2 className="text-[#181211] font-bold text-3xl md:text-4xl mb-6">Why Strain Matter.</h2>
                    <p className="text-[#886663] text-sm md:text-base leading-relaxed font-medium">
                        While all magic mushrooms contain psilocybin, the specific strain can influence the potency, duration, and nuances of the experience. Just as different grape varieties produce distinct wines, mushroom strains offer unique profiles—some leaning towards visual stimulation, others toward deep philosophical introspection. Understanding these differences is essential for safe and intentional research.
                    </p>
                </div>
            </section>

            {/* Section 3: Top Documented Strains */}
            <section className="py-20 px-6 sm:px-10 lg:px-20 bg-[#F8F6F6]">
                <div className="max-w-[1700px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[#E93E2B] text-xs font-extrabold uppercase tracking-widest mb-4 block">The Index</span>
                        <h2 className="text-[#181211] font-bold text-3xl md:text-4xl">Top Documented Strains</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                        {STRAINS.map((strain, idx) => (
                            <div key={idx} className="bg-white rounded-3xl overflow-hidden flex flex-col group transition-all hover:shadow-2xl hover:-translate-y-2">
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={strain.image}
                                        alt={strain.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/5"></div>
                                </div>
                                <div className="p-8 flex flex-col gap-3">
                                    <span className={`text-[10px] font-extrabold uppercase tracking-widest ${strain.potencyColor}`}>
                                        POTENCY: {strain.potency}
                                    </span>
                                    <h3 className="text-[#181211] font-bold text-2xl group-hover:text-[#E93E2B] transition-colors">{strain.name}</h3>
                                    <p className="text-[#886663] text-sm leading-relaxed font-medium">
                                        {strain.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MushroomStrains;
