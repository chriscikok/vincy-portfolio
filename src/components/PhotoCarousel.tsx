import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ImageWithFallback } from './utils/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

interface Photo {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
  speed?: number; // pixels per second
  direction?: 'left' | 'right';
}

export function PhotoCarousel({ photos, speed = 30, direction = 'left' }: PhotoCarouselProps) {
  const { t } = useLanguage();
    const [isPlaying, setIsPlaying] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  // Duplicate photos for seamless loop
  const duplicatedPhotos = [...photos, ...photos, ...photos];

  useEffect(() => {
    if (!isPlaying || !containerRef.current || !contentRef.current) return;

    //const container = containerRef.current;
    const content = contentRef.current;
    //const containerWidth = container.offsetWidth;
    const contentWidth = content.offsetWidth / 3; // Since we have 3 copies

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!isPlaying) return; // Double check if still playing
      
      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;

      setTranslateX(prev => {
        const movement = speed * deltaTime * (direction === 'left' ? -1 : 1);
        let newTranslateX = prev + movement;

        // Reset position for seamless loop
        if (direction === 'left' && newTranslateX <= -contentWidth) {
          newTranslateX = 0;
        } else if (direction === 'right' && newTranslateX >= 0) {
          newTranslateX = -contentWidth;
        }

        return newTranslateX;
      });

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed, direction]);

  /*const handlePhotoHover = (photo: Photo) => {
    setIsPlaying(false);
  };

  const handlePhotoLeave = () => {
    setIsPlaying(true);
  };*/

  const handlePhotoClick = (photo: Photo) => {
    setIsPlaying(false);
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
    // Resume playing after modal closes
    setTimeout(() => {
      setIsPlaying(true);
    }, 300);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  return (
    <>
      {/* Photo Carousel Bar */}
      <div className="w-full bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div 
          ref={containerRef}
          className="h-20 sm:h-24 overflow-hidden relative"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => {selectedPhoto===null ? setIsPlaying(true):null}}
        >
          <motion.div
            ref={contentRef}
            className="flex h-full absolute top-0 left-0"
            style={{ transform: `translateX(${translateX}px)` }}
            transition={{ type: "tween", ease: "linear", duration: 0 }}
          >
            {duplicatedPhotos.map((photo, index) => (
              <motion.div
                key={`${photo.id}-${index}`}
                className="flex-shrink-0 h-full w-20 sm:w-24 mx-0.5 sm:mx-1 cursor-pointer group relative overflow-hidden rounded-lg shadow-md border-2 border-white/50"
                onClick={() => handlePhotoClick(photo)}
                onTouchStart={() => handlePhotoClick(photo)}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ImageWithFallback
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                
                {/* Photo info on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-medium truncate">
                    {photo.title || photo.alt}
                  </p>
                  {photo.category && (
                    <p className="text-gray-300 text-xs truncate">
                      {photo.category}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Controls Indicator */}
        <div className="absolute top-1 sm:top-2 right-2 flex items-center gap-2 text-xs text-gray-600 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full transition-colors ${isPlaying ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="hidden sm:inline">{isPlaying ? t('carousel.playing') : t('carousel.paused')}</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">{t('carousel.hover')}</span>
          <span className="sm:hidden">{t('carousel.tap')}</span>
        </div>
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="photo-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
            onClick={handleCloseModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            style={{ 
              zIndex: 9999,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh'
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="photo-modal-content w-[80vw] h-[80vh] sm:w-[50vw] sm:h-[50vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute -top-4 -right-4 z-20 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-100 transition-colors border-2 border-gray-200"
                aria-label="Close photo"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* Enlarged photo */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white w-full h-full">
                <ImageWithFallback
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-full object-contain"
                />
                
                {/* Photo info overlay */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6"
                >
                  <h3 className="text-white font-semibold text-lg sm:text-xl mb-1">
                    {selectedPhoto.title || selectedPhoto.alt}
                  </h3>
                  {selectedPhoto.category && (
                    <p className="text-blue-200 text-sm sm:text-base">
                      {selectedPhoto.category}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Navigation hint */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center">
                Click outside or press ESC to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}