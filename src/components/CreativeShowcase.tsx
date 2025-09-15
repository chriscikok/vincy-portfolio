import { Card } from './ui/card';
import { ImageWithFallback } from './utils/ImageWithFallback';
import { Badge } from './ui/badge';
import { Play, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CreativeWork {
  title: string;
  type: string;
  description: string;
  images: string[];  // Changed from single image to array of images
  date: string;
  mediaType?: string; // 'image' or 'video'
  videoUrl?: string;
}

interface CreativeShowcaseProps {
  artworks: CreativeWork[];
}

export function CreativeShowcase({ artworks }: CreativeShowcaseProps) {
  /*const { t } = useLanguage();*/
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance required (in px)
  const minSwipeDistance = 50;

  const handleVideoClick = (index: number) => {
    setPlayingVideo(playingVideo === index ? null : index);
  };

  const handlePrevImage = (artworkIndex: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const artwork = artworks[artworkIndex];
    const currentIndex = currentImageIndex[artworkIndex] || 0;
    const newIndex = currentIndex === 0 ? artwork.images.length - 1 : currentIndex - 1;
    setCurrentImageIndex(prev => ({ ...prev, [artworkIndex]: newIndex }));
  };

  const handleNextImage = (artworkIndex: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const artwork = artworks[artworkIndex];
    const currentIndex = currentImageIndex[artworkIndex] || 0;
    const newIndex = currentIndex === artwork.images.length - 1 ? 0 : currentIndex + 1;
    setCurrentImageIndex(prev => ({ ...prev, [artworkIndex]: newIndex }));
  };

  const handleImageDot = (artworkIndex: number, imageIndex: number) => {
    setCurrentImageIndex(prev => ({ ...prev, [artworkIndex]: imageIndex }));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (artworkIndex: number) => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextImage(artworkIndex);
    } else if (isRightSwipe) {
      handlePrevImage(artworkIndex);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {artworks.map((artwork, artworkIndex) => {
          const currentIndex = currentImageIndex[artworkIndex] || 0;
          const hasMultipleImages = artwork.images.length > 1;
          
          return (
            <motion.div
              key={artworkIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: artworkIndex * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:border-purple-300 transition-all duration-300">
              <div 
                className="aspect-square bg-gray-100 relative overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={() => onTouchEnd(artworkIndex)}
              >
                {artwork.mediaType === 'video' && playingVideo === artworkIndex ? (
                  <video
                    src={artwork.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                    onEnded={() => setPlayingVideo(null)}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${artworkIndex}-${currentIndex}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                      >
                        <ImageWithFallback
                          src={artwork.images[currentIndex]}
                          alt={`${artwork.title} - Image ${currentIndex + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Navigation arrows for multiple images */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={(e) => handlePrevImage(artworkIndex, e)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                        >
                          <ChevronLeft className="w-4 h-4 text-gray-800" />
                        </button>
                        <button
                          onClick={(e) => handleNextImage(artworkIndex, e)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-800" />
                        </button>
                      </>
                    )}
                    
                    {/* Image dots indicator */}
                    {hasMultipleImages && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {artwork.images.map((_, imageIndex) => (
                          <button
                            key={imageIndex}
                            onClick={() => handleImageDot(artworkIndex, imageIndex)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              imageIndex === currentIndex 
                                ? 'bg-white shadow-md' 
                                : 'bg-white/50 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Video play button overlay */}
                    {artwork.mediaType === 'video' && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer group"
                        onClick={() => handleVideoClick(artworkIndex)}
                      >
                        <div className="bg-white/90 rounded-full p-4 group-hover:bg-white group-hover:scale-110 transition-all duration-200">
                          <Play className="w-8 h-8 text-gray-800 ml-1" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div className="p-3 md:p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    {artwork.title}
                    {artwork.mediaType === 'video' && (
                      <Video className="w-4 h-4 text-purple-600" />
                    )}
                    {hasMultipleImages && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {currentIndex + 1}/{artwork.images.length}
                      </span>
                    )}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={`text-xs self-start ${
                      artwork.mediaType === 'video' 
                        ? 'bg-purple-100 text-purple-700 border-purple-300' 
                        : ''
                    }`}
                  >
                    {artwork.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2 leading-relaxed">{artwork.description}</p>
                <p className="text-xs text-gray-500">{artwork.date}</p>
              </div>
            </div>
            </motion.div>
          );
        })}
        </div>
      </Card>
    </motion.div>
  );
}