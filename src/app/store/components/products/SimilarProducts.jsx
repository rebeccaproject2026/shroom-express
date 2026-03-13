import React from 'react';
import { Icon } from '@iconify/react';
import ProductCard from '../common/ProductCard';
import storecard1 from "../../assets/images/storecard1.png";
import product1 from "../../assets/images/product1.png";



const SimilarProducts = ({ products = [] }) => {
  const defaultProducts = [
    {
      id: 1,
      badge: { text: 'BEST SELLER', colorClass: 'bg-[#EA4031]' },
      image: product1,
      effects: [
        { image: storecard1, name: 'Creative Boost' }
      ],
      rating: '4.9',
      title: 'Albino Choda',
      vendor: 'Green Valley Organics',
      weights: ['3g', '10g'],
      price: 50.00,
    },
    {
      id: 2,
      badge: { text: 'NEW', colorClass: 'bg-[#22C55E]' },
      image: product1,
      effects: [
        { image: storecard1, name: 'Relaxing' },
        { image: storecard1, name: 'Energetic' },
      ],
      rating: '4.4',
      title: 'Albino Hilbility',
      vendor: 'Aether Mushroom Labs',
      weights: ['3g', '10g'],
      price: 50.00,
    },
    {
      id: 3,
      badge: { text: 'NEW', colorClass: 'bg-[#22C55E]' },
      image: product1,
      effects: [
        { image: storecard1, name: 'Euphoric' }
      ],
      rating: '5.0',
      title: 'Albino Penis Envy',
      vendor: 'Elevated Solstice',
      weights: ['3g', '10g'],
      price: 55.00,
    },
    {
      id: 4,
      badge: { text: 'POPULAR', colorClass: 'bg-[#3B82F6]' },
      image: product1,
      effects: [
        { image: storecard1, name: 'Energetic' },
        { image: storecard1, name: 'Energetic' },
      ],
      rating: '4.7',
      title: 'Aztec God',
      vendor: 'Green Valley Organics',
      weights: ['3g', '10g'],
      price: 45.00,
    },
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;

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
