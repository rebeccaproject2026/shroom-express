import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

if (typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== 'undefined') {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const DeliveryCoverageModal = ({ isOpen, onClose, onApply, initialCities = [], initialRadius = 60 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCities, setSelectedCities] = useState(initialCities);
  const [radius, setRadius] = useState(initialRadius);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const canadianCities = [
    { name: 'Calgary', province: 'AB', lat: 51.0447, lng: -114.0719 },
    { name: 'Edmonton', province: 'AB', lat: 53.5461, lng: -113.4938 },
    { name: 'Vancouver', province: 'BC', lat: 49.2827, lng: -123.1207 },
    { name: 'Toronto', province: 'ON', lat: 43.6532, lng: -79.3832 },
    { name: 'Ottawa', province: 'ON', lat: 45.4215, lng: -75.6972 },
    { name: 'Montreal', province: 'QC', lat: 45.5017, lng: -73.5673 },
    { name: 'Winnipeg', province: 'MB', lat: 49.8951, lng: -97.1384 },
    { name: 'Halifax', province: 'NS', lat: 44.6488, lng: -63.5752 },
    { name: 'Cambridge', province: 'ON', lat: 43.3616, lng: -80.3144 },
    { name: 'Coquitlam', province: 'BC', lat: 49.2838, lng: -122.7932 },
    { name: 'Charlottetown', province: 'PE', lat: 46.2382, lng: -63.1311 },
    { name: 'Corner Brook', province: 'NL', lat: 48.9514, lng: -57.9472 },
  ];

  const filteredCities = searchQuery.length > 0
    ? canadianCities.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (!token) return;

    // Default center (Toronto or first selected city)
    const center = selectedCities.length > 0
      ? [selectedCities[0].lng, selectedCities[0].lat]
      : [-79.3832, 43.6532];

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: center,
      zoom: 9,
    });

    mapRef.current.on('load', () => {
      updateMapLayers();
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    if (mapRef.current?.loaded()) {
      updateMapLayers();
    }
  }, [selectedCities, radius]);

  const updateMapLayers = () => {
    if (!mapRef.current) return;

    // Clear existing marker if any
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }

    // Clear existing source/layer
    if (mapRef.current.getLayer('radius-layer')) mapRef.current.removeLayer('radius-layer');
    if (mapRef.current.getLayer('radius-outline')) mapRef.current.removeLayer('radius-outline');
    if (mapRef.current.getSource('radius-source')) mapRef.current.removeSource('radius-source');

    if (selectedCities.length === 0) return;

    const city = selectedCities[0];

    // Custom Marker Element (Pin with white dot)
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.innerHTML = `
      <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="#EA3D2A" />
          <circle cx="12" cy="10" r="3" fill="white" />
        </svg>
      </div>
    `;

    markerRef.current = new mapboxgl.Marker({ element: el })
      .setLngLat([city.lng, city.lat])
      .addTo(mapRef.current);

    // Create a circle
    const center = [city.lng, city.lat];
    const radiusInKm = radius * 1.60934; // Convert miles to km
    const circleData = createGeoJSONCircle(center, radiusInKm);

    mapRef.current.addSource('radius-source', {
      type: 'geojson',
      data: circleData,
    });

    mapRef.current.addLayer({
      id: 'radius-layer',
      type: 'fill',
      source: 'radius-source',
      layout: {},
      paint: {
        'fill-color': '#EA3D2A',
        'fill-opacity': 0.15,
      },
    });

    mapRef.current.addLayer({
      id: 'radius-outline',
      type: 'line',
      source: 'radius-source',
      layout: {},
      paint: {
        'line-color': '#EA3D2A',
        'line-width': 2,
      },
    });

    // Fly to city
    mapRef.current.flyTo({
      center: center,
      zoom: 8.5,
      essential: true
    });
  };

  const createGeoJSONCircle = (center, radiusInKm, points = 64) => {
    const coords = {
      latitude: center[1],
      longitude: center[0]
    };
    const km = radiusInKm;
    const ret = [];
    const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI);
      x = distanceX * Math.cos(theta);
      y = distanceY * Math.sin(theta);
      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [ret]
      }
    };
  };

  const handleAddCity = (city) => {
    if (!selectedCities.find(c => c.name === city.name)) {
      setSelectedCities([...selectedCities, city]);
    }
    setSearchQuery('');
  };

  const handleRemoveCity = (cityName) => {
    setSelectedCities(selectedCities.filter(c => c.name !== cityName));
  };

  const handleApply = () => {
    onApply({ cities: selectedCities, radius: radius });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-[40%] rounded-lg shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/20">
        {/* Header */}
        <div className="px-6 py-6 border-b border-[#E2E8F0] bg-[#F8F8F8]">
          <h2 className="text-xl font-semibold text-[#181211] tracking-tight">Set delivery coverage</h2>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[80vh] mt-0">
          {/* Search Section */}
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-[#181211]">Search & add Canadian cities</label>
            <div className="relative group mt-1">
              <Icon icon="lucide:search" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" width="18" />
              <input
                type="text"
                placeholder="Type a city name..."
                className="w-full pl-11 pr-4 py-2 bg-white border border-[#BDBDD2] rounded-[8px] text-sm font-medium text-[#181211] outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Suggestions Dropdown */}
            {searchQuery.length > 0 && filteredCities.length > 0 && (
              <div className="absolute z-[9999] mt-2 min-w-full w-max max-w-[320px] bg-white rounded-[12px] shadow-[0px_10px_40px_rgba(0,0,0,0.12)] border border-[#F1F5F9] overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="py-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                  {filteredCities.map((city, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleAddCity(city)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F8FAFC] cursor-pointer transition-colors group"
                    >
                      <span className="text-[14px] font-medium text-[#181211] group-hover:text-[#EA3D2A] transition-colors">{city.name}</span>
                      <span className="text-[11px] font-bold text-[#94A3B8] bg-[#F1F5F9] px-1.5 py-0.5 rounded ml-auto">{city.province}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Cities Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedCities.map((city, idx) => (
                <div key={idx} className="flex items-center gap-2 px-2 py-1 bg-[#FFC8C2] text-[#181211] rounded-md text-xs font-semibold border border-[#EA3D2A]/10 animate-in zoom-in-90">
                  {city.name}, {city.province}
                  <button onClick={() => handleRemoveCity(city.name)} className="hover:opacity-70 transition-all">
                    <Icon icon="lucide:x" width="14" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#181211] ">Radius around selected cities</label>
            <div className="w-full h-[180px] rounded-md overflow-hidden border border-[#BDBDD2] relative bg-[#F8FAFC] mt-1">
              <div ref={mapContainerRef} className="w-full h-full" />
              {selectedCities.length > 0 && (
                <div className="absolute top-3 right-3 bg-[#EA3D2A] text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-md">
                  {radius} mi
                </div>
              )}
            </div>
          </div>

          {/* Radius Slider */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-sm font-semibold text-[#181211] shrink-0">Radius</span>
            <div className="flex-1 px-1">
              <input
                type="range"
                min="0"
                max="100"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                className="w-full appearance-none bg-transparent cursor-pointer 
                  [&::-webkit-slider-runnable-track]:rounded-full 
                  [&::-webkit-slider-runnable-track]:bg-[#BDBDD2] 
                  [&::-webkit-slider-runnable-track]:h-[4px] 
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:h-[16px] 
                  [&::-webkit-slider-thumb]:w-[14px] 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-[#EA3D2A] 
                  [&::-webkit-slider-thumb]:mt-[-5px]
                  [&::-moz-range-track]:rounded-full 
                  [&::-moz-range-track]:bg-[#EA3D2A] 
                  [&::-moz-range-track]:h-[6px]
                  [&::-moz-range-thumb]:h-[14px]
                  [&::-moz-range-thumb]:w-[16px]
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-[#EA3D2A]
                  [&::-moz-range-thumb]:border-none"
              />
            </div>
            <span className="text-[14px] font-semibold text-[#EA3D2A] shrink-0">{radius} mi</span>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 flex gap-4 bg-white">
          <button
            onClick={onClose}
            className="flex-1 px-5 py-2.5 border border-[#E2E8F0] text-[#475569] rounded-md text-[15px] font-semibold shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] transition-all active:scale-95 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-5 py-2.5 bg-[#EA3D2A] text-white justify-center rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
          >
            Apply Coverage
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCoverageModal;
