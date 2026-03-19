// import React from 'react';
// import { Icon } from '@iconify/react';

// const CartItem = ({ item, onQuantityChange, onRemove }) => {
//     return (
//         <div className="bg-white rounded-3xl p-6 border h-[28%] border-[#E93E2B]/5 flex items-start gap-7  min-h-[28%] min-w-[128px]">
//             {/* Product Image */}
//             <div className="w-32 h-32 border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shrink-0 m-auto">
//                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//             </div>

//             {/* Product Info */}
//             <div className="flex-1 min-w-0">
//                 {item.badge && (
//                     <span className={`text-[10px] font-bold uppercase px-2 py-0.5 mt-3.5 rounded-full mb-3 inline-block ${item.badgeColor || 'text-[#E93E2B] bg-red-50'}`}>
//                         {item.badge}
//                     </span>
//                 )}
//                 <h3 className="font-bold text-[#0F172A] text-lg leading-tight">{item.name}</h3>
//                 <p className="text-sm text-[#64748B] mt-0.5">{item.description}</p>

//                 {/* Quantity */}
//                 <div className="flex items-center gap-3 mt-6 border border-gray-300">
//                     <button
//                         onClick={() => onQuantityChange(item.id, item.quantity - 1)}
//                         className="w-7 h-7 rounded-[16px] border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#E93E2B] hover:text-[#E93E2B] transition-colors"
//                     >
//                         <Icon icon="mdi:minus" width={14} />
//                     </button>
//                     <span className="font-bold text-[#181211] w-5 text-center">{item.quantity}</span>
//                     <button
//                         onClick={() => onQuantityChange(item.id, item.quantity + 1)}
//                         className="w-7 h-7 rounded-[16px] bg-[#E93E2B] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
//                     >
//                         <Icon icon="mdi:plus" width={14} />
//                     </button>
//                 </div>
//             </div>

//             {/* Price & Delete */}
//             <div className="flex flex-col items-end gap-3 shrink-0">
//                 <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
//                     <Icon icon="mdi:trash-can-outline" width={20} />
//                 </button>
//                 <span className="font-bold text-[#181211] text-base">${(item.price * item.quantity).toFixed(2)}</span>
//             </div>
//         </div>
//     );
// };

// export default CartItem;
import React from 'react';
import { Icon } from '@iconify/react';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
    return (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E93E2B]/10 flex items-start gap-5 sm:gap-7">
            {/* Product Image */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0 flex flex-col">
                {/* Badge + Name + Description */}
                <div className="flex-1">
                    {item.badge && (
                        <span
                            className={`text-[10px] sm:text-xs font-bold uppercase px-2.5 py-1 rounded-full inline-block mb-2 ${item.badgeColor || 'bg-red-50 text-[#E93E2B]'
                                }`}
                        >
                            {item.badge}
                        </span>
                    )}

                    <h3 className="font-bold text-[#0F172A] text-base sm:text-lg leading-tight">
                        {item.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#64748B] mt-1 line-clamp-2">
                        {item.description}
                    </p>
                </div>

                {/* Quantity controller – number below buttons */}
                <div className="mt-4 flex items-center gap-3">
                    <div className="flex items-center gap-6 border border-[#E93E2B1A] bg-[#F8F6F6] rounded-xl px-1 py-1">
                        <button
                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-600 cursor-pointer transition-colors"
                        >
                            <Icon icon="mdi:minus" width={20} />
                        </button>

                        <span className="font-bold text-[#181211] text-base sm:text-lg">
                            {item.quantity}
                        </span>

                        <button
                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#E93E2B] flex items-center cursor-pointer justify-center text-white hover:opacity-90 transition-opacity"
                        >
                            <Icon icon="mdi:plus" width={16} />
                        </button>
                    </div>

                    {/* Subtotal price – aligned to the right */}
                    <div className="flex-1 flex justify-end items-end">
                        <span className="font-bold text-[#181211] text-base sm:text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Delete button – top right */}
            <button
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors shrink-0 pt-1"
            >
                <Icon icon="mdi:trash-can-outline" width={22} />
            </button>
        </div>
    );
};

export default CartItem;