import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useStores } from "../../context/StoresContext";

const steps = ["Store Info", "Location & Hours", "Delivery", "Review"];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const defaultHours = DAYS.reduce((acc, d) => {
    acc[d] = { open: "09:00", close: "18:00", closed: d === "Sunday" };
    return acc;
}, {});

const CreateStorePage = () => {
    const navigate = useNavigate();
    const { addStore } = useStores();
    const [step, setStep] = useState(0);
    const logoRef = useRef(null);
    const coverRef = useRef(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        website: "",
        description: "",
        logo: null,
        logoPreview: null,
        cover: null,
        coverPreview: null,
        address: "",
        city: "",
        province: "",
        postalCode: "",
        hours: defaultHours,
        deliveryTypes: [],
        deliveryFee: "",
        minOrder: "",
        estimatedTime: "",
    });

    const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

    const handleImage = (key, previewKey, file) => {
        if (!file) return;
        set(key, file);
        set(previewKey, URL.createObjectURL(file));
    };

    const toggleDelivery = (type) => {
        set("deliveryTypes", form.deliveryTypes.includes(type)
            ? form.deliveryTypes.filter(d => d !== type)
            : [...form.deliveryTypes, type]);
    };

    const toggleDayClosed = (day) => {
        set("hours", { ...form.hours, [day]: { ...form.hours[day], closed: !form.hours[day].closed } });
    };

    const setHour = (day, field, val) => {
        set("hours", { ...form.hours, [day]: { ...form.hours[day], [field]: val } });
    };

    const canNext = () => {
        if (step === 0) return form.name && form.email && form.phone;
        if (step === 1) return form.address && form.city;
        if (step === 2) return form.deliveryTypes.length > 0 && form.estimatedTime;
        return true;
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-10 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-[#0F3540] mb-1">Open Your Store</h1>
                    <p className="text-sm text-[#64748B]">Fill in the details below to list your store on our platform.</p>
                </div>

                {/* Stepper */}
                <div className="flex items-center justify-between mb-10 px-2">
                    {steps.map((label, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center relative">
                            {i < steps.length - 1 && (
                                <div className={`absolute top-4 left-1/2 w-full h-0.5 ${i < step ? 'bg-[#E93E2B]' : 'bg-[#E5DCDC]'}`} />
                            )}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 text-sm font-bold transition-all ${i < step ? 'bg-[#E93E2B] text-white' : i === step ? 'bg-[#E93E2B] text-white ring-4 ring-[#E93E2B]/20' : 'bg-white border-2 border-[#E5DCDC] text-[#94A3B8]'}`}>
                                {i < step ? <Icon icon="mdi:check" width={16} /> : i + 1}
                            </div>
                            <span className={`text-xs mt-1.5 font-semibold ${i === step ? 'text-[#E93E2B]' : 'text-[#94A3B8]'}`}>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] border border-[#F1F5F9] p-8">

                    {/* STEP 0 — Store Info */}
                    {step === 0 && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold text-[#181211]">Store Information</h2>

                            {/* Cover + Logo upload */}
                            <div className="relative mb-6">
                                <div
                                    onClick={() => coverRef.current.click()}
                                    className="w-full h-36 rounded-xl bg-[#F1F5F9] border-2 border-dashed border-[#BDBDD2] flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#E93E2B] transition-colors"
                                >
                                    {form.coverPreview
                                        ? <img src={form.coverPreview} className="w-full h-full object-cover" alt="cover" />
                                        : <div className="flex flex-col items-center gap-1 text-[#94A3B8]">
                                            <Icon icon="mdi:image-plus" width={32} />
                                            <span className="text-xs font-medium">Upload Cover Photo</span>
                                        </div>
                                    }
                                </div>
                                <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={e => handleImage("cover", "coverPreview", e.target.files[0])} />

                                <div
                                    onClick={() => logoRef.current.click()}
                                    className="absolute -bottom-6 left-6 w-16 h-16 rounded-xl bg-white border-2 border-[#E5DCDC] shadow-md flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#E93E2B] transition-colors"
                                >
                                    {form.logoPreview
                                        ? <img src={form.logoPreview} className="w-full h-full object-contain p-1" alt="logo" />
                                        : <Icon icon="mdi:store-plus-outline" width={24} className="text-[#94A3B8]" />
                                    }
                                </div>
                                <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={e => handleImage("logo", "logoPreview", e.target.files[0])} />
                            </div>

                            <div className="pt-4 grid grid-cols-2 gap-4">
                                <Field label="Store Name *" value={form.name} onChange={v => set("name", v)} placeholder="e.g. The Mushroom" />
                                <Field label="Email *" value={form.email} onChange={v => set("email", v)} placeholder="store@email.com" type="email" />
                                <Field label="Phone *" value={form.phone} onChange={v => set("phone", v)} placeholder="(416) 000-0000" />
                                <Field label="Website" value={form.website} onChange={v => set("website", v)} placeholder="www.yourstore.com" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">About Your Store</label>
                                <textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={e => set("description", e.target.value)}
                                    placeholder="Tell customers what makes your store special..."
                                    className="w-full border border-[#BDBDD2] rounded-lg px-4 py-3 text-sm text-[#181211] placeholder:text-[#94A3B8] outline-none focus:border-[#E93E2B] resize-none transition-colors"
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 1 — Location & Hours */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold text-[#181211]">Location & Operating Hours</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <Field label="Street Address *" value={form.address} onChange={v => set("address", v)} placeholder="123 Main St" />
                                </div>
                                <Field label="City *" value={form.city} onChange={v => set("city", v)} placeholder="Toronto" />
                                <Field label="Province" value={form.province} onChange={v => set("province", v)} placeholder="Ontario" />
                                <Field label="Postal Code" value={form.postalCode} onChange={v => set("postalCode", v)} placeholder="M5V 1A1" />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3 block">Operating Hours</label>
                                <div className="space-y-2">
                                    {DAYS.map(day => (
                                        <div key={day} className="flex items-center gap-3">
                                            <span className="w-24 text-sm font-semibold text-[#181211]">{day.slice(0, 3)}</span>
                                            <button
                                                onClick={() => toggleDayClosed(day)}
                                                className={`w-10 h-5 rounded-full transition-colors relative ${form.hours[day].closed ? 'bg-[#E5E7EB]' : 'bg-[#E93E2B]'}`}
                                            >
                                                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form.hours[day].closed ? 'left-0.5' : 'left-5'}`} />
                                            </button>
                                            {form.hours[day].closed
                                                ? <span className="text-xs text-[#94A3B8] font-medium">Closed</span>
                                                : <>
                                                    <input type="time" value={form.hours[day].open} onChange={e => setHour(day, "open", e.target.value)} className="border border-[#BDBDD2] rounded-lg px-3 py-1.5 text-sm text-[#181211] outline-none focus:border-[#E93E2B]" />
                                                    <span className="text-[#94A3B8] text-sm">to</span>
                                                    <input type="time" value={form.hours[day].close} onChange={e => setHour(day, "close", e.target.value)} className="border border-[#BDBDD2] rounded-lg px-3 py-1.5 text-sm text-[#181211] outline-none focus:border-[#E93E2B]" />
                                                </>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 — Delivery */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold text-[#181211]">Delivery Settings</h2>

                            <div>
                                <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3 block">Delivery Types *</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { key: "same-day", label: "Same-day", icon: "mdi:truck-fast-outline" },
                                        { key: "express", label: "Express", icon: "mdi:lightning-bolt-outline" },
                                        { key: "shipping", label: "Nationwide", icon: "mdi:package-variant-closed" },
                                    ].map(({ key, label, icon }) => (
                                        <button
                                            key={key}
                                            onClick={() => toggleDelivery(key)}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${form.deliveryTypes.includes(key) ? 'border-[#E93E2B] bg-[#FFF0EE] text-[#E93E2B]' : 'border-[#E5DCDC] text-[#64748B] hover:border-[#E93E2B]/40'}`}
                                        >
                                            <Icon icon={icon} width={28} />
                                            <span className="text-sm font-semibold">{label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <Field label="Estimated Delivery Time *" value={form.estimatedTime} onChange={v => set("estimatedTime", v)} placeholder="e.g. 1 - 2 Hours" />
                                <Field label="Delivery Fee ($)" value={form.deliveryFee} onChange={v => set("deliveryFee", v)} placeholder="0.00" type="number" />
                                <Field label="Min. Order ($)" value={form.minOrder} onChange={v => set("minOrder", v)} placeholder="0.00" type="number" />
                            </div>
                        </div>
                    )}

                    {/* STEP 3 — Review */}
                    {step === 3 && (
                        <div className="space-y-5">
                            <h2 className="text-lg font-bold text-[#181211]">Review & Submit</h2>

                            {/* Cover preview */}
                            {form.coverPreview && (
                                <div className="relative w-full h-32 rounded-xl overflow-hidden">
                                    <img src={form.coverPreview} className="w-full h-full object-cover" alt="cover" />
                                    {form.logoPreview && (
                                        <div className="absolute bottom-3 left-4 w-14 h-14 rounded-lg bg-white border border-[#E5DCDC] shadow p-1">
                                            <img src={form.logoPreview} className="w-full h-full object-contain" alt="logo" />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <ReviewRow label="Store Name" value={form.name} />
                                <ReviewRow label="Email" value={form.email} />
                                <ReviewRow label="Phone" value={form.phone} />
                                <ReviewRow label="Website" value={form.website || "—"} />
                                <ReviewRow label="Address" value={`${form.address}, ${form.city}`} />
                                <ReviewRow label="Delivery" value={form.deliveryTypes.join(", ") || "—"} />
                                <ReviewRow label="Est. Time" value={form.estimatedTime} />
                                <ReviewRow label="Delivery Fee" value={form.deliveryFee ? `$${form.deliveryFee}` : "Free"} />
                            </div>

                            {form.description && (
                                <div className="bg-[#F8F9FA] rounded-lg p-4">
                                    <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">About</p>
                                    <p className="text-sm text-[#475569]">{form.description}</p>
                                </div>
                            )}

                            <div className="bg-[#FFF0EE] border border-[#E93E2B]/20 rounded-lg p-4 flex gap-3">
                                <Icon icon="mdi:information-outline" width={18} className="text-[#E93E2B] shrink-0 mt-0.5" />
                                <p className="text-xs text-[#E93E2B] font-medium">By submitting, you agree to our store listing terms. Your store will be reviewed before going live.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => step === 0 ? navigate("/store/storeslists") : setStep(s => s - 1)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E5DCDC] bg-white text-[#181211] text-sm font-semibold hover:bg-[#FAF8F5] transition-colors"
                    >
                        <Icon icon="mdi:arrow-left" width={18} />
                        {step === 0 ? "Cancel" : "Back"}
                    </button>

                    <button
                        onClick={() => step === steps.length - 1 ? (addStore(form), navigate("/store/storeslists")) : setStep(s => s + 1)}
                        disabled={!canNext()}
                        className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#E93E2B] text-white text-sm font-semibold hover:bg-[#D53523] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[0px_4px_12px_rgba(233,62,43,0.3)]"
                    >
                        {step === steps.length - 1 ? "Submit Store" : "Continue"}
                        <Icon icon={step === steps.length - 1 ? "mdi:check" : "mdi:arrow-right"} width={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const Field = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div>
        <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">{label}</label>
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full border border-[#BDBDD2] rounded-lg px-4 py-3 text-sm text-[#181211] placeholder:text-[#94A3B8] outline-none focus:border-[#E93E2B] transition-colors bg-white"
        />
    </div>
);

const ReviewRow = ({ label, value }) => (
    <div className="bg-[#F8F9FA] rounded-lg px-4 py-3">
        <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-[#181211] truncate">{value}</p>
    </div>
);

export default CreateStorePage;
