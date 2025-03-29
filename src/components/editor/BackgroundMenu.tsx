import { useState } from 'react';

interface BackgroundMenuProps {
  onChangeBackground: (type: string, value: string) => void;
}

const backgrounds = [
  { id: 'white', name: 'Blanco', value: 'bg-white' },
  { id: 'light', name: 'Claro', value: 'bg-gray-50' },
  { id: 'dark', name: 'Oscuro', value: 'bg-[#1d1d1f]' },
  { id: 'gradient1', name: 'Gradiente 1', value: 'bg-gradient-to-br from-blue-50 to-purple-50' },
  { id: 'gradient2', name: 'Gradiente 2', value: 'bg-gradient-to-br from-rose-50 to-teal-50' },
  { id: 'gradient3', name: 'Gradiente 3', value: 'bg-gradient-to-br from-amber-50 to-emerald-50' },
];

const patterns = [
  { id: 'none', name: 'Ninguno', value: '' },
  { id: 'dots', name: 'Puntos', value: 'bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:24px_24px]' },
  { id: 'grid', name: 'Cuadrícula', value: 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:24px_24px]' },
  { id: 'waves', name: 'Ondas', value: 'bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)_repeat_scroll_0_0,radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)_repeat_scroll_12px_12px] bg-[length:24px_24px]' },
];

const BackgroundMenu = ({ onChangeBackground }: BackgroundMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState('white');
  const [selectedPattern, setSelectedPattern] = useState('none');

  const handleBackgroundChange = (id: string) => {
    setSelectedBackground(id);
    const bg = backgrounds.find(b => b.id === id);
    if (bg) {
      onChangeBackground('background', bg.value);
    }
  };

  const handlePatternChange = (id: string) => {
    setSelectedPattern(id);
    const pattern = patterns.find(p => p.id === id);
    if (pattern) {
      onChangeBackground('pattern', pattern.value);
    }
  };

  return (
    <div className="fixed top-6 right-24 flex flex-col items-end gap-4 z-50">
      {isOpen && (
        <div className="bg-white p-4 rounded-xl shadow-lg min-w-[250px] flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-800">Fondo</h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Color</label>
            <div className="grid grid-cols-3 gap-2">
              {backgrounds.map(bg => (
                <button
                  key={bg.id}
                  onClick={() => handleBackgroundChange(bg.id)}
                  className={`h-12 rounded-xl transition-all ${bg.value} border border-black/5
                    ${selectedBackground === bg.id ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-2 hover:ring-blue-500/50 hover:ring-offset-2'}`}
                  title={bg.name}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Patrón</label>
            <div className="grid grid-cols-2 gap-2">
              {patterns.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => handlePatternChange(pattern.id)}
                  className={`h-12 rounded-xl bg-gray-50 transition-all ${pattern.value}
                    ${selectedPattern === pattern.id ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-2 hover:ring-blue-500/50 hover:ring-offset-2'}`}
                  title={pattern.name}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-gray-700 w-12 h-12 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors shadow-lg border border-black/5"
        title="Cambiar fondo"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
};

export default BackgroundMenu;