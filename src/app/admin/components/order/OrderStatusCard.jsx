import React, { useState } from 'react';
import InfoBox from './InfoBox';
import OrderMapSection from './OrderMapSection';
import { getDeliveryBadgeIcon } from '../../utils/orderUtils';
import { CircleCheckBig, CircleQuestionMark, PackageCheck, RotateCw, Truck } from 'lucide-react';
import { Icon } from '@iconify/react';

const OrderStatusCard = ({
  orderData,
  showMap = false,
  showActions = true,
  showPaymentSummary = true,
  type = 'PENDING', // 'pending' | 'delivered' | 'cancelled' | 'inprogress'
  actionButtons = null, // Pass custom action buttons from parent component
}) => {
  // Initialize map visibility based on showMap prop and type
  // By default, show map for inprogress, hide for others
  const [isMapVisible, setIsMapVisible] = useState(showMap && type === 'inprogress');
  // Get color scheme based on type
  const getTypeColors = () => {
    const colors = {
      pending: {
        icon: 'bg-blue-500',
        text: 'text-blue-600',
        bg: 'bg-blue-100',
        dot: 'bg-[#0066FF]',
      },
      delivered: {
        icon: 'bg-green-500',
        text: 'text-green-600',
        bg: 'bg-green-100',
        dot: 'bg-[#00B159]',
      },
      cancelled: {
        icon: 'bg-red-500',
        text: 'text-red-600',
        bg: 'bg-red-100',
        dot: 'bg-[#F44336]',
      },
      inprogress: {
        icon: 'bg-orange-500',
        text: 'text-orange-600',
        bg: 'bg-orange-100',
        dot: 'bg-[#ff9800]',
      },
    };
    return colors[type] || colors.pending;
  };

  const colors = getTypeColors();

  // Get action buttons based on type and page context
  // Render action buttons - use custom if provided, otherwise use defaults
  const renderActionButtons = () => {
    if (!showActions) return null;
    
    // If custom actionButtons provided from parent, use them
    if (actionButtons) {
      return actionButtons;
    }

    // Otherwise, use default buttons based on type
    const defaultButtons = {
      pending: (
        <>
          <button className="px-2 sm:px-3 py-2 sm:py-2.5 bg-[#FF9800] text-white rounded-sm text-xs sm:text-[14px] font-medium  transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap">
            <CircleQuestionMark className='w-3.5 sm:w-4 h-3.5 sm:h-4' />
            <span className="hidden sm:inline">Complaint</span>
          </button>
          <button className="px-2 sm:px-3 py-2 sm:py-2.5 bg-[#F44336] text-white rounded-sm text-xs sm:text-[14px] font-medium hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap">
            <span className="hidden sm:inline">Cancel Order</span>
            <span className="sm:hidden">Cancel</span>
          </button>
          <button className="px-2 sm:px-3 py-2 sm:py-2.5 bg-[#E3EEFF] text-[#0066FF] rounded-sm text-xs sm:text-[14px] font-medium  transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap">
            <span className="hidden sm:inline">Edit Order</span>
            <span className="sm:hidden">Edit</span>
          </button>
        </>
      ),
      delivered: (
        <>
          <button className="px-2 sm:px-3 py-2 sm:py-2.5 bg-[#FF9800] text-white rounded-sm text-xs sm:text-[14px] font-medium  transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap">
            <CircleQuestionMark className='w-3.5 sm:w-4 h-3.5 sm:h-4' />
            <span className="hidden sm:inline">Complaint</span>
          </button>
          <button className="px-2 sm:px-3 py-2 sm:py-2.5 bg-(--color-secondary) text-white rounded-sm text-xs sm:text-[14px] font-medium hover:bg-blue-600 transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap">
            <RotateCw className='w-3.5 sm:w-4 h-3.5 sm:h-4' />
            <span className="hidden sm:inline">Reorder</span>
          </button>
        </>
      ),
      cancelled: (
        <>
          <button className="px-2 sm:px-3 py-2 sm:py-2.5 bg-[#FF9800] text-white rounded-sm text-xs sm:text-[14px] font-medium  transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap">
            <CircleQuestionMark className='w-3.5 sm:w-4 h-3.5 sm:h-4' />
            <span className="hidden sm:inline">Complaint</span>
          </button>
          <button className="px-2 sm:px-3 py-2 sm:py-2.5 bg-(--color-secondary) text-white rounded-sm text-xs sm:text-[14px] font-medium hover:bg-blue-600 transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap">
            <RotateCw className='w-3.5 sm:w-4 h-3.5 sm:h-4' />
            <span className="hidden sm:inline">Reorder</span>
          </button>
        </>
      ),
      inprogress: (
        <>
          <button className="px-2 sm:px-3 py-2 sm:py-2.5 bg-[#FF9800] text-white rounded-sm text-xs sm:text-[14px] font-medium  transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap">
            <CircleQuestionMark className='w-3.5 sm:w-4 h-3.5 sm:h-4' />
            <span className="hidden sm:inline">Complaint</span>
          </button>
          <button className="px-2 sm:px-3 py-2 sm:py-2.5 bg-[#F44336] text-white rounded-sm text-xs sm:text-[14px] font-medium hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap">
            <span className="hidden sm:inline">Cancel Order</span>
            <span className="sm:hidden">Cancel</span>
          </button>
          <button className="px-2 sm:px-3 py-2 sm:py-2.5 bg-[#E3EEFF] text-[#0066FF] rounded-sm text-xs sm:text-[14px] font-medium  transition-colors cursor-pointer whitespace-nowrap">
            <span className="hidden sm:inline">Edit Order</span>
            <span className="sm:hidden">Edit</span>
          </button>
        </>
      ),
    };
    return defaultButtons[type];
  };

  // Get column header based on type
  const getDateColumnHeader = () => {
    if (type === 'delivered') return 'Delivered At';
    if (type === 'cancelled') return 'Cancelled At';
    if (type === 'inprogress') return 'Delivery Date';
    return 'Delivery ETA';
  };

  // Get timeline end icon
  // const getTimelineEndIcon = () => {
  //   if (type === 'delivered') {
  //     return (
  //       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
  //         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  //       </svg>
  //     );
  //   }
  //   if (type === 'cancelled') {
  //     return (
  //       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
  //         <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  //       </svg>
  //     );
  //   }
  //   return null;
  // };

  // Get timeline end text
  const getTimelineEndText = () => {
    if (type === 'delivered') return 'Delivered';
    if (type === 'cancelled') return 'Cancelled by Client';
    if (type === 'inprogress') return 'Approximate Arrival';
    return 'Approximate Arrival';
  };

  // Get status badge text
  const getStatusText = () => {
    if (type === 'delivered') return 'Delivered';
    if (type === 'cancelled') return 'Cancelled by Client';
    if (type === 'inprogress') return 'Order In-progress';
    return 'Rescheduled';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-2 sm:p-4 mb-2 sm:mb-3 shadow-sm">
      {/* Header with Address and Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 pb-1 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 w-full sm:w-auto">
          <img
            src={getDeliveryBadgeIcon(type)}
            width="28"
            height="28"
            alt="Delivery Status"
            className="shrink-0 sm:w-9 sm:h-9"
          />
          <span className="text-xs sm:text-[14.5px] font-semibold text-[#3E3834] break-words">
            {orderData?.address || '123 Main Street, Toronto, ON M5J 2N8'}
          </span>
        </div>
        <div className="flex gap-1.5 sm:gap-2 shrink-0 w-full sm:w-auto overflow-x-auto hide-scrollbar">
          {renderActionButtons()}
        </div>
      </div>

      {/* Cancellation Message (only for cancelled) */}
      {type === 'cancelled' && (
        <div className="bg-red-50 border-l-4 border-red-500 p-2 sm:p-2.5 mb-2 sm:mb-3 rounded text-red-800 text-[11px] sm:text-[13px]">
          This order has been cancelled because {orderData?.cancelReason || 'the requested item is out of stock'}.
        </div>
      )}

      {/* Order Details Table */}
      <div className="mb-2 sm:mb-3 overflow-x-auto -mx-2 sm:mx-0 rounded-sm border border-[#F0F1F3]">
        <table className="w-full border-collapse bg-white min-w-[800px]">
          <thead>
            <tr className="divide-x divide-gray-200 border-b border-[#F0F1F3]">
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-[12.5px] font-semibold text-[#3E3834]">Order ID</th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-[12.5px] font-semibold text-[#3E3834]">Driver</th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-[12.5px] font-semibold text-[#3E3834]">Order Amount</th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-[12.5px] font-semibold text-[#3E3834]">Order Quantity</th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-[12.5px] font-semibold text-[#3E3834]">Order Created</th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-[12.5px] font-semibold text-[#3E3834]">{getDateColumnHeader()}</th>
              {type === 'inprogress' && (
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-[12.5px] font-semibold text-[#3E3834]">Delivery ETA</th>
              )}
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-[12.5px] font-semibold text-[#3E3834]">Order status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F1F3]">
            <tr className="divide-x divide-[#F0F1F3] text-[11px] sm:text-[13.5px] font-medium">
              <td className="py-2 sm:py-3.5 px-2 sm:px-4 text-[11px] sm:text-[13.5px] text-blue-600 font-semibold cursor-pointer hover:underline">
                {orderData?.orderId || '302011'}
              </td>
              <td className="py-2 sm:py-3.5 px-2 sm:px-4  text-blue-600 font-semibold cursor-pointer hover:underline">
                {orderData?.driver || 'Bob Johnson'}
              </td>
              <td className="py-2 sm:py-3.5 px-2 sm:px-4   text-[#212121]">
                ${orderData?.orderAmount || '1325.26'}
              </td>
              <td className="py-2 sm:py-3.5 px-2 sm:px-4  text-[#212121]">
                {orderData?.orderQuantity || '10 Items'}
              </td>
              <td className="py-2 sm:py-3.5 px-2 sm:px-4  text-[#212121]">
                {orderData?.orderCreated || '5 Mar 2024'}
                <br />
                <span className="text-[#212121]-400 text-[10px] sm:text-[11px]">{orderData?.orderCreatedTime || '10:30 pm'}</span>
              </td>
              <td className="py-2 sm:py-3.5 px-2 sm:px-4  text-[#212121]">
                {type === 'delivered' && (orderData?.deliveredAt || '11:30pm, 12 Dec 2024')}
                {type === 'cancelled' && (orderData?.cancelledAt || '11:30pm, 14 Jan 2025')}
                {type === 'inprogress' && (orderData?.deliveryDate || '15 Jan 2025 Today')}
                {type === 'pending' && (
                  <>
                    Approximate Arrival
                    <br />
                    <span className="text-[#212121] text-[10px] sm:text-[12px] mt-1">{orderData?.eta || '11:30pm, Today'}</span>
                  </>
                )}
              </td>
              {type === 'inprogress' && (
                <td className="py-2 sm:py-2.5 px-2 text-[11px] sm:text-[13px] text-[#212121]">
                  Approximate Arrival
                  <br />
                  <span className="text-[#212121] text-[10px] sm:text-[12px]">{orderData?.eta || '11:30 pm'}</span>
                </td>
              )}
              <td className="py-2 sm:py-2.5 px-2">
                <span className={`inline-block px-1.5 sm:px-2 py-0.5 rounded text-[11px] sm:text-[13.5px] font-semibold ${colors.text}`}>
                  {getStatusText()}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Summary Boxes */}
      {showPaymentSummary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-2 sm:mb-3">
          <InfoBox label="Sold Quantity" value={orderData?.soldQuantity || '2.36g'} />
          <InfoBox label="Received Amount" value={`$${orderData?.receivedAmount || '1025.35'}`} />
          <InfoBox label="Unpaid Collection" value={`$${orderData?.unpaidCollection || '1025.35'}`} />
          <InfoBox label="Paid Collection" value={`$${orderData?.paidCollection || '25.35'}`} />
        </div>
      )}

      {/* Timeline Section */}
      <div className="relative mt-3 sm:mt-4">
        <div className="flex items-start justify-between relative px-2 sm:px-0">
          {/* Left Side - Vertical Layout */}
          <div className="flex flex-col items-start relative z-10">
            {/* Icon */}
            <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${colors.dot} shadow-md mt-1`}>
              <PackageCheck className='text-white w-4 sm:w-6 h-4 sm:h-6' />
            </div>

            {/* Title */}
            <div className="text-xs sm:text-base font-semibold text-[#1E1E1E] mt-2 sm:mt-3">
              Delivery Started
            </div>

            {/* Date/Time */}
            <div className="text-[11px] sm:text-[13px] font-medium text-gray-600 mt-1">
              {orderData?.deliveryStarted || '12/14/2024 at 06:53 pm'}
            </div>

            {/* Show/Hide Map Link - Show for ALL order types */}
            <button
              onClick={() => setIsMapVisible(!isMapVisible)}
              className="text-blue-600 cursor-pointer underline text-xs sm:text-[14px] font-medium mt-2 sm:mt-3 hover:text-blue-700"
            >
              {isMapVisible ? 'Hide Map' : 'Show Map'}
            </button>
          </div>

          {/* Dotted Line - Horizontal Center */}
          <div
            className="absolute left-5 sm:left-6 right-5 sm:right-6 top-5 sm:top-6 h-0.5 z-0"
            style={{
              backgroundImage: 'repeating-linear-gradient(to right, #d1d5db 0, #d1d5db 6px, transparent 6px, transparent 12px)'
            }}
          ></div>

          {/* ETA Markers (only for inprogress) */}
          {type === 'inprogress' && (
            <>
              {/* ETA 7 Min Marker */}
              <div className="absolute left-1/3 top-3 sm:top-4 flex flex-col items-center z-10">
                <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-[#FF9800] shadow-md flex items-center justify-center">
                </div>
                <div className="text-[9px] sm:text-[11px] font-semibold text-gray-700 mt-1 sm:mt-1.5">ETA 7 Min</div>
              </div>

              {/* ETA 3 Min Marker */}
              <div className="absolute right-1/3 top-3 sm:top-4 flex flex-col items-center z-10">
                <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-[#FF9800] shadow-md flex items-center justify-center">
                </div>
                <div className="text-[9px] sm:text-[11px] font-semibold text-gray-700 mt-1 sm:mt-1.5">ETA 3 Min</div>
              </div>
            </>
          )}

          {/* Right Side - Vertical Layout */}
          <div className="flex flex-col items-end text-right relative z-10">
            {/* Icon */}
            <div className={`w-8 sm:w-10 h-8 sm:h-10 mt-1 rounded-full flex items-center justify-center shrink-0 ${colors.dot} shadow-md`}>
              {type === 'delivered' ? (
                <CircleCheckBig className='w-4 sm:w-5 h-4 sm:h-5 text-white' />
              ) : type === 'cancelled' ? (
                <svg className="w-5 sm:w-6 h-5 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <CircleCheckBig className='h-4 sm:h-5 w-4 sm:w-5 text-white' />
              )}
            </div>

            {/* Title */}
            <div className="text-xs sm:text-base font-semibold text-[#1E1E1E] mt-2 sm:mt-3">
              {getTimelineEndText()}
            </div>

            {/* Date/Time */}
            <div className="text-[11px] sm:text-[13px] font-medium text-gray-600 mt-1">
              {type === 'delivered' && (orderData?.deliveredTime || '12/14/2024, 08:12 PM')}
              {type === 'cancelled' && (orderData?.cancelledTime || '12/14/2024, 08:12 PM')}
              {(type === 'inprogress' || type === 'pending') && (orderData?.approximateArrival || '12/14/2024, 08:12 PM')}
            </div>
          </div>
        </div>

        {/* Map Section - Show for ALL order types when visible */}
        {isMapVisible && (
          <div className="mt-4 sm:mt-5">
            <OrderMapSection orderData={orderData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusCard;
