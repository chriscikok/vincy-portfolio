import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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
  };*/

  /*const handlePhotoLeave = () => {
    setIsPlaying(true);
  };*/

  const handlePhotoClick = (photo: Photo) => {
    setIsPlaying(false);
    const photoIndex = photos.findIndex(p => p.id === photo.id);
    setSelectedPhotoIndex(photoIndex);
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
    // Resume playing after modal closes
    setTimeout(() => {
      setIsPlaying(true);
    }, 300);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = selectedPhotoIndex > 0 ? selectedPhotoIndex - 1 : photos.length - 1;
    } else {
      newIndex = selectedPhotoIndex < photos.length - 1 ? selectedPhotoIndex + 1 : 0;
    }
    
    setSelectedPhotoIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      navigatePhoto('prev');
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      navigatePhoto('next');
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return;
    
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;
    
    // Only trigger swipe if horizontal movement is greater than vertical (to avoid interfering with scrolling)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Swiped left, go to next photo
        navigatePhoto('next');
      } else {
        // Swiped right, go to previous photo
        navigatePhoto('prev');
      }
    }
    
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <>
      {/* Photo Carousel Bar */}
      <div className="w-full bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div 
          ref={containerRef}
          className="h-20 sm:h-24 overflow-hidden relative"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <motion.div
            ref={contentRef}
            className="flex h-full absolute top-0 left-0"
            style={{ transform: `translateX(${translateX}px)` }}
            transition={{ ease: "linear", duration: 0 }}
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
            className="photo-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md"
            onClick={handleCloseModal}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
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
              className="photo-modal-content w-[80vw] sm:w-[80vw] h-[80vh] sm:h-[80vh] flex items-center justify-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation buttons */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={() => navigatePhoto('prev')}
                    className="photo-modal-nav-button absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 rounded-full shadow-xl flex items-center justify-center hover:bg-white transition-all duration-200 border-2 border-gray-200 group"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
                  </button>
                  
                  <button
                    onClick={() => navigatePhoto('next')}
                    className="photo-modal-nav-button absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 rounded-full shadow-xl flex items-center justify-center hover:bg-white transition-all duration-200 border-2 border-gray-200 group"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
                  </button>
                </>
              )}

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
                <motion.div
                  key={selectedPhoto.id} // This ensures animation on photo change
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                
                {/* Photo info overlay */}
                <motion.div 
                  key={`info-${selectedPhoto.id}`} // Ensure info updates with photo
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6"
                >
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-white font-semibold text-lg sm:text-xl mb-1">
                        {selectedPhoto.title || selectedPhoto.alt}
                      </h3>
                      {selectedPhoto.category && (
                        <p className="text-blue-200 text-sm sm:text-base">
                          {selectedPhoto.category}
                        </p>
                      )}
                    </div>
                    {photos.length > 1 && (
                      <div className="text-white/70 text-sm">
                        {selectedPhotoIndex + 1} of {photos.length}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Navigation hints */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center space-y-1">
                {/*<div>
                  {photos.length > 1 ? (
                    <>
                      <span className="hidden sm:inline">Use ← → arrow keys or swipe to navigate • </span>
                      <span className="sm:hidden">Swipe left/right to navigate • </span>
                    </>
                  ) : null}
                  Click outside or press ESC to close
                </div>*/}
                {photos.length > 1 && (
                  <div className="flex justify-center items-center gap-1 mt-2">
                    {photos.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === selectedPhotoIndex 
                            ? 'bg-white' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}