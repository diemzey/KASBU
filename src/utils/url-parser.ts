import { Platform } from '../types';

interface URLMetadata {
  platform: Platform;
  title?: string;
  description?: string;
  type: 'social' | 'video' | 'image' | 'product' | 'article' | 'generic';
  thumbnail?: string;
  favicon?: string;
  data: Record<string, any>;
}

interface TransformResult {
  platform: Platform;
  title?: string;
  videoId?: string;
  productId?: string;
  imageId?: string;
  userId?: string;
  username?: string;
}

// Función helper para crear transformaciones sociales
const createSocialTransform = (platform: Platform) => {
  return (match: RegExpMatchArray): TransformResult => {
    const username = match[1].replace(/\/$/, '');
    return {
      username,
      platform,
      title: `@${username}`
    };
  };
};

// Patrones para detectar plataformas específicas
const urlPatterns = {
  // Videos
  youtube: {
    domains: ['youtube.com', 'youtu.be'],
    patterns: [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
      /youtube\.com\/@([^/?]+)/i,
    ],
    type: 'video' as const,
    transform: (match: RegExpMatchArray): TransformResult => {
      if (match[0].includes('@')) {
        return createSocialTransform('youtube')(match);
      }
      return {
        videoId: match[1],
        platform: 'tv' as Platform,
      };
    }
  },
  vimeo: {
    domains: ['vimeo.com'],
    patterns: [/vimeo\.com\/([0-9]+)/i],
    type: 'video' as const,
    transform: (match: RegExpMatchArray): TransformResult => ({
      videoId: match[1],
      platform: 'video' as Platform,
    })
  },

  // Productos
  amazon: {
    domains: ['amazon.com', 'amazon.es', 'amazon.mx'],
    patterns: [/amazon\.[a-z.]+\/(?:.*\/)?(?:dp|gp\/product)\/([A-Z0-9]+)/i],
    type: 'product' as const,
    transform: (match: RegExpMatchArray): TransformResult => ({
      productId: match[1],
      platform: 'amazon-product' as Platform,
    })
  },
  mercadolibre: {
    domains: ['mercadolibre.com', 'mercadolibre.com.mx', 'mercadolibre.com.ar'],
    patterns: [/articulo\.mercadolibre\.com[a-z.]+\/([A-Z0-9-]+)/i],
    type: 'product' as const,
    transform: (match: RegExpMatchArray): TransformResult => ({
      productId: match[1],
      platform: 'mercadolibre-product' as Platform,
    })
  },

  // Imágenes
  imgur: {
    domains: ['imgur.com', 'i.imgur.com'],
    patterns: [/imgur\.com\/(?:gallery\/)?([a-zA-Z0-9]+)/i],
    type: 'image' as const,
    transform: (match: RegExpMatchArray): TransformResult => ({
      imageId: match[1],
      platform: 'image' as Platform,
    })
  },

  // Redes Sociales
  facebook: {
    domains: ['facebook.com', 'fb.com', 'm.facebook.com'],
    patterns: [/facebook\.com\/(?:profile\.php\?id=(\d+)|([^/?]+))/i],
    type: 'social' as const,
    transform: (match: RegExpMatchArray): TransformResult => {
      const username = match[1] || match[2];
      return {
        userId: username,
        platform: 'facebook' as Platform,
        title: `@${username}`
      };
    }
  },
  twitter: {
    domains: ['twitter.com', 'x.com'],
    patterns: [/(?:twitter|x)\.com\/([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('twitter')
  },
  instagram: {
    domains: ['instagram.com'],
    patterns: [/instagram\.com\/([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('instagram')
  },
  linkedin: {
    domains: ['linkedin.com'],
    patterns: [/linkedin\.com\/in\/([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('linkedin')
  },
  tiktok: {
    domains: ['tiktok.com'],
    patterns: [/tiktok\.com\/@([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('tiktok')
  },
  github: {
    domains: ['github.com'],
    patterns: [/github\.com\/([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('github')
  },
  twitch: {
    domains: ['twitch.tv'],
    patterns: [/twitch\.tv\/([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('twitch')
  },
  discord: {
    domains: ['discord.gg', 'discord.com'],
    patterns: [/discord\.(?:gg|com)\/(?:invite\/)?([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('discord')
  },
  spotify: {
    domains: ['open.spotify.com'],
    patterns: [/open\.spotify\.com\/(?:user|artist)\/([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('spotify')
  },
  behance: {
    domains: ['behance.net'],
    patterns: [/behance\.net\/([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('behance')
  },
  dribbble: {
    domains: ['dribbble.com'],
    patterns: [/dribbble\.com\/([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('dribbble')
  },
  medium: {
    domains: ['medium.com'],
    patterns: [/medium\.com\/@([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('medium')
  },
  dev: {
    domains: ['dev.to'],
    patterns: [/dev\.to\/([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('dev')
  },
  stackoverflow: {
    domains: ['stackoverflow.com'],
    patterns: [/stackoverflow\.com\/users\/([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('stackoverflow')
  },
  pinterest: {
    domains: ['pinterest.com', 'pin.it'],
    patterns: [/pinterest\.[a-z.]+\/([^/?]+)/i],
    type: 'social' as const,
    transform: createSocialTransform('pinterest')
  },
};

const getFaviconUrl = (domain: string): string => 
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const cleanUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const paramsToRemove = [
      'utm_source', 'utm_medium', 'utm_campaign', 
      'utm_term', 'utm_content', 'fbclid', 'ref'
    ];
    paramsToRemove.forEach(param => urlObj.searchParams.delete(param));
    return urlObj.toString();
  } catch {
    return url;
  }
};

export const parseUrl = async (url: string): Promise<URLMetadata> => {
  try {
    const cleanedUrl = cleanUrl(url);
    const urlObj = new URL(cleanedUrl);
    const hostname = urlObj.hostname.toLowerCase();

    for (const [key, value] of Object.entries(urlPatterns)) {
      if (!value.domains.some(domain => hostname.includes(domain))) continue;

      for (const pattern of value.patterns) {
        const match = cleanedUrl.match(pattern);
        if (!match) continue;

        const data = value.transform(match);
        return {
          platform: data.platform,
          type: value.type,
          favicon: getFaviconUrl(hostname),
          title: data.title,
          data
        };
      }
    }

    // URL genérica si no hay coincidencias
    return {
      platform: 'url',
      type: 'generic',
      favicon: getFaviconUrl(hostname),
      title: hostname,
      description: cleanedUrl,
      data: { url: cleanedUrl }
    };
  } catch (error) {
    console.error('Error procesando URL:', error);
    throw new Error('URL inválida');
  }
};

export const enrichMetadata = async (metadata: URLMetadata): Promise<URLMetadata> => {
  // TODO: Implementar enriquecimiento de metadatos
  return metadata;
};

export const getContentTypeFromUrl = (url: string): string | null => {
  const extensions = {
    image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    video: ['.mp4', '.webm', '.ogg', '.mov'],
    audio: ['.mp3', '.wav', '.ogg', '.m4a'],
    document: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx']
  };

  try {
    const pathname = new URL(url).pathname.toLowerCase();
    return Object.entries(extensions)
      .find(([_, exts]) => exts.some(ext => pathname.endsWith(ext)))?.[0] || null;
  } catch {
    return null;
  }
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getDomainFromUrl = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}; 