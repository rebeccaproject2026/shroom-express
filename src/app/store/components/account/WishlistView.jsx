import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const WishlistView = () => {
    const { wishlistItems, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [notified, setNotified] = useState({});

    const handleNotify = (id) => {
        setNotified((prev) => ({ ...prev, [id]: true }));
        setTimeout(() => setNotified((prev) => ({ ...prev, [id]: false })), 2000);
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-[#181211] mb-5">Wishlist</h2>

            <div className="flex flex-col gap-3">
                {wishlistItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4 border border-[#E8E8E8] rounded-lg p-3 bg-white">
                        {/* Image */}
                        <div className="relative w-18 h-18 rounded-md border border-[#E8E8E8] overflow-hidden shrink-0 bg-[#F5F0EB]">
                            <img src={item.image} alt={item.title || item.name} className="w-full h-full object-cover" />
                            {item.inStock === false && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white text-[9px] font-bold text-center leading-tight px-1">OUT OF<br />STOCK</span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-base font-bold text-[#181211]">{item.title || item.name}</p>
                            <p className="text-sm mt-0.5 text-[#181211B2]">{item.vendor}</p>
                            <p className="text-base font-bold mt-1 text-[#E93E2B]">
                                ${Number(item.price).toFixed(2)}
                                {item.weights?.[0] && (
                                    <span className="text-xs font-normal ml-1 text-[#A0A0BF]">/ {item.weights[0]}</span>
                                )}
                            </p>
                        </div>

                        {/* Delete */}
                        <button
                            onClick={() => toggleWishlist(item)}
                            className="text-[#BDBDBD] cursor-pointer hover:text-[#E93E2B] transition-colors p-1 shrink-0"
                        >
                            <Icon icon="material-symbols:delete-outline" width="24" height="24" />
                        </button>

                        {/* Add to Cart / Notify Me */}
                        {item.inStock === false ? (
                            <button
                                onClick={() => handleNotify(item.id)}
                                className={`flex w-[160px] justify-center items-center gap-2 font-bold px-5 py-2.5 rounded-md text-sm transition-all shrink-0 whitespace-nowrap cursor-pointer ${notified[item.id]
                                    ? 'bg-[#059669] text-white'
                                    : 'bg-[#E8E8E8] text-[#181211B2] hover:bg-[#E93E2B] hover:text-white'
                                    }`}
                            >
                                {notified[item.id] ? (
                                    <>
                                        <Icon icon="mdi:check-circle-outline" width={18} />
                                        Notified!
                                    </>
                                ) : (
                                    <>
                                        <Icon icon="mdi:bell-outline" width={18} />
                                        Notify Me
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={() => addToCart(item, item.weights?.[0], 1)}
                                className="flex w-[160px] items-center gap-2 bg-[#E93E2B] hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-md text-sm transition-colors shrink-0 whitespace-nowrap cursor-pointer"
                            >
                                <Icon icon="mdi:cart-outline" width={20} />
                                Add to Cart
                            </button>
                        )}
                    </div>
                ))}

                {wishlistItems.length === 0 && (
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
