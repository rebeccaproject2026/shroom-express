import { X } from 'lucide-react';
import Drawer from '../common/Drawer';

const DriversDrawer = ({ isOpen, onClose, drivers = [] }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} width="w-[550px]">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between shrink-0 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Drivers</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
          title="Close"
        >
          <X className="w-6 h-6 text-gray-500 stroke-2" />
        </button>
      </div>

      {/* Drivers List - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-1.5">
        {drivers.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            No drivers assigned
          </div>
        ) : (
          <div className="space-y-5">
            {drivers.map((driver, index) => (
              <div
                key={driver.id || index}
                className="flex items-start gap-3"
              >
                {/* Avatar */}
                <div className="shrink-0 mt-1">
                  {driver.avatar ? (
                    <img
                      src={driver.avatar}
                      alt={driver.name}
                      className="w-11 h-11 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300">
                      <span className="text-gray-600 text-lg font-semibold">
                        {driver.name?.charAt(0)?.toUpperCase() || 'D'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Driver Info */}
                <div className="flex-1 min-w-0">
                  {/* Name + Status inline */}
                  <div className="flex items-baseline gap-2.5 mb-1.5">
                    <span className="text-[16px] font-semibold text-[#212121]">
                      {driver.name || 'Driver Name'}
                    </span>
                    <span
                      className={`text-[15px] font-medium ${driver.isOnline ? 'text-[#00b159]' : 'text-[#f44336]'
                        }`}
                    >
                      {driver.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>

                  {/* Area code chips */}
                  <div className="flex flex-wrap gap-2">
                    {driver.areaCodes?.length > 0 ? (
                      driver.areaCodes.map((code, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-3 py-0.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-sm"
                        >
                          {code} {/* remove spaces if you want M2N3X1 style */}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">No area codes</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default DriversDrawer;