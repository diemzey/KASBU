import { memo, useCallback, useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { BaseSocialCardProps } from '../../types';
import 'mapbox-gl/dist/mapbox-gl.css';

// Configura tu token de Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZGllbXpleSIsImEiOiJjbTgyNDMzb3ExZTBzMm5xMTZzZHlkemwyIn0.AN1iXeop8EBsa-FWrfu5Kg';

// Función para buscar ubicación usando Mapbox Geocoding API
const searchLocation = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&limit=1`
    );
    const data = await response.json();
    if (data.features?.[0]) {
      const [lng, lat] = data.features[0].center;
      return { position: { lng, lat }, name: data.features[0].text };
    }
    return null;
  } catch (error) {
    console.error('Error searching location:', error);
    return null;
  }
};

// Componente del marcador personalizado
const markerHtml = `
  <div class="relative h-7 w-7">
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#679BFF] opacity-20 w-7 h-7 animate-ping"></div>
    <div class="relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-lg">
      <div class="absolute inset-[3px] rounded-full bg-[#679BFF]"></div>
      <div class="absolute inset-[3px] rounded-full border border-white/20"></div>
      <div class="absolute inset-[5px] rounded-full bg-[#679BFF]"></div>
    </div>
  </div>
`;

function MapCardComponent({ children, onDelete, onTextChange }: BaseSocialCardProps) {
  const [location, setLocation] = useState(children?.toString() || 'Mérida');
  const [position, setPosition] = useState({ lng: -89.5926, lat: 20.9674 });
  const [isEditing, setIsEditing] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  // Inicializar mapa
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [position.lng, position.lat],
      zoom: 13,
      attributionControl: false,
    });

    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.innerHTML = markerHtml;

    marker.current = new mapboxgl.Marker(markerElement)
      .setLngLat([position.lng, position.lat])
      .addTo(map.current);

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      setPosition({ lng, lat });
      marker.current?.setLngLat([lng, lat]);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Actualizar posición del mapa y marcador
  useEffect(() => {
    if (!map.current || isEditing) return;
    map.current.setCenter([position.lng, position.lat]);
    marker.current?.setLngLat([position.lng, position.lat]);
  }, [position, isEditing]);

  // Manejar cambios en children
  useEffect(() => {
    if (!children) return;
    const text = children.toString();
    setLocation(text);
    searchLocation(text).then((result) => {
      if (result) {
        setPosition(result.position);
        setLocation(result.name);
      }
    });
  }, [children]);

  const handleLocationBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);
    const newText = e.target.value;
    setLocation(newText || 'Mérida');
    onTextChange?.(newText);
    searchLocation(newText).then((result) => {
      if (result) {
        setPosition(result.position);
        setLocation(result.name);
      }
    });
  }, [onTextChange]);

  const handleZoomIn = useCallback(() => {
    map.current?.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    map.current?.zoomOut();
  }, []);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden group transition-all duration-300
      shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.06)]
      hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_8px_20px_-4px_rgba(0,0,0,0.1)]">
      
      {/* Barra de control que se oculta */}
      <div className="absolute inset-x-0 top-0 z-[2] translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300">
        <div className="bg-white/90 backdrop-blur-[20px] px-4 py-3 flex items-center justify-center gap-3 border-b border-gray-100 rounded-t-[1.5rem]">
          <div className="flex items-center gap-1">
            <button
              onClick={handleZoomIn}
              className="w-7 h-7 rounded-lg bg-white hover:bg-gray-50 border border-gray-100 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
              </svg>
            </button>
            <button
              onClick={handleZoomOut}
              className="w-7 h-7 rounded-lg bg-white hover:bg-gray-50 border border-gray-100 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h12" />
              </svg>
            </button>
          </div>

          <div className="h-5 w-px bg-gray-200"></div>

          <div className="relative flex-1 max-w-[200px]">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setIsEditing(true)}
              onBlur={handleLocationBlur}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.currentTarget.blur();
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full text-sm font-medium text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-100 outline-none focus:border-blue-500 transition-colors text-center"
              placeholder="Buscar ubicación..."
            />
          </div>
        </div>
      </div>

      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
}

export const MapCard = memo(MapCardComponent); 