import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../components/common/Input';

const Step4FeaturedPaymentModal = ({ isOpen, onClose, onConfirm, plan }) => {
  const [selectedMethod, setSelectedMethod] = React.useState('card');
  const [saveCard, setSaveCard] = React.useState(false);

  if (!isOpen) return null;

  const methods = [
    { id: 'card', label: 'Credit Card', sub: 'Visa, Mastercard, Amex', icon: 'mdi:credit-card-outline' },
    { id: 'paypal', label: 'PayPal', sub: 'Fast and secure', icon: 'mdi:wallet-outline' },
    { id: 'apple', label: 'Apple Pay', sub: 'One-tap payment', icon: 'material-symbols:branding-watermark-outline' },
    { id: 'etransfer', label: 'E-Transfer', sub: 'Direct bank transfer', icon: 'mdi:bank-transfer' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#181211]">Payment Method</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <Icon icon="lucide:x" width="24" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {/* Method Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {methods.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id)}
                className={`flex items-center gap-4 p-4 border-2 transition-all text-left rounded-xl ${selectedMethod === m.id
                  ? 'border-[#E93E2B] bg-[#FFF5F4]'
                  : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedMethod === m.id ? 'border-[#E93E2B]' : 'border-gray-300'}`}>
                  {selectedMethod === m.id && <div className="w-2 h-2 rounded-full bg-[#E93E2B]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#181211]">{m.label}</p>
                  <p className="text-[11px] text-[#64748B]">{m.sub}</p>
                </div>
                <Icon icon={m.icon} className={selectedMethod === m.id ? 'text-[#E93E2B]' : 'text-[#94A3B8]'} width={22} />
              </button>
            ))}
          </div>

          {/* Card Details Section */}
          {selectedMethod === 'card' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <h4 className="font-bold text-[#181211] text-lg">Card Details</h4>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Cardholder Name"
                  placeholder="Alex Johnson"
                  labelClassName="text-xs font-bold text-[#334155]"
                />

                <Input
                  label="Card Number"
                  placeholder="9000 0000 0000 000"
                  labelClassName="text-xs font-bold text-[#334155]"
                  rightIcon={<Icon icon="mdi:lock-outline" className="text-gray-400" width={18} />}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    placeholder="MM/YY"
                    labelClassName="text-xs font-bold text-[#334155]"
                  />
                  <Input
                    label="CVV"
                    placeholder="123"
                    labelClassName="text-xs font-bold text-[#334155]"
                  />
                </div>
              </div>

              {/* Save Card Toggle */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm font-bold text-[#181211]">Save card for future purchases</p>
                  <p className="text-[11px] text-[#64748B]">Your details will be stored securely</p>
                </div>
                <button
                  onClick={() => setSaveCard(!saveCard)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${saveCard ? 'bg-[#E93E2B]' : 'bg-gray-200'}`}
                >
                  <div className={`w-4.5 h-4.5 bg-white rounded-full shadow absolute top-0.75 transition-all ${saveCard ? 'left-5.5' : 'left-1'}`} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-end gap-4 bg-gray-50/50">
          <button
            onClick={onClose}
            className="px-8 py-2.5 text-sm font-bold text-[#475569] hover:text-[#181211] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-10 py-2.5 bg-[#E93E2B] text-white rounded-lg text-sm font-bold shadow-lg shadow-red-200 hover:bg-[#E93E2B]/90 transition-all active:scale-95"
          >
            Pay ${plan?.price}.00
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4FeaturedPaymentModal;
