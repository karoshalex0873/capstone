import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { isGoogleDriveUrl, getGoogleDriveImageUrl } from '@/utils/googleDrive';

interface ImageGalleryProps {
  images: { src: string; title?: string; description?: string }[];
  title?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Convert Google Drive URLs to proper image URLs
  const getImageUrl = (src: string) => {
    return isGoogleDriveUrl(src) ? getGoogleDriveImageUrl(src) : src;
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const openFullscreen = (index: number) => {
    setCurrentIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="space-y-6">
        {/* Main Carousel */}
        <div className="relative bg-gray-100 rounded-xl overflow-hidden">
          <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
            {/* Current Image */}
            <img
              src={getImageUrl(images[currentIndex]?.src)}
              alt={images[currentIndex]?.title || `Image ${currentIndex + 1}`}
              className="max-w-full max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] w-auto h-auto object-contain cursor-pointer"
              onClick={() => openFullscreen(currentIndex)}
            />

            {/* Gradient Overlays - Removed */}

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 sm:p-2.5 rounded-full transition-all duration-200 shadow-lg"
                  title="Previous image"
                >
                  <FaChevronLeft className="text-sm sm:text-base" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 sm:p-2.5 rounded-full transition-all duration-200 shadow-lg"
                  title="Next image"
                >
                  <FaChevronRight className="text-sm sm:text-base" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-lg overflow-hidden transition-all duration-200 ${index === currentIndex
                  ? 'ring-2 ring-gray-900 opacity-100'
                  : 'opacity-50 hover:opacity-100'
                  }`}
              >
                <img
                  src={getImageUrl(image.src)}
                  alt={image.title || `Thumbnail ${index + 1}`}
                  className="w-full h-20 sm:h-24 object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Click to Enlarge Hint */}
        <p className="text-center text-xs text-gray-500 uppercase tracking-wide">
          Click image to enlarge
        </p>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 hover:bg-white text-gray-900 p-2 sm:p-2.5 rounded-full transition-all duration-200 z-10 shadow-lg"
            title="Close (ESC)"
          >
            <FaTimes className="text-base sm:text-lg" />
          </button>

          {/* Fullscreen Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2.5 sm:p-3 rounded-full transition-all duration-200 z-10 shadow-lg"
                title="Previous"
              >
                <FaChevronLeft className="text-base sm:text-lg" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2.5 sm:p-3 rounded-full transition-all duration-200 z-10 shadow-lg"
                title="Next"
              >
                <FaChevronRight className="text-base sm:text-lg" />
              </button>
            </>
          )}

          {/* Fullscreen Image */}
          <div className="relative max-w-full max-h-full p-2 sm:p-4">
            <img
              src={getImageUrl(images[currentIndex]?.src)}
              alt={images[currentIndex]?.title || `Image ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Fullscreen Info */}
            {(images[currentIndex]?.title || images[currentIndex]?.description) && (
              <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg max-w-[90vw] sm:max-w-2xl">
                {images[currentIndex]?.title && (
                  <h3 className="text-base sm:text-lg font-bold mb-1">
                    {images[currentIndex].title}
                  </h3>
                )}
                {images[currentIndex]?.description && (
                  <p className="text-xs sm:text-sm text-gray-200">
                    {images[currentIndex].description}
                  </p>
                )}
                <div className="mt-2 text-[10px] sm:text-xs text-gray-300">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>
            )}
          </div>

          {/* ESC hint */}
          <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
            Press <kbd className="px-1.5 sm:px-2 py-0.5 bg-white/20 rounded font-mono text-[10px] sm:text-xs">ESC</kbd> to close
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
