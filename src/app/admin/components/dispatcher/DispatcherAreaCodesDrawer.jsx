/* eslint-disable react-hooks/immutability */
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { X } from 'lucide-react';

// Set your Mapbox access token
if (typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== 'undefined') {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const DispatcherAreaCodesDrawer = ({ isOpen, onClose, areaCodes = [], title = "Area Codes" }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const polygonsRef = useRef([]);

  // Cleanup map when drawer closes
  useEffect(() => {
    if (!isOpen) {
      cleanupMap();
    }
  }, [isOpen]);

  // Initialize map when drawer opens
  useEffect(() => {
    if (isOpen && mapContainerRef.current) {
      // Delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initMap();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen, areaCodes]);

  const cleanupMap = () => {
    if (mapRef.current) {
      // Remove all polygon layers and sources
      polygonsRef.current.forEach((polygonId) => {
        if (mapRef.current.getLayer(polygonId)) {
          mapRef.current.removeLayer(polygonId);
        }
        if (mapRef.current.getLayer(`${polygonId}-stroke`)) {
          mapRef.current.removeLayer(`${polygonId}-stroke`);
        }
        if (mapRef.current.getSource(polygonId)) {
          mapRef.current.removeSource(polygonId);
        }
      });
      polygonsRef.current = [];

      // Remove the map instance
      mapRef.current.remove();
      mapRef.current = null;
    }
  };

  const initMap = () => {
    // Clean up existing map first
    cleanupMap();

    if (!mapContainerRef.current) {
      console.error('Map container not found');
      return;
    }

    // Create Mapbox map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.3832, 43.6532], // Toronto coordinates [lng, lat]
      zoom: 10,
      minZoom: 6,
      maxZoom: 18,
    });

    // Add controls
    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapRef.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Wait for map to load before adding data
    mapRef.current.on('load', () => {
      loadAreaData();
    });
  };

  const loadAreaData = async () => {
    if (!mapRef.current || areaCodes.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    let geocodeCount = 0;
    const totalAreas = areaCodes.length;

    for (const areaCode of areaCodes) {
      try {
        // Use Mapbox Geocoding API - include postcode type for postal codes
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            areaCode
          )}.json?access_token=${mapboxgl.accessToken}&types=place,locality,postcode&limit=1`
        );
        const data = await response.json();
        geocodeCount++;

        if (data.features && data.features.length > 0) {
          const feature = data.features[0];
          const center = feature.center; // [lng, lat]

          // Add center point to bounds
          bounds.extend(center);

          // Create polygon for area boundaries using bounding box
          if (feature.bbox) {
            const [minLng, minLat, maxLng, maxLat] = feature.bbox;

            // Create rectangle polygon coordinates
            const coords = [
              [maxLng, maxLat], // northeast
              [minLng, maxLat], // northwest
              [minLng, minLat], // southwest
              [maxLng, minLat], // southeast
              [maxLng, maxLat], // close the polygon
            ];

            // Add all coordinates to bounds
            coords.forEach((coord) => {
              bounds.extend(coord);
            });

            // Create polygon source and layer
            const polygonId = `polygon-${geocodeCount}`;
            polygonsRef.current.push(polygonId);

            mapRef.current.addSource(polygonId, {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {
                  name: areaCode,
                },
                geometry: {
                  type: 'Polygon',
                  coordinates: [coords],
                },
              },
            });

            mapRef.current.addLayer({
              id: polygonId,
              type: 'fill',
              source: polygonId,
              paint: {
                'fill-color': '#4285F4',
                'fill-opacity': 0.2,
              },
            });

            mapRef.current.addLayer({
              id: `${polygonId}-stroke`,
              type: 'line',
              source: polygonId,
              paint: {
                'line-color': '#4285F4',
                'line-width': 2,
                'line-opacity': 0.8,
              },
            });
          }
        }

        // When all geocoding is complete, fit bounds
        if (geocodeCount === totalAreas) {
          fitMapToBounds(bounds);
        }
      } catch (error) {
        console.error(`Error geocoding ${areaCode}:`, error);
        geocodeCount++;

        // Still check if we're done
        if (geocodeCount === totalAreas) {
          fitMapToBounds(bounds);
        }
      }
    }
  };

  const fitMapToBounds = (bounds) => {
    if (!mapRef.current || bounds.isEmpty()) return;

    // Fit bounds with padding
    mapRef.current.fitBounds(bounds, { padding: 50 });

    // Set zoom limits after bounds are set
    mapRef.current.once('moveend', () => {
      const currentZoom = mapRef.current.getZoom();
      if (currentZoom > 18) {
        mapRef.current.setZoom(18);
      } else if (currentZoom < 6) {
        mapRef.current.setZoom(6);
      }
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[90vw] md:w-[500px] lg:w-[450px] bg-white shadow-2xl flex flex-col z-50 border-l border-gray-200 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
            title="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Map Container */}
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200">
          <div
            ref={mapContainerRef}
            className="w-full h-[250px] sm:h-[300px] rounded-sm overflow-hidden border border-gray-200"
          />
        </div>

        {/* Area Codes List */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4">
          <p className="text-sm sm:text-base font-semibold text-[#212121]/60 mb-2 sm:mb-3">Area Codes</p>
          <div className="space-y-1.5 sm:space-y-2">
            {areaCodes.map((code, index) => (
              <p
                key={index}
                className="text-xs sm:text-sm font-medium text-gray-900 uppercase py-1"
              >
                {code}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DispatcherAreaCodesDrawer;
