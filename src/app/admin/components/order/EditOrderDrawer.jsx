import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Input from '../Input';
import Select from '../Select';

const EditOrderDrawer = ({ isOpen, onClose, orderData, onSave }) => {
  const [formData, setFormData] = useState({
    orderId: '',
    driver: '',
    address: '',
    orderAmount: '',
    orderQuantity: '',
    orderCreated: '',
    orderCreatedTime: '',
    eta: '',
    deliveryDate: '',
    soldQuantity: '',
    receivedAmount: '',
    unpaidCollection: '',
    paidCollection: '',
    deliveryStarted: '',
    approximateArrival: '',
    cancelReason: '',
    type: 'pending',
  });

  // Populate form when orderData changes
  useEffect(() => {
    if (orderData) {
      setFormData({
        orderId: orderData.orderId || '',
        driver: orderData.driver || '',
        address: orderData.address || '',
        orderAmount: orderData.orderAmount || '',
        orderQuantity: orderData.orderQuantity || '',
        orderCreated: orderData.orderCreated || '',
        orderCreatedTime: orderData.orderCreatedTime || '',
        eta: orderData.eta || '',
        deliveryDate: orderData.deliveryDate || '',
        soldQuantity: orderData.soldQuantity || '',
        receivedAmount: orderData.receivedAmount || '',
        unpaidCollection: orderData.unpaidCollection || '',
        paidCollection: orderData.paidCollection || '',
        deliveryStarted: orderData.deliveryStarted || '',
        approximateArrival: orderData.approximateArrival || '',
        cancelReason: orderData.cancelReason || '',
        type: orderData.type || 'pending',
      });
    }
  }, [orderData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({ ...orderData, ...formData });
    }
    onClose();
  };

  const handleCancel = () => {
    // Reset form to original data
    if (orderData) {
      setFormData({
        orderId: orderData.orderId || '',
        driver: orderData.driver || '',
        address: orderData.address || '',
        orderAmount: orderData.orderAmount || '',
        orderQuantity: orderData.orderQuantity || '',
        orderCreated: orderData.orderCreated || '',
        orderCreatedTime: orderData.orderCreatedTime || '',
        eta: orderData.eta || '',
        deliveryDate: orderData.deliveryDate || '',
        soldQuantity: orderData.soldQuantity || '',
        receivedAmount: orderData.receivedAmount || '',
        unpaidCollection: orderData.unpaidCollection || '',
        paidCollection: orderData.paidCollection || '',
        deliveryStarted: orderData.deliveryStarted || '',
        approximateArrival: orderData.approximateArrival || '',
        cancelReason: orderData.cancelReason || '',
        type: orderData.type || 'pending',
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleCancel}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-[500px] bg-white shadow-2xl flex flex-col z-50 border-l border-gray-200 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between shrink-0">
          <h3 className="text-lg font-semibold text-gray-900">Edit Order</h3>
          <button
            onClick={handleCancel}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {/* Order ID (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order ID
              </label>
              <Input
                type="text"
                name="orderId"
                value={formData.orderId}
                disabled
                className="bg-gray-50"
              />
            </div>

            {/* Order Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Status
              </label>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'inprogress', label: 'In Progress' },
                  { value: 'delivered', label: 'Delivered' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]}
              />
            </div>

            {/* Driver */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Driver Name
              </label>
              <Input
                type="text"
                name="driver"
                value={formData.driver}
                onChange={handleChange}
                placeholder="Enter driver name"
              />
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter delivery address"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Order Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Amount ($)
              </label>
              <Input
                type="number"
                step="0.01"
                name="orderAmount"
                value={formData.orderAmount}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            {/* Order Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Quantity
              </label>
              <Input
                type="text"
                name="orderQuantity"
                value={formData.orderQuantity}
                onChange={handleChange}
                placeholder="e.g., 10 Items"
              />
            </div>

            {/* Sold Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sold Quantity
              </label>
              <Input
                type="text"
                name="soldQuantity"
                value={formData.soldQuantity}
                onChange={handleChange}
                placeholder="e.g., 2.36g"
              />
            </div>

            {/* Received Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Received Amount ($)
              </label>
              <Input
                type="number"
                step="0.01"
                name="receivedAmount"
                value={formData.receivedAmount}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            {/* Unpaid Collection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unpaid Collection ($)
              </label>
              <Input
                type="number"
                step="0.01"
                name="unpaidCollection"
                value={formData.unpaidCollection}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            {/* Paid Collection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Paid Collection ($)
              </label>
              <Input
                type="number"
                step="0.01"
                name="paidCollection"
                value={formData.paidCollection}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            {/* ETA / Delivery Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ETA / Delivery Date
              </label>
              <Input
                type="text"
                name="eta"
                value={formData.eta}
                onChange={handleChange}
                placeholder="e.g., 11:30pm, Today"
              />
            </div>

            {/* Approximate Arrival */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Approximate Arrival
              </label>
              <Input
                type="text"
                name="approximateArrival"
                value={formData.approximateArrival}
                onChange={handleChange}
                placeholder="e.g., 12/14/2024, 08:12 PM"
              />
            </div>

            {/* Delivery Started */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Started
              </label>
              <Input
                type="text"
                name="deliveryStarted"
                value={formData.deliveryStarted}
                onChange={handleChange}
                placeholder="e.g., 12/14/2024 at 06:53 pm"
              />
            </div>

            {/* Cancel Reason (if cancelled) */}
            {formData.type === 'cancelled' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cancellation Reason
                </label>
                <textarea
                  name="cancelReason"
                  value={formData.cancelReason}
                  onChange={handleChange}
                  placeholder="Enter cancellation reason"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Footer - Fixed */}
          <div className="px-5 py-4 border-t border-gray-200 flex gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-[#0066FF] text-white rounded-sm text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditOrderDrawer;
