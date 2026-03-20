import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const categories = ["All", "Micro dosing", "Beginner Friendly", "Creative Boost", "Relax & Chill", "Visual Experience", "Focus & Clarity", "Deep Journey"];

const FilterDrawer = ({ open, onClose, onApply }) => {
  const [onSale, setOnSale] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [priceRange, setPriceRange] = useState([25, 150]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.setProperty("overflow", "hidden", "important");
    } else {
      document.body.style.removeProperty("overflow");
    }
    return () => document.body.style.removeProperty("overflow");
  }, [open]);

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), priceRange[1] - 5);
    setPriceRange([val, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), priceRange[0] + 5);
    setPriceRange([priceRange[0], val]);
  };

  const minPct = ((priceRange[0] - 25) / (150 - 25)) * 100;
  const maxPct = ((priceRange[1] - 25) / (150 - 25)) * 100;

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
          <span className="text-base font-bold text-[#E93E2B]">Filter</span>
          <button onClick={onClose} className="text-[#888] hover:text-[#181211] transition-colors">
            <Icon icon="mdi:close" width={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">

          {/* Stock Status */}
          <div>
            <p className="text-xs font-bold text-[#181211] tracking-widest uppercase mb-3">Stock Status</p>
            <div className="flex flex-col gap-2.5">
              {[{ label: "On sale", val: onSale, set: setOnSale }, { label: "In stock", val: inStock, set: setInStock }].map(({ label, val, set }) => (
                <label key={label} className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => set(!val)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${val ? "bg-[#E93E2B] border-[#E93E2B]" : "bg-[#F5F0EB] border-[#E8E8E8]"}`}
                  >
                    {val && <Icon icon="mdi:check" width={12} className="text-white" />}
                  </div>
                  <span className="text-sm text-[#444] font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E8E8E8]" />

          {/* Filter by Price */}
          <div>
            <p className="text-xs font-bold text-[#181211] tracking-widest uppercase mb-4">Filter by Price</p>

            {/* Dual range slider */}
            <div className="relative h-5 mb-2">
              {/* Track */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-[#E8E8E8] rounded-full" />
              {/* Active range */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-[#E93E2B] rounded-full"
                style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
              />
              {/* Min thumb */}
              <input
                type="range" min={25} max={150} value={priceRange[0]}
                onChange={handleMinChange}
                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                style={{ pointerEvents: "auto" }}
              />
              {/* Max thumb */}
              <input
                type="range" min={25} max={150} value={priceRange[1]}
                onChange={handleMaxChange}
                className="absolute w-full h-full opacity-0 cursor-pointer z-20"
              />
              {/* Min circle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#E93E2B] rounded-full shadow pointer-events-none"
                style={{ left: `calc(${minPct}% - 8px)` }}
              />
              {/* Max circle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#E93E2B] rounded-full shadow pointer-events-none"
                style={{ left: `calc(${maxPct}% - 8px)` }}
              />
            </div>

            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-semibold text-[#444]">${priceRange[0]}</span>
              <span className="text-sm font-semibold text-[#444]">${priceRange[1]}</span>
            </div>
          </div>

          <div className="border-t border-[#E8E8E8]" />

          {/* Product Categories */}
          <div>
            <p className="text-xs font-bold text-[#181211] tracking-widest uppercase mb-3">Product Categories</p>
            <div className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${selectedCategory === cat ? "bg-[#E93E2B] border-[#E93E2B]" : "bg-[#F5F0EB] border-[#E8E8E8]"}`}
                  >
                    {selectedCategory === cat && <Icon icon="mdi:check" width={12} className="text-white" />}
                  </div>
                  <span className="text-sm text-[#444] font-medium">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#E8E8E8] flex gap-3">
          <button
            onClick={() => {
              setOnSale(false);
              setInStock(false);
              setPriceRange([25, 150]);
              setSelectedCategory("All");
              if (onApply) onApply({ onSale: false, inStock: false, priceRange: [25, 150], selectedCategory: "All" });
            }}
            className="flex-1 py-2.5 rounded-full border border-[#E8E8E8] text-sm font-semibold text-[#444] hover:bg-[#F5F0EB] transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={() => {
              if (onApply) onApply({ onSale, inStock, priceRange, selectedCategory });
              onClose();
            }}
            className="flex-1 py-2.5 rounded-full bg-[#E93E2B] text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
