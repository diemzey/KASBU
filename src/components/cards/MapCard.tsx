import { BaseSocialCard, BaseSocialCardProps } from './BaseSocialCard';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

type MapCardProps = Omit<BaseSocialCardProps, 'className' | 'icon'> & {
  lat?: number;
  lng?: number;
  title?: string;
  zoom?: number;
};

const defaultCenter = {
  lat: 19.4326,
  lng: -99.1332
};

export const MapCard = ({ onDelete, lat, lng, title, zoom = 15 }: MapCardProps) => {
  const center = useMemo(() => ({
    lat: lat || defaultCenter.lat,
    lng: lng || defaultCenter.lng
  }), [lat, lng]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'TU_API_KEY_AQUI' // Necesitarás una API key de Google Maps
  });

  const mapOptions = useMemo(() => ({
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: [
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'administrative',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{ visibility: 'off' }]
      }
    ]
  }), []);

  return (
    <BaseSocialCard
      icon={<></>}
      onDelete={onDelete}
      className="bg-gradient-to-br from-emerald-500 to-teal-700 group relative overflow-hidden
        before:absolute before:inset-0 before:bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1),transparent)] 
        before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000
        after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]
        after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500"
    >
      <div className="w-full flex flex-col items-center gap-3">
        {title && (
          <div className="text-sm font-medium tracking-wide text-center opacity-90">
            {title}
          </div>
        )}
        <div className="w-full h-[140px] rounded-xl overflow-hidden">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '100%'
              }}
              center={center}
              zoom={zoom}
              options={mapOptions}
            >
              <Marker position={center} />
            </GoogleMap>
          ) : (
            <div className="w-full h-full bg-emerald-600/50 animate-pulse flex items-center justify-center">
              <span className="text-sm text-white/70">Cargando mapa...</span>
            </div>
          )}
        </div>
        <div className="text-xs opacity-70 text-center px-2">
          {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
        </div>
      </div>
    </BaseSocialCard>
  );
}; 