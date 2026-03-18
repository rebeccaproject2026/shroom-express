import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Input from "../../../components/common/Input";

const AddCardModal = ({ onClose }) => {
  const [form, setForm] = useState({ cardNumber: "", expiry: "", cvv: "", country: "" });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  useEffect(() => {
    document.body.style.setProperty("overflow", "hidden", "important");
    document.body.style.setProperty("touch-action", "none", "important");
    document.documentElement.classList.add("modal-open");
    return () => {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("touch-action");
      document.documentElement.classList.remove("modal-open");
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative top-[19%] bg-white rounded-2xl shadow-xl w-full max-w-[35%] mx-4 overflow-hidden">

        {/* Grey header */}
        <div className="bg-[#FAF8F8] px-3.5 pt-5 pb-5 relative border-b border-[#E8E8E8]">
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 text-[#181211] hover:text-[#181211] transition-colors"
          >
            <Icon icon="mdi:close" width={28} height={25} />
          </button>
          <h3 className="text-2xl font-bold text-[#181211] mb-1">Add New payment method</h3>
          <p className="text-xs font-semibold text-[#181211]/60">your information is protected by industry - standard encryption</p>
        </div>

        {/* White form body */}
        <div className="bg-white px-6 py-4">
          <div className="flex flex-col gap-4">
            {/* Card Number */}
            <Input
              label="Card Number"
              required
              value={form.cardNumber}
              onChange={set("cardNumber")}
              placeholder="Jeo"
            />

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiration (MM/YY)"
                required
                value={form.expiry}
                onChange={set("expiry")}
                placeholder="12/26"
              />
              <Input
                label="CVV"
                required
                value={form.cvv}
                onChange={set("cvv")}
                placeholder="123"
              />
            </div>

            {/* Country */}
            <Input
              label="Country"
              required
              value={form.country}
              onChange={set("country")}
              placeholder="India"
            />

            {/* Save Button */}
            <button className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors mt-1 shadow-[0px_4px_6px_-4px_rgba(233,62,43,0.25),0px_10px_15px_-3px_rgba(233,62,43,0.25)]">
              Save Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
