import { useState } from "react";
import { Icon } from "@iconify/react";
import AddCardModal from "./AddCardModal";
import payment1 from "../../../assets/images/payment1.jpg";
import payment2 from "../../../assets/images/payment2.jpg";

const defaultCards = [
  { id: 1, last4: "4242", expiry: "12/26", color: "#E8E8E8", icon: "mdi:credit-card", img: payment1 },
  { id: 2, last4: "5555", expiry: "09/25", color: "#E8E8E8", icon: "mdi:credit-card", img: payment2 },
];

const PaymentMethodPanel = () => {
  const [cards, setCards] = useState(defaultCards);
  const [defaultCard, setDefaultCard] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleSaveCard = (cardData) => {
    const last4 = cardData.cardNumber.replace(/\s/g, '').slice(-4) || '0000';
    const newCard = {
      id: Date.now(),
      last4,
      expiry: cardData.expiry || 'N/A',
      color: "#E8E8E8",
      icon: "mdi:credit-card",
      img: payment1,
    };
    setCards(prev => [...prev, newCard]);
    setDefaultCard(newCard.id);
    setShowModal(false);
  };

  return (
    <div className="pt-4">
      {showModal && <AddCardModal onClose={() => setShowModal(false)} onSave={handleSaveCard} />}

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-[#181211]">Payment Method</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 text-[#E93E2B] font-bold text-sm hover:opacity-80 transition-opacity"
        >
          <Icon icon="mdi:plus" width={18} />
          Add New Card
        </button>
      </div>

      {/* Secure Payments banner */}
      <div className="flex items-start gap-3 bg-[#EC5B13]/5 border border-[#EC5B13]/10 rounded-xl px-4 py-3.5 mb-3">
        <Icon icon="mdi:shield-check-outline" width={22} className="text-[#E93E2B] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-[#181211]">Secure Payments</p>
          <p className="text-xs text-[#181211] mt-0.5">
            Your payment information is encrypted and never stored on our servers directly.
          </p>
        </div>
      </div>

      {/* Saved Cards */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-base font-bold text-[#181211]">Saved Cards</p>
        <p className="text-sm font-semibold text-[#E93E2B] tracking-widest uppercase">DEFAULT</p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-center gap-4 border border-[#E8E8E8] rounded-xl px-4 py-3.5 bg-white"
          >
            <div
              className="w-12 h-10 rounded-md flex items-center justify-center shrink-0"
              style={{ backgroundColor: card.color }}
            >
              <img src={card.img} alt="payment" className="w-[60%] h-[60%] object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#181211] tracking-widest">
                •••• •••• •••• {card.last4}
              </p>
              <p className="text-xs text-[#181211] mt-0.5">Expires {card.expiry}</p>
            </div>
            <button
              onClick={() => setDefaultCard(card.id)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors  ${defaultCard === card.id
                ? "border-[#E93E2B] bg-[#E93E2B]"
                : "border-[#BDBDBD]"
                }`}
            >
              {defaultCard === card.id && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Other Methods */}
      <p className="text-base font-bold text-[#181211] mb-1">Other Methods</p>
      <div className="flex flex-col gap-3 mb-1">
        {[
          { label: "Apple Pay", icon: "mdi:wallet-outline" },
          { label: "PayPal", icon: "material-symbols:payments-outline-rounded" },
        ].map((method) => (
          <button
            key={method.label}
            className="flex items-center gap-2 border border-[#E8E8E8] rounded-xl px-4 py-3.5 bg-white hover:bg-[#FFF5F4] transition-colors w-full text-left"
          >
            <div className="w-11 h-8  flex items-center justify-center shrink-0 ">
              <Icon icon={method.icon} width={25} className="text-[#181211]" />
            </div>
            <p className="flex-1 text-base font-semibold text-[#181211]">{method.label}</p>
            <Icon icon="mdi:chevron-right" width={20} className="text-[#A0A0BF]" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodPanel;
