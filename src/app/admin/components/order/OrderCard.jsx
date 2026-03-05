import { Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const getStatusColor = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "delivered") return "bg-green-100 text-green-700";
  if (s === "in-transit") return "bg-blue-100 text-blue-700";
  if (s === "shipped") return "bg-purple-100 text-purple-700";
  if (s === "processing") return "bg-orange-100 text-orange-700";
  if (s === "ordered") return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-700";
};

const getPaymentStatusColor = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "paid") return "bg-green-100 text-green-700";
  if (s === "pending") return "bg-amber-100 text-amber-700";
  if (s === "cancelled") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-700";
};

const OrderCard = ({ order, onView, onDelete, onCustomerClick, onCourierClick, onPaymentMethodClick, onStatusClick }) => {
  const isPaymentMethodLink =
    order.paymentMethod === "Credit Card" ||
    order.paymentMethod === "Paypal" ||
    order.paymentMethod === "PayPal";

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-3 shadow-sm flex flex-col h-full">
      {/* Header: Order ID and Status */}
      <div className="flex items-start justify-between mb-3 flex-shrink-0">
        <Link
          to={`/orders/${order.orderId}`}
          className="text-blue-600 hover:underline font-semibold text-base"
        >
          {order.orderId}
        </Link>
        <button
          onClick={() => onStatusClick?.(order)}
          className={`px-2 py-1 rounded-full text-[10px] font-medium cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(
            order.deliveryStatus
          )}`}
        >
          {order.deliveryStatus || "Cancelled"}
        </button>
      </div>

      {/* Customer Info - Clickable */}
      <div className="mb-3 flex-shrink-0">
        <button
          onClick={() => onCustomerClick?.(order)}
          className="text-sm font-semibold text-blue-600 hover:underline text-left"
        >
          {order.customer}
        </button>
        <p className="text-xs text-gray-600">{order.phone}</p>
      </div>

      {/* Order Details Grid */}
      <div className="space-y-2 mb-3 flex-shrink-0">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Price:</span>
          <span className="font-semibold text-gray-900">{order.price}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">CA$H:</span>
          <span className="font-semibold text-gray-900">{order.cash}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Coupon Code:</span>
          <span className="font-semibold text-gray-900">{order.couponCode || "N/A"}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Coupon Amount:</span>
          <span className="font-semibold text-gray-900">{order.couponAmount || "N/A"}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Courier:</span>
          <button
            onClick={() => onCourierClick?.(order)}
            className="font-semibold text-blue-600 hover:underline text-right"
          >
            {order.courier}
          </button>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Courier Tips:</span>
          <span className="font-semibold text-gray-900">{order.courierTips}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Grand Total:</span>
          <span className="font-semibold text-gray-900">{order.grandTotal}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Saved:</span>
          <span className="font-semibold text-green-600">{order.savedText}</span>
        </div>
      </div>

      {/* Payment & Order Details */}
      <div className="space-y-2 mb-3 flex-shrink-0">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Payment Method:</span>
          {isPaymentMethodLink ? (
            <button
              onClick={() => onPaymentMethodClick?.(order)}
              className="font-semibold text-blue-600 hover:underline text-right"
            >
              {order.paymentMethod}
            </button>
          ) : (
            <span className="font-semibold text-gray-900">{order.paymentMethod}</span>
          )}
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Payment Status:</span>
          <button
            onClick={() => onPaymentMethodClick?.(order)}
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium cursor-pointer hover:opacity-80 transition-opacity ${getPaymentStatusColor(
              order.paymentStatus
            )}`}
          >
            {order.paymentStatus}
          </button>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Method:</span>
          <span className="font-semibold text-gray-900">{order.method}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Type:</span>
          <span className="font-semibold text-gray-900">{order.type}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">City/Province:</span>
          <span className="font-semibold text-gray-900">{order.city}, {order.province}</span>
        </div>
      </div>

      {/* Date & Time */}
      <div className="mb-3 pb-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Date:</span>
          <span className="font-semibold text-gray-900">{order.date}</span>
        </div>
        <div className="flex justify-end text-xs mt-0.5">
          <span className="font-semibold text-gray-900">{order.time}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-auto flex-shrink-0">
        <button
          onClick={() => onDelete?.(order)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600 transition-colors text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
        <button
          onClick={() => onView?.(order)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
      </div>
    </div>
  );
};

export default OrderCard;