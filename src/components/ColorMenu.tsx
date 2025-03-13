interface ColorMenuProps {
  value: string;
  onChange: (color: string) => void;
}

interface ColorOption {
  id: string;
  value: string;
}

const colorOptions = {
  monochrome: [
    { id: 'black', value: 'from-gray-900 to-gray-900' },
    { id: 'gray', value: 'from-gray-600 to-gray-600' },
    { id: 'light', value: 'from-gray-300 to-gray-300' }
  ],
  gradients: [
    { id: 'blue-purple', value: 'from-blue-600 to-purple-600' },
    { id: 'green-teal', value: 'from-emerald-600 to-teal-600' },
    { id: 'orange-rose', value: 'from-orange-600 to-rose-600' },
    { id: 'pink-purple', value: 'from-pink-600 to-purple-600' },
    { id: 'violet-indigo', value: 'from-violet-600 to-indigo-600' },
    { id: 'amber-orange', value: 'from-amber-500 to-orange-600' },
    { id: 'cyan-blue', value: 'from-cyan-500 to-blue-600' },
    { id: 'rose-pink', value: 'from-rose-500 to-pink-600' }
  ],
  solid: [
    { id: 'blue', value: 'from-blue-600 to-blue-600' },
    { id: 'purple', value: 'from-purple-600 to-purple-600' },
    { id: 'red', value: 'from-red-600 to-red-600' },
    { id: 'orange', value: 'from-orange-600 to-orange-600' },
    { id: 'yellow', value: 'from-yellow-600 to-yellow-600' },
    { id: 'green', value: 'from-green-600 to-green-600' },
    { id: 'teal', value: 'from-teal-600 to-teal-600' },
    { id: 'cyan', value: 'from-cyan-600 to-cyan-600' },
    { id: 'pink', value: 'from-pink-600 to-pink-600' }
  ]
} as const;

const ColorButton = ({ color, isSelected, onClick }: { color: ColorOption; isSelected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex-shrink-0 w-6 sm:w-8 h-6 sm:h-8 rounded-lg bg-gradient-to-r ${color.value} transition-all hover:scale-110 
      ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : 'ring-1 ring-white/20'}`}
  />
);

const Divider = () => <div className="w-px h-6 sm:h-8 bg-white/10 mx-1" />;

const ScrollButton = ({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === 'left' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 w-5 sm:w-6 h-5 sm:h-6 rounded-lg bg-black border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition-colors`}
  >
    <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
    </svg>
  </button>
);

const ColorMenu = ({ value, onChange }: ColorMenuProps) => {
  const handleScroll = (direction: 'left' | 'right') => {
    const scroll = document.getElementById('colorScroll');
    if (scroll) scroll.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full sm:w-[660px] opacity-0 translate-y-2 pointer-events-none
      peer-focus:opacity-100 peer-focus:translate-y-0 peer-focus:pointer-events-auto hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto transition-all duration-200 z-[100]">
      <div className="relative bg-black/90 backdrop-blur-sm rounded-2xl shadow-lg px-4 sm:px-8 py-3 mx-4 sm:mx-0">
        <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth" id="colorScroll">
          {/* Monocromáticos */}
          {colorOptions.monochrome.map((color) => (
            <ColorButton
              key={color.id}
              color={color}
              isSelected={value === color.value}
              onClick={() => onChange(color.value)}
            />
          ))}

          <Divider />

          {/* Gradientes */}
          {colorOptions.gradients.map((color) => (
            <ColorButton
              key={color.id}
              color={color}
              isSelected={value === color.value}
              onClick={() => onChange(color.value)}
            />
          ))}

          <Divider />

          {/* Colores sólidos */}
          {colorOptions.solid.map((color) => (
            <ColorButton
              key={color.id}
              color={color}
              isSelected={value === color.value}
              onClick={() => onChange(color.value)}
            />
          ))}
        </div>
        
        {/* Flechas de navegación */}
        <ScrollButton direction="left" onClick={() => handleScroll('left')} />
        <ScrollButton direction="right" onClick={() => handleScroll('right')} />
      </div>
    </div>
  );
};

export default ColorMenu; 