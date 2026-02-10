import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

interface ImageGalleryProps {
  images: { src: string; title?: string; description?: string }[];
  title?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
          <div className="relative flex items-center justify-center min-h-100">
            {/* Current Image */}
            <img
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.title || `Image ${currentIndex + 1}`}
              className="max-w-full max-h-150 w-auto h-auto object-contain cursor-pointer"
              onClick={() => openFullscreen(currentIndex)}
            />

            {/* Gradient Overlays - Removed */}

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2.5 rounded-full transition-all duration-200 shadow-lg"
                  title="Previous image"
                >
                  <FaChevronLeft className="text-base" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2.5 rounded-full transition-all duration-200 shadow-lg"
                  title="Next image"
                >
                  <FaChevronRight className="text-base" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2.5">
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
                  src={image.src}
                  alt={image.title || `Thumbnail ${index + 1}`}
                  className="w-full h-24 object-cover"
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
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-900 p-2.5 rounded-full transition-all duration-200 z-10 shadow-lg"
            title="Close (ESC)"
          >
            <FaTimes className="text-lg" />
          </button>

          {/* Fullscreen Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-200 z-10 shadow-lg"
                title="Previous"
              >
                <FaChevronLeft className="text-lg" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-200 z-10 shadow-lg"
                title="Next"
              >
                <FaChevronRight className="text-lg" />
              </button>
            </>
          )}

          {/* Fullscreen Image */}
          <div className="relative max-w-full max-h-full p-4">
            <img
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.title || `Image ${currentIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Fullscreen Info */}
            {(images[currentIndex]?.title || images[currentIndex]?.description) && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-6 py-3 rounded-lg max-w-2xl">
                {images[currentIndex]?.title && (
                  <h3 className="text-lg font-bold mb-1">
                    {images[currentIndex].title}
                  </h3>
                )}
                {images[currentIndex]?.description && (
                  <p className="text-sm text-gray-200">
                    {images[currentIndex].description}
                  </p>
                )}
                <div className="mt-2 text-xs text-gray-300">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>
            )}
          </div>

          {/* ESC hint */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
            Press <kbd className="px-2 py-0.5 bg-white/20 rounded font-mono">ESC</kbd> to close
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
