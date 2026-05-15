import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../superadmin/components/common/Input';
import ReusableTableSelect from '../../../../superadmin/components/common/ReusableTableSelect';
import DeliveryCoverageModal from '../../../../superadmin/components/stores/DeliveryCoverageModal';

const Toggle = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#E93E2B]' : 'bg-[#E2E8F0]'}`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </button>
);

const Step3Operations = ({ formData, setFormData }) => {
  const [expandedLocationIndex, setExpandedLocationIndex] = useState(0);
  const [coverageModal, setCoverageModal] = useState({ isOpen: false, type: '', locationIndex: -1 });

  React.useEffect(() => {
    // Initialize first location with default values if empty
    if (formData.locations && formData.locations[0] && (!formData.locations[0].sameDayDayHours || !formData.locations[0].sameDayDayHours.Mon?.status)) {
      const newLocations = [...formData.locations];
      newLocations[0] = {
        ...newLocations[0],
        sameDayDelivery: true,
        sameDayMinAmount: '50.00',
        sameDayFee: '15.00',
        sameDayFreeOver: '120.00',
        sameDayEta: 'Between 1 - 2 hours',
        sameDayDeliveredBy: 'Shroom Express Driver',
        sameDayDayHours: {
          'Mon': { status: '24/7', open: '12:00 am', close: '11:59 pm' },
          'Tue': { status: '24/7', open: '12:00 am', close: '11:59 pm' },
          'Wed': { status: 'custom', open: '09:00 am', close: '09:00 pm' },
          'Thu': { status: '24/7', open: '12:00 am', close: '11:59 pm' },
          'Fri': { status: 'custom', open: '09:00 am', close: '09:00 pm' },
          'Sat': { status: 'closed', open: '', close: '' },
          'Sun': { status: 'closed', open: '', close: '' },
        },
        sameDayCoverage: {
          radius: 60,
          cities: [{ name: 'Toronto', province: 'Ontario' }]
        },
        expressDelivery: false,
        expressMinAmount: '120.00',
        expressFee: '15.00',
        expressEta: 'Under 1 hour',
        expressDeliveredBy: 'Shroom Express Driver',
        expressDayHours: {
          'Mon': { status: '24/7', open: '12:00 am', close: '11:59 pm' },
          'Tue': { status: '24/7', open: '12:00 am', close: '11:59 pm' },
          'Wed': { status: 'custom', open: '10:00 am', close: '08:00 pm' },
          'Thu': { status: '24/7', open: '12:00 am', close: '11:59 pm' },
          'Fri': { status: 'custom', open: '10:00 am', close: '08:00 pm' },
          'Sat': { status: 'closed', open: '', close: '' },
          'Sun': { status: 'closed', open: '', close: '' },
        },
        expressCoverage: {
          radius: 30,
          cities: [{ name: 'Toronto', province: 'Ontario' }]
        },
        shippingMailOrder: false,
        shippingFee: '15.00',
        shippingFreeOver: '120.00',
        shippingEta: 'Between 1 - 3 days',
        shippingCouriers: ['Canada Post', 'Purolator'],
        shippingAreas: ['Ontario', 'Quebec', 'British Columbia'],
        processingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        shippingDayHours: {
          'Mon': { status: '24/7', open: '12:00 am', close: '11:59 pm' },
          'Tue': { status: '24/7', open: '12:00 am', close: '11:59 pm' },
          'Wed': { status: 'custom', open: '09:00 am', close: '05:00 pm' },
          'Thu': { status: '24/7', open: '12:00 am', close: '11:59 pm' },
          'Fri': { status: 'custom', open: '09:00 am', close: '05:00 pm' },
          'Sat': { status: 'closed', open: '', close: '' },
          'Sun': { status: 'closed', open: '', close: '' },
        },
        autoAcceptOrders: true,
      };
      setFormData({ ...formData, locations: newLocations });
    }
  }, []);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const etaOptions = [
    { value: 'Under 1 hour', label: 'Under 1 hour' },
    { value: 'Between 1 - 2 hours', label: 'Between 1 - 2 hours' },
    { value: 'Between 2 - 4 hours', label: 'Between 2 - 4 hours' },
    { value: 'Between 4 - 6 hours', label: 'Between 4 - 6 hours' },
    { value: 'Between 8 - 12 hours', label: 'Between 8 - 12 hours' },
  ];

  const shippingEtaOptions = [
    { value: 'Between 1 - 3 days', label: 'Between 1 - 3 days' },
    { value: 'Between 3 - 5 days', label: 'Between 3 - 5 days' },
    { value: 'Between 5 - 7 days', label: 'Between 5 - 7 days' },
  ];

  const deliveredByOptions = [
    { value: 'Shroom Express Driver', label: 'Shroom Express Driver' },
    { value: 'In House Driver', label: 'In House Driver' },
  ];

  const courierOptions = [
    { value: 'Shroom Express', label: 'Shroom Express' },
    { value: 'Canada Post', label: 'Canada Post' },
    { value: 'Purolator', label: 'Purolator' },
    { value: 'UPS', label: 'UPS' },
    { value: 'FedEx', label: 'FedEx' },
    { value: 'DHL', label: 'DHL' },
    { value: 'Canpar', label: 'Canpar' },
    { value: 'GLS', label: 'GLS' },
    { value: 'Chit Chats', label: 'Chit Chats' },
    { value: 'Stallion', label: 'Stallion' },
    { value: 'Nationex', label: 'Nationex' },
    { value: 'Dragonfly', label: 'Dragonfly' },
    { value: 'Western Canada Express', label: 'Western Canada Express' },
  ];

  const processingDaysOptions = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ];

  const provinceOptions = [
    { value: 'Alberta', label: 'Alberta' },
    { value: 'British Columbia', label: 'British Columbia' },
    { value: 'Manitoba', label: 'Manitoba' },
    { value: 'New Brunswick', label: 'New Brunswick' },
    { value: 'Newfoundland and Labrador', label: 'Newfoundland and Labrador' },
    { value: 'Nova Scotia', label: 'Nova Scotia' },
    { value: 'Northwest Territories', label: 'Northwest Territories' },
    { value: 'Nunavut', label: 'Nunavut' },
    { value: 'Ontario', label: 'Ontario' },
    { value: 'Prince Edward Island', label: 'Prince Edward Island' },
    { value: 'Quebec', label: 'Quebec' },
    { value: 'Saskatchewan', label: 'Saskatchewan' },
    { value: 'Yukon', label: 'Yukon' },
  ];

  const handleLocationUpdate = (locIndex, field, value) => {
    const newLocations = [...formData.locations];
    newLocations[locIndex] = { ...newLocations[locIndex], [field]: value };
    setFormData({ ...formData, locations: newLocations });
  };

  const getBadgeColors = (index) => {
    const colors = [
      { bg: 'bg-[#FFEDEB]', text: 'text-[#E93E2B]' }, // Red/Pink
      { bg: 'bg-[#FFF4E5]', text: 'text-[#FF9F40]' }, // Orange
      { bg: 'bg-[#CDFFE2]', text: 'text-[#219653]' }, // Green
      { bg: 'bg-[#E8F1FF]', text: 'text-[#2F80ED]' }, // Blue
      { bg: 'bg-[#F3E8FF]', text: 'text-[#9B51E0]' }, // Purple
    ];
    return colors[index % colors.length];
  };

  const handleApplyCoverage = (data) => {
    const { type, locationIndex } = coverageModal;
    handleLocationUpdate(locationIndex, `${type}Coverage`, data);
  };

  const removeCityFromCoverage = (locIndex, type, cityName) => {
    const loc = formData.locations[locIndex];
    const currentCoverage = loc[`${type}Coverage`];
    const newCities = currentCoverage.cities.filter(c => c.name !== cityName);
    handleLocationUpdate(locIndex, `${type}Coverage`, { ...currentCoverage, cities: newCities });
  };

  const renderSchedule = (locIndex, prefix) => {
    const loc = formData.locations[locIndex];
    const dayHours = loc[`${prefix}DayHours`] || {};

    const applyPreset = (type) => {
      let newHours = {};

      if (type === 'allWeek') {
        days.forEach((d) => {
          newHours[d] = {
            status: 'custom',
            open: '09:00 am',
            close: '09:00 pm',
          };
        });
      }

      if (type === 'monFri') {
        days.forEach((d) => {
          if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(d)) {
            newHours[d] = {
              status: 'custom',
              open: '09:00 am',
              close: '09:00 pm',
            };
          } else {
            newHours[d] = {
              status: 'closed',
              open: '',
              close: '',
            };
          }
        });
      }

      if (type === '24/7') {
        days.forEach((d) => {
          newHours[d] = {
            status: '24/7',
            open: '12:00 am',
            close: '11:59 pm',
          };
        });
      }

      if (type === 'custom') {
        days.forEach((d) => {
          if (['Mon', 'Tue', 'Thu'].includes(d)) {
            newHours[d] = { status: '24/7', open: '12:00 am', close: '11:59 pm' };
          } else if (['Wed', 'Fri'].includes(d)) {
            newHours[d] = { status: 'custom', open: '09:00 am', close: '09:00 pm' };
          } else {
            newHours[d] = { status: 'closed', open: '', close: '' };
          }
        });
      }

      handleLocationUpdate(locIndex, `${prefix}DayHours`, newHours);
    };

    const setDayStatus = (day, status) => {
      const newHours = { ...dayHours };

      if (status === '24/7') {
        newHours[day] = {
          status: '24/7',
          open: '12:00 am',
          close: '11:59 pm',
        };
      }

      if (status === 'custom') {
        newHours[day] = {
          status: 'custom',
          open: newHours[day]?.open || '09:00 am',
          close: newHours[day]?.close || '09:00 pm',
        };
      }

      if (status === 'closed') {
        newHours[day] = {
          status: 'closed',
          open: '',
          close: '',
        };
      }

      handleLocationUpdate(locIndex, `${prefix}DayHours`, newHours);
    };

    const activePreset = (() => {
      const allDays = Object.keys(dayHours);
      if (allDays.length < 7) return 'custom';

      const is247 = days.every(d => dayHours[d]?.status === '24/7');
      if (is247) return '24/7';

      const isAllWeek9to9 = days.every(d => dayHours[d]?.status === 'custom' && dayHours[d]?.open === '09:00 am' && dayHours[d]?.close === '09:00 pm');
      if (isAllWeek9to9) return 'allWeek';

      const isMonFri9to9 = days.every(d => {
        const h = dayHours[d] || {};
        if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(d)) {
          return h.status === 'custom' && h.open === '09:00 am' && h.close === '09:00 pm';
        }
        return h.status === 'closed';
      });
      if (isMonFri9to9) return 'monFri';

      return 'custom';
    })();

    return (
      <div className="space-y-6 pt-4 border-t border-[#BDBDD2] mt-4 font-manrope">
        {/* Presets */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#181211] flex items-center gap-1">
            Operating Hours <span className="text-[#E93E2B]">*</span>
          </label>
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: 'allWeek', label: 'Mon–Sun 9am–9pm' },
              { id: 'monFri', label: 'Mon–Fri only' },
              { id: '24/7', label: 'Open 24/7 all week' },
              { id: 'custom', label: 'Custom' },
            ].map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={`px-4 py-2 rounded-md border text-[13px] font-semibold transition-all ${activePreset === preset.id
                  ? 'border-[#F04438] text-[#F04438] shadow-sm'
                  : 'border-[#94A3B8] text-[#475569]  bg-white'
                  }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="space-y-3.5">
          {days.map((day) => {
            const hours = dayHours[day] || {};
            const status = hours.status || (
              (hours.open && hours.close)
                ? (hours.open === '12:00 am' && hours.close === '11:59 pm' ? '24/7' : 'custom')
                : 'closed'
            );

            return (
              <div key={day} className="flex flex-col md:flex-row md:items-center gap-3 py-0.5">
                <div className="w-12 text-[15px] font-bold text-[#181211]">{day}</div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDayStatus(day, '24/7')}
                    className={`px-2 py-2.5 rounded-md border text-[13px] font-bold transition-all w-[70px] ${status === '24/7' ? 'bg-[#D1FADF] border-[#12B76A] text-[#12B76A]' : 'bg-white border-[#94A3B8] text-[#475569]'
                      }`}
                  >
                    24/7
                  </button>
                  <button
                    type="button"
                    onClick={() => setDayStatus(day, 'custom')}
                    className={`px-2 py-2.5  rounded-md border text-[13px] font-bold transition-all w-[70px] ${status === 'custom' ? 'bg-[#D1E9FF] border-[#2E90FA] text-[#2E90FA]' : 'bg-white border-[#94A3B8] text-[#475569]'
                      }`}
                  >
                    Custom
                  </button>
                  <button
                    type="button"
                    onClick={() => setDayStatus(day, 'closed')}
                    className={`px-2 py-2.5 rounded-md border text-[13px] font-bold transition-all w-[70px] ${status === 'closed' ? 'bg-[#FEE4E2] border-[#F04438] text-[#F04438]' : 'bg-white border-[#94A3B8] text-[#475569]'
                      }`}
                  >
                    Closed
                  </button>
                </div>

                <div className="flex-1 flex items-center gap-3 min-h-[42px]">
                  {status === '24/7' && (
                    <span className="text-[14px] font-semibold text-[#219653]">
                      Open all day · 12:00 am – 11:59 pm
                    </span>
                  )}

                  {status === 'closed' && (
                    <span className="text-[14px] font-semibold text-[#E93E2B]">
                      Store closed
                    </span>
                  )}

                  {status === 'custom' && (
                    <div className="flex items-center gap-3 animate-in fade-in duration-300">
                      <div className="relative group">
                        <input
                          type="text"
                          placeholder="09:00 am"
                          value={hours.open || '09:00 am'}
                          onChange={(e) => {
                            const newHours = { ...dayHours };
                            newHours[day] = { ...hours, open: e.target.value };
                            handleLocationUpdate(locIndex, `${prefix}DayHours`, newHours);
                          }}
                          className="pl-3 pr-9 py-2.5 border border-[#BDBDD2] rounded-md text-[14px] font-medium text-[#181211] outline-none focus:border-[#E93E2B] transition-all bg-white w-[130px]"
                        />
                        <Icon icon="lucide:clock" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" width="16" />
                      </div>
                      <span className="text-[14px] text-[#64748B] font-semibold">to</span>
                      <div className="relative group">
                        <input
                          type="text"
                          placeholder="09:00 pm"
                          value={hours.close || '09:00 pm'}
                          onChange={(e) => {
                            const newHours = { ...dayHours };
                            newHours[day] = { ...hours, close: e.target.value };
                            handleLocationUpdate(locIndex, `${prefix}DayHours`, newHours);
                          }}
                          className="pl-3 pr-9 py-2 border border-[#BDBDD2] rounded-md text-[14px] font-medium text-[#181211] outline-none focus:border-[#E93E2B] transition-all bg-white w-[130px]"
                        />
                        <Icon icon="lucide:clock" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" width="16" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm min-h-[500px]">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="uil:setting" className="text-[#E93E2B]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Operations & Hours</h3>
            <p className="text-[#181211] text-xs leading-tight">Delivery options, operating hours and order settings per location</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 3 of 5</span>
      </div>

      <div className="p-5 space-y-4">
        {formData.locations.map((loc, locIndex) => {
          const isExpanded = expandedLocationIndex === locIndex;
          const isPrimary = loc.isPrimary;
          const badge = getBadgeColors(locIndex);

          return (
            <div key={locIndex} className={`border border-[#BDBDD2] rounded-md overflow-hidden ${isExpanded ? '' : 'bg-white p-2 flex items-center gap-3'}`}>
              {!isExpanded ? (
                <>
                  <div className={`w-10 h-10 ${badge.bg} rounded-md flex items-center justify-center shrink-0 text-base font-semibold text-[#181211]`}>
                    {locIndex + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[#181211] text-base leading-tight truncate">
                        {loc.city && loc.province ? `${loc.city}, ${loc.province}` : `Store Location`}
                      </h4>
                      {isPrimary && (
                        <span className="px-2 py-[1px] text-[#E93E2B] text-xs font-extrabold rounded-full border-2 border-[#F04438] flex items-center gap-1">
                          <Icon icon="charm:tick" width="14" /> Primary
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-start gap-1.5 text-xs text-[#475569] font-medium leading-tight">
                        <Icon icon="stash:pin-place-duotone" width="15" className="shrink-0" />
                        <span className="truncate">{loc.streetAddress || 'Address not set'}{loc.unitNumber ? `, Unit-${loc.unitNumber}` : ''}, {loc.city}{loc.province ? `, ${loc.province}` : ''}, {loc.country} ({loc.postalCode})</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
                        <div className="flex items-center gap-1.5">
                          <Icon icon="carbon:email" width="15" className="shrink-0" />
                          <span>{loc.storeEmail || 'No email set'}</span>
                        </div>
                        <span className="text-[#CBD5E1]">|</span>
                        <div className="flex items-center gap-1.5">
                          <Icon icon="proicons:call" width="15" className="shrink-0" />
                          <span>{loc.storePhone || 'No phone set'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedLocationIndex(locIndex)}
                    className="p-2 text-[#1E293B] transition-colors"
                  >
                    <Icon icon="iconamoon:edit-light" width="20" />
                  </button>
                </>
              ) : (
                <>
                  <div
                    className="px-4 py-3 bg-[#F8FAFC] border-b border-[#BDBDD2] flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedLocationIndex(-1)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${badge.bg} rounded-md flex items-center justify-center text-base font-semibold text-[#181211] shrink-0`}>
                        {locIndex + 1}
                      </div>
                      <h3 className="text-base font-semibold text-[#181211]">
                        {loc.city && loc.province ? `${loc.city}, ${loc.province}` : `Store Location`}
                      </h3>
                    </div>
                    <Icon
                      icon="lucide:chevron-up"
                      className="text-gray-400"
                      width="20"
                    />
                  </div>

                  <div className="p-5 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-sm font-semibold text-[#181211] block mb-2">Delivery Options <span className="text-[#E93E2B] ml-0.5">*</span></label>

                  {/* Same-Day Delivery */}
                  <div className="border border-[#BDBDD2] mb-2 rounded-md bg-white">
                    <div className="p-4 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold text-[#181211]">Same-Day Delivery</h4>
                        <p className="text-[13px] font-medium text-[#475569]">Orders delivered the same day they are placed</p>
                      </div>
                      <Toggle
                        enabled={loc.sameDayDelivery}
                        onChange={() => handleLocationUpdate(locIndex, 'sameDayDelivery', !loc.sameDayDelivery)}
                      />
                    </div>
                    {loc.sameDayDelivery && (
                      <div className="p-4 pt-0 space-y-4 border-t border-[#BDBDD2] mt-0 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                          <Input
                            label="Minimum Order Amount"
                            placeholder="50.00"
                            leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                            value={loc.sameDayMinAmount}
                            onChange={(e) => handleLocationUpdate(locIndex, 'sameDayMinAmount', e.target.value)}
                            className="!py-2 !border-[#BDBDD2]"
                            labelClassName="text-sm font-semibold text-[#181211]"
                          />
                          <Input
                            label="Fee ($50-$120)"
                            placeholder="15.00"
                            leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                            value={loc.sameDayFee}
                            onChange={(e) => handleLocationUpdate(locIndex, 'sameDayFee', e.target.value)}
                            className="!py-2 !border-[#BDBDD2]"
                            labelClassName="text-sm font-semibold text-[#181211]"
                          />
                          <Input
                            label="Free over"
                            placeholder="120.00"
                            leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                            value={loc.sameDayFreeOver}
                            onChange={(e) => handleLocationUpdate(locIndex, 'sameDayFreeOver', e.target.value)}
                            className="!py-2 !border-[#BDBDD2]"
                            labelClassName="text-sm font-semibold text-[#181211]"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">ETA / Delivery window</label>
                            <ReusableTableSelect
                              value={loc.sameDayEta}
                              onChange={(e) => handleLocationUpdate(locIndex, 'sameDayEta', e.target.value)}
                              options={etaOptions}
                              placeholder="Select ETA / Delivery window..."
                              borderclass="border !border-[#BDBDD2]"
                              showCheckbox={false}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Delivered by</label>
                            <ReusableTableSelect
                              value={loc.sameDayDeliveredBy}
                              onChange={(e) => handleLocationUpdate(locIndex, 'sameDayDeliveredBy', e.target.value)}
                              options={deliveredByOptions}
                              placeholder="Select a Delivered by..."
                              borderclass="border border-[#BDBDD2]"
                              showCheckbox={false}
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Delivery Coverage <span className="text-[#E93E2B] ml-0.5">*</span></label>
                          <div
                            onClick={() => setCoverageModal({ isOpen: true, type: 'sameDay', locationIndex: locIndex })}
                            className="w-full px-4 py-2.5 bg-white border !border-[#BDBDD2] rounded-md text-sm font-medium text-[#181211] outline-none cursor-pointer hover:bg-gray-50 transition-all flex items-center justify-between min-h-[44px]"
                          >
                            <div className="flex flex-wrap gap-2">
                              {loc.sameDayCoverage?.cities?.length > 0 ? (
                                loc.sameDayCoverage.cities.map((city, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FFF0EE] text-[#E93E2B] rounded-md text-[13px] font-bold border border-[#E93E2B]/10">
                                    {city.name}, {city.province} + {loc.sameDayCoverage.radius} mi
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeCityFromCoverage(locIndex, 'sameDay', city.name);
                                      }}
                                      className="hover:opacity-70"
                                    >
                                      <Icon icon="lucide:x" width="14" />
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <span className="text-[#475569]">Click to set cities & radius...</span>
                              )}
                            </div>
                            <Icon icon="mage:location-fill" className="text-[#181211] shrink-0" width="20" />
                          </div>
                        </div>
                        {renderSchedule(locIndex, 'sameDay')}
                      </div>
                    )}
                  </div>

                  {/* Express Delivery */}
                  <div className="border border-[#BDBDD2] mb-2 rounded-md bg-white">
                    <div className="p-4 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold text-[#181211]">Express Delivery</h4>
                        <p className="text-[13px] font-medium text-[#475569]">Priority delivery within 1-2 hours · $15 flat · min $120</p>
                      </div>
                      <Toggle
                        enabled={loc.expressDelivery}
                        onChange={() => handleLocationUpdate(locIndex, 'expressDelivery', !loc.expressDelivery)}
                      />
                    </div>
                    {loc.expressDelivery && (
                      <div className="p-4 pt-0 space-y-4 border-t border-[#BDBDD2] animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                          <Input
                            label="Minimum Order Amount"
                            placeholder="120.00"
                            leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                            value={loc.expressMinAmount}
                            onChange={(e) => handleLocationUpdate(locIndex, 'expressMinAmount', e.target.value)}
                            className="!py-2 !border-[#BDBDD2]"
                            labelClassName="text-sm font-semibold text-[#181211]"
                          />
                          <Input
                            label="Flat delivery fee"
                            placeholder="15.00"
                            leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                            value={loc.expressFee}
                            onChange={(e) => handleLocationUpdate(locIndex, 'expressFee', e.target.value)}
                            className="!py-2 !border-[#BDBDD2]"
                            labelClassName="text-sm font-semibold text-[#181211]"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">ETA / Delivery window</label>
                            <ReusableTableSelect
                              value={loc.expressEta}
                              onChange={(e) => handleLocationUpdate(locIndex, 'expressEta', e.target.value)}
                              options={etaOptions}
                              placeholder="Select ETA / Delivery window..."
                              borderclass="border !border-[#BDBDD2]"
                              showCheckbox={false}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Delivered by</label>
                            <ReusableTableSelect
                              value={loc.expressDeliveredBy}
                              onChange={(e) => handleLocationUpdate(locIndex, 'expressDeliveredBy', e.target.value)}
                              options={deliveredByOptions}
                              placeholder="Select a Delivered by..."
                              borderclass="border border-[#BDBDD2]"
                              showCheckbox={false}
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Delivery Coverage <span className="text-[#E93E2B] ml-0.5">*</span></label>
                          <div
                            onClick={() => setCoverageModal({ isOpen: true, type: 'express', locationIndex: locIndex })}
                            className="w-full px-4 py-2.5 bg-white border !border-[#BDBDD2] rounded-md text-sm font-medium text-[#181211] outline-none cursor-pointer hover:bg-gray-50 transition-all flex items-center justify-between min-h-[44px]"
                          >
                            <div className="flex flex-wrap gap-2">
                              {loc.expressCoverage?.cities?.length > 0 ? (
                                loc.expressCoverage.cities.map((city, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FFF0EE] text-[#E93E2B] rounded-md text-[13px] font-bold border border-[#E93E2B]/10">
                                    {city.name}, {city.province} + {loc.expressCoverage.radius} mi
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeCityFromCoverage(locIndex, 'express', city.name);
                                      }}
                                      className="hover:opacity-70"
                                    >
                                      <Icon icon="lucide:x" width="14" />
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <span className="text-[#475569]">Click to set cities & radius...</span>
                              )}
                            </div>
                            <Icon icon="mage:location-fill" className="text-[#181211] shrink-0" width="20" />
                          </div>
                        </div>
                        {renderSchedule(locIndex, 'express')}
                      </div>
                    )}
                  </div>

                  {/* Shipping */}
                  <div className="border border-[#BDBDD2] mb-2 rounded-md bg-white">
                    <div className="p-4 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold text-[#181211]">Shipping</h4>
                        <p className="text-[13px] font-medium text-[#475569]">Via Canada Post / courier · free over $120 · 2-5 business days</p>
                      </div>
                      <Toggle
                        enabled={loc.shippingMailOrder}
                        onChange={() => handleLocationUpdate(locIndex, 'shippingMailOrder', !loc.shippingMailOrder)}
                      />
                    </div>
                    {loc.shippingMailOrder && (
                      <div className="p-4 pt-0 space-y-4 border-t border-[#BDBDD2] animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                          <Input
                            label="Flat shipping fee"
                            placeholder="15.00"
                            leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                            value={loc.shippingFee}
                            onChange={(e) => handleLocationUpdate(locIndex, 'shippingFee', e.target.value)}
                            className="!py-2 !border-[#BDBDD2]"
                            labelClassName="text-sm font-semibold text-[#181211]"
                          />
                          <Input
                            label="Free over"
                            placeholder="120.00"
                            leftIcon={<span className="text-[#BDBDD2] font-semibold">$</span>}
                            value={loc.shippingFreeOver}
                            onChange={(e) => handleLocationUpdate(locIndex, 'shippingFreeOver', e.target.value)}
                            className="!py-2 !border-[#BDBDD2]"
                            labelClassName="text-sm font-semibold text-[#181211]"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">ETA / Delivery window</label>
                            <ReusableTableSelect
                              value={loc.shippingEta}
                              onChange={(e) => handleLocationUpdate(locIndex, 'shippingEta', e.target.value)}
                              options={shippingEtaOptions}
                              placeholder="Select ETA / Delivery window..."
                              borderclass="border border-[#BDBDD2]"
                              showCheckbox={false}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Shipping couriers</label>
                            <ReusableTableSelect
                              isMulti={true}
                              value={loc.shippingCouriers}
                              onChange={(e) => handleLocationUpdate(locIndex, 'shippingCouriers', e.target.value)}
                              options={courierOptions}
                              placeholder="Select Shipped Couriers..."
                              borderclass="border border-[#BDBDD2]"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Shipping areas <span className="text-[#E93E2B] ml-0.5">*</span></label>
                            <ReusableTableSelect
                              isMulti={true}
                              value={loc.shippingAreas}
                              onChange={(e) => handleLocationUpdate(locIndex, 'shippingAreas', e.target.value)}
                              options={provinceOptions}
                              placeholder="Select Shipping Areas..."
                              borderclass="border border-[#BDBDD2]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Processing days <span className="text-[#E93E2B] ml-0.5">*</span></label>
                            <ReusableTableSelect
                              isMulti={true}
                              value={loc.processingDays}
                              onChange={(e) => handleLocationUpdate(locIndex, 'processingDays', e.target.value)}
                              options={processingDaysOptions}
                              placeholder="Select Processing Days..."
                              borderclass="border border-[#BDBDD2]"
                            />
                          </div>
                        </div>
                        {renderSchedule(locIndex, 'shipping')}
                      </div>
                    )}
                  </div>

                  {/* Store Settings */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-[#181211] block mb-1">Store Settings <span className="text-[#E93E2B] ml-0.5">*</span></label>
                    <div className="border border-[#BDBDD2] rounded-md p-4 transition-all flex items-center justify-between bg-white">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold text-[#181211]">Auto-Accept Orders</h4>
                        <p className="text-[13px] font-medium text-[#475569]">Automatically accept incoming orders without manual approval</p>
                      </div>
                      <Toggle
                        enabled={loc.autoAcceptOrders}
                        onChange={() => handleLocationUpdate(locIndex, 'autoAcceptOrders', !loc.autoAcceptOrders)}
                      />
                    </div>
                  </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <DeliveryCoverageModal
        isOpen={coverageModal.isOpen}
        onClose={() => setCoverageModal({ isOpen: false, type: '', locationIndex: -1 })}
        onApply={handleApplyCoverage}
        initialCities={coverageModal.type && coverageModal.locationIndex !== -1 ? (formData.locations[coverageModal.locationIndex][`${coverageModal.type}Coverage`]?.cities || []) : []}
        initialRadius={coverageModal.type && coverageModal.locationIndex !== -1 ? (formData.locations[coverageModal.locationIndex][`${coverageModal.type}Coverage`]?.radius || 60) : 60}
      />
    </div>
  );
};

export default Step3Operations;
