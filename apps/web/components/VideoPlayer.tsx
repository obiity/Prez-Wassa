"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  Settings, SkipForward, SkipBack, Subtitles, PictureInPicture,
  RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TRENDING_MOVIES } from "@/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ContentItem } from "@/types/content";
import { MovieCard } from "./MovieCard";

interface VideoPlayerProps {
  src: string;
  title: string;
  movieId?: string;
  relatedMovies?: ContentItem[];
  onClose?: () => void;
}

export function VideoPlayer({ src, title, movieId, relatedMovies, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false); // Hidden during intro
  const [showTitleCard, setShowTitleCard] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  
  let controlsTimeout: NodeJS.Timeout;

  // Title Card Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitleCard(false);
      setShowControls(true); // Show controls briefly after intro
      if (videoRef.current) {
        // Load saved progress
        if (movieId) {
          const savedProgress = localStorage.getItem(`wassa_progress_${movieId}`);
          if (savedProgress) {
            videoRef.current.currentTime = parseFloat(savedProgress);
          }
        }
        videoRef.current.play().catch(e => console.error("AutoPlay prevented:", e));
        setIsPlaying(true);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [movieId]);

  const handleMouseMove = () => {
    if (showTitleCard || isEnded) return;
    setShowControls(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    return () => clearTimeout(controlsTimeout);
  }, []);

  const togglePlay = () => {
    if (showTitleCard || isEnded) return;
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
      setDuration(total);

      // Save progress to localStorage every 5 seconds roughly
      if (movieId && Math.floor(current) % 5 === 0) {
        localStorage.setItem(`wassa_progress_${movieId}`, current.toString());
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setProgress(value);
    if (videoRef.current) {
      videoRef.current.currentTime = (value / 100) * duration;
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted) videoRef.current.volume = volume;
      else videoRef.current.volume = 0;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
      setIsMuted(value === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.log(err));
      setIsFullscreen(false);
    }
  };

  const togglePiP = async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture().catch(e => console.log(e));
    } else if (videoRef.current && document.pictureInPictureEnabled) {
      await videoRef.current.requestPictureInPicture().catch(e => console.log(e));
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    setShowControls(false);
    if (movieId) localStorage.removeItem(`wassa_progress_${movieId}`);
  };

  const handleRestart = () => {
    setIsEnded(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden font-sans"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Title Card Sequence */}
      <AnimatePresence>
        {showTitleCard && (
          <motion.div 
            className="absolute inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl text-white font-serif tracking-wide text-center px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button */}
      {onClose && !showTitleCard && (
        <AnimatePresence>
          {(showControls || isEnded) && (
            <motion.button 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={onClose}
              className="absolute top-8 left-8 z-40 text-white/80 hover:text-white font-medium text-lg transition-colors flex items-center gap-2 bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-white/10"
            >
              &larr; Retour
            </motion.button>
          )}
        </AnimatePresence>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        className={`w-full h-full object-contain transition-all duration-700 ease-out ${
          !isPlaying && !showTitleCard && !isEnded ? 'blur-sm brightness-50' : 'blur-none brightness-100'
        }`}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onClick={togglePlay}
        playsInline
      />

      {/* Freeze Frame Overlay (Pause Indicator) */}
      <AnimatePresence>
        {!isPlaying && !showTitleCard && !isEnded && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <div className="w-24 h-24 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl text-white/80">
              <Pause size={48} fill="currentColor" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* End Screen */}
      <AnimatePresence>
        {isEnded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-40 bg-black/95 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto"
          >
            <div className="flex flex-col items-center text-center mb-10 mt-auto">
              <h2 className="text-3xl md:text-5xl text-white font-serif mb-6 drop-shadow-md">
                {title}
              </h2>
              <button 
                onClick={handleRestart}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all font-medium tracking-wide shadow-glow-subtle group"
              >
                <RotateCcw size={20} className="group-hover:-rotate-90 transition-transform duration-500" />
                Recommencer
              </button>
            </div>

            {relatedMovies && relatedMovies.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[1200px] mb-auto"
              >
                <h3 className="text-xl md:text-2xl font-serif text-white/90 mb-6 text-center md:text-left">À suivre</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center">
                  {relatedMovies.slice(0, 4).map(movie => (
                    <MovieCard 
                      key={movie.id} 
                      movie={movie} 
                      hoverEffect="lift"
                      onClickOverride={() => {
                        setIsEnded(false);
                        router.push(`/watch/${movie.id}${movie.type === 'serie' ? '-e1' : ''}`);
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Bar */}
      <AnimatePresence>
        {showControls && !isEnded && !showTitleCard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 z-30 px-6 pb-6 pt-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
          >
            {/* Progress Bar */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-white/80 text-xs font-sans w-10 text-right">{formatTime((progress / 100) * duration)}</span>
              <div className="relative w-full h-1 bg-white/20 rounded-full group cursor-pointer flex items-center">
                {/* Thin amber progress */}
                <div 
                  className="absolute left-0 h-1 bg-brand-primary rounded-full transition-all group-hover:h-1.5"
                  style={{ width: `${progress}%` }}
                ></div>
                {/* Thumb */}
                <div 
                  className="absolute h-3 w-3 bg-brand-primary rounded-full shadow-[0_0_10px_rgba(255,106,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2"
                  style={{ left: `${progress}%` }}
                ></div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={progress || 0}
                  onChange={handleProgressChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <span className="text-white/80 text-xs font-sans w-10">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between text-white mt-2">
              {/* Left Controls */}
              <div className="flex items-center gap-6">
                <button onClick={togglePlay} className="hover:text-brand-primary transition-colors focus:outline-none">
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={() => skip(-10)} className="text-white/80 hover:text-white transition-colors focus:outline-none" title="Reculer de 10s">
                  <SkipBack size={24} />
                </button>
                <button onClick={() => skip(10)} className="text-white/80 hover:text-white transition-colors focus:outline-none" title="Avancer de 10s">
                  <SkipForward size={24} />
                </button>
                
                <div className="flex items-center gap-3 group ml-4">
                  <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors focus:outline-none">
                    {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                  <input 
                    type="range" 
                    min="0" max="1" step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-0 opacity-0 group-hover:w-24 group-hover:opacity-100 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-brand-primary transition-all duration-300"
                  />
                </div>

                <div className="text-lg font-serif font-medium ml-6 border-l border-white/20 pl-6 text-white/90 truncate max-w-sm hidden md:block">
                  {title}
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-6">
                {/* Qualité */}
                <div className="relative group/menu">
                  <button className="text-white/80 hover:text-white text-xs font-bold transition-colors focus:outline-none flex items-center gap-1">
                    <Settings size={20} /> HD
                  </button>
                  {/* Fake Menu */}
                  <div className="absolute bottom-full right-0 mb-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-2 hidden group-hover/menu:block min-w-[120px]">
                    <div className="text-xs text-brand-primary mb-2 px-3 pt-1">Qualité</div>
                    <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded">Auto</button>
                    <button className="w-full text-left px-3 py-2 text-sm text-brand-primary hover:bg-white/10 rounded flex justify-between items-center">
                      1080p <span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span>
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded">720p</button>
                  </div>
                </div>

                {/* Sous-titres */}
                <div className="relative group/menu">
                  <button className="text-white/80 hover:text-white transition-colors focus:outline-none">
                    <Subtitles size={20} />
                  </button>
                  {/* Fake Menu */}
                  <div className="absolute bottom-full right-0 mb-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-2 hidden group-hover/menu:block min-w-[160px]">
                    <div className="text-xs text-brand-primary mb-2 px-3 pt-1">Sous-titres & Audio</div>
                    <div className="border-b border-white/10 pb-1 mb-1">
                      <button className="w-full text-left px-3 py-2 text-sm text-brand-primary hover:bg-white/10 rounded flex justify-between">
                        Audio: Wolof <span className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5"></span>
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded">Audio: Français</button>
                    </div>
                    <div>
                      <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded">Sous-titres: Désactivés</button>
                      <button className="w-full text-left px-3 py-2 text-sm text-brand-primary hover:bg-white/10 rounded flex justify-between">
                        Sous-titres: Français <span className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5"></span>
                      </button>
                    </div>
                  </div>
                </div>

                <button onClick={togglePiP} className="text-white/80 hover:text-white transition-colors focus:outline-none hidden md:block" title="Picture in Picture">
                  <PictureInPicture size={20} />
                </button>
                <button onClick={toggleFullscreen} className="text-white/80 hover:text-white transition-colors focus:outline-none">
                  {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
