import React, { useState } from 'react';
import { FaClock, FaVideo, FaUpload, FaExclamationTriangle } from 'react-icons/fa';

interface VideoPlayerProps {
  src: string;
  title: string;
  description?: string;
  duration?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title, description, duration }) => {
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Video Container - Flexible for portrait/landscape */}
      <div className="relative bg-black min-h-100 max-h-[70vh] flex items-center justify-center">
        {videoError ? (
          // Video Not Available Placeholder
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 p-8">
            <div className="text-center max-w-md">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="bg-linear-to-br from-purple-500 to-blue-600 p-6 rounded-full">
                    <FaVideo className="text-5xl text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-amber-500 p-2 rounded-full animate-pulse">
                    <FaUpload className="text-white text-sm" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Video Coming Soon
              </h3>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                This video is currently being prepared and will be uploaded soon.
                Expected format: MP4 • Duration: {duration || '20:00'}
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-start gap-3 text-left">
                  <FaExclamationTriangle className="text-amber-400 mt-1 shrink-0" />
                  <div className="text-xs text-gray-300">
                    <strong className="text-white">File Path:</strong>
                    <code className="block mt-1 bg-black/30 px-2 py-1 rounded text-amber-300 break-all">
                      {src}
                    </code>
                  </div>
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
                style={{ minHeight: '400px', maxHeight: '70vh' }}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={title}
              />
            ) : (
              // Local video player
              <>
                <video
                  controls
                  className="max-w-full max-h-[70vh] h-auto w-auto mx-auto"
                  style={{ objectFit: 'contain', maxHeight: '70vh' }}
                  preload="metadata"
                  onError={handleVideoError}
                  onLoadedMetadata={handleVideoLoad}
                >
                  <source src={src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Duration Badge */}
                {videoDuration && !isLoading && (
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium">
                    <FaClock className="text-xs" />
                    {videoDuration}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Video Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
          </div>
          {videoError && (
            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold shrink-0">
              Pending
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
