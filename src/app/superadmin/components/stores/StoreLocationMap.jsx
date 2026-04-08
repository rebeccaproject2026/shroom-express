import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Icon } from '@iconify/react';

if (typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== 'undefined') {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const StoreLocationMap = ({ latitude, longitude, onLocationChange }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (!token) return;

    const lat = parseFloat(latitude) || 43.6532;
    const lng = parseFloat(longitude) || -79.3832;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: 12,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

    const el = document.createElement('div');
    el.innerHTML = `
      <div style="background: white; padding: 6px; border-radius: 50%; box-shadow: 0 2px 10px rgba(0,0,0,0.2); border: 2.5px solid #EA3D2A;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#EA3D2A" stroke-width="2" />
          <circle cx="12" cy="10" r="3" stroke="#EA3D2A" stroke-width="2" />
        </svg>
      </div>
    `;

    markerRef.current = new mapboxgl.Marker({ element: el })
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    mapRef.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      markerRef.current.setLngLat([lng, lat]);
      onLocationChange?.(lat.toFixed(6), lng.toFixed(6));
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Update marker if props change externally
  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        markerRef.current.setLngLat([lng, lat]);
        mapRef.current.flyTo({ center: [lng, lat], speed: 1.2 });
      }
    }
  }, [latitude, longitude]);

  if (!import.meta.env.VITE_MAPBOX_ACCESS_TOKEN) {
    return (
      <div className="w-full h-full bg-[#F1F5F9] flex flex-col items-center justify-center border-2 border-[#E8E8E8] rounded-lg">
        <Icon icon="lucide:map" className="text-[#BABABA] mb-2" width="32" />
        <p className="text-[12px] font-bold text-[#64748B]">Mapbox Token Missing</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden border-2 border-[#E8E8E8]">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* Optional overlay button if you want to keep the UI look */}
        {!latitude && (
          <button className="px-6 py-2.5 bg-white border border-[#BDBDD2] rounded-full text-sm font-bold text-[#181211] shadow-xl flex items-center gap-2 pointer-events-auto">
             <Icon icon="meteor-icons:map-pin" className="text-[#EA3D2A]" width="20" />
             Click to set Business Location
          </button>
        )}
      </div>
    </div>
  );
};

export default StoreLocationMap;
