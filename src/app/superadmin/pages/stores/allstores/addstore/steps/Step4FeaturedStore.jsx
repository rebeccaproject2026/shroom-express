import React from 'react';
import { Icon } from '@iconify/react';
import Step4FeaturedPaymentModal from './Step4FeaturedPaymentModal';
import Step4FeaturedSuccess from './Step4FeaturedSuccess';

const FEATURE_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Get discovered faster',
    price: '0',
    features: [
      { text: 'Listed in Featured section', included: true },
      { text: 'Store badge on search results', included: true },
      { text: '1 highlight category slot', included: true },
      { text: 'Top 3 search placement', included: false },
      { text: 'Homepage hero banner', included: false },
      { text: 'Priority customer matching', included: false },
      { text: 'Dedicated account manager', included: false },
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Most popular choice',
    price: '20',
    features: [
      { text: 'Listed in Featured section', included: true },
      { text: 'Store badge on search results', included: true },
      { text: '1 highlight category slot', included: true },
      { text: 'Top 3 search placement', included: true },
      { text: 'Homepage hero banner', included: false },
      { text: 'Priority customer matching', included: false },
      { text: 'Dedicated account manager', included: false },
    ]
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'Maximum visibility',
    price: '50',
    features: [
      { text: 'Listed in Featured section', included: true },
      { text: 'Store badge on search results', included: true },
      { text: '1 highlight category slot', included: true },
      { text: 'Top 3 search placement', included: true },
      { text: 'Homepage hero banner', included: true },
      { text: 'Priority customer matching', included: true },
      { text: 'Dedicated account manager', included: true },
    ]
  }
];

const Step4FeaturedStore = ({ formData, setFormData }) => {
  const [showPayment, setShowPayment] = React.useState(false);
  const [isPlanActive, setIsPlanActive] = React.useState(formData.featuredPlanActive || false);
  const [localSelectedId, setLocalSelectedId] = React.useState(formData.featuredPlan || 'pro');

  // Static data for testing purposes to move to Step 5
  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      productTypes: prev.productTypes?.length > 0 ? prev.productTypes : ['Seeds', 'Flowers'],
      licenseNumber: prev.licenseNumber || 'LIC-TST-001'
    }));
  }, []);

  const handleSelectPlan = (planId) => {
    if (isPlanActive) return;
    setLocalSelectedId(planId);
    setFormData({
      ...formData,
      featuredPlan: planId,
      featuredStore: planId !== 'basic'
    });
  };

  const selectedPlan = FEATURE_PLANS.find(p => p.id === localSelectedId);

  const handleConfirmPayment = () => {
    setFormData({
      ...formData,
      featuredPlanActive: true
    });
    setIsPlanActive(true);
    setShowPayment(false);
  };

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm min-h-[700px] flex flex-col font-manrope">
      {/* Header */}
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="lucide:star" className="text-[#EA3D2A]" width="20" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Featured Store</h3>
            <p className="text-[#181211] text-xs leading-tight">Choose a featured plan to appear at the top of search results and category pages.</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 4 of 5</span>
      </div>

      <div className="flex-1 flex flex-col">
        {isPlanActive ? (
          <Step4FeaturedSuccess
            selectedPlan={selectedPlan}
            onBack={() => setIsPlanActive(false)}
          />
        ) : (
          <>
            <div className="p-5 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {FEATURE_PLANS.map((plan) => {
                  const isSelected = localSelectedId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`relative p-4 border-2 rounded-md cursor-pointer transition-all duration-200 flex flex-col gap-4 ${isSelected
                        ? 'border-[#F04438] bg-[#FEF3F2]'
                        : 'border-[#CBD5E1] bg-white hover:border-gray-300'
                        }`}
                    >
                      <div className={`absolute top-4 right-4 w-7 h-7 rounded-sm flex items-center justify-center transition-all`}>
                        {isSelected ? (
                          <Icon icon="fluent:checkbox-checked-16-filled" className="text-[#E93E2B]" width="25" />
                        ) : (
                          <Icon icon="proicons:checkbox-unchecked" className="text-[#BDBDD2]" width="25" />
                        )}
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-[#1E293B]">{plan.name}</h4>
                        <p className="text-xs font-regular text-[#1E293B]">{plan.tagline}</p>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold text-[#1E293B]">${plan.price}</span>
                        <span className="text-xs font-regular text-[#475569]">/month</span>
                      </div>

                      <div className="space-y-2 mt-1">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Icon
                              icon={feature.included ? "icon-park-solid:check-one" : "material-symbols:circle"}
                              className={feature.included ? "text-[#12B76A]" : "text-[#E2E8F0]"}
                              width="18"
                            />
                            <span className={`text-[13px] leading-tight ${feature.included ? 'text-[#1E293B] font-regular' : 'text-[#475569]'
                              }`}>
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Summary Bar */}
            <div className="p-4   flex flex-col gap-3">
              <div className="flex items-center justify-between border border-[#CBD5E1] bg-[#F8FAFC] p-3 rounded-md">
                <div>
                  <h4 className="text-base font-semibold text-[#1E293B]">{selectedPlan?.name}</h4>
                  <p className="text-xs text-[#1E293B] font-regular">Billed monthly · Cancel anytime · No setup fee</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-base font-semibold text-[#1E293B]">${selectedPlan?.price}</span>
                    <span className="text-xs text-[#475569] font-regular"> /month</span>
                  </div>
                  <button
                    onClick={() => setShowPayment(true)}
                    className="px-5 py-2.5 bg-[#E93E2B] text-white rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#E93E2B33,0px_10px_15px_-3px_#E93E2B33] hover:bg-[#E93E2B]/90 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Buy Feature
                  </button>
                </div>
              </div>

              <button className="text-sm font-semibold text-[#F04438] underline transition-all text-left w-fit">
                Skip for now — I'll feature later
              </button>
            </div>
          </>
        )}
      </div>

      <Step4FeaturedPaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onConfirm={handleConfirmPayment}
        plan={selectedPlan}
      />
    </div>
  );
};

export default Step4FeaturedStore;
