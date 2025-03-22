import { useRef } from 'react';

interface DevSidebarProps {
  onSave?: () => void;
  onLoad?: (settings: any) => void;
  isEditorMode: boolean;
  onEditorModeChange: (mode: boolean) => void;
}

const DevSidebar = ({ onSave, onLoad, isEditorMode, onEditorModeChange }: DevSidebarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onLoad) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const settings = JSON.parse(event.target?.result as string);
          onLoad(settings);
        } catch (error) {
          console.error('Error al cargar el archivo:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleFileUpload}
        className="hidden"
      />
      
      <div className="flex flex-col items-center gap-2 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-2">
        <button
          onClick={() => onEditorModeChange(!isEditorMode)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            isEditorMode 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          title={isEditorMode ? "Vista previa" : "Modo editor"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isEditorMode ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            )}
          </svg>
        </button>
        <button
          onClick={onSave}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all"
          title="Guardar JSON"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all"
          title="Cargar JSON"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DevSidebar; 