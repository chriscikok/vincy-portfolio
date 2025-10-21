import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './utils/ImageWithFallback';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Play, Video } from 'lucide-react';

interface LifeMemory {
  title: string;
  description: string;
  images: string[];
  videoUrl?: string;
  date: string;
  location: string;
  category: 'daily' | 'events' | 'trips' | 'friends' | 'learning' | 'fun' | 'family';
  participants?: string[];
  mood: string;
  mediaType?: 'images' | 'video' | 'mixed';
}

interface PersonalSchoolLifeProps {
  memories: LifeMemory[];
}

const categoryInfo = {
  daily: { color: 'bg-blue-100 text-blue-800 border-blue-200', emoji: '📅', label: 'Daily Life' },
  events: { color: 'bg-purple-100 text-purple-800 border-purple-200', emoji: '🎉', label: 'School Events' },
  trips: { color: 'bg-green-100 text-green-800 border-green-200', emoji: '🚌', label: 'Field Trips' },
  friends: { color: 'bg-pink-100 text-pink-800 border-pink-200', emoji: '👫', label: 'With Friends' },
  learning: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', emoji: '📚', label: 'Learning' },
  fun: { color: 'bg-orange-100 text-orange-800 border-orange-200', emoji: '🎪', label: 'Fun Time' }
};

