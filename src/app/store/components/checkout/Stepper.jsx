import React from 'react';
import { Icon } from '@iconify/react';

const steps = [
    { id: 1, label: 'Shopping Cart' },
    { id: 2, label: 'Checkout' },
    { id: 3, label: 'Order Complete' },
];

const Stepper = ({ currentStep }) => {
    return (
        <>
            <div className="flex items-center justify-center mb-4 pt-2 pb-8 sm:py-12">

                {steps.map((step, idx) => (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                            ${currentStep > step.id ? 'bg-[#E93E2B] text-white' :
                                    currentStep === step.id ? 'bg-[#E93E2B] text-white' :
                                        'bg-white border-2 border-[#E8E8E8] text-[#777777]'}`}>
                                {currentStep > step.id
                                    ? <Icon icon="mdi:check" width={20} />
                                    : step.id}
                            </div>
                            <span className={`text-[11px] sm:text-sm mt-2 font-bold whitespace-nowrap ${currentStep === step.id ? 'text-[#E93E2A]' : 'text-[#777777]'}`}>
                                {step.label}
                            </span>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className={`h-1 w-23 sm:w-25 md:w-39 mx-2 sm:mx-4 mb-5 rounded-md ${currentStep > step.id ? 'bg-[#E93E2B]' :
                                'bg-[#E8E8E8]'}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
};

export default Stepper;
