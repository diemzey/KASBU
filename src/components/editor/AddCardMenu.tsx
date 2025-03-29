import { useState } from 'react';

interface AddCardMenuProps {
  onAdd: (
    platform: 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'custom' | 'code' | 'qr' | 'map' | 'tv',
    size: { w: number; h: number },
    customData?: { 
      title?: string; 
      text?: string; 
      gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
      command?: string;
      url?: string;
      lat?: number;
      lng?: number;
      zoom?: number;
      videoId?: string;
    }
  ) => void;
}

const platforms = [
  { id: 'facebook', name: 'Facebook' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'custom', name: 'Personalizada' },
  { id: 'code', name: 'Terminal' },
  { id: 'qr', name: 'Código QR' },
  { id: 'map', name: 'Mapa' },
  { id: 'tv', name: 'TV Retro' },
] as const;

const sizes = [
  { id: 'small', name: 'Pequeño', dimensions: { w: 1, h: 1 } },
  { id: 'wide', name: 'Largo', dimensions: { w: 2, h: 1 } },
  { id: 'tall', name: 'Alto', dimensions: { w: 1, h: 2 } },
  { id: 'large', name: 'Grande', dimensions: { w: 2, h: 2 } },
] as const;

const gradients = [
  { id: 'blue', name: 'Azul' },
  { id: 'purple', name: 'Morado' },
  { id: 'green', name: 'Verde' },
  { id: 'orange', name: 'Naranja' },
  { id: 'pink', name: 'Rosa' },
] as const;

const AddCardMenu = ({ onAdd }: AddCardMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<typeof platforms[number]['id']>('facebook');
  const [selectedSize, setSelectedSize] = useState<typeof sizes[number]['id']>('small');
  const [customTitle, setCustomTitle] = useState('');
  const [customText, setCustomText] = useState('');
  const [command, setCommand] = useState('');
  const [url, setUrl] = useState('');
  const [lat, setLat] = useState('19.4326');
  const [lng, setLng] = useState('-99.1332');
  const [zoom, setZoom] = useState('15');
  const [videoId, setVideoId] = useState('');
  const [selectedGradient, setSelectedGradient] = useState<typeof gradients[number]['id']>('blue');

  const handleAdd = () => {
    const size = sizes.find(s => s.id === selectedSize)?.dimensions;
    if (size) {
      if (selectedPlatform === 'custom') {
        onAdd(selectedPlatform, size, {
          title: customTitle,
          text: customText,
          gradient: selectedGradient,
        });
      } else if (selectedPlatform === 'code') {
        onAdd(selectedPlatform, size, {
          command: command || 'echo "Hello World!"',
        });
      } else if (selectedPlatform === 'qr') {
        onAdd(selectedPlatform, size, {
          url: url || 'https://example.com',
          title: customTitle,
        });
      } else if (selectedPlatform === 'map') {
        onAdd(selectedPlatform, size, {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          zoom: parseInt(zoom),
          title: customTitle,
        });
      } else if (selectedPlatform === 'tv') {
        onAdd(selectedPlatform, size, {
          videoId: videoId || 'dQw4w9WgXcQ',
          title: customTitle,
        });
      } else {
        onAdd(selectedPlatform, size);
      }
      setIsOpen(false);
      setCustomTitle('');
      setCustomText('');
      setCommand('');
      setUrl('');
      setLat('19.4326');
      setLng('-99.1332');
      setZoom('15');
      setVideoId('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
      {isOpen && (
        <div className="bg-white p-4 rounded-xl shadow-lg min-w-[250px] flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-800">Agregar Tarjeta</h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Plataforma</label>
            <select 
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as typeof platforms[number]['id'])}
              className="p-2 border rounded-lg"
            >
              {platforms.map(platform => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>

          {selectedPlatform === 'custom' && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">Título</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Título de la tarjeta"
                  className="p-2 border rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">Texto</label>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Contenido de la tarjeta"
                  className="p-2 border rounded-lg min-h-[80px]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {gradients.map(gradient => (
                    <button
                      key={gradient.id}
                      onClick={() => setSelectedGradient(gradient.id)}
                      className={`w-8 h-8 rounded-full transition-transform ${
                        selectedGradient === gradient.id ? 'scale-110 ring-2 ring-offset-2 ring-blue-500' : ''
                      }`}
                      style={{
                        background: `var(--${gradient.id}-gradient, var(--${gradient.id}-500))`,
                      }}
                      title={gradient.name}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedPlatform === 'code' && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Comando</label>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="echo 'Hello World!'"
                className="p-2 border rounded-lg font-mono text-sm"
              />
            </div>
          )}

          {selectedPlatform === 'qr' && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">Título (opcional)</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Título del QR"
                  className="p-2 border rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">URL</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="p-2 border rounded-lg"
                />
              </div>
            </>
          )}

          {selectedPlatform === 'map' && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">Título (opcional)</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Título del mapa"
                  className="p-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600">Latitud</label>
                  <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="19.4326"
                    className="p-2 border rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600">Longitud</label>
                  <input
                    type="number"
                    step="any"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    placeholder="-99.1332"
                    className="p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">Zoom (1-20)</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={zoom}
                  onChange={(e) => setZoom(e.target.value)}
                  className="p-2 border rounded-lg"
                />
              </div>
            </>
          )}

          {selectedPlatform === 'tv' && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">Título (opcional)</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Título del video"
                  className="p-2 border rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">ID o URL de YouTube</label>
                <input
                  type="text"
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  placeholder="dQw4w9WgXcQ o URL completa"
                  className="p-2 border rounded-lg"
                />
                <p className="text-xs text-gray-500">
                  Puedes usar el ID del video o la URL completa de YouTube
                </p>
              </div>
            </>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Tamaño</label>
            <div className="grid grid-cols-2 gap-2">
              {sizes.map(size => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`p-2 border rounded-lg transition-colors ${
                    selectedSize === size.id
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Agregar
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg"
      >
        <svg 
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
};

export default AddCardMenu; 