import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DeliveryCard from '../tracking/DeliveryCard';

if (typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== 'undefined') {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const OrderMapSection = ({ orderData, isDashboard = false }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [isSatellite, setIsSatellite] = useState(false);

  // Mock delivery route data
  const deliveryData = isDashboard ? {
    origin: [-79.396, 43.630],
    destination: [-75.669, 45.322],
    currentLocation: [-79.396, 43.630],
    route: [
      [-79.396, 43.630],
      [-78.500, 44.200],
      [-77.500, 44.600],
      [-76.500, 45.000],
      [-75.669, 45.322],
    ],
    driver: 'Bob Johnson',
    eta: '20 Jan 2025 at 11:00pm',
    address: '123 Main Street, Toronto, ON M5J 2N8',
    totalDistance: '450 km',
    orderStatus: 'In progress',
  } : {
    origin: [-79.3832, 43.6532], // Start location (Toronto)
    destination: [-79.3700, 43.6600], // End location
    currentLocation: [-79.3766, 43.6566], // Current driver position
    route: [
      [-79.3832, 43.6532],
      [-79.3800, 43.6550],
      [-79.3766, 43.6566],
      [-79.3730, 43.6580],
      [-79.3700, 43.6600],
    ],
    driver: orderData?.driver || 'Bob Johnson',
    eta: '7 Min',
    address: orderData?.address || '123 Main Street, Toronto, ON M5J 2N8',
    totalDistance: '1.8 km',
    orderStatus: 'In progress',
  };

  const handleMapStyleChange = (satellite) => {
    setIsSatellite(satellite);
    if (mapRef.current) {
      mapRef.current.setStyle(satellite ? 'mapbox://styles/mapbox/satellite-v9' : (isDashboard ? 'mapbox://styles/mapbox/streets-v11' : 'mapbox://styles/mapbox/light-v11'));
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (!token) return;

    // Initialize map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: isDashboard ? 'mapbox://styles/mapbox/streets-v11' : 'mapbox://styles/mapbox/light-v11',
      center: deliveryData.currentLocation,
      zoom: 14,
    });

    // Add navigation controls
    mapRef.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'bottom-right'
    );

    let markersAdded = false;

    const addMapLayers = () => {
      const map = mapRef.current;
      if (!map || map.getSource('route-completed')) return;

      map.addSource('route-completed', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: isDashboard ? deliveryData.route : [
              deliveryData.origin,
              deliveryData.route[1],
              deliveryData.currentLocation,
            ],
          },
        },
      });

      map.addLayer({
        id: 'route-completed-line',
        type: 'line',
        source: 'route-completed',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#0066FF',
          'line-width': 5,
        },
      });

      if (!isDashboard) {
        map.addSource('route-remaining', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                deliveryData.currentLocation,
                deliveryData.route[3],
                deliveryData.destination,
              ],
            },
          },
        });

        map.addLayer({
          id: 'route-remaining-line',
          type: 'line',
          source: 'route-remaining',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#666666',
            'line-width': 3,
            'line-opacity': 0.6,
            'line-dasharray': [2, 2],
          },
        });
      }
    };

    mapRef.current.on('style.load', addMapLayers);

    // Wait for map to load
    mapRef.current.on('load', () => {
      const map = mapRef.current;

      addMapLayers();
      if (markersAdded) return;
      markersAdded = true;

      // Add origin marker (red pin)
      if (!isDashboard) {
        const originEl = document.createElement('div');
        originEl.innerHTML = `
          <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24c0-8.837-7.163-16-16-16z" fill="#F44336"/>
            <circle cx="16" cy="16" r="6" fill="white"/>
          </svg>
        `;
        originEl.style.width = '32px';
        originEl.style.height = '40px';
        originEl.style.cursor = 'pointer';

        new mapboxgl.Marker({ element: originEl, anchor: 'bottom' })
          .setLngLat(deliveryData.origin)
          .addTo(map);
      }

      // Add destination marker (red pin)
      const destEl = document.createElement('div');
      destEl.innerHTML = `
        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24c0-8.837-7.163-16-16-16z" fill="#F44336"/>
          <circle cx="16" cy="16" r="6" fill="white"/>
        </svg>
      `;
      destEl.style.width = '32px';
      destEl.style.height = '40px';
      destEl.style.cursor = 'pointer';

      new mapboxgl.Marker({ element: destEl, anchor: 'bottom' })
        .setLngLat(deliveryData.destination)
        .addTo(map);

      // Add driver marker (orange car icon)
      const driverEl = document.createElement('div');
      if (isDashboard) {
        driverEl.innerHTML = `
          <div style="background: #1142D4; border: 3px solid white; width: 18px; height: 18px; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          </div>
        `;
      } else {
        driverEl.innerHTML = `
          <div style="background: white; width: 40px; height: 40px; border-radius: 10%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.2); border: 3px solid #FF9800;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF9800">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
        `;
      }
      driverEl.style.cursor = 'pointer';

      new mapboxgl.Marker({ element: driverEl, anchor: 'center' })
        .setLngLat(deliveryData.currentLocation)
        .addTo(map);

      // Add driver info popup using DeliveryCard component
      const popupEl = document.createElement('div');
      const root = ReactDOM.createRoot(popupEl);
      root.render(
        <DeliveryCard
          driverName={deliveryData.driver}
          isOnline={true}
          eta={deliveryData.eta}
          status={deliveryData.orderStatus}
          address={deliveryData.address}
          totalOrders={18}
          breakdown={{
            pending: 8,
            inProgress: 5,
            delivered: 3,
            cancelled: 2,
          }}
          showActions={false}
        />
      );

      // Position card to the left of the driver marker
      new mapboxgl.Marker({ element: popupEl, anchor: isDashboard ? 'bottom-left' : 'left', offset: isDashboard ? [15, -15] : [15, 0] })
        .setLngLat(deliveryData.currentLocation)
        .addTo(map);

      // Add dummy markers for Dashboard
      if (isDashboard) {
        const dummyMarkers = [
          { pos: [-78.72, 44.92], num: '12' },
          { pos: [-74.00, 44.30], num: '13' }
        ];
        dummyMarkers.forEach(m => {
          const el = document.createElement('div');
          el.innerHTML = `
            <div style="background: #1142D4; color: white; border: 2.5px solid white; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 13px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
              ${m.num}
            </div>
          `;
          new mapboxgl.Marker({ element: el })
            .setLngLat(m.pos)
            .addTo(map);
        });
      }

      // Fit bounds to show entire route with extra padding for the card
      const bounds = new mapboxgl.LngLatBounds();
      deliveryData.route.forEach((coord) => bounds.extend(coord));
      if (isDashboard) {
        bounds.extend([-74.00, 44.30]);
        bounds.extend([-78.72, 44.92]);
      }
      map.fitBounds(bounds, {
        padding: isDashboard ? { top: 80, bottom: 80, left: 100, right: 100 } : { top: 50, bottom: 50, left: 400, right: 50 }
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const hasMapToken =
    typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== 'undefined' &&
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  if (!hasMapToken) {
    return (
      <div className="w-full">
        <div className="bg-gray-100 rounded-sm h-[400px] flex items-center justify-center border border-gray-200">
          <div className="text-center text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-sm font-medium">Map View</p>
            <p className="text-xs text-gray-400 mt-1">Mapbox token required</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div
        ref={mapContainerRef}
        className={`w-full ${isDashboard ? 'min-h-[500px] h-[calc(100vh-350px)] border-none rounded-xs' : 'h-[400px]'} rounded-sm overflow-hidden border border-gray-200`}
      />
      {isDashboard && (
        <>
          <div className="absolute top-2 left-3 z-10 bg-white shadow-md flex overflow-hidden p-1 rounded-xs">
            <button
              onClick={() => handleMapStyleChange(false)}
              className={`px-2 py-1.5 text-[13px]  transition-colors font-medium border-r-2 border-gray-200 ${!isSatellite ? 'bg-white text-[#222222]  font-semibold' : 'bg-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Map
            </button>
            <button
              onClick={() => handleMapStyleChange(true)}
              className={`px-2 py-1.5 text-[13px]  transition-colors font-medium  ${isSatellite ? 'bg-white text-gray-900  font-semibold' : 'bg-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Satellite
            </button>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-[#1142D4] text-white px-2 py-2 rounded-sm font-semibold shadow-md flex items-center justify-center text-[13px] tracking-wide border-2 border-transparent">
              Active Deliveries (2)
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderMapSection;
