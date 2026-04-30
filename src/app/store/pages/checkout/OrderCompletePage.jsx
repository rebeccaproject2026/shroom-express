import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import Stepper from "../../components/checkout/Stepper";
import cart1 from '../../assets/images/cart1.png';
import cart2 from '../../assets/images/cart2.png';
import cart3 from '../../assets/images/cart3.jpg';

const DELIVERY_LABELS = {
  sameday: { label: 'Same Day Delivery', time: 'Today, 2–4 PM', fee: 'Free' },
  express: { label: 'Express Delivery', time: 'Today, within 1 hour', fee: '$15.00' },
  shipping: { label: 'Standard Shipping', time: '3–5 Business Days', fee: '$10.00' },
};

const orderItems = [
  {
    id: 1,
    name: "Blue Pulaski (Dried)",
    description: "Focus & Cognitive Support | 60 Capsules",
    price: 45,
    quantity: 1,
    image: cart1,
  },
  {
    id: 2,
    name: "Lion's Mane Dual Extract",
    description: "Top-Shelf Indica | 3.5 Grams",
    price: 60,
    quantity: 2,
    image: cart2,
  },
  {
    id: 3,
    name: "Moonlight Gummies (20pk)",
    description: "1000mg | Natural Flavor | 30ml",
    price: 85,
    quantity: 1,
    image: cart3,
  },
];

const OrderCompletePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const delivery = state?.delivery || 'sameday';
  const form = state?.form || {};
  const currentItems = state?.cartItems || orderItems;
  const deliveryInfo = DELIVERY_LABELS[delivery] || DELIVERY_LABELS.sameday;

  const subtotal = currentItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = delivery === 'express' ? 15 : delivery === 'shipping' ? 10 : 0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="w-full min-h-screen bg-[#F8F6F6] px-4 sm:px-10 pt-6 sm:pb-20 pb-5">
      {/* Top Navigation - Continue Shopping (Mobile/Tablet only) */}
      <div className="mt-2 sm:mt-12 lg:hidden">
        <button
          onClick={() => navigate('/store')}
          className="flex items-center gap-2 text-[#E93E2B] font-bold cursor-pointer text-base hover:opacity-80 transition-[opacity,transform] active:scale-95 group"
        >
          <Icon icon="mdi:arrow-left" width={22} className="transition-transform group-hover:-translate-x-1" />
          Continue Shopping
        </button>
      </div>

      <Stepper currentStep={3} />

      <div className="max-w-175 mx-auto flex flex-col gap-6 mt-10">
        {/* Success Icon + Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-18 h-18 rounded-full bg-[#E93E2B1A] flex items-center justify-center">
            <Icon
              icon="mdi:check-circle"
              className="text-[#E93E2B]"
              width={45}
            />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#181211]">
            Thank you for your order!
          </h1>
          <p className="text-[#475569] text-sm">
            Order <span className="font-bold text-[#E93E2B]">#SE-98234</span> is
            confirmed and being prepared.
          </p>
        </div>

        {/* Two info cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Estimated Delivery */}
          <div className="bg-white rounded-2xl shadow-[0px_1px_2px_0px_#0000000D] p-5 flex flex-col gap-2 border border-[#E93E2B1A]/10">
            <div className="flex items-center gap-2 text-[#E93E2B]">
              <Icon icon="ri:truck-line" width="20" height="20" />
              <span className="font-semibold text-[#E93E2B] text-sm uppercase">
                Estimated Delivery
              </span>
            </div>
            <p className="text-xl font-bold text-[#0F172A]">{deliveryInfo.time}</p>
            <p className="text-sm text-[#64748B]">{deliveryInfo.label} · {deliveryInfo.fee}</p>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-2xl shadow-[0px_1px_2px_0px_#0000000D] p-5 flex flex-col gap-2 border border-[#E93E2B1A]/10">
            <div className="flex items-center gap-2 text-[#E93E2B]">
              <Icon icon="iconamoon:location-pin" width="20" height="20" />
              <span className="font-semibold text-[#E93E2B] uppercase text-sm">
                Delivery Address
              </span>
            </div>
            <p className="text-lg text-[#0F172A] font-bold leading-relaxed">
              {form.address || '420 High St.'}
            </p>
            <p className="text-[#64748B] text-sm">{form.city || 'San Francisco'}{form.state ? `, ${form.state}` : ', CA'} {form.zip || '94103'}</p>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm  flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#E93E2B1A] px-6 py-5">
            <h3 className="font-bold text-[#0F172A] text-lg">Order Summary</h3>

            <p className="text-base font-medium text-[#64748B]">{currentItems.length} Items</p>
          </div>

          <div className="px-6 pb-6 flex flex-col gap-5">
            {currentItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 ">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-[#E5DCDC]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-[#181211] truncate">
                    {item.name}
                  </p>
                  <p className="text-[13px] text-[#886663] truncate">
                    {item.description} · Qty: {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-bold text-[#E93E2B] shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="border-t border-[#E93E2B1A] pt-5 flex flex-col gap-2 ">
              <div className="flex justify-between text-sm text-[#475569]">
                <span className="text-base">Subtotal</span>
                <span className="text-[Estimated Taxes] font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-[#475569]">
                <span className="text-base">Delivery Fee</span>
                <span className={deliveryFee === 0 ? "text-green-500 font-bold" : "text-[#475569] font-medium"}>
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm text-[#475569]">
                <span className="text-base">Estimated Taxes</span>
                <span className="text-[#475569] font-medium">
                  ${tax.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-[#E93E2B1A] pt-3 flex justify-between items-center">
              <span className="text-xl font-bold text-[#181211]">Total</span>
              <span className="text-xl font-extrabold text-[#E93E2B]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons (Fixed on Mobile/Tablet with Glassmorphism) */}
        <div className="fixed bottom-0 left-0 right-0 lg:static z-50 bg-white/50 backdrop-blur-xl lg:bg-transparent border-t lg:border-t-0 border-gray-100 px-2 py-2 pt-2 pb-4 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] lg:shadow-none flex flex-row gap-2.5 lg:p-0">
          <button
            onClick={() => navigate("/store/track-order", { state: { ...state, cartItems: currentItems } })}
            className="flex-1 flex items-center justify-center gap-1 bg-[#E93E2B] hover:bg-red-600 text-white font-bold h-11 rounded-[14px] transition-colors text-[13px] shadow-[0_6px_12px_-3px_rgba(233,62,43,0.3)]"
          >
            <Icon icon="material-symbols:map-outline" width={18} />
            Track My Order
          </button>
          <button
            onClick={() => navigate("/store")}
            className="flex-1 bg-white border-2 border-[#E93E2B33] text-[#E93E2B] font-bold h-11 rounded-[14px] hover:bg-gray-50 transition-colors text-[13px]"
          >
            Continue Shopping
          </button>
        </div>

        <div className="flex justify-center items-center my-6">
          <p>Questions about your order? <a href="/help" className="text-[#E93E2B] hover:underline">Visit Help Center</a></p>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletePage;
