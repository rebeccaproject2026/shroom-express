// OrderActionButtons.jsx - Centralized button configurations for different contexts
import { CircleQuestionMark, RotateCw } from 'lucide-react';
import { Icon } from '@iconify/react';

/**
 * Get action buttons configuration based on context and order status
 * @param {string} context - 'dispatcher' | 'customer' | 'admin' | 'default'
 * @param {string} orderStatus - 'pending' | 'delivered' | 'cancelled' | 'inprogress'
 * @param {object} handlers - Object containing handler functions for each action
 * @returns {JSX.Element} - Action buttons JSX
 */
export const getActionButtons = (context, orderStatus, handlers = {}) => {
  const {
    onChat,
    onComplaint,
    onAssignCollection,
    onCancelOrder,
    onEditOrder,
    onReorder,
  } = handlers;

  // Dispatcher context buttons - status-based
  if (context === 'dispatcher') {
    const dispatcherButtons = {
      // Delivered: Chat Icon, Complaint Icon, Assign Collection, Complaint, Reorder
      delivered: (
        <>
          {onChat && (
            <button
              onClick={onChat}
              className="text-gray-700 rounded-sm transition-colors cursor-pointer hover:bg-gray-100 p-1"
            >
              <Icon icon="fluent:chat-16-regular" style={{ fontSize: "32px", color: "#000" }} />
            </button>
          )}
          {onComplaint && (
            <button
              onClick={onComplaint}
              className="p-2.5 bg-[#FF9800] text-white rounded-sm  transition-colors cursor-pointer"
            >
              <Icon icon="akar-icons:chat-question" className="w-5 h-5" />
            </button>
          )}
          {onAssignCollection && (
            <button
              onClick={onAssignCollection}
              className="px-4 py-2.5 bg-[#0066FF] text-white rounded-sm text-[14px] font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Assign for Collection
            </button>
          )}
          {onComplaint && (
            <button
              onClick={onComplaint}
              className="px-4 py-2.5 bg-[#FF9800] text-white rounded-sm text-[14px] font-semibold transition-colors cursor-pointer"
            >
              Complaint
            </button>
          )}
          {onReorder && (
            <button
              onClick={onReorder}
              className="px-4 py-2.5 bg-[#0066FF] text-white rounded-sm text-[14px] font-semibold hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <RotateCw className='w-4 h-4' />
              Reorder
            </button>
          )}
        </>
      ),
      // In Progress: Chat Icon, Complaint Icon, Assign Collection, Complaint, Edit Order, Cancel Order
      inprogress: (
        <>
          {onChat && (
            <button
              onClick={onChat}
              className="text-gray-700 rounded-sm transition-colors cursor-pointer hover:bg-gray-100 p-1"
            >
              <Icon icon="fluent:chat-16-regular" style={{ fontSize: "32px", color: "#000" }} />
            </button>
          )}
          {onComplaint && (
            <button
              onClick={onComplaint}
              className="p-2.5 bg-[#FF9800] text-white rounded-sm  transition-colors cursor-pointer"
            >
              <Icon icon="akar-icons:chat-question" className="w-5 h-5" />
            </button>
          )}
          {onAssignCollection && (
            <button
              onClick={onAssignCollection}
              className="px-4 py-2.5 bg-[#0066FF] text-white rounded-sm text-[14px] font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Assign for Collection
            </button>
          )}
          {onComplaint && (
            <button
              onClick={onComplaint}
              className="px-4 py-2.5 bg-[#FF9800] text-white rounded-sm text-[14px] font-semibold  transition-colors cursor-pointer"
            >
              Complaint
            </button>
          )}
          {onEditOrder && (
            <button
              onClick={onEditOrder}
              className="px-4 py-2.5 bg-white border-2 border-[#0066FF] text-[#0066FF] rounded-sm text-[14px] font-semibold hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Edit Order
            </button>
          )}
          {onCancelOrder && (
            <button
              onClick={onCancelOrder}
              className="px-4 py-2.5 bg-[#F44336] text-white rounded-sm text-[14px] font-semibold hover:bg-red-600 transition-colors cursor-pointer"
            >
              Cancel Order
            </button>
          )}
        </>
      ),
      // Pending: Chat Icon, Complaint Icon, Assign Collection, Complaint, Cancel Order
      pending: (
        <>
          {onChat && (
            <button
              onClick={onChat}
              className="text-gray-700 rounded-sm transition-colors cursor-pointer hover:bg-gray-100 p-1"
            >
              <Icon icon="fluent:chat-16-regular" style={{ fontSize: "32px", color: "#000" }} />
            </button>
          )}
          {onComplaint && (
            <button
              onClick={onComplaint}
              className="p-2.5 bg-[#FF9800] text-white rounded-sm  transition-colors cursor-pointer"
            >
              <Icon icon="akar-icons:chat-question" className="w-5 h-5" />
            </button>
          )}
          {onAssignCollection && (
            <button
              onClick={onAssignCollection}
              className="px-4 py-2.5 bg-[#0066FF] text-white rounded-sm text-[14px] font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Assign for Collection
            </button>
          )}
          {onComplaint && (
            <button
              onClick={onComplaint}
              className="px-4 py-2.5 bg-[#FF9800] text-white rounded-sm text-[14px] font-semibold  transition-colors cursor-pointer"
            >
              Complaint
            </button>
          )}
          {onCancelOrder && (
            <button
              onClick={onCancelOrder}
              className="px-4 py-2.5 bg-[#F44336] text-white rounded-sm text-[14px] font-semibold hover:bg-red-600 transition-colors cursor-pointer"
            >
              Cancel Order
            </button>
          )}
        </>
      ),
      // Cancelled: Chat Icon, Complaint Icon, Assign Collection, Complaint, Reorder
      cancelled: (
        <>
          {onChat && (
            <button
              onClick={onChat}
              className="text-gray-700 rounded-sm transition-colors cursor-pointer hover:bg-gray-100 p-1"
            >
              <Icon icon="fluent:chat-16-regular" style={{ fontSize: "32px", color: "#000" }} />
            </button>
          )}
          {onComplaint && (
            <button
              onClick={onComplaint}
              className="p-2.5 bg-[#FF9800] text-white rounded-sm transition-colors cursor-pointer"
            >
              <Icon icon="akar-icons:chat-question" className="w-5 h-5" />
            </button>
          )}
          {onAssignCollection && (
            <button
              onClick={onAssignCollection}
              className="px-4 py-2.5 bg-[#0066FF] text-white rounded-sm text-[14px] font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Assign for Collection
            </button>
          )}
          {onComplaint && (
            <button
              onClick={onComplaint}
              className="px-4 py-2.5 bg-[#FF9800] text-white rounded-sm text-[14px] font-semibold  transition-colors cursor-pointer"
            >
              Complaint
            </button>
          )}
          {onReorder && (
            <button
              onClick={onReorder}
              className="px-4 py-2.5 bg-[#0066FF] text-white rounded-sm text-[14px] font-semibold hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <RotateCw className='w-4 h-4' />
              Reorder
            </button>
          )}
        </>
      ),
    };

    return dispatcherButtons[orderStatus] || null;
  }

  // Default context buttons (customer/admin view)
  const defaultButtons = {
    pending: (
      <>
        {onComplaint && (
          <button
            onClick={onComplaint}
            className="px-3 py-2.5 bg-[#FF9800] text-white rounded-sm text-[14px] font-medium transition-colors cursor-pointer flex items-center gap-1"
          >
            <CircleQuestionMark className='w-4 h-4' />
            Complaint
          </button>
        )}
        {onCancelOrder && (
          <button
            onClick={onCancelOrder}
            className="px-3 py-2.5 bg-[#F44336] text-white rounded-sm text-[14px] font-medium hover:bg-red-600 transition-colors cursor-pointer"
          >
            Cancel Order
          </button>
        )}
        {onEditOrder && (
          <button
            onClick={onEditOrder}
            className="px-3 py-2.5 bg-[#E3EEFF] text-[#0066FF] rounded-sm text-[14px] font-medium transition-colors cursor-pointer flex items-center gap-1"
          >
            Edit Order
          </button>
        )}
      </>
    ),
    delivered: (
      <>
        {onComplaint && (
          <button
            onClick={onComplaint}
            className="px-3 py-2.5 bg-[#FF9800] text-white rounded-sm text-[14px] font-medium transition-colors cursor-pointer flex items-center gap-1"
          >
            <CircleQuestionMark className='w-4 h-4' />
            Complaint
          </button>
        )}
        {onReorder && (
          <button
            onClick={onReorder}
            className="px-3 py-2.5 bg-[#0066FF] text-white rounded-sm text-[14px] font-medium hover:bg-blue-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            <RotateCw className='w-4 h-4' />
            Reorder
          </button>
        )}
      </>
    ),
    cancelled: (
      <>
        {onComplaint && (
          <button
            onClick={onComplaint}
            className="px-3 py-2.5 bg-[#FF9800] text-white rounded-sm text-[14px] font-medium transition-colors cursor-pointer flex items-center gap-1"
          >
            <CircleQuestionMark className='w-4 h-4' />
            Complaint
          </button>
        )}
        {onReorder && (
          <button
            onClick={onReorder}
            className="px-3 py-2.5 bg-[#0066FF] text-white rounded-sm text-[14px] font-medium hover:bg-blue-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            <RotateCw className='w-4 h-4' />
            Reorder
          </button>
        )}
      </>
    ),
    inprogress: (
      <>
        {onComplaint && (
          <button
            onClick={onComplaint}
            className="px-3 py-2.5 bg-[#FF9800] text-white rounded-sm text-[14px] font-medium transition-colors cursor-pointer flex items-center gap-1"
          >
            <CircleQuestionMark className='w-4 h-4' />
            Complaint
          </button>
        )}
        {onCancelOrder && (
          <button
            onClick={onCancelOrder}
            className="px-3 py-2.5 bg-[#F44336] text-white rounded-sm text-[14px] font-medium hover:bg-red-600 transition-colors cursor-pointer"
          >
            Cancel Order
          </button>
        )}
        {onEditOrder && (
          <button
            onClick={onEditOrder}
            className="px-3 py-2.5 bg-[#E3EEFF] text-[#0066FF] rounded-sm text-[14px] font-medium transition-colors cursor-pointer"
          >
            Edit Order
          </button>
        )}
      </>
    ),
  };

  return defaultButtons[orderStatus] || null;
};

// Example handler functions that parent components can implement
export const createOrderHandlers = (orderId) => ({
  onChat: () => {
    console.log('Open chat for order:', orderId);
    // TODO: Implement chat functionality
  },
  onComplaint: () => {
    console.log('File complaint for order:', orderId);
    // TODO: Implement complaint functionality
  },
  onAssignCollection: () => {
    console.log('Assign collection for order:', orderId);
    // TODO: Implement assign collection functionality
  },
  onCancelOrder: () => {
    console.log('Cancel order:', orderId);
    // TODO: Implement cancel order API call
  },
  onEditOrder: () => {
    console.log('Edit order:', orderId);
    // TODO: Implement edit order functionality
  },
  onReorder: () => {
    console.log('Reorder:', orderId);
    // TODO: Implement reorder functionality
  },
});
