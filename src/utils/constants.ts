export const fonts = [
  // Por Defecto y Modernas
  { id: 'montserrat', name: 'Montserrat', class: "font-montserrat" },
  { id: 'alexandria', name: 'Alexandria', class: "font-alexandria" },
  { id: 'poppins', name: 'Poppins', class: "font-poppins" },
  { id: 'space', name: 'Space Grotesk', class: "font-space" },
  
  // Display y Llamativas
  { id: 'bebas', name: 'Bebas Neue', class: "font-bebas" },
  { id: 'righteous', name: 'Righteous', class: "font-righteous" },
  { id: 'rubik-mono', name: 'Rubik Mono', class: "font-rubik-mono" },
  
  // Serif Elegantes
  { id: 'dm-serif', name: 'DM Serif', class: "font-dm-serif" },
  { id: 'playfair', name: 'Playfair', class: "font-playfair" },
  { id: 'yeseva', name: 'Yeseva One', class: "font-yeseva" },
  { id: 'rozha', name: 'Rozha One', class: "font-rozha" },
  
  // Estilo Manuscrito
  { id: 'marker', name: 'Permanent Marker', class: "font-marker" },
] as const;

export const socialPlatforms = {
  c: { platform: 'tiktok', text: 'Síguenos en TikTok' },
} as const; 