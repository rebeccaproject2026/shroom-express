import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Asset Imports
import heroBg from '../assets/images/psilocybindosageguide.png';
import microdosingImg from '../assets/images/psilocybindosageguide1.png';

const dosageLevels = [
    {
        title: 'Microdose',
        range: '0.1g - 0.5g',
        description: 'Subtle benefits like improved focus and mood',
        icon: 'ph:pill-bold',
    },
    {
        title: 'Low Dose',
        range: '0.3 - 1.0g',
        description: 'Light visuals and mild mood lift',
        icon: 'ph:leaf-bold',
    },
    {
        title: 'Moderate Dose',
        range: '1.0 - 2.5g',
        description: 'Altered perception and introspection',
        icon: 'ph:flask-bold',
    },
    {
        title: 'High Dose',
        range: '2.5 - 5.0g',
        description: 'Intense visuals and deep emotional experience',
        icon: 'ph:fire-bold',
    },
    {
        title: 'Heroic Dose',
        range: '5.0g+',
        description: 'Ego dissolution and mystical states (advanced users only)',
        icon: 'ph:lightning-bold',
    }
];

const PsilocybinDosageGuide = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full font-sans bg-[#F8F6F6] overflow-x-hidden">
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
                        <h1 className="text-[#181211] font-extrabold text-5xl lg:text-5xl tracking-tight leading-tight mb-3">
                            Understanding <br />
                            <span className="inline-block mt-0.5">
                                <span className="text-[#E93E2B]">Psilocybin Dosage</span> <span className="text-[#181211]">A</span>
                            </span> <br />
                            <span className="text-[#181211] inline-block mt-0.5">Comprehensive Guide</span>
                        </h1>
                        <p className="text-[#636363] text-base md:text-[17px] leading-[1.7] mb-5 font-medium max-w-xl">
                            Psilocybin, the active compound found in magic mushrooms, has gained significant attention for its therapeutic and spiritual effects. However, understanding the correct dosage is essential to ensure safety, effectiveness, and the desired experience. Whether you're a first-time user, a microdoser, or seeking a transformative journey, this guide will walk you through everything you need to know about psilocybin dosage.
                        </p>
                        <button
                            onClick={() => navigate('/store/category/magic-mushrooms')}
                            className=" text-white pl-6 pr-6 py-1 rounded-full font-semibold flex items-center gap-2 cursor-pointer transition-all group shadow-xl text-base bg-[#E93E2B]"
                        >
                            <span className="text-base font-bold">Shop Now</span>
                            <div className="w-9 h-9 flex items-center justify-center text-white">
                                <Icon icon="carbon:next-filled" className="text-2xl transition-transform group-hover:translate-x-1" />
                            </div>
                        </button>
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
                </div>
            </section>

            {/* Dosage Levels Section */}
            <section className=" py-18 px-6 sm:px-10 lg:px-10">
                <div className="w-full max-w-[1700px] mx-auto text-center">
                    <h2 className="text-[#181211] font-extrabold text-3xl md:text-[42px] mb-3 tracking-tight">
                        Standard Psilocybin <span className="text-[#E93E2B]">Dosage Levels</span> (Dried Mushrooms)
                    </h2>
                    <p className="text-[#5F5E5E] text-base mb-13 font-regular">
                        Measurements based on average potency of dried Psilocybe cubensis mushrooms.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {dosageLevels.map((level, index) => (
                            <div
                                key={index}
                                className="bg-[#FFFFFF] p-5 rounded-xl text-left border border-[#DDDDDD]  transition-all duration-300 flex flex-col min-h-[12%]"
                            >
                                <div className="mb-5">
                                    <Icon icon={level.icon} width={42} className="text-[#E93E2B]" />
                                </div>
                                <h3 className="text-[#1B1C1C] font-bold text-xl mb-3 tracking-tight">{level.title}</h3>
                                <p className="text-[#E93E2B] font-semibold text-base mb-2">{level.range}</p>
                                <p className="text-[#636363] text-sm leading-relaxed font-regular">
                                    {level.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Microdosing Section */}
            <section className="pt-0 pb-20 px-6 sm:px-10 lg:px-10">
                <div className="w-full max-w-[1700px] mx-auto flex flex-col lg:flex-row items-start gap-20">
                    <div className="w-full lg:w-1/2 group">
                        <div className="relative overflow-hidden">
                            <img
                                src={microdosingImg}
                                alt="Microdosing Psilocybin"
                                className="w-full h-auto object-cover transform transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/5"></div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-[#1B1C1C] font-extrabold text-4xl md:text-5xl mb-5 tracking-tight leading-tight">
                            Microdosing <br />
                            <span className="text-[#E93E2B] mt-1 inline-block">Psilocybin</span>
                        </h2>
                        <p className="text-[#181211] text-base leading-relaxed mb-7 font-semibold max-w-[75%]">
                            Microdosing involves consuming sub-hallucinogenic amounts of psilocybin. The goal isn’t a “trip,” but a gradual optimization of cognitive function and emotional resilience.
                        </p>
                        <ul className="space-y-5">
                            {[
                                'Enhanced concentration and workflow state.',
                                'Reduction in symptoms of social anxiety.',
                                'Increased neuroplasticity and neural health.'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2.5">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                        <Icon icon="icon-park-outline:check-one" className="text-[#E93E2B]" width={20} />
                                    </div>
                                    <span className="text-[#636363] font-medium text-base">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Additional Info Cards */}
            <section className="pb-24 px-6 sm:px-10 lg:px-10">
                <div className="w-full max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Card 1 */}
                    <div className="bg-[#F6F4F3] p-6 md:px-10 md:py-8 rounded-lg border border-[#EBE8E7] flex flex-col items-start">
                        <h3 className="text-[#1B1C1C] font-extrabold text-3xl mb-2 tracking-tight leading-tight">Psilocybin Chocolates and Edibles</h3>
                        <p className="text-[#636363] textbase leading-relaxed mb-6 font-medium max-w-xl">
                            Edibles offer a tasty and discreet alternative to dried mushrooms. Always check the dose per unit. Onset is slower (45-90 minutes) but effects can last 4-6 hours.
                        </p>
                        <button
                            onClick={() => navigate('/store/category/edibles')}
                            className="bg-[#000000] border border-[#8F6F6C] text-white px-14 py-3.5 rounded-lg font-bold transition-all shadow-lg"
                        >
                            View Product
                        </button>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#181211] p-6 md:px-10 md:py-8 rounded-lg flex flex-col items-start relative overflow-hidden group">
                        <h3 className="text-white font-extrabold text-3xl mb-2 tracking-tight leading-tight">Psilocybin Safety Guidelines</h3>
                        <p className="text-[#E2E2E2] text-base leading-relaxed mb-6 font-medium relative z-10">
                            Avoid mixing with alcohol or medication unless approved by a doctor. Stay hydrated. If you have a history of schizophrenia or bipolar disorder, avoid use entirely. Always start low and go slow.
                        </p>
                        <button
                            onClick={() => navigate('/store/category/magic-mushrooms')}
                            className="bg-[#E93E2B] text-white px-14 py-3.5 rounded-lg font-bold   transition-all shadow-lg relative z-10"
                        >
                            View Product
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PsilocybinDosageGuide;
