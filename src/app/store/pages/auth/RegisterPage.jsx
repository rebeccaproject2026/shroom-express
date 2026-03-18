import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import RegisterBg from "../../assets/images/registerbg.svg";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/store");
  };

  return (
    <div className="min-h-screen bg-[#F9F6F4] flex items-center justify-center p-6">
      <div className="grid grid-cols-2 w-full max-w-336 rounded-2xl overflow-hidden shadow-xl">
        {/* Left panel — form */}
        <div className=" bg-white p-12 flex flex-col justify-center">
          <h1 className="text-[26px] font-bold text-[#181211] mb-3">
            Create Account
          </h1>
          <p className="text-sm text-[#181211] mb-8 max-w-100 tracking-wide">
            Join our exclusive community for curated cannabis and mushroom
            products.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                Full Name
              </label>
              <div className="flex items-center gap-3 border border-[#E5DCDC] rounded-xl px-4 py-3 bg-white focus-within:border-[#E93E2B] transition-colors">
                <Icon
                  icon="mdi:account-outline"
                  className="text-[#181211] shrink-0"
                  width={18}
                />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="flex-1 text-sm outline-none text-[#181211] placeholder:text-[#BDBDBD] bg-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                Email Address
              </label>
              <div className="flex items-center gap-3 border border-[#E5DCDC] rounded-xl px-4 py-3 bg-white focus-within:border-[#E93E2B] transition-colors">
                <Icon
                  icon="mdi:email-outline"
                  className="text-[#181211] shrink-0"
                  width={18}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="flex-1 text-sm outline-none text-[#181211] placeholder:text-[#BDBDBD] bg-transparent"
                />
              </div>
            </div>

            {/* Password + Confirm Password side by side */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                  Password
                </label>
                <div className="flex items-center gap-3 border border-[#E5DCDC] rounded-xl px-4 py-3 bg-white focus-within:border-[#E93E2B] transition-colors">
                  <Icon
                    icon="mdi:lock-outline"
                    className="text-[#181211] shrink-0"
                    width={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 text-sm outline-none text-[#181211] placeholder:text-[#BDBDBD] bg-transparent min-w-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="text-[#181211]"
                  >
                    <Icon
                      icon={
                        showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"
                      }
                      width={18}
                    />
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                  Confirm Password
                </label>
                <div className="flex items-center gap-3 border border-[#E5DCDC] rounded-xl px-4 py-3 bg-white focus-within:border-[#E93E2B] transition-colors">
                  <Icon
                    icon="mdi:lock-outline"
                    className="text-[#181211] shrink-0"
                    width={18}
                  />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 text-sm outline-none text-[#181211] placeholder:text-[#BDBDBD] bg-transparent min-w-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="text-[#181211]"
                  >
                    <Icon
                      icon={
                        showConfirm ? "mdi:eye-off-outline" : "mdi:eye-outline"
                      }
                      width={18}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Age confirmation checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-[#E5DCDC] accent-[#E93E2B] shrink-0"
              />
              <span className="text-sm text-[#181211] leading-relaxed">
                I confirm that I am <strong>21 years of age or older</strong>{" "}
                and agree to the{" "}
                <button
                  type="button"
                  className="text-[#E93E2B] font-semibold hover:underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-[#E93E2B] font-semibold hover:underline"
                >
                  Privacy Policy.
                </button>
              </span>
            </label>

            {/* Create Account button */}
            <button
              type="submit"
              className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
            >
              Create Account →
            </button>
          </form>

          {/* Login link */}
          <p className="text-sm text-[#181211] text-center mt-5">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/store/login")}
              className="text-[#E93E2B] font-bold cursor-pointer hover:underline"
            >
              Login here
            </button>
          </p>
        </div>

        {/* Right panel — dark olive with bottle image */}
        <div
          className="relative flex flex-col justify-center items-center pb-12 px-12 min-h-157.5"
          style={{
            backgroundImage: `url(${RegisterBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 rounded-none" />
          {/* Frosted info card */}
          <div
            className="relative z-10 w-full border border-[#FFFFFF33] rounded-2xl p-8 top-46"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              Elevate Your Experience
            </h2>
            <p className="text-base text-white/60 font-normal max-w-2/3 leading-relaxed mb-4">
              Access a world-class marketplace designed for the discerning
              connoisseur. Verified growers, premium quality, and secure
              delivery.
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-white font-bold text-2xl">50k+</p>
                <p className="text-white/60 text-xs uppercase tracking-wide">
                  Members
                </p>
              </div>
              <div className="w-0.5 h-8 bg-white/20"></div>
              <div>
                <p className="text-white font-bold text-2xl">4.9/5</p>
                <p className="text-white/60 text-xs uppercase tracking-wide">
                  Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
