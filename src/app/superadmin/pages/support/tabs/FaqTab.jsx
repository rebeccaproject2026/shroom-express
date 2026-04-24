import React, { useState } from "react";
import { Icon } from "@iconify/react";

const CATEGORIES = [
    { id: 'stores', label: 'Stores', icon: 'streamline:shopping-store-2-store-shop-shops-stores' },
    { id: 'finance', label: 'Finance', icon: 'material-symbols:finance-mode-rounded' },
    { id: 'drivers', label: 'Drivers', icon: 'healthicons:truck-driver' },
    { id: 'marketing', label: 'Marketing', icon: 'nimbus:marketing' },
    { id: 'inventory', label: 'Inventory', icon: 'material-symbols:inventory-rounded' },
];

const FAQS = [
    {
        question: "What's the pack weight rule for products?",
        answer: "Every product pack must weigh between 30gm (minimum) and 70gm (maximum). This is enforced at product creation.",
        tag: "Inventory"
    },
    {
        question: "How do I create a promo code?",
        answer: "To create a promo code, navigate to the Marketing section, click on 'Campaigns', and select 'New Promo Code'. You can set usage limits and expiry dates there.",
        tag: "Inventory"
    },
    {
        question: "How do I suspend a driver?",
        answer: "In the Driver Management panel, search for the driver's profile, click on 'Actions' and select 'Suspend Account'. You will be asked to provide a reason for suspension.",
        tag: "Inventory"
    },
    {
        question: "How does platform commission work?",
        answer: "The platform takes a base commission of 15% on each transaction. Special rates can be applied to specific store categories or promotional periods.",
        tag: "Inventory"
    },
    {
        question: "How do I add a new store to the platform?",
        answer: "Navigate to the Stores section and click the 'Add New' button. You'll need to provide store details, merchant contact information, and upload necessary documentation.",
        tag: "Inventory"
    },
];

const CategoryCard = ({ icon, label, isActive, onClick }) => (
    <div
        onClick={onClick}
        className={`flex-1 min-w-[140px] p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer flex  shadow-[0px_1px_2px_0px_#0000000D] flex-col items-center justify-center gap-4 group
        ${isActive
                ? "border-[#EA3D2A] bg-[#FFEDEB]"
                : "border-[#475569] bg-[#F8F8F8]"}`}
    >
        <div className={`transition-all duration-300 ${isActive ? "text-[#EA3D2A] scale-110" : "text-[#475569] group-hover:text-[#475569]"}`}>
            <Icon icon={icon} width="32" />
        </div>
        <span className={`text-base font-semibold transition-colors ${isActive ? "text-[#181211]" : "text-[#475569] group-hover:text-[#475569]"}`}>
            {label}
        </span>
    </div>
);

const FaqItem = ({ question, answer, tag, isOpen, onClick }) => (
    <div className={`bg-white border-2 border-[#E2E8F0] rounded-sm overflow-hidden transition-all duration-300 `}>
        <button
            onClick={onClick}
            className="w-full px-6 pt-4 flex items-center justify-between gap-4 text-left group"
        >
            <div className="flex items-center gap-5">
                <div className={`w-6 h-6 flex items-center justify-center rounded-sm transition-all duration-300 ${isOpen ? "text-[#EA3D2A] rotate-180" : "text-[#181211]"}`}>
                    <Icon icon={isOpen ? "lucide:minus" : "lucide:plus"} width="20" className="stroke-[3]" />
                </div>
                <h4 className={`text-base font-semibold transition-colors text-[#181211]`}>{question}</h4>
            </div>
            <span className="px-3 py-1 rounded-full border-2 border-[#0066FF] bg-[#DAE9FF] text-[#0066FF] text-xs font-semibold tracking-wider shrink-0">
                {tag}
            </span>
        </button>
        <div
            className={`px-6 pt-3 transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0"}`}
        >
            <p className="text-[14px] font-medium text-[#475569] leading-relaxed pl-11 pr-20">
                {answer}
            </p>
        </div>
    </div>
);

const FaqTab = () => {
    const [activeCategory, setActiveCategory] = useState('inventory');
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 font-manrope">
            {/* ── Category Navigation ── */}
            <div className="flex flex-wrap gap-5">
                {CATEGORIES.map((cat) => (
                    <CategoryCard
                        key={cat.id}
                        {...cat}
                        isActive={activeCategory === cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                    />
                ))}
            </div>

            {/* ── FAQ Accordion ── */}
            <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                    <FaqItem
                        key={idx}
                        {...faq}
                        isOpen={openIndex === idx}
                        onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FaqTab;
