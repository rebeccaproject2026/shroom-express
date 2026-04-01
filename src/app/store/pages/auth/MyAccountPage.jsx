import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import WishlistView from "../../components/account/WishlistView";
import AddressDetailsView from "../../components/account/AddressDetailsView";
import OrderHistoryView from "../../components/account/OrderHistoryView";
import PaymentMethodPanel from "./tabs/PaymentMethodPanel";
import CouponsPanel from "./tabs/CouponsPanel";
import ShroomCashPanel from "./tabs/ShroomCashPanel";
import profile from "../../assets/images/profile.jpg";

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
  {
    key: "coupons",
    label: "My Coupons",
    sub: "Your promo codes & discounts",
    icon: "mdi:ticket-percent-outline",
  },
  {
    key: "shroomcash",
    label: "Shroom's Cash",
    sub: "Your rewards balance",
    icon: "mdi:mushroom-outline",
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
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [orderState, setOrderState] = useState({ order: null, isTracking: false });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    const mode = params.get("mode");
    if (tab) {
      setActiveTab(tab);
      if (window.innerWidth < 1024) setShowMobileDetail(true);
    }
    // Set edit mode from URL
    setEditMode(mode === 'edit' &&(!tab || tab === 'profile'));
  }, [location.search]);

  const toggleEditMode = () => {
    const params = new URLSearchParams(location.search);
    if (!editMode) {
      params.set('mode', 'edit');
      params.set('tab', 'profile');
    } else {
      params.delete('mode');
    }
    navigate({ search: params.toString() }, { replace: true });
  };
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(profile);

  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

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
  // const fileInputRef = useRef(null);
  // const [profileImage, setProfileImage] = useState(profile);

  // const handleAvatarClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  // Sidebar labels mapping for breadcrumbs
  const getBreadcrumbLabel = (key) => {
    if (key === 'orders') return orderState.order ? 'My Orders' : 'Order History';
    return sidebarItems.find(item => item.key === key)?.label || '';
  };

  return (
    <div className={`bg-[#F5F0EB] ${activeTab === 'profile' && editMode ? 'pb-24 lg:pb-0' : ''}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-5 sm:pt-12 md:pt-16 lg:pt-10 pb-5">
        {/* Breadcrumb - Dynamic for all tabs and screens */}
        <div className="flex items-center gap-1.5  text-base mb-4 sm:mb-5">
          <button
            onClick={() => {
              if (orderState.order) setOrderState({ order: null, isTracking: false });
              else if (showMobileDetail) setShowMobileDetail(false);
              else navigate("/store");
            }}
            className="text-[#E93E2B] font-semibold hover:underline"
          >
            Home
          </button>
          <span className="text-[#777777]">/</span>
          <span
            onClick={() => {
              setShowMobileDetail(false);
              setOrderState({ order: null, isTracking: false });
            }}
            className={`font-semibold cursor-pointer ${showMobileDetail || orderState.order ? 'text-[#E93E2B]' : 'text-[#777777]'}`}
          >
            My Account
          </span>
          {/* Third level breadcrumb (Always on desktop, conditional on mobile) */}
          {(window.innerWidth >= 1024 || showMobileDetail) && (
            <div className="flex items-center gap-1.5">
              <span className="text-[#777777]">/</span>
              <span
                onClick={() => setOrderState({ order: null, isTracking: false })}
                className={`font-semibold cursor-pointer ${orderState.order ? 'text-[#E93E2B]' : 'text-[#777777]'}`}
              >
                {getBreadcrumbLabel(activeTab)}
              </span>
            </div>
          )}
          {/* Fourth level breadcrumb for specific Order (Matching Image 2) */}
          {orderState.order && (
            <div className="flex items-center gap-1.5">
              <span className="text-[#777777]">/</span>
              <span className="text-[#777777] font-semibold">
                {orderState.order.orderNo}
              </span>
            </div>
          )}
          {/* Fifth level breadcrumb for Edit Mode */}
          {activeTab === 'profile' && editMode && (
            <div className="flex items-center gap-1.5">
              <span className="text-[#777777]">/</span>
              <span className="text-[#777777] font-semibold">
                Edit Mode
              </span>
            </div>
          )}
        </div>

        {/* Dashboard Header section - Always visible on desktop, hidden on mobile when viewing detail */}
        <div className={`lg:block ${showMobileDetail ? 'hidden lg:block' : 'block'}`}>
          {/* Header card */}
          <div className="lg:bg-white lg:rounded-2xl lg:border lg:border-[#F1F5F9] lg:shadow-sm lg:px-7 lg:py-5 flex items-center justify-between mb-2 lg:mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#181211]">Hi, Frank Nava</h1>
              <p className="text-sm text-[#181211] mt-0.5 opacity-70 lg:opacity-100">
                Your fungi journey continues here.
              </p>
            </div>
            <button
              onClick={() => navigate("/store/login")}
              className="hidden lg:flex items-center gap-2 bg-[#E93E2B] hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              <Icon icon="solar:logout-outline" width="24" height="24" />
              Logout
            </button>
          </div>

          {/* Mobile-Only Activity Card & Quick Links */}
          <div className="lg:hidden flex flex-col gap-4 mb-1">
            {/* Activity Card */}
            <div className="bg-white rounded-lg p-2 border border-[#F1F5F9] shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <Icon icon="fluent:cart-16-regular" className="text-[#E93E2B]" width={28} />
                <span className="text-[11px] font-bold text-[#A0A0BF] tracking-widest uppercase mt-1">Activity</span>
              </div>
              <div>
                <p className="text-[30px] font-bold text-[#181211] leading-none mb-1">12</p>
                <p className="text-base font-medium text-[#181211]">Recent Orders</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#181211] ml-1.5">Quick Links</h2>
          </div>
        </div>

        {/* Main grid - Show sidebar only when NOT in detail on mobile */}
        <div className={`block lg:grid lg:grid-cols-[340px_1fr] bg-transparent lg:bg-white lg:border lg:border-[#F1F5F9] lg:rounded-2xl lg:shadow-sm overflow-hidden mb-10`}>
          {/* Sidebar */}
          <div className={`h-fit p-1 sm:p-3 flex flex-col gap-2.5 ${showMobileDetail ? 'hidden lg:flex' : 'flex'}`}>
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  if (window.innerWidth < 1024) setShowMobileDetail(true);
                }}
                className={`w-full flex items-center gap-3 p-3 text-left rounded-[12px] transition-colors border border-[#F1F5F9]  ${activeTab === item.key
                  ? "bg-[#E93E2B] text-white"
                  : "bg-white hover:bg-[#FFF5F4]"
                  }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activeTab === item.key ? "bg-white/20" : "bg-[#FFF0EE]"
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

          {/* Right panel - Responsive visibility */}
          <div className={`p-3 mr-1 ${showMobileDetail ? 'block' : 'hidden lg:block'}`}>
            {/* Payment Method tab */}
            {activeTab === "payment" && <PaymentMethodPanel />}

            {/* Wishlist tab */}
            {activeTab === 'wishlist' && <WishlistView />}

            {/* Address Details tab */}
            {activeTab === 'address' && <AddressDetailsView />}

            {/* Order History tab */}
            {activeTab === 'orders' && <OrderHistoryView orderState={orderState} setOrderState={setOrderState} />}

            {/* Coupons tab */}
            {activeTab === 'coupons' && <CouponsPanel />}

            {/* Shroom's Cash tab */}
            {activeTab === 'shroomcash' && <ShroomCashPanel onViewOrders={() => setActiveTab('orders')} />}

            {/* Profile tab */}
            {activeTab === 'profile' && <>
              {/* Mobile-Specific Header (Image 475) */}
              <div className="lg:hidden flex items-center gap-5 mt-2 mb-4 px-1">
                <div className="relative w-[100px] h-[100px] shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#F1F5F9]">
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button onClick={handleAvatarClick} className="absolute bottom-0 right-0 w-8 h-8 bg-[#E93E2B] rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <Icon icon="solar:camera-outline" width="18" className="text-white" />
                  </button>
                </div>
                <div>
                  <h2 className="text-[28px] font-bold text-[#181211] leading-tight">Frank Nava</h2>
                  <p className="text-sm text-[#181211] opacity-60 font-medium">Member since March 2024</p>
                </div>
              </div>

              {/* Desktop Avatar header - Hidden on mobile */}
              <div className="hidden lg:flex items-center gap-4 mb-6">
                <div className="relative shrink-0">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="w-20 h-20 rounded-full bg-[#F5E6D0] flex items-center justify-center overflow-hidden border-4 border-[#E93E2B33]">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Icon icon="mdi:account-circle" width={64} className="text-[#C8956C]" />
                    )}
                  </div>
                  <button
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 w-7.5 h-7.5 bg-[#E93E2B] border-2 border-[#E8E8E8] rounded-full flex items-center justify-center p-1"
                  >
                    <Icon icon="boxicons:camera" width="23" height="23" className="text-white" />
                  </button>
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
                      onClick={toggleEditMode}
                      className="bg-[#E93E2B] border-2 border-[#E93E2B] hover:bg-red-600 text-white font-semibold px-8 py-2.5 rounded-md text-sm transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={toggleEditMode}
                      className="border-2 border-[#E93E2B33] text-[#E93E2B] hover:bg-[#FFF0EE] font-semibold px-8 py-2.5 rounded-md text-sm transition-colors bg-white"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Edit Mode row */}
              <div className="flex items-center justify-between mb-2.5 border border-[#E8E8E8] rounded-lg p-5 bg-white shadow-sm">
                <div>
                  <p className="text-[17px] font-bold text-[#181211]">Edit Mode</p>
                  <p className="text-sm text-[#181211] opacity-60 font-medium mt-0.5">
                    Unlock fields to modify info
                  </p>
                </div>
                <button
                  onClick={toggleEditMode}
                  className={`relative w-12 h-7 rounded-full cursor-pointer transition-colors shrink-0 ${editMode ? "bg-[#E93E2B]" : "bg-[#BDBDD2]"}`}
                >
                  <span
                    className={`absolute top-0.5 w-5.5 h-5.5 bg-white rounded-full shadow transition-transform ${editMode ? "translate-x-0" : "-translate-x-5"}`}
                  />
                </button>
              </div>

              {/* Personal Information */}
              <div className="mb-2 border border-[#E8E8E8] rounded-lg py-4 bg-white shadow-sm">
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
              <div className="border border-[#E5DCDC] pt-4 pb-2 rounded-lg mb-2 bg-white shadow-sm">
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
      {/* Sticky Footer Button for Mobile Profile Edit (Overlays Nav effectively) */}
      {activeTab === 'profile' && editMode && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/70 backdrop-blur-xl border-t border-gray-100 px-4 py-2 pt-2 pb-4 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] z-50">
          <button
            onClick={toggleEditMode}
            className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-bold py-4 rounded-2xl text-base shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            Update Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAccountPage;
