import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import ProductCard from '../../components/common/ProductCard';

// Import Hero Images
import home1 from '../../assets/images/home1.png';
import home2 from '../../assets/images/home2.png';
import home3 from '../../assets/images/home3.png';
import product1 from "../../assets/images/product1.png";
// import productEffectImg from "../../assets/images/producteffect1.png";
import microDosingImg from "../../assets/images/microdosing.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import creativeBoostImg from "../../assets/images/creative boost.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import focusClarityImg from "../../assets/images/focusclarity.png";

const Home = () => {
    const sliderRef = useRef(null);

    const slideLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const slideRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full pr-10 pl-10">
            {/* Hero Section */}
            <section className="font-sans pt-6 pb-4 md:pt-6 md:pb-10">
                <div className="container mx-auto ">
                    <div className="bg-[#E93E2B]/5 rounded-3xl flex flex-col md:flex-row items-center justify-between h-[40%]  relative overflow-hidden">

                        {/* Left Side */}
                        <div className="md:w-[55%] flex flex-col items-start z-10 w-full mb-10 md:mb-0 px-10">
                            {/* Badge */}
                            <div className="bg-[#E93E2B]/10 text-[var(--store-primary)] text-[10px] md:text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6">
                                Premium Collection 2026
                            </div>

                            {/* Heading */}
                            <h1 className="text-[#181211] font-extrabold text-6xl md:text-6xl lg:text-6xl  tracking-tight">
                                Elevate Your <br />
                                <span className="text-[var(--store-primary)] inline-block mt-2">Wellness Journey</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-[#886663] text-lg font-normal max-w-md mt-6 leading-relaxed">
                                Curated selections of premium cannabis and functional mushrooms. Lab tested, legally compliant, and discreetly shipped to your door.
                            </p>
                        </div>

                        {/* Right Side Container */}
                        <div className="md:w-[45%] h-[30%] flex justify-center items-center w-full relative z-10 ">
                            <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center">
                                <img
                                    src={home3}
                                    alt="Hero background right"
                                    className="absolute w-[85%] h-auto rounded-[32px] rotate-[3deg] right-9 bottom-8 z-0 object-cover"
                                />
                                <img
                                    src={home2}
                                    alt="Hero background left"
                                    className="absolute w-[85%] h-auto rounded-[32px] -rotate-[3deg] left-9 top-8 z-10 object-cover"
                                />
                                <img
                                    src={home1}
                                    alt="Premium Mushroom Coffee"
                                    className="w-[85%] h-auto rounded-[32px] relative z-20 object-cover"
                                    id="hero-coffee-image"
                                    style={{ filter: "drop-shadow(0px 0px 30px 0px #000000)" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Hot Deal Section */}
            <section className="bg-[#FAF7F7] font-sans pb-4 md:pb-10">
                <div className="container mx-auto">
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2.5">
                            <Icon icon="solar:fire-bold-duotone" color='#E93E2B' width={30} height={30} />
                            <h2 className="text-2xl font-extrabold text-[#181211]">Hot Deal</h2>
                        </div>

                        {/* Carousel Controls */}
                        <div className="flex items-center gap-3">
                            <button onClick={slideLeft} className="w-10 h-10 rounded-full border border-[var(--store-primary)] flex items-center cursor-pointer justify-center text-[var(--store-primary)] hover:bg-[var(--store-primary)] hover:text-white transition-colors bg-white shadow-sm">
                                <Icon icon="ep:arrow-left-bold" width={14} />
                            </button>
                            <button onClick={slideRight} className="w-10 h-10 rounded-full bg-[var(--store-primary)] text-white flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shadow-sm">
                                <Icon icon="ep:arrow-right-bold" width={14} />
                            </button>
                        </div>
                    </div>

                    {/* Product Cards Row */}
                    <div ref={sliderRef} className="flex gap-7 overflow-x-auto py-4 -mx-4 px-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {/* Mock Products Array */}
                        {[
                            {
                                id: 1,
                                badge: { text: "BEST SELLER", colorClass: "bg-[#E93E2B]" },
                                isWishlisted: false,
                                image: product1,
                                title: "Albino Choda",
                                vendor: "Green Valley Organics",
                                rating: '4.9',
                                weights: ['3g', '10g'],
                                price: 50.00,
                                effects: [
                                    { image: microDosingImg, name: "Creative Boost", hasBorder: false }
                                ]
                            },
                            {
                                id: 2,
                                badge: { text: "NEW", colorClass: "bg-[#059669]" },
                                isWishlisted: true,
                                image: product1,
                                title: "Albino Penis Envy",
                                vendor: "Elevated Solstice",
                                rating: '5.0',
                                weights: ['3g', '10g'],
                                price: 55.00,
                                effects: [
                                    { image: highPotencyImg, name: "High Potency" },
                                    { image: visualExperienceImg, name: "Visual Experience" }
                                ]
                            },
                            {
                                id: 3,
                                badge: null,
                                isWishlisted: false,
                                image: product1,
                                title: "Aztec God",
                                vendor: "Green Valley Organics",
                                rating: '4.7',
                                weights: ['3g', '10g'],
                                price: 45.00,
                                effects: [
                                    { image: focusClarityImg, name: "Focus & Clarity" },
                                    { image: relaxChillImg, name: "Relax & Chill" }
                                ]
                            },
                            {
                                id: 4,
                                badge: null,
                                isWishlisted: false,
                                image: product1,
                                title: "Golden Teacher",
                                vendor: "Aether Mushroom Labs",
                                rating: '4.8',
                                weights: ['3g', '10g'],
                                price: 50.00,
                                effects: [
                                    { image: beginnerFriendlyImg, name: "Beginner Friendly" },
                                    { image: microDosingImg, name: "Microdosing" }
                                ]
                            },
                            {
                                id: 5,
                                badge: null,
                                isWishlisted: false,
                                image: product1,
                                title: "Golden Teacher",
                                vendor: "Aether Mushroom Labs",
                                rating: '4.8',
                                weights: ['3g', '10g'],
                                price: 50.00,
                                effects: [
                                    { image: creativeBoostImg, name: "Creative Boost" }
                                ]
                            },
                            {
                                id: 6,
                                badge: { text: "NEW", colorClass: "bg-[#059669]" },
                                isWishlisted: true,
                                image: product1,
                                title: "Albino Penis Envy",
                                vendor: "Elevated Solstice",
                                rating: '5.0',
                                weights: ['3g', '10g'],
                                price: 55.00,
                                effects: [
                                    { image: highPotencyImg, name: "High Potency" }
                                ]
                            },
                        ].map((prod) => (
                            <div key={prod.id} className="min-w-[270px] w-full max-w-[340px] shrink-0">
                                <ProductCard product={prod} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
