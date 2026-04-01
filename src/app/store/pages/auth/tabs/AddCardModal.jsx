import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Input from "../../../components/common/Input";

const AddCardModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ cardNumber: "", expiry: "", cvv: "", country: "" });
  const [error, setError] = useState('');
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    if (!form.cardNumber.trim() || !form.expiry.trim() || !form.cvv.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    if (onSave) onSave(form);
  };

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto py-10">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/45 " onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-[94%] shadow-xl sm:max-w-[450px] mx-auto overflow-hidden animate-in fade-in zoom-in duration-300 z-10">
        
        {/* Grey header */}
        <div className="bg-[#FAF8F8] px-3.5 pt-5 pb-5 relative border-b border-[#E8E8E8]">
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 text-[#181211] hover:text-[#181211] transition-colors"
          >
            <Icon icon="mdi:close" width={28} height={25} />
          </button>
          <h3 className="text-lg sm:text-2xl font-bold text-[#181211] mb-1">Add New payment method</h3>
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
              placeholder="1234 5678 9012 3456"
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
            {error && <p className="text-xs text-[#E93E2B] font-medium -mt-2">{error}</p>}
            <button onClick={handleSave} className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors mt-1 shadow-[0px_4px_6px_-4px_rgba(233,62,43,0.25),0px_10px_15px_-3px_rgba(233,62,43,0.25)] cursor-pointer">
              Save Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
