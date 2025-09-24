import { useState } from 'react';
import { motion } from 'motion/react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ImageWithFallback } from './utils/ImageWithFallback';
import { FileText, Image as ImageIcon, ZoomIn, ZoomOut, ExternalLink } from 'lucide-react';

interface CertificateFile {
  url: string;
  type: 'image' | 'pdf';
  name: string;
}

interface CertificateViewerProps {
  files: CertificateFile[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateViewer({ files, title, isOpen, onClose }: CertificateViewerProps) {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  if (!files || files.length === 0) return null;

  const currentFile = files[currentFileIndex];

  const resetZoom = () => setZoom(1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-[70vw] max-w-7xl h-[95vh] sm:h-[70vh] p-0 overflow-hidden flex flex-col">
        {/* Header Section */}
        <div className="flex-shrink-0 p-3 sm:p-4 border-b bg-white">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1 mr-4">
              <DialogTitle className="text-base sm:text-lg font-bold flex items-center gap-2 mb-1">
                {currentFile.type === 'pdf' ? (
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                ) : (
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                )}
                <span className="truncate">{title}</span>
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-gray-600">
                {currentFile.type === 'pdf' ? 'PDF Certificate Viewer' : 'Certificate Image Viewer'}
              </DialogDescription>
            </div>
          </div>

          {/* File Navigation */}
          {files.length > 1 && (
            <div className="mt-3">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {files.map((file, index) => (
                  <Button
                    key={index}
                    variant={currentFileIndex === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setCurrentFileIndex(index);
                      resetZoom();
                    }}
                    className="flex items-center gap-1 sm:gap-2 min-w-0 max-w-40 sm:max-w-48 flex-shrink-0"
                  >
                    {file.type === 'pdf' ? (
                      <FileText className="w-3 h-3 flex-shrink-0" />
                    ) : (
                      <ImageIcon className="w-3 h-3 flex-shrink-0" />
                    )}
                    <span className="truncate text-xs">
                      {file.name || `${file.type.toUpperCase()} ${index + 1}`}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="mt-3">
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
              <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                <span className="text-xs text-gray-600 whitespace-nowrap">
                  {currentFileIndex + 1} of {files.length}
                </span>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="text-xs text-gray-600 capitalize whitespace-nowrap">
                  {currentFile.type}
                </span>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="text-xs text-gray-600 truncate hidden sm:block" title={currentFile.name}>
                  {currentFile.name}
                </span>
              </div>
              
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                {currentFile.type === 'image' && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                      disabled={zoom <= 0.5}
                      className="h-7 w-7 p-0"
                    >
                      <ZoomOut className="w-3 h-3" />
                    </Button>
                    <span className="text-xs text-gray-600 min-w-10 text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                      disabled={zoom >= 3}
                      className="h-7 w-7 p-0"
                    >
                      <ZoomIn className="w-3 h-3" />
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(currentFile.url, '_blank')}
                  className="h-7 w-7 p-0"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden bg-gray-100 flex">
          <div className="w-full h-full flex items-center justify-center p-3 sm:p-4">
            {currentFile.type === 'pdf' ? (
              <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                {/* PDF Viewer */}
                <div className="flex-1 relative">
                  <iframe
                    src={`${currentFile.url}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                    className="w-full h-full border-0"
                    title={`${title} - PDF Certificate`}
                  />
                </div>
                
                {/* PDF Footer */}
                <div className="flex-shrink-0 p-2 sm:p-3 bg-gray-50 border-t">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center text-xs text-gray-600">
                      <FileText className="w-3 h-3 mr-1" />
                      <span>PDF Document - Use browser controls to navigate</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(currentFile.url, '_blank')}
                      className="text-xs h-7"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Open Full Screen
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center overflow-auto">
                <motion.div
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex-shrink-0"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center center',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ImageWithFallback
                    src={currentFile.url}
                    alt={`${title} Certificate`}
                    className="block max-w-none max-h-none"
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: `${Math.min(800, window.innerWidth * 0.8)}px`,
                      maxHeight: `${Math.min(600, window.innerHeight * 0.6)}px`,
                    }}
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}