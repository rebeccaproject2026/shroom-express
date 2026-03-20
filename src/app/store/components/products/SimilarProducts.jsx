import React from 'react';
import { Icon } from '@iconify/react';
import ProductCard from '../common/ProductCard';
import microDosingImg from "../../assets/images/microdosing.png";
import beginnerFriendlyImg from "../../assets/images/beginnerfriendly.png";
import highPotencyImg from "../../assets/images/highpotency.png";
import creativeBoostImg from "../../assets/images/creativeboost.png";
import deepjourneyImg from "../../assets/images/deepjourney.png";
import relaxChillImg from "../../assets/images/relaxchill.png";
import visualExperienceImg from "../../assets/images/visualexperience.png";
import focusClarityImg from "../../assets/images/focusclarity.png";
import Trinity from "../../assets/images/Trinity.png";
import Truealbinoteacher from "../../assets/images/Truealbinoteacher.png";
import AmazonianImg from "../../assets/images/Amazonian.png";
import Jackfrost from "../../assets/images/Jackfrost.png";
import { useCategory } from '../../context/CategoryContext';

const SimilarProducts = ({ products = [] }) => {
  const { selectedEffect } = useCategory();

  const defaultProducts = [
    {
      id: 9,
      badge: { text: 'BEST SELLER', colorClass: 'bg-[#EA4031]' },
      image: Trinity,
      effects: [{ image: creativeBoostImg, name: "Creative Boost" }, { image: microDosingImg, name: "Micro dosing" }, { image: visualExperienceImg, name: "Visual Experience" }],
      rating: '4.9',
      title: 'Trinity',
      vendor: 'Green Valley Organics',
      weights: ['3g', '10g'],
      price: 50.00,
      categories: ['Micro dosing', 'Creative Boost', "Visual Experience"],
    },
    {
      id: 10,
      isWishlisted: true,
      badge: null,
      image: Truealbinoteacher,
      effects: [
        { image: focusClarityImg, name: "Focus & Clarity" },
        { image: relaxChillImg, name: "Relax & Chill" }
      ],
      rating: '4.4',
      title: 'True Albino Teacher',
      vendor: 'Aether Mushroom Labs',
      weights: ['3g', '10g'],
      price: 50.00,
      categories: ['Focus & Clarity', 'Relax & Chill'],
    },
    {
      id: 11,
      badge: { text: 'NEW', colorClass: 'bg-[#22C55E]' },
      image: AmazonianImg,
      effects: [{ image: highPotencyImg, name: "High Potency" },
      { image: deepjourneyImg, name: "Deep Journey" },
      { image: beginnerFriendlyImg, name: "Beginner Friendly" }
      ],
      rating: '5.0',
      title: 'Amazonian',
      vendor: 'Elevated Solstice',
      weights: ['3g', '10g'],
      price: 55.00,
      categories: ['High Potency', "Deep Journey", 'Beginner Friendly'],
    },
    {
      id: 12,
      badge: { text: 'POPULAR', colorClass: 'bg-[#3B82F6]' },
      image: Jackfrost,
      effects: [{ image: creativeBoostImg, name: "Creative Boost" },
      { image: microDosingImg, name: "Micro dosing" }
      ],
      rating: '4.7',
      title: 'Jack Frost',
      vendor: 'Green Valley Organics',
      weights: ['3g', '10g'],
      price: 45.00,
      categories: ['Micro dosing', 'Creative Boost', 'Focus & Clarity'],
    },
  ];

  const baseProducts = products.length > 0 ? products : defaultProducts;
  const displayProducts = selectedEffect
    ? baseProducts.filter(p => p.categories?.includes(selectedEffect))
    : baseProducts;

  return (
    <div className="w-full py-12 bg-[#FAF8F5]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-10">
        <h2 className="text-2xl font-bold text-[#181211]">Similar Product</h2>
        <a href="#" className="text-[#E93E2B] font-semibold flex items-center gap-1 hover:underline">
          View All
          <Icon icon="uil:arrow-to-right" width="20" height="20" />
        </a>
      </div>

      {/* Products Grid */}
      <div className="px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
