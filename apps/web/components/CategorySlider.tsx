"use client";

import { useRef, useState, useEffect, MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CategoryItem {
  id: string;
  label: string;
  count?: number;
}

interface CategorySliderProps {
  items: CategoryItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function CategorySlider({ items, activeId, onSelect, className = "" }: CategorySliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Mouse drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (container) container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [items]);

  // Center active element horizontally within the slider track ONLY (without scrolling window)
  useEffect(() => {
    if (!containerRef.current || isDragging) return;
    const container = containerRef.current;
    const activeElement = container.querySelector(`[data-category-id="${activeId}"]`) as HTMLElement;
    if (activeElement) {
      const elementOffsetLeft = activeElement.offsetLeft;
      const elementWidth = activeElement.offsetWidth;
      const containerWidth = container.clientWidth;
      const targetScrollLeft = elementOffsetLeft - (containerWidth / 2) + (elementWidth / 2);
      
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth"
      });
    }
  }, [activeId]);

  const slide = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const amount = direction === "left" ? -280 : 280;
    containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handlePillClick = (id: string) => {
    if (hasDragged) {
      return;
    }
    onSelect(id);
  };

  return (
    <div className={`relative flex items-center w-full group/slider ${className}`}>
      {/* Left Scroll Arrow Button */}
      {canScrollLeft && (
        <button
          onClick={() => slide("left")}
          className="absolute left-0 z-20 h-full px-2 bg-gradient-to-r from-background via-background/90 to-transparent flex items-center justify-start text-white hover:text-brand-primary transition-all duration-300 cursor-pointer"
          aria-label="Défiler vers la gauche"
        >
          <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <ChevronLeft size={18} />
          </div>
        </button>
      )}

      {/* Slider Track with Mouse Drag */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className={`flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide py-3 px-1 scroll-smooth w-full select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              data-category-id={item.id}
              onClick={() => handlePillClick(item.id)}
              className={`whitespace-nowrap px-4 md:px-5 py-2 md:py-2.5 rounded-full font-sans text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-2 flex-none ${
                isDragging ? "cursor-grabbing" : "cursor-pointer"
              } ${
                isActive
                  ? "bg-brand-primary text-white shadow-glow-primary scale-105 font-bold"
                  : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 hover:border-brand-primary/40"
              }`}
            >
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-black/30 text-white" : "bg-white/10 text-gray-400"}`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right Scroll Arrow Button */}
      {canScrollRight && (
        <button
          onClick={() => slide("right")}
          className="absolute right-0 z-20 h-full px-2 bg-gradient-to-l from-background via-background/90 to-transparent flex items-center justify-end text-white hover:text-brand-primary transition-all duration-300 cursor-pointer"
          aria-label="Défiler vers la droite"
        >
          <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <ChevronRight size={18} />
          </div>
        </button>
      )}
    </div>
  );
}
