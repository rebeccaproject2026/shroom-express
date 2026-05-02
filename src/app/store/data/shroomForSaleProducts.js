// Shroom For Sale Products Catalog
// Effect Images
import microDosingImg from "../assets/images/microdosing.png";
import creativeBoostImg from "../assets/images/creativeboost.png";
import highPotencyImg from "../assets/images/highpotency.png";
import visualExperienceImg from "../assets/images/visualexperience.png";
// import beginnerFriendlyImg from "../assets/images/beginnerfriendly.png";
import relaxChillImg from "../assets/images/relaxchill.png";
import focusClarityImg from "../assets/images/focusclarity.png";
// import deepjourneyImg from "../assets/images/deepjourney.png";

// ==========================================
// MOCKUP IMPORTS
// ==========================================

// Edibles/Mushrooms - Front & Back Pairs
import frontAlbinoChoda from "../assets/images/ShroomForSaleMockups/ShroomForSaleFrontSideMockups/Edibles/AlbinoChoda.jpeg";
import backAlbinoChoda from "../assets/images/ShroomForSaleMockups/ShroomForSaleBackSideMockups/AlbinoChoda.jpeg";

import frontHawaiian from "../assets/images/ShroomForSaleMockups/ShroomForSaleFrontSideMockups/Edibles/Hawaiian.jpeg";
import backHawaiian from "../assets/images/ShroomForSaleMockups/ShroomForSaleBackSideMockups/Hawaiian.jpeg";

import frontShakti from "../assets/images/ShroomForSaleMockups/ShroomForSaleFrontSideMockups/Edibles/Shakti.jpeg";
import backShakti from "../assets/images/ShroomForSaleMockups/ShroomForSaleBackSideMockups/Shakti.jpeg";

import frontTidalWave from "../assets/images/ShroomForSaleMockups/ShroomForSaleFrontSideMockups/Edibles/TidalWave.jpeg";
import backTidalWave from "../assets/images/ShroomForSaleMockups/ShroomForSaleBackSideMockups/TidalWave.jpeg";

import frontToadBites from "../assets/images/ShroomForSaleMockups/ShroomForSaleFrontSideMockups/Edibles/ToadBites.jpeg";
import backToadBites from "../assets/images/ShroomForSaleMockups/ShroomForSaleBackSideMockups/ToadBites.jpeg";

import frontToadBlueRaspberry from "../assets/images/ShroomForSaleMockups/ShroomForSaleFrontSideMockups/Edibles/ToadBlueRaspberry.jpeg";
import backToadBlueRaspberry from "../assets/images/ShroomForSaleMockups/ShroomForSaleBackSideMockups/ToadBlueRaspberry.jpeg";

import frontToadCola from "../assets/images/ShroomForSaleMockups/ShroomForSaleFrontSideMockups/Edibles/ToadCola.jpeg";
import backToadCola from "../assets/images/ShroomForSaleMockups/ShroomForSaleBackSideMockups/ToadCola.jpeg";

// Microdosing - Front Only
import microPenisEnvyFront from "../assets/images/ShroomForSaleMockups/ShroomForSaleFrontSideMockups/Microdosing/PenisEnvy.jpeg";
import microReishiFront from "../assets/images/ShroomForSaleMockups/ShroomForSaleFrontSideMockups/Microdosing/Reishi.jpeg";
import microShaktiFront from "../assets/images/ShroomForSaleMockups/ShroomForSaleFrontSideMockups/Microdosing/Shakti.jpeg";
import microTrinityFront from "../assets/images/ShroomForSaleMockups/ShroomForSaleFrontSideMockups/Microdosing/Trinity.jpeg";
import microTrueAlbinoTeacherFront from "../assets/images/ShroomForSaleMockups/ShroomForSaleFrontSideMockups/Microdosing/TrueAlbinoTeacher.jpeg";

// Master Image Groupings
const mushroomMasterImages = [
    { front: frontAlbinoChoda, back: backAlbinoChoda },
    { front: frontHawaiian, back: backHawaiian },
    { front: frontShakti, back: backShakti },
    { front: frontTidalWave, back: backTidalWave },
    { front: frontToadBites, back: backToadBites },
    { front: frontToadBlueRaspberry, back: backToadBlueRaspberry },
    { front: frontToadCola, back: backToadCola },
];

