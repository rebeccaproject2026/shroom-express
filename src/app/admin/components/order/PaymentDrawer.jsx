import { useState } from "react";
import { Icon } from "@iconify/react";

/**
 * PaymentDrawer - Reusable payment method drawer component
 * Slides in from the right side with payment-specific content
 * 
 * @param {boolean} isOpen - Controls drawer visibility
 * @param {Function} onClose - Callback when drawer is closed
 * @param {string} paymentMethod - Payment method type: "etransfer" | "creditcard" | "crypto"
 * @param {Function} [onPaymentSent] - Optional callback for E-transfer "Payment Sent" button
 * @param {Function} [onProceedPayment] - Optional callback for Credit Card "Proceed to Payment" button
 * @param {Function} [onCryptoSelect] - Optional callback when crypto option is selected
 * @param {string} [recipientEmail] - Email for E-transfer (default: "ccmail647@gmail.com")
 */
const PaymentDrawer = ({
  isOpen,
  onClose,
  paymentMethod,
  onPaymentSent,
  // onProceedPayment,
  onCryptoSelect,
  recipientEmail = "ccmail647@gmail.com",
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState("");

  if (!isOpen) return null;

  const getTitle = () => {
    switch (paymentMethod) {
      case "etransfer":
        return "Pay Via E-Transfer";
      case "creditcard":
        return "Pay Via Credit Card";
      case "crypto":
        return "Pay Via Crypto";
      default:
        return "Payment";
    }
  };

  const handlePaymentSent = () => {
    if (onPaymentSent) {
      onPaymentSent();
    }
    onClose();
  };

  // const handleProceedPayment = () => {
  //   if (onProceedPayment) {
  //     onProceedPayment();
  //   }
  // };

  const handleCryptoSelect = (cryptoType) => {
    setSelectedCrypto(cryptoType);
    if (onCryptoSelect) {
      onCryptoSelect(cryptoType);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 analytics-backdrop bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className="relative w-full sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[33%] max-w-xl h-full bg-white shadow-xl flex flex-col"
        style={{
          animation: 'slideInRight 0.4s ease-in-out',
        }}
      >

        {/* Header */}
        <div className="bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between shrink-0">
          <h2 className="text-base sm:text-lg font-semibold">{getTitle()}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-blue-500 rounded transition-colors"
            aria-label="Close"
          >
            <Icon icon="mdi:close" className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5">
          {paymentMethod === "etransfer" && (
            <div className="space-y-3 sm:space-y-4">
              <ol className="list-decimal list-inside space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-[#000] leading-relaxed">
                <li>
                  Log into your bank&apos;s online banking or mobile app and navigate to{" "}
                  <span className="font-semibold">E-TRANSFER</span>.
                </li>
                <li>
                  <span className="font-semibold">Add recipient:</span><br /><span className="font-semibold">Name:</span> CC <br /><span className="font-semibold">Email:</span>{" "}
                  <span className="break-all">{recipientEmail}</span>
                </li>
                <li>Select the account you&apos;d like the funds to be sent from.</li>
                <li>
                  In the <span className="font-semibold">Security Question</span> field, enter your{" "}
                  <span className="font-semibold">Order Number</span>.
                </li>
                <li>
                  In the <span className="font-semibold">Password</span> field, enter the{" "}
                  <span className="font-semibold">last four digits of your Order Number</span>.
                </li>
                <li className="font-semibold">
                  Do not mention cannabis or product details in the payment message.
                </li>
                <li>Double-check the email spelling before sending to avoid delays.</li>
                <li>
                  Once payment has been sent, click &apos;<span className="font-semibold">Payment Sent</span>&apos; on our
                  website so we can verify your order.
                </li>
                <li>Your order will be processed and prepared for delivery as soon as the payment is received.</li>
              </ol>
              <button
                type="button"
                onClick={handlePaymentSent}
                className="w-full mt-3 sm:mt-4 px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:check" className="w-4 sm:w-5 h-4 sm:h-5" />
                Payment Sent
              </button>
            </div>
          )}

          {paymentMethod === "creditcard" && (
            <div className="space-y-3 sm:space-y-4">
              <div className="mb-4 sm:mb-6">
                <div className="text-xs sm:text-sm font-bold text-gray-900 mb-1">Click the Button Below</div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Pay securely with Visa, MasterCard, or AMEX. Please enter your details correctly to complete your purchase.
                </p>
              </div>
              {/* <button
                type="button"
                onClick={handleProceedPayment}
                className="w-full mt-4 sm:mt-6 px-3 sm:px-4 py-2.5 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:credit-card-outline" className="w-4 sm:w-5 h-4 sm:h-5" />
                Proceed to Payment
              </button> */}
            </div>
          )}

          {paymentMethod === "crypto" && (
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-1">
                {/* Binance */}
                <button
                  type="button"
                  onClick={() => handleCryptoSelect("binance")}
                  className={`flex flex-col items-center justify-center p-1.5 sm:p-2 h-16 sm:h-20 rounded-sm transition-all cursor-pointer ${selectedCrypto === "binance"
                    ? "border-2 border-black"
                    : "border border-gray-300 hover:border-gray-400"
                    }`}
                >
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-yellow-400 rounded-lg flex items-center justify-center mb-1 sm:mb-2">
                    <span className="text-xl sm:text-2xl font-bold text-black">B</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-900">Binance</span>
                </button>

                {/* Coinbase */}
                <button
                  type="button"
                  onClick={() => handleCryptoSelect("coinbase")}
                  className={`flex flex-col items-center justify-center p-1.5 sm:p-2 h-16 sm:h-20 rounded-sm transition-all cursor-pointer ${selectedCrypto === "coinbase"
                    ? "border-2 border-black"
                    : "border border-gray-300 hover:border-gray-400"
                    }`}
                >
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                    <span className="text-lg sm:text-xl font-bold text-white">C</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-900">Coinbase</span>
                </button>

                {/* Metamask */}
                <button
                  type="button"
                  onClick={() => handleCryptoSelect("metamask")}
                  className={`flex flex-col items-center justify-center p-1.5 sm:p-2 h-16 sm:h-20 rounded-sm transition-all cursor-pointer ${selectedCrypto === "metamask"
                    ? "border-2 border-black"
                    : "border border-gray-300 hover:border-gray-400"
                    }`}
                >
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center mb-1 sm:mb-2">
                    <Icon icon="mdi:wallet" className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-900">Metamask</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDrawer;
