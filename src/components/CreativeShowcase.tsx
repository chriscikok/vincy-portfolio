import { Card } from './ui/card';
import { ImageWithFallback } from './utils/ImageWithFallback';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { Play, Video } from 'lucide-react';
import { useState } from 'react';

interface CreativeWork {
  title: string;
  type: string;
  description: string;
  image: string;
  date: string;
  mediaType?: 'image' | 'video';
  videoUrl?: string;
}

interface CreativeShowcaseProps {
  artworks: CreativeWork[];
}

export function CreativeShowcase({ artworks }: CreativeShowcaseProps) {
  const { t } = useLanguage();
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const handleVideoClick = (index: number) => {
    setPlayingVideo(playingVideo === index ? null : index);
  };

  return (
    <Card className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        🎨 {t('creative.title')}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {artworks.map((artwork, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-square bg-gray-100 relative">
              {artwork.mediaType === 'video' && playingVideo === index ? (
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
                  <ImageWithFallback
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                  {artwork.mediaType === 'video' && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer group"
                      onClick={() => handleVideoClick(index)}
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
        ))}
      </div>
    </Card>
  );
}