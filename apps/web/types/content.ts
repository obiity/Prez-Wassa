export type Episode = {
  id: string;
  num: number;
  title: string;
  imageUrl: string;
};

export type ContentItem = {
  id: string;
  title: string;
  imageUrl: string;
  type: "film" | "serie" | "live";
  classification: string;
  year: number;
  genres: string[];
  synopsis: string;
  
  // Video / preview clip URL
  videoUrl?: string;
  
  // Live specific
  isLive?: boolean;
  viewerCount?: string | number;
  channelName?: string;
  
  // Additional metadata
  director?: string;
  actors?: string[];
  country?: string;
  isPlaceholder?: boolean;
  poster_status?: "placeholder" | "official"; // Flag to indicate if media assets are placeholders pending license
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
