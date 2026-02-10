import React, { useState, useEffect } from 'react';
import { FaTimes, FaClock, FaVideo } from 'react-icons/fa';

interface VideoModalProps {
  src: string;
  title: string;
  description?: string;
  duration?: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ src, title, description, duration, onClose }) => {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoDuration, setVideoDuration] = useState<string>(duration || '');

  // Check if video is from Google Drive
  const isGoogleDriveVideo = src.includes('drive.google.com');

  // Convert Google Drive link to embed format
  const getEmbedUrl = (url: string) => {
    if (isGoogleDriveVideo) {
      const fileIdMatch = url.match(/\/d\/([^\/]+)/);
      if (fileIdMatch) {
        return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
      }
    }
    return url;
  };

  const embedUrl = getEmbedUrl(src);

  useEffect(() => {
    // Reset states when src changes
    setVideoError(false);
    setIsLoading(isGoogleDriveVideo ? false : true); // No loading state needed for iframe
    setVideoDuration(duration || '');
  }, [src, duration, isGoogleDriveVideo]);

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
  };

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setIsLoading(false);
    setVideoError(false);

    // Get actual video duration
    const video = e.currentTarget;
    if (video.duration && !isNaN(video.duration)) {
      const minutes = Math.floor(video.duration / 60);
      const seconds = Math.floor(video.duration % 60);
      setVideoDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-[95vw] sm:max-w-4xl lg:max-w-5xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 shrink-0">
          <div className="flex-1 min-w-0 mr-2 sm:mr-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{title}</h3>
            {description && (
              <p className="text-xs sm:text-sm text-gray-600 truncate hidden sm:block">{description}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 shrink-0"
            title="Close (ESC)"
          >
            <FaTimes className="text-gray-700 text-base sm:text-lg" />
          </button>
        </div>

        {/* Video Container - Flexible for portrait/landscape */}
        <div className="relative bg-black flex-1 flex items-center justify-center overflow-hidden">
          {videoError ? (
            // Video Not Available Placeholder
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 p-8">
              <div className="text-center max-w-md">
                <div className="mb-6 flex justify-center">
                  <div className="p-5 rounded-full bg-gray-900">
                    <FaVideo className="text-4xl text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Video Coming Soon
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  This video will be uploaded soon.
                  <br />
                  Expected duration: {duration || '20:00'}
                </p>
                <div className="bg-gray-200 rounded-lg p-4">
                  <div className="text-xs text-gray-600">
                    <strong className="text-gray-900">File Path:</strong>
                    <code className="block mt-1 bg-white px-2 py-1 rounded text-gray-700 break-all text-xs">
                      {src}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {isGoogleDriveVideo ? (
                // Google Drive iframe embed
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  style={{ minHeight: '80vh' }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={title}
                />
              ) : (
                // Local video player
                <>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                      <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-purple-200 border-t-purple-600"></div>
                        <p className="text-white font-medium text-sm sm:text-base">Loading video...</p>
                      </div>
                    </div>
                  )}
                  <video
                    controls
                    autoPlay
                    className="max-w-full h-auto w-auto"
                    style={{ objectFit: 'contain', maxHeight: window.innerWidth < 768 ? '70vh' : '80vh' }}
                    preload="metadata"
                    onError={handleVideoError}
                    onLoadedMetadata={handleVideoLoad}
                  >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </>
              )}

              {/* Duration Badge */}
              {videoDuration && !isLoading && !isGoogleDriveVideo && (
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium">
                  <FaClock className="text-xs" />
                  {videoDuration}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Info */}
        {!videoError && (
          <div className="px-3 sm:px-6 py-2 sm:py-3 border-t border-gray-700 bg-gray-800 shrink-0">
            <p className="text-[10px] sm:text-xs text-gray-400 text-center">
              Press <kbd className="px-1.5 sm:px-2 py-0.5 bg-gray-700 rounded text-gray-300 font-mono text-[10px] sm:text-xs">ESC</kbd> to close
              <span className="hidden sm:inline"> • Click outside video to close</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