const microdosingMasterImages = [
    { front: microPenisEnvyFront },
    { front: microReishiFront },
    { front: microShaktiFront },
    { front: microTrinityFront },
    { front: microTrueAlbinoTeacherFront },
];

const sharedProps = {
    badge: null,
    isWishlisted: false,
    inStock: true,
    onSale: false,
    vendor: "Magic Mushrooms",
    rating: '4.9',
    reviewCount: 45,
    weights: ['3.5g', '7g', '14g', '28g'],
    price: "35.00 – 160.00",
    location: "Toronto, ON",
};

export const shroomForSaleProducts = [
    // --- MUSHROOMS / EDIBLES (7 Pairs) ---
    {
        ...sharedProps,
        id: 801,
        image: mushroomMasterImages[0].front,
        images: [mushroomMasterImages[0].front, mushroomMasterImages[0].back].filter(Boolean),
        title: "Albino Choda",
        name: "Albino Choda",
        categories: ["Magic Mushrooms"],
        effects: [{ image: visualExperienceImg, name: "Visual Experience" }, { image: highPotencyImg, name: "High Potency" }],
        description: [{ title: "Albino Choda:", text: "A premium quality product from Shroom For Sale." }],
    },
    {
        ...sharedProps,
        id: 802,
        image: mushroomMasterImages[1].front,
        images: [mushroomMasterImages[1].front, mushroomMasterImages[1].back].filter(Boolean),
        title: "Hawaiian",
        name: "Hawaiian",
        categories: ["Magic Mushrooms"],
        effects: [{ image: visualExperienceImg, name: "Visual Experience" }, { image: highPotencyImg, name: "High Potency" }],
        description: [{ title: "Hawaiian:", text: "A premium quality product from Shroom For Sale." }],
    },
    {
        ...sharedProps,
        id: 803,
        image: mushroomMasterImages[2].front,
        images: [mushroomMasterImages[2].front, mushroomMasterImages[2].back].filter(Boolean),
        title: "Shakti",
        name: "Shakti",
        categories: ["Magic Mushrooms"],
        effects: [{ image: visualExperienceImg, name: "Visual Experience" }, { image: highPotencyImg, name: "High Potency" }],
        description: [{ title: "Shakti:", text: "A premium quality product from Shroom For Sale." }],
    },
    {
        ...sharedProps,
        id: 804,
        image: mushroomMasterImages[3].front,
        images: [mushroomMasterImages[3].front, mushroomMasterImages[3].back].filter(Boolean),
        title: "Tidal Wave",
        name: "Tidal Wave",
        categories: ["Magic Mushrooms"],
        effects: [{ image: visualExperienceImg, name: "Visual Experience" }, { image: highPotencyImg, name: "High Potency" }],
        description: [{ title: "Tidal Wave:", text: "A premium quality product from Shroom For Sale." }],
    },
    {
        ...sharedProps,
        id: 805,
        image: mushroomMasterImages[4].front,
        images: [mushroomMasterImages[4].front, mushroomMasterImages[4].back].filter(Boolean),
        title: "Toad Bites",
        name: "Toad Bites",
        categories: ["Mushroom Edibles"],
        effects: [{ image: creativeBoostImg, name: "Creative Boost" }, { image: relaxChillImg, name: "Relax & Chill" }],
        description: [{ title: "Toad Bites:", text: "A premium quality product from Shroom For Sale." }],
    },
    {
        ...sharedProps,
        id: 806,
        image: mushroomMasterImages[5].front,
        images: [mushroomMasterImages[5].front, mushroomMasterImages[5].back].filter(Boolean),
        title: "Toad (Blue Raspberry)",
        name: "Toad (Blue Raspberry)",
        categories: ["Mushroom Edibles"],
        effects: [{ image: creativeBoostImg, name: "Creative Boost" }],
        description: [{ title: "Toad Bar:", text: "A premium quality product from Shroom For Sale." }],
    },
    {
        ...sharedProps,
        id: 807,
        image: mushroomMasterImages[6].front,
        images: [mushroomMasterImages[6].front, mushroomMasterImages[6].back].filter(Boolean),
        title: "Toad (Cola)",
        name: "Toad (Cola)",
        categories: ["Mushroom Edibles"],
        effects: [{ image: creativeBoostImg, name: "Creative Boost" }],
        description: [{ title: "Toad Bar:", text: "A premium quality product from Shroom For Sale." }],
    },

    // --- MICRODOSING (5 Items) ---
    {
        ...sharedProps,
        id: 808,
        image: microdosingMasterImages[0].front,
        images: [microdosingMasterImages[0].front].filter(Boolean),
        title: "Penis Envy Capsules",
        name: "Penis Envy Capsules",
        vendor: "Microdosing",
        weights: ['100mg', '150mg', '200mg', '500mg'],
        categories: ["Microdosing"],
        effects: [{ image: microDosingImg, name: "Microdosing" }, { image: focusClarityImg, name: "Focus & Clarity" }],
        description: [{ title: "Penis Envy Capsules:", text: "A premium quality product from Shroom For Sale." }],
    },
    {
        ...sharedProps,
        id: 809,
        image: microdosingMasterImages[1].front,
        images: [microdosingMasterImages[1].front].filter(Boolean),
        title: "Reishi Capsules",
        name: "Reishi Capsules",
        vendor: "Microdosing",
        weights: ['100mg', '150mg', '200mg', '500mg'],
        categories: ["Microdosing"],
        effects: [{ image: focusClarityImg, name: "Focus & Clarity" }, { image: microDosingImg, name: "Microdosing" }],
        description: [{ title: "Reishi Capsules:", text: "A premium quality product from Shroom For Sale." }],
    },
    {
        ...sharedProps,
        id: 810,
        image: microdosingMasterImages[2].front,
        images: [microdosingMasterImages[2].front].filter(Boolean),
        title: "Shakti Capsules",
        name: "Shakti Capsules",
        vendor: "Microdosing",
        weights: ['100mg', '150mg', '200mg', '500mg'],
        categories: ["Microdosing"],
        effects: [{ image: microDosingImg, name: "Microdosing" }, { image: highPotencyImg, name: "High Potency" }],
        description: [{ title: "Shakti Capsules:", text: "A premium quality product from Shroom For Sale." }],
    },
    {
        ...sharedProps,
        id: 811,
        image: microdosingMasterImages[3].front,
        images: [microdosingMasterImages[3].front].filter(Boolean),
        title: "Trinity Capsules",
        name: "Trinity Capsules",
        vendor: "Microdosing",
        weights: ['100mg', '150mg', '200mg', '500mg'],
        categories: ["Microdosing"],
        effects: [{ image: microDosingImg, name: "Microdosing" }, { image: visualExperienceImg, name: "Visual Experience" }],
        description: [{ title: "Trinity Capsules:", text: "A premium quality product from Shroom For Sale." }],
    },
    {
        ...sharedProps,
        id: 812,
        image: microdosingMasterImages[4].front,
        images: [microdosingMasterImages[4].front].filter(Boolean),
        title: "True Albino Teacher Capsules",
        name: "True Albino Teacher Capsules",
        vendor: "Microdosing",
        weights: ['100mg', '150mg', '200mg', '500mg'],
        categories: ["Microdosing"],
        effects: [{ image: microDosingImg, name: "Microdosing" }, { image: focusClarityImg, name: "Focus & Clarity" }],
        description: [{ title: "True Albino Teacher Capsules:", text: "A premium quality product from Shroom For Sale." }],
    },
];

// Combine into final list of 113 products, rotating through the available master pairs
const baseCount = shroomForSaleProducts.length;
while (shroomForSaleProducts.length < 113) {
    const nextId = 801 + shroomForSaleProducts.length;
    const template = shroomForSaleProducts[shroomForSaleProducts.length % baseCount];
    shroomForSaleProducts.push({
        ...template,
        id: nextId,
    });
}