export function PersonalSchoolLife({ memories }: PersonalSchoolLifeProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});
  const [showVideo, setShowVideo] = useState<Record<number, boolean>>({});

  const handleImageNavigation = (memoryIndex: number, direction: 'prev' | 'next') => {
    const memory = memories[memoryIndex];
    const currentIndex = currentImageIndex[memoryIndex] || 0;
    
    if (direction === 'prev') {
      setCurrentImageIndex(prev => ({
        ...prev,
        [memoryIndex]: currentIndex === 0 ? memory.images.length - 1 : currentIndex - 1
      }));
    } else {
      setCurrentImageIndex(prev => ({
        ...prev,
        [memoryIndex]: currentIndex === memory.images.length - 1 ? 0 : currentIndex + 1
      }));
    }
  };

  const toggleVideo = (memoryIndex: number) => {
    setShowVideo(prev => ({
      ...prev,
      [memoryIndex]: !prev[memoryIndex]
    }));
  };

  const groupedMemories = memories.reduce((acc, memory) => {
    if (!acc[memory.category]) {
      acc[memory.category] = [];
    }
    acc[memory.category].push(memory);
    return acc;
  }, {} as Record<string, LifeMemory[]>);

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid sm:grid-cols-3 gap-4 mb-8"
      >
        <Card className="p-6 text-center bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200">
          <div className="text-3xl mb-2">📸</div>
          <h3 className="text-2xl font-bold text-pink-700">{memories.length}</h3>
          <p className="text-pink-600">Beautiful Memories</p>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
          <div className="text-3xl mb-2">🎊</div>
          <h3 className="text-2xl font-bold text-blue-700">{Object.keys(groupedMemories).length}</h3>
          <p className="text-blue-600">Activity Types</p>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <div className="text-3xl mb-2">😊</div>
          <h3 className="text-2xl font-bold text-green-700">100%</h3>
          <p className="text-green-600">Happy Moments</p>
        </Card>
      </motion.div>

      {/* Memories by Category */}
      {Object.entries(groupedMemories).map(([category, categoryMemories], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{categoryInfo[category as keyof typeof categoryInfo]?.emoji}</span>
            <h2 className="text-2xl font-bold text-gray-800">
              {categoryInfo[category as keyof typeof categoryInfo]?.label || category}
            </h2>
            <Badge 
              variant="outline" 
              className={`${categoryInfo[category as keyof typeof categoryInfo]?.color || 'bg-gray-100 text-gray-800 border-gray-200'} px-3 py-1`}
            >
              {categoryMemories.length} {categoryMemories.length === 1 ? 'memory' : 'memories'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categoryMemories.map((memory, memoryIndex) => {
              const globalIndex = memories.indexOf(memory);
              const currentIndex = currentImageIndex[globalIndex] || 0;
              
              return (
                <motion.div
                  key={globalIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (memoryIndex * 0.1) }}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                    {/* Media Content (Images/Video) */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                      {/* Video Display */}
                      {memory.videoUrl && showVideo[globalIndex] ? (
                        <div className="w-full h-full bg-black flex items-center justify-center">
                          <video
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                          >
                            <source src={memory.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ) : (
                        <ImageWithFallback
                          src={memory.images[currentIndex]}
                          alt={`${memory.title} - Image ${currentIndex + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      
                      {/* Video Toggle Button */}
                      {memory.videoUrl && (
                        <button
                          onClick={() => toggleVideo(globalIndex)}
                          className="absolute top-4 left-4 bg-black/70 hover:bg-black/80 text-white rounded-full p-3 shadow-lg transition-all duration-200 z-20 backdrop-blur-sm"
                        >
                          {showVideo[globalIndex] ? (
                            <ImageWithFallback 
                              src={memory.images[0]} 
                              alt="Show images"
                              className="w-6 h-6 rounded object-cover"
                            />
                          ) : (
                            <Play className="w-6 h-6 fill-current" />
                          )}
                        </button>
                      )}
                      
                      {/* Navigation buttons - Always visible on touch devices or when multiple images */}
                      {memory.images.length > 1 && !showVideo[globalIndex] && (
                        <>
                          <button
                            onClick={() => handleImageNavigation(globalIndex, 'prev')}
                            className="personal-life-nav-button absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 z-10 
                                     opacity-70 sm:opacity-0 sm:group-hover:opacity-100
                                     hover:opacity-100 hover:scale-110 active:scale-95
                                     touch-manipulation"
                          >
                            <ChevronLeft className="w-5 h-5 text-gray-800" />
                          </button>
                          <button
                            onClick={() => handleImageNavigation(globalIndex, 'next')}
                            className="personal-life-nav-button absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 z-10
                                     opacity-70 sm:opacity-0 sm:group-hover:opacity-100
                                     hover:opacity-100 hover:scale-110 active:scale-95
                                     touch-manipulation"
                          >
                            <ChevronRight className="w-5 h-5 text-gray-800" />
                          </button>
                          
                          {/* Image Indicators */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                            {memory.images.map((_, imgIndex) => (
                              <button
                                key={imgIndex}
                                onClick={() => setCurrentImageIndex(prev => ({ ...prev, [globalIndex]: imgIndex }))}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 touch-manipulation ${
                                  imgIndex === currentIndex 
                                    ? 'bg-white shadow-md scale-110' 
                                    : 'bg-white/60 hover:bg-white/80 hover:scale-105'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                      
                      {/* Media Type Indicator */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <div className="text-2xl filter drop-shadow-lg">{memory.mood}</div>
                        {memory.videoUrl && (
                          <div className="bg-red-500 text-white rounded-full p-1.5 shadow-lg">
                            <Video className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                          {memory.title}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className={`${categoryInfo[memory.category as keyof typeof categoryInfo]?.color || 'bg-gray-100 text-gray-800 border-gray-200'} shrink-0 ml-2`}
                        >
                          {categoryInfo[memory.category as keyof typeof categoryInfo]?.label || memory.category}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {memory.description}
                      </p>
                      
                      {/* Memory Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{memory.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="h-4 w-4" />
                          <span>{memory.location}</span>
                        </div>
                        {memory.participants && memory.participants.length > 0 && (
                          <div className="flex items-center gap-2 text-gray-500">
                            <Users className="h-4 w-4" />
                            <span>With: {memory.participants.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Memory Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            ⏰ Recent Memories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {memories.slice().reverse().slice(0, 4).map((memory, index) => (
              <div key={index} className="text-center p-4 bg-white/70 rounded-lg border border-purple-100">
                <div className="text-2xl mb-2">{memory.mood}</div>
                <div className="font-semibold text-sm text-gray-800 mb-1">{memory.title}</div>
                <div className="text-xs text-gray-600">{memory.date}</div>
                <div className="text-xs text-gray-500 mt-1">{memory.location}</div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}