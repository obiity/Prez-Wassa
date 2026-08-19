export type Episode = {
  id: string;
  num: number;
  title: string;
  title_en?: string;
  imageUrl: string;
};

export type ContentItem = {
  id: string;
  title: string;
  title_en?: string;
  imageUrl: string;
  type: "film" | "serie" | "live" | "podcast";
  classification: string;
  year: number;
  genres: string[];
  genres_en?: string[];
  synopsis: string;
  synopsis_en?: string;
  
  // Video / preview clip URL
  videoUrl?: string;
  audioUrl?: string;
  
  // Live specific
  isLive?: boolean;
  viewerCount?: string | number;
  channelName?: string;
  channelName_en?: string;
  currentProgram?: string;
  currentProgram_en?: string;
  nextProgram?: string;
  nextProgram_en?: string;
  description?: string;
  description_en?: string;
  category?: string;
  category_en?: string;

  // Podcast specific
  host?: string;
  audioDuration?: string;
  episodesCount?: number;
  
  // Additional metadata
  director?: string;
  actors?: string[];
  country?: string;
  isPlaceholder?: boolean;
  poster_status?: "placeholder" | "official";
  requiresSubscription?: boolean;
  isExclusive?: boolean;
  isPremium?: boolean;
  
  // Film specific
  duration?: string;
  
  // Serie specific
  seasons?: number;
  progress?: string;
  episodes?: Episode[];
};
