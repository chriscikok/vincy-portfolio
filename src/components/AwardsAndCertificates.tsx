import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CertificateViewer } from './CertificateViewer';
import { Eye, FileText, Image as ImageIcon } from 'lucide-react';

interface CertificateFile {
  url: string;
  type: 'image' | 'pdf';
  name: string;
}

interface Award {
  title: string;
  category: string;
  description: string;
  date: string;
  image: string; // Keep for backward compatibility - preview image
  badge: string;
  files?: CertificateFile[]; // New: array of certificate files
}

interface AwardsAndCertificatesProps {
  awards: Award[];
}

const categoryColors: Record<string, string> = {
  academic: 'bg-blue-100 text-blue-800 border-blue-200',
  creative: 'bg-purple-100 text-purple-800 border-purple-200',
  social: 'bg-green-100 text-green-800 border-green-200',
  speech: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  dancing: 'bg-pink-100 text-pink-800 border-pink-200',
  sports: 'bg-orange-100 text-orange-800 border-orange-200'
};

export function AwardsAndCertificates({ awards }: AwardsAndCertificatesProps) {
  /*const { t } = useLanguage();*/
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);

  const groupedAwards = awards.reduce((acc, award) => {
    if (!acc[award.category]) {
      acc[award.category] = [];
    }
    acc[award.category].push(award);
    return acc;
  }, {} as Record<string, Award[]>);

  const handleViewCertificate = (award: Award) => {
    setSelectedAward(award);
  };

  const getFileIcon = (file: CertificateFile) => {
    return file.type === 'pdf' ? (
      <FileText className="w-4 h-4" />
    ) : (
      <ImageIcon className="w-4 h-4" />
    );
  };

  const getCertificateFiles = (award: Award): CertificateFile[] => {
    if (award.files && award.files.length > 0) {
      return award.files;
    }
    // Fallback to image if no files specified
    return [
      {
        url: award.image,
        type: 'image',
        name: `${award.title} Certificate`
      }
    ];
  };

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid sm:grid-cols-2 gap-4 mb-8"
      >

        <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-3xl mb-2">🗂️</div>
          <h3 className="text-2xl font-bold text-purple-700">{Object.keys(groupedAwards).length}</h3>
          <p className="text-purple-600">Categories</p>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="text-2xl font-bold text-yellow-700">{awards.length}</h3>
          <p className="text-yellow-600">Total Awards & Certificates</p>
        </Card>
        {/*<Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-3xl mb-2">📄</div>
          <h3 className="text-2xl font-bold text-green-700">
            {awards.reduce((total, award) => total + (award.files?.length || 1), 0)}
          </h3>
          <p className="text-green-600">Certificates</p>
        </Card>*/}
      </motion.div>

      {/* Awards by Category */}
      {Object.entries(groupedAwards).map(([category, categoryAwards], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">{category} Awards</h2>
            <Badge 
              variant="outline" 
              className={`${categoryColors[category] || 'bg-gray-100 text-gray-800 border-gray-200'} px-3 py-1`}
            >
              {categoryAwards.length} {categoryAwards.length === 1 ? 'award' : 'awards'}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {categoryAwards.map((award, index) => (
              <motion.div
                key={`${category}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (index * 0.1) }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:border-yellow-300 transition-all duration-300">
                  {/*<div className="relative">
                    <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50">
                      <ImageWithFallback
                        src={award.image}
                        alt={award.title}
                        className="w-full h-center object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-4 right-4 text-4xl filter drop-shadow-lg">
                      {award.badge}
                    </div>
                  </div>*/}
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-700 transition-colors">
                        {award.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className={`${categoryColors[category] || 'bg-gray-100 text-gray-800 border-gray-200'} shrink-0 ml-2`}
                      >
                        {category}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {award.description}
                    </p>

                    {/* Certificate Files Preview */}
                    {award.files && award.files.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {award.files.map((file, fileIndex) => (
                            <Badge
                              key={fileIndex}
                              variant="outline"
                              className={`${
                                file.type === 'pdf' 
                                  ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' 
                                  : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                              } flex items-center gap-1 text-xs`}
                            >
                              {getFileIcon(file)}
                              {file.name || `${file.type.toUpperCase()}`}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCertificate(award)}
                          className="w-full flex items-center gap-2 hover:bg-yellow-50 hover:border-yellow-300"
                        >
                          <Eye className="w-4 h-4" />
                          View Certificate{award.files.length > 1 ? 's' : ''}
                          {award.files.length > 1 && (
                            <Badge variant="secondary" className="ml-2">
                              {award.files.length}
                            </Badge>
                          )}
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-medium">
                        📅 {award.date}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-600">
                        <span className="text-lg">✨</span>
                        <span className="font-medium">Achievement Unlocked</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Recognition Timeline */}
      {/*<motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📈 Recognition Journey
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {awards.slice().reverse().slice(0, 4).map((award, index) => (
              <div key={index} className="text-center p-4 bg-white/70 rounded-lg border border-blue-100">
                <div className="text-2xl mb-2">{award.badge}</div>
                <div className="font-semibold text-sm text-gray-800 mb-1">{award.title}</div>
                <div className="text-xs text-gray-600">{award.date}</div>
                {award.files && award.files.length > 0 && (
                  <div className="mt-2 flex justify-center gap-1">
                    {award.files.slice(0, 3).map((file, fileIndex) => (
                      <div key={fileIndex} className={`w-2 h-2 rounded-full ${
                        file.type === 'pdf' ? 'bg-red-400' : 'bg-blue-400'
                      }`} />
                    ))}
                    {award.files.length > 3 && (
                      <span className="text-xs text-gray-500">+{award.files.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </motion.div>*/}

      {/* Certificate Viewer Modal */}
      {selectedAward && (
        <CertificateViewer
          files={getCertificateFiles(selectedAward)}
          title={selectedAward.title}
          isOpen={!!selectedAward}
          onClose={() => setSelectedAward(null)}
        />
      )}
    </div>
  );
}