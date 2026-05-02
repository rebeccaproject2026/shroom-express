import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './HeroSpiralGallery.css';

// Import Hero Images
import main1 from '../../assets/images/main1.jpg';
import main2 from '../../assets/images/main2.jpg';
import main3 from '../../assets/images/main3.jpg';
import main4 from '../../assets/images/main4.jpg';
import main5 from '../../assets/images/main5.jpg';
import main6 from '../../assets/images/main6.jpg';
import main7 from '../../assets/images/main7.jpg';
import main8 from '../../assets/images/main8.jpg';
import main9 from '../../assets/images/main9.jpg';

const images = [main1, main2, main3, main4, main5, main6, main7, main8, main9];

const HeroSpiralGallery = () => {
    const containerRef = useRef(null);
    const bgCardsRef = useRef([]);
    const fgCardsRef = useRef([]);

    const [activeIndex, setActiveIndex] = useState(0);
    const rotationTimelines = useRef([]);
    const sequenceInterval = useRef(null);

    // Initialize Animations
    useEffect(() => {
        // Setup background cards animations
        bgCardsRef.current.forEach((card) => {
            if (!card) return;
            const initialAngle = Math.random() * 360;
            const initialScale = 0.75 + Math.random() * 0.25;

            gsap.set(card, {
                rotate: initialAngle,
                scale: initialScale
            });

            const rotationSpeed = 5 + Math.random() * 10;
            const rotationDirection = Math.random() > 0.5 ? 1 : -1;

            const tl = gsap.timeline({ repeat: -1 });
            tl.to(card, {
                rotate: `+=${360 * rotationDirection}`,
                duration: rotationSpeed,
                ease: "none"
            });
            rotationTimelines.current.push(tl);
        });

        // Start foreground sequence
        const startSequence = () => {
            sequenceInterval.current = setInterval(() => {
                setActiveIndex(prev => (prev + 1) % images.length);
            }, 2000);
        };

        startSequence();

        return () => {
            clearInterval(sequenceInterval.current);
            rotationTimelines.current.forEach(tl => tl.kill());
        };
    }, []);

    const handleMouseEnter = () => {
        rotationTimelines.current.forEach(tl => tl.pause());
        clearInterval(sequenceInterval.current);
    };

    const handleMouseLeave = () => {
        rotationTimelines.current.forEach(tl => tl.play());
        sequenceInterval.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % images.length);
        }, 2000);
    };

    return (
        <div className="relative w-full sm:max-w-110  aspect-square flex items-center justify-center">
            {/* Container for the Spiral */}
            <div
                ref={containerRef}
                className="relative w-full h-full z-10 cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Background Stack */}
                <div className="absolute inset-0 z-1">
                    {images.map((img, i) => (
                        <div
                            key={`bg-${i}`}
                            ref={el => bgCardsRef.current[i] = el}
                            className="absolute w-[76%] h-[76%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl"
                        >
                            <img src={img} alt="" className="w-full h-full object-cover opacity-50 " />
                        </div>
                    ))}
                </div>

                {/* Foreground Stack */}
                <div className="absolute inset-0 z-2">
                    {images.map((img, i) => (
                        <div
                            key={`fg-${i}`}
                            ref={el => fgCardsRef.current[i] = el}
                            className={`absolute w-[78%] h-[78%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl transition-opacity duration-100 ${i === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" style={{ filter: "drop-shadow(0px 10px 40px rgba(0,0,0,0.15))" }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSpiralGallery;
