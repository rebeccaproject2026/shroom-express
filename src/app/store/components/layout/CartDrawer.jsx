import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useCart } from "../../context/CartContext";

const CartDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, cartCount, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    if (open) {
      document.body.style.setProperty("overflow", "hidden", "important");
    } else {
      document.body.style.removeProperty("overflow");
    }
    return () => document.body.style.removeProperty("overflow");
  }, [open]);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const handleCheckout = () => {
    onClose();
    navigate("/store/cart");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[110] bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[120] h-full w-[360px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E8]">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:cart-outline" width={22} className="text-[#E93E2B]" />
            <span className="text-lg font-bold text-[#0F172A]">My Cart</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#E93E2B] bg-[#FFF0EE] px-2.5 py-1 rounded-full">
              {cartCount} {cartCount === 1 ? "Item" : "Items"}
            </span>
            {/* <button onClick={onClose} className="text-[#888] hover:text-[#181211] transition-colors">
              <Icon icon="mdi:close" width={20} />
            </button> */}
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col divide-y divide-[#F1F5F9]">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-[#888]">
              <Icon icon="mdi:cart-off" width={48} />
              <p className="text-sm font-medium">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={item.cartKey || idx} className="flex items-start gap-4 py-5">
                {/* Large square image */}
                <div className="w-[90px] h-[90px] rounded-2xl overflow-hidden shrink-0 bg-[#F5F5F5]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Name + close */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-[15px] font-bold text-[#0F172A] leading-snug">{item.name}</p>
                    <button
                      onClick={() => removeFromCart(item.cartKey)}
                      className="text-[#BDBDBD] hover:text-[#E93E2B] transition-colors shrink-0 mt-0.5"
                    >
                      <Icon icon="mdi:close" width={15} />
                    </button>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-xs text-[#94A3B8] mb-2">{item.description}</p>
                  )}

                  {/* Qty + Price row */}
                  <div className="flex items-center justify-between">
                    {/* Qty pill */}
                    <div className="flex items-center gap-3 bg-[#F1F5F9] rounded-lg px-3 py-1.5">
                      <button
                        onClick={() => updateQuantity(item.cartKey, -1)}
                        className="text-[#64748B] hover:text-[#E93E2B] transition-colors"
                      >
                        <Icon icon="fa6-solid:minus" width={10} />
                      </button>
                      <span className="text-sm font-bold text-[#0F172A] w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, 1)}
                        className="text-[#64748B] hover:text-[#E93E2B] transition-colors"
                      >
                        <Icon icon="fa6-solid:plus" width={10} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-base font-bold text-[#0F172A]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-5 py-5 border-t border-[#E8E8E8]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#555]">Subtotal</span>
              <span className="text-sm font-semibold text-[#181211]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#555]">Delivery</span>
              <span className="text-sm font-bold text-[#22C55E]">FREE</span>
            </div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-base font-bold text-[#181211]">Total</span>
              <span className="text-base font-bold text-[#E93E2B]">${subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              Checkout Now
              <Icon icon="mdi:arrow-right" width={18} />
            </button>

            <p className="text-center text-xs text-[#888] mt-3 flex items-center justify-center gap-1">
              <Icon icon="mdi:lock-outline" width={13} />
              100% ENCRYPTED PAYMENT
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
