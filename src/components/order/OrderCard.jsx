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

const OrderCard = ({ order, onView, onDelete }) => {
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
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-medium ${getStatusColor(
            order.deliveryStatus
          )}`}
        >
          {order.deliveryStatus || "Cancelled"}
        </span>
      </div>

      {/* Customer Info */}
      <div className="mb-3 flex-shrink-0">
        <p className="text-sm font-semibold text-gray-900">{order.customer}</p>
        <p className="text-xs text-gray-600">{order.phone}</p>
        <p className="text-xs text-gray-600">{order.address || "103 lumen"}</p>
      </div>

      {/* Price Details */}
      <div className="space-y-1 mb-3 flex-shrink-0">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Item Price:</span>
          <span className="font-semibold text-gray-900">{order.price}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Promocode:</span>
          <span className="font-semibold text-gray-900">
            {order.couponCode || "N/A"}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Total Price:</span>
          <span className="font-semibold text-gray-900">{order.grandTotal}</span>
        </div>
      </div>

      {/* Payment & Order Details */}
      <div className="space-y-1 mb-3 flex-shrink-0">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Payment Method:</span>
          <span className="font-semibold text-gray-900">{order.paymentMethod}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Payment Status:</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getPaymentStatusColor(
              order.paymentStatus
            )}`}
          >
            {order.paymentStatus}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Order Method:</span>
          <span className="font-semibold text-gray-900">{order.method}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Order Type:</span>
          <span className="font-semibold text-gray-900">{order.type}</span>
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
