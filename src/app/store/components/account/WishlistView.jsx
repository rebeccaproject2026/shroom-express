import { useState } from 'react';
import { Icon } from '@iconify/react';
import  Product1 from '../../assets/images/wishlist1.png';
import  Product2 from '../../assets/images/wishlist2.png';
import  Product3 from '../../assets/images/wishlist3.png';
import  Product4 from '../../assets/images/wishlist4.jpg';

const initialWishlist = [
    { id: 1, name: 'Blue Dream Flower', sub: 'Sativa Dominant • 24% THC', price: 45.00, unit: '3.5g', inStock: true, image: Product1 },
    { id: 2, name: "Lion's Mane Extract", sub: 'Nootropic • Focus & Clarity', price: 32.00, unit: '50ml', inStock: true, image: Product2 },
    { id: 3, name: 'Purple Punch Indica', sub: 'Indica • Sleep & Relaxation', price: 48.00, unit: '3.5g', inStock: true, image: Product3 },
    { id: 4, name: 'Golden Teacher Truffles', sub: 'Artisan Chocolate • 250mg', price: 25.00, unit: 'pack', inStock: false, image: Product4 },
];

const WishlistView = () => {
    const [items, setItems] = useState(initialWishlist);

    const removeItem = (id) => setItems(prev => prev.filter(item => item.id !== id));

    return (
        <div>
            <h2 className="text-xl font-bold text-[#181211] mb-5">Wishlist</h2>

            <div className="flex flex-col gap-3">
                {items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 border border-[#E8E8E8] rounded-lg p-3 bg-white">
                        {/* Image */}
                        <div className="relative w-18 h-18 rounded-md overflow-hidden shrink-0 bg-[#F5F0EB]">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            {!item.inStock && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white text-[9px] font-bold text-center leading-tight px-1">OUT OF<br />STOCK</span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className={`text-base font-bold ${item.inStock ? 'text-[#181211]' : 'text-[#181211]'}`}>{item.name}</p>
                            <p className={`text-sm mt-0.5 ${item.inStock ? 'text-[#181211B2]' : 'text-[#181211B2]'}`}>{item.sub}</p>
                            <p className={`text-base font-bold mt-1 ${item.inStock ? 'text-[#E93E2B]' : 'text-[#E93E2B]'}`}>
                                ${item.price.toFixed(2)}
                                <span className="text-xs font-normal ml-1 text-[#A0A0BF]">/ {item.unit}</span>
                            </p>
                        </div>

                        {/* Delete */}
                        <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#BDBDBD] hover:text-[#E93E2B] transition-colors p-1 shrink-0"
                        >
                            <Icon icon="material-symbols:delete-outline" width="24" height="24" />
                        </button>

                        {/* Action button */}
                        {item.inStock ? (
                            <button className="flex w-[160px] items-center gap-2 bg-[#E93E2B] hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-md text-sm transition-colors shrink-0 whitespace-nowrap">
                                <Icon icon="mdi:cart-outline" width={20} />
                                Add to Cart
                            </button>
                        ) : (
                            <button className="flex w-[160px] justify-center items-center gap-2 bg-[#E8E8E8] text-[#181211B2] font-bold px-5 py-2.5 rounded-md text-sm transition-colors shrink-0 whitespace-nowrap hover:text-[#E93E2B]">
                                Notify Me
                            </button>
                        )}
                    </div>
                ))}

                {items.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Icon icon="mdi:heart-outline" width={48} className="text-[#E5DCDC] mb-3" />
                        <p className="text-sm font-semibold text-[#BDBDBD]">Your wishlist is empty</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistView;
