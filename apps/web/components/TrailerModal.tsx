"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl?: string;
  posterUrl?: string;
}

export function TrailerModal({
  isOpen,
  onClose,
  title,
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  posterUrl
}: TrailerModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#121212] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-brand-primary/20 border border-brand-primary text-brand-primary text-xs font-bold font-sans rounded-md uppercase tracking-wider">
                Bande-Annonce Officielle
              </span>
              <h3 className="font-display font-bold text-white text-lg md:text-xl truncate max-w-md">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Video Container */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              autoPlay
              controls
              muted={isMuted}
              className="w-full h-full object-contain"
            />

            {/* Custom Mute Toggle Control */}
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !isMuted;
                  setIsMuted(!isMuted);
                }
              }}
              className="absolute bottom-16 right-6 z-20 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 cursor-pointer"
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-[#181818] border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-sans">
            <span>Disponible en HD 1080p & 4K • WASSA Streaming</span>
            <button
              onClick={onClose}
              className="text-white hover:text-brand-primary transition-colors font-medium cursor-pointer"
            >
              Fermer l'aperçu
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
