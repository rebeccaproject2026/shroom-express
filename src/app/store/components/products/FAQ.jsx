import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const FAQ = ({ faqs = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const defaultFAQs = [
    {
      id: 1,
      question: 'What is Blue Pulaski (Dried)?',
      answer: 'Blue Pulaski (Dried) is a premium dried mushroom strain known for its strong potency and deep blue bruising. It is carefully cultivated and dried to maintain quality, freshness, and consistency for experienced users.',
      isExpanded: true,
    },
    {
      id: 2,
      question: 'How potent is Blue Pulaski?',
      answer: 'Blue Pulaski is known for its high potency levels, making it suitable for experienced users. The exact potency can vary depending on growing conditions and storage. We recommend starting with a lower dose if you are new to this strain.',
      isExpanded: false,
    },
    {
      id: 3,
      question: 'How should I store Blue Pulaski (Dried)?',
      answer: 'Store your Blue Pulaski in a cool, dark, and dry place. Use an airtight container to maintain freshness and prevent moisture absorption. Keep away from direct sunlight and heat sources. Proper storage can extend the shelf life significantly.',
      isExpanded: false,
    },
    {
      id: 4,
      question: 'How long do dried Blue Pulaski mushrooms last?',
      answer: 'When stored properly in an airtight container in a cool, dark place, dried Blue Pulaski mushrooms can last 6-12 months or longer. The exact duration depends on storage conditions and initial quality.',
      isExpanded: false,
    },
    {
      id: 5,
      question: 'Does Shroom Express ship Blue Pulaski discreetly?',
      answer: 'Yes, we ship all orders with discreet, vacuum-sealed packaging. Our packaging contains no external branding or indications of content. All orders are processed securely and shipped with tracking information for your peace of mind.',
      isExpanded: false,
    },
  ];

  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <div className="w-full py-12 bg-[#FAF8F5]">
      {/* Header */}
      <div className="px-10 mb-8">
        <h2 className="text-3xl font-bold text-[#181211] text-center">
          Frequently Ask Questions
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="px-10 max-w-4xl mx-auto">
        <div className="space-y-4">
          {displayFAQs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg border border-[#E5DCDC] overflow-hidden transition-all duration-300"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleExpand(index)}
                className="w-full px-6 py-5 flex items-start justify-between hover:bg-[#FAF8F5] transition-colors text-left"
              >
                {/* Left Icon and Question */}
                <div className="flex items-center gap-4 flex-1">
                  {expandedIndex === index ? (
                    <div className="w-6 h-1 bg-[#E93E2B] rounded-full shrink-0 mt-0.5"></div>
                  ) : (
                    <Icon
                      icon="mdi:plus"
                      width={24}
                      height={24}
                      className="text-[#181211] shrink-0 mt-0.5"
                    />
                  )}
                  <h3 className="text-base font-semibold text-[#181211] leading-tight">
                    {faq.question}
                  </h3>
                </div>
              </button>

              {/* Answer Content */}
              {expandedIndex === index && (
                <div className="px-6 pb-5 pt-0 ml-10">
                  <p className="text-sm text-[#777777] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
