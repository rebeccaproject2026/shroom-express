import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import WishlistView from "../../components/account/WishlistView";
import AddressDetailsView from "../../components/account/AddressDetailsView";
import OrderHistoryView from "../../components/account/OrderHistoryView";
import PaymentMethodPanel from "./tabs/PaymentMethodPanel";

const sidebarItems = [
  {
    key: "profile",
    label: "Profile Details",
    sub: "Manage your personal information",
    icon: "mdi:account-outline",
  },
  {
    key: "payment",
    label: "Payment Method",
    sub: "Manage your payment method",
    icon: "streamline-plump:payment-recieve-7",
  },
  {
    key: "wishlist",
    label: "Wishlist",
    sub: "Items you've saved for later",
    icon: "majesticons:heart-line",
  },
  {
    key: "orders",
    label: "Order History",
    sub: "View and track your order history",
    icon: "fluent:cart-16-regular",
  },
  {
    key: "address",
    label: "Address Details",
    sub: "Manage your address details",
    icon: "mdi:map-marker-outline",
  },
];

const PasswordField = ({
  label,
  hint,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
}) => (
  <div>
    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
      {label}{" "}
      {hint && (
        <span className="text-xs font-semibold text-[#18121199]">{hint}</span>
      )}
    </label>
    <div className="flex items-center border border-[#BDBDD2] rounded-lg px-4 py-3 bg-white focus-within:border-[#E93E2B] transition-colors">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 text-sm outline-none text-[#181211] placeholder:text-[#18121199] bg-transparent"
      />
      <button
        type="button"
        onClick={onToggle}
        className="text-[#181211] ml-2"
      >
        <Icon
          icon={show ? "fluent:eye-off-24-filled" : "fluent:eye-48-filled"}
          width={18}
        />
      </button>
    </div>
  </div>
);

const MyAccountPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    firstName: "Jeo",
    lastName: "Deo",
    displayName: "Jeo Deo",
    email: "jeodeo@gmail.com",
  });

  const [passwords, setPasswords] = useState({
    current: "jeodeo@gmail.com",
    newPass: "Jeo Deo",
    confirm: "jeodeo@gmail.com",
  });

  return (
    <div className="min-h-screen bg-[#F5F0EB]">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-base mb-5">
          <button
            onClick={() => navigate("/store")}
            className="text-[#E93E2B] font-semibold hover:underline"
          >
            Home
          </button>
          <span className="text-[#777777]">/</span>
          <span className="text-[#777777] font-semibold">My Account</span>
        </div>

        {/* Header card */}
        <div className="bg-white rounded-2xl border border-[#F1F5F9] shadow-sm px-7 py-5 flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#181211]">Hi, Frank Nava</h1>
            <p className="text-sm text-[#181211] mt-0.5">
              Your fungi journey continues here.
            </p>
          </div>
          <button
            onClick={() => navigate("/store/login")}
            className="flex items-center gap-2 bg-[#E93E2B] hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            <Icon icon="solar:logout-outline" width="24" height="24" />
            Logout
          </button>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-[340px_1fr] bg-white border border-[#F1F5F9] rounded-2xl shadow-sm overflow-hidden">
          {/* Sidebar */}
          <div className="h-fit p-3 flex flex-col gap-2.5">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-3 p-3 text-left rounded-[12px] transition-colors border border-[#F1F5F9]  ${
                  activeTab === item.key
                    ? "bg-[#E93E2B] text-white"
                    : "bg-white hover:bg-[#FFF5F4]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    activeTab === item.key ? "bg-white/20" : "bg-[#FFF0EE]"
                  }`}
                >
                  <Icon
                    icon={item.icon}
                    width={22}
                    className={
                      activeTab === item.key ? "text-white" : "text-[#E93E2B]"
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-base font-bold ${activeTab === item.key ? "text-white" : "text-[#181211]"}`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`text-xs mt-0.5 truncate ${activeTab === item.key ? "text-white" : "text-[#181211]"}`}
                  >
                    {item.sub}
                  </p>
                </div>
                <Icon
                  icon="mdi:chevron-right"
                  width="24"
                  height="24"
                  className={
                    activeTab === item.key ? "text-[#E8E8E8]" : "text-[#A0A0BF]"
                  }
                />
              </button>
            ))}
          </div>

          {/* Right panel */}
          <div className="p-3 mr-1">
            {/* Payment Method tab */}
            {activeTab === "payment" && <PaymentMethodPanel />}

            {/* Wishlist tab */}
            {activeTab === 'wishlist' && <WishlistView />}

            {/* Address Details tab */}
            {activeTab === 'address' && <AddressDetailsView />}

            {/* Order History tab */}
            {activeTab === 'orders' && <OrderHistoryView />}

            {/* Profile tab */}
            {activeTab === 'profile' && <>
            {/* Avatar + name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full bg-[#F5E6D0] flex items-center justify-center overflow-hidden border-4 border-[#E93E2B33]">
                  <Icon
                    icon="mdi:account-circle"
                    width={64}
                    className="text-[#C8956C]"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-7.5 h-7.5 bg-[#E93E2B] border-2 border-[#E8E8E8] rounded-full flex items-center justify-center p-1">
                  <Icon
                    icon="boxicons:camera"
                    width="23"
                    height="23"
                    className="text-white"
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-[#181211]">Frank Nava</p>
                <p className="text-sm text-[#181211]">
                  Member since March 2024
                </p>
              </div>
              {editMode && (
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-[#E93E2B] border-2 border-[#E93E2B] hover:bg-red-600 text-white font-semibold px-8 py-2.5 rounded-md text-sm transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="border-2 border-[#E93E2B33] text-[#E93E2B] hover:bg-[#FFF0EE] font-semibold px-8 py-2.5 rounded-md text-sm transition-colors bg-white"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Edit Mode row */}
            <div className="flex items-center justify-between mb-2.5 border border-[#E8E8E8] rounded-lg p-4">
              <div>
                <p className="text-sm font-bold text-[#181211]">Edit Mode</p>
                <p className="text-xs text-[#181211] font-medium tracking-wide mt-0.5">
                  Unlock fields to modify info
                </p>
              </div>
              <button
                onClick={() => setEditMode((p) => !p)}
                className={`relative w-12 h-7 rounded-full cursor-pointer transition-colors shrink-0 ${editMode ? "bg-[#E93E2B]" : "bg-[#BDBDD2]"}`}
              >
                <span
                  className={`absolute top-0.5 w-5.5 h-5.5 bg-white rounded-full shadow transition-transform ${editMode ? "translate-x-0" : "-translate-x-5"}`}
                />
              </button>
            </div>

            {/* Personal Information */}
            <div className="mb-2.5 border border-[#E8E8E8] rounded-lg py-4">
              <div className="px-4">
                <p className="text-base font-bold text-[#181211]">
                  Personal Information
                </p>
                <p className="text-xs text-[#18121199] font-semibold mb-4 mt-0.5">
                  Manage your profile identity and public information
                </p>
              </div>

              <div className="flex flex-col gap-4 border-t border-[#E8E8E8] py-2.5">
                {/* First + Last name row */}
                <div className="grid grid-cols-2 gap-4 px-3">
                  <div>
                    <label className="text-[15px] font-semibold text-[#181211] mb-1.5 block">
                      Frist name <span className="text-[#E93E2B]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, firstName: e.target.value }))
                      }
                      disabled={!editMode}
                      placeholder="Jeo"
                      className="w-full border border-[#E5DCDC] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[#E93E2B] disabled:bg-white placeholder:text-[#BDBDBD] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[15px] font-semibold text-[#181211] mb-1.5 block">
                      Last name <span className="text-[#E93E2B]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, lastName: e.target.value }))
                      }
                      disabled={!editMode}
                      placeholder="Deo"
                      className="w-full border border-[#E5DCDC] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[#E93E2B] disabled:bg-white placeholder:text-[#BDBDBD] transition-colors"
                    />
                  </div>
                </div>

                {/* Display name */}
                <div className="px-3">
                  <label className="text-[15px] font-semibold text-[#181211] mb-1.5 block">
                    Display name <span className="text-[#E93E2B]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.displayName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, displayName: e.target.value }))
                    }
                    disabled={!editMode}
                    placeholder="Jeo Deo"
                    className="w-full border border-[#E5DCDC] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[#E93E2B] disabled:bg-white placeholder:text-[#BDBDBD] transition-colors"
                  />
                  <p className="text-xs text-[#18121199] mt-1.5">
                    This will be how your name will be displayed in the account
                    section and in reviews
                  </p>
                </div>

                {/* Email */}
                <div className="px-3">
                  <label className="text-[15px] font-semibold text-[#181211] mb-1.5 block">
                    Email address <span className="text-[#E93E2B]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    disabled={!editMode}
                    placeholder="jeodeo@gmail.com"
                    className="w-full border border-[#E5DCDC] rounded-lg px-4 py-3 text-sm text-[#181211] outline-none focus:border-[#E93E2B] disabled:bg-white placeholder:text-[#BDBDBD] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className="border border-[#E5DCDC] pt-4 pb-2 rounded-lg mb-2">
              <div className="px-3 mr-1 flex items-center justify-between border-b border-[#E5DCDC]">
                <div className="flex flex-col mb-1">
                  <p className="text-base font-bold text-[#181211]">
                    Password Change
                  </p>
                  <p className="text-xs font-semibold text-[#18121199] mb-4">
                    Update your password to keep your account secure
                  </p>
                </div>
                <span className="text-xs font-bold text-[#E93E2B] tracking-wider uppercase bg-[#E93E2B0D] px-3 py-1.5 rounded-md">
                  HIGH SECURITY
                </span>
              </div>

              <div className="flex flex-col gap-4 px-3 py-2.5">
                <PasswordField
                  label="Current password"
                  hint="(leave blank to leave unchanged)"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, current: e.target.value }))
                  }
                  show={showCurrent}
                  onToggle={() => setShowCurrent((p) => !p)}
                  placeholder="jeodeo@gmail.com"
                />
                <PasswordField
                  label="New password"
                  hint="(leave blank to leave unchanged)"
                  value={passwords.newPass}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, newPass: e.target.value }))
                  }
                  show={showNew}
                  onToggle={() => setShowNew((p) => !p)}
                  placeholder="Jeo Deo"
                />
                <PasswordField
                  label="Confirm new password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, confirm: e.target.value }))
                  }
                  show={showConfirm}
                  onToggle={() => setShowConfirm((p) => !p)}
                  placeholder="jeodeo@gmail.com"
                />
              </div>
            </div>
            </>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
