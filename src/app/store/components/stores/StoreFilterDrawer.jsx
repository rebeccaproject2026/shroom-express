import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const deliveryOptions = ["All", "Same-day Delivery", "Express Delivery"];
const ratingOptions = ["All", "5.0", "4.5+", "4.0+"];

const StoreFilterDrawer = ({ open, onClose, onApply }) => {
  const [selectedDelivery, setSelectedDelivery] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [isPrimary, setIsPrimary] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.setProperty("overflow", "hidden", "important");
    } else {
      document.body.style.removeProperty("overflow");
    }
    return () => document.body.style.removeProperty("overflow");
  }, [open]);

  const handleReset = () => {
    setSelectedDelivery("All");
    setSelectedRating("All");
    setIsPrimary(false);
    if (onApply) onApply({ selectedDelivery: "All", selectedRating: "All", isPrimary: false });
  };

  const handleApply = () => {
    if (onApply) onApply({ selectedDelivery, selectedRating, isPrimary });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 top-[250px] z-40 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-[273px] left-0 z-50 bottom-0 w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E8]">
          <span className="text-base font-bold text-[#E93E2B]">Filter Stores</span>
          <button onClick={onClose} className="text-[#888] hover:text-[#181211] transition-colors">
            <Icon icon="mdi:close" width={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">

          {/* Featured / Primary */}
          <div>
            <p className="text-xs font-bold text-[#181211] tracking-widest uppercase mb-3">Store Type</p>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setIsPrimary(p => !p)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${isPrimary ? "bg-[#E93E2B] border-[#E93E2B]" : "bg-[#F5F0EB] border-[#E8E8E8]"}`}
              >
                {isPrimary && <Icon icon="mdi:check" width={12} className="text-white" />}
              </div>
              <span className="text-sm text-[#444] font-medium">Featured / Primary only</span>
            </label>
          </div>

          <div className="border-t border-[#E8E8E8]" />

          {/* Delivery Type */}
          <div>
            <p className="text-xs font-bold text-[#181211] tracking-widest uppercase mb-3">Delivery Type</p>
            <div className="flex flex-col gap-2.5">
              {deliveryOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setSelectedDelivery(opt)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${selectedDelivery === opt ? "bg-[#E93E2B] border-[#E93E2B]" : "bg-[#F5F0EB] border-[#E8E8E8]"}`}
                  >
                    {selectedDelivery === opt && <Icon icon="mdi:check" width={12} className="text-white" />}
                  </div>
                  <span className="text-sm text-[#444] font-medium">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E8E8E8]" />

          {/* Rating */}
          <div>
            <p className="text-xs font-bold text-[#181211] tracking-widest uppercase mb-3">Minimum Rating</p>
            <div className="flex flex-col gap-2.5">
              {ratingOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setSelectedRating(opt)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${selectedRating === opt ? "bg-[#E93E2B] border-[#E93E2B]" : "bg-[#F5F0EB] border-[#E8E8E8]"}`}
                  >
                    {selectedRating === opt && <Icon icon="mdi:check" width={12} className="text-white" />}
                  </div>
                  <span className="text-sm text-[#444] font-medium">{opt === "All" ? "All ratings" : `${opt} ★`}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#E8E8E8] flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-2.5 rounded-full border border-[#E8E8E8] text-sm font-semibold text-[#444] hover:bg-[#F5F0EB] transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2.5 rounded-full bg-[#E93E2B] text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default StoreFilterDrawer;
