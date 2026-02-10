import React, { useState, useMemo, useEffect } from 'react';
import { FaTimes, FaDownload, FaExpand, FaExclamationTriangle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import pdfWorkerSrc from 'react-pdf/dist/pdf.worker.entry.js?url';
import { isGoogleDriveUrl, getGoogleDriveEmbedUrl } from '@/utils/googleDrive';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

interface DocumentViewerProps {
  src: string;
  title: string;
  type: 'pdf' | 'ppt';
  onClose?: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ src, title, type, onClose }) => {
  const [loadError, setLoadError] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Check if file is from Google Drive
  const isGoogleDrive = isGoogleDriveUrl(src);
  const embedUrl = isGoogleDrive ? getGoogleDriveEmbedUrl(src) : src;

  // Determine actual file type
  const isDocxFile = src.toLowerCase().endsWith('.docx');
  const isPptFile = type === 'ppt' || src.toLowerCase().endsWith('.pptx') || src.toLowerCase().endsWith('.ppt');
  const isPdfFile = type === 'pdf' && !isDocxFile;

  // Color themes based on file type
  const getThemeColors = () => {
    if (isDocxFile) {
      return {
        primary: 'blue',
        bgFrom: 'from-blue-50',
        bgTo: 'to-white',
        text: 'text-blue-600',
        buttonHover: 'hover:bg-blue-100',
        border: 'border-blue-200',
        badge: 'bg-blue-100 text-blue-700 border-blue-200',
        loadingBg: 'bg-blue-50',
        previewBg: 'bg-blue-50'
      };
    } else if (isPptFile) {
      return {
        primary: 'orange',
        bgFrom: 'from-orange-50',
        bgTo: 'to-white',
        text: 'text-orange-600',
        buttonHover: 'hover:bg-orange-100',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-700 border-orange-200',
        loadingBg: 'bg-orange-50',
        previewBg: 'bg-orange-50'
      };
    } else {
      return {
        primary: 'emerald',
        bgFrom: 'from-emerald-50',
        bgTo: 'to-white',
        text: 'text-emerald-600',
        buttonHover: 'hover:bg-emerald-100',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        loadingBg: 'bg-emerald-50',
        previewBg: 'bg-emerald-50'
      };
    }
  };

  const theme = getThemeColors();

  useEffect(() => {
    setIsLoading(true);
    setLoadError(false);
    setPageNumber(1);
    setIframeLoaded(false);
  }, [src, type]);

  const pdfOptions = useMemo(() => ({
    cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
    enableXfa: false,
    isEvalSupported: false
  }), []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoadError(false);
    setIsLoading(false);
  };

  const onDocumentLoadError = () => {
    setLoadError(true);
    setIsLoading(false);
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIsLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const handleDownload = () => {
    if (isGoogleDrive) {
      window.open(src, '_blank');
    } else {
      const link = document.createElement('a');
      link.href = src;
      link.download = title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleFullscreen = () => {
    window.open(src, '_blank');
  };

  const renderFileTypeBadge = () => {
    if (isDocxFile) return 'DOCUMENT';
    if (isPptFile) return 'PRESENTATION';
    return 'PDF';
  };

  const renderFileTypeIcon = () => {
    if (isDocxFile) return '📄';
    if (isPptFile) return '📊';
    return '📑';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      {/* Main container - 3/4 of screen height, not full width */}
      <div className="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden w-full max-w-[60vw]  h-[95vh]">
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${theme.border} bg-linear-to-r ${theme.bgFrom} ${theme.bgTo} shrink-0`}>
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center gap-3">
              <span className="text-lg">{renderFileTypeIcon()}</span>
              <div>
                <h3 className="text-base font-semibold text-gray-900 truncate">{title}</h3>
                <p className={`text-xs font-medium ${theme.text}`}>
                  {renderFileTypeBadge()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className={`p-2.5 rounded-lg ${theme.buttonHover} transition-colors`}
              title="Download"
            >
              <FaDownload className={`text-gray-600 ${theme.text}`} />
            </button>

            <button
              onClick={handleFullscreen}
              className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              title="Open in new tab"
            >
              <FaExpand className="text-gray-600" />
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2.5 rounded-lg hover:bg-red-100 transition-colors ml-1"
                title="Close"
              >
                <FaTimes className="text-gray-600 hover:text-red-600" />
              </button>
            )}
          </div>
        </div>

        {/* Document Preview Area - Takes remaining space */}
        <div className="flex-1 overflow-hidden bg-linear-to-b from-white to-gray-50 flex flex-col">
          {loadError ? (
            <div className="flex items-center justify-center h-full flex-col gap-5 p-6">
              <div className="p-5 rounded-full bg-amber-100">
                <FaExclamationTriangle className="text-4xl text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Unable to Load File</h3>
              <p className="text-sm text-gray-600 text-center max-w-md">
                The document could not be loaded. Please check the file path or try downloading it.
              </p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-emerald-600 text-white rounded text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  Download Instead
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          ) : isPdfFile || isPptFile ? (
            // PDF/PPT Viewer
            <>
              {isGoogleDrive ? (
                // Google Drive iframe embed
                <div className="flex-1 relative">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white">
                      <div className="text-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-3 border-gray-300 border-t-emerald-500 mx-auto"></div>
                        <p className="text-sm text-gray-600">Loading Google Drive preview...</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={embedUrl}
                    className="w-full h-full border-0"
                    title={title}
                    onLoad={handleIframeLoad}
                    allow="autoplay"
                  />
                </div>
              ) : (
                // Local PDF viewer using react-pdf
                <>
                  <div className="flex-1 overflow-auto p-4">
                    <div className="max-w-4xl mx-auto">
                      <Document
                        file={src}
                        options={pdfOptions}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={
                          <div className="flex items-center justify-center py-16">
                            <div className="text-center space-y-4">
                              <div className={`animate-spin rounded-full h-14 w-14 border-4 ${theme.loadingBg} border-t-${theme.primary}-500 mx-auto`}></div>
                              <p className="text-sm text-gray-600">Loading document preview...</p>
                            </div>
                          </div>
                        }
                      >
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                          <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="mx-auto"
                            width={Math.min(window.innerWidth * 0.6, 1000)}
                            loading={
                              <div className="flex items-center justify-center min-h-100">
                                <div className="text-center space-y-3">
                                  <div className="animate-pulse h-3 w-32 bg-gray-200 rounded mx-auto"></div>
                                  <p className="text-sm text-gray-500">Loading page {pageNumber}...</p>
                                </div>
                              </div>
                            }
                          />
                        </div>
                      </Document>
                    </div>
                  </div>

                  {/* Navigation - Only for PDF with multiple pages */}
                  {numPages > 1 && (
                    <div className={`px-4 py-3 border-t ${theme.border} bg-white shrink-0`}>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={goToPrevPage}
                          disabled={pageNumber <= 1}
                          className={`p-2.5 rounded-lg disabled:opacity-30 ${theme.buttonHover} transition-colors`}
                        >
                          <FaChevronLeft className={theme.text} />
                        </button>

                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-gray-900">Page {pageNumber}</span>
                          <span className="text-gray-500">of {numPages}</span>
                        </div>

                        <button
                          onClick={goToNextPage}
                          disabled={pageNumber >= numPages}
                          className={`p-2.5 rounded-lg disabled:opacity-30 ${theme.buttonHover} transition-colors`}
                        >
                          <FaChevronRight className={theme.text} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          ) : isDocxFile ? (
            // DOCX Preview
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="max-w-md w-full">
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-5">
                    <span className="text-3xl">📄</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Word Document</h3>
                  <p className="text-sm text-gray-600 mb-7 leading-relaxed">
                    For best viewing experience, download this document and open with Microsoft Word or Google Docs.
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleDownload}
                      className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                    >
                      Download Document
                    </button>
                    <button
                      onClick={() => window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(src)}`, '_blank')}
                      className="px-5 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Open with Google Docs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className={`px-5 py-3 border-t ${theme.border} bg-linear-to-r ${theme.bgFrom} ${theme.bgTo} shrink-0`}>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">
              {isPdfFile || isPptFile ? (
                <>
                  {isLoading ? 'Loading document...' : `Viewing ${isPptFile ? 'presentation' : 'document'} • Page ${pageNumber} of ${numPages}`}
                </>
              ) : (
                <span>{isDocxFile ? 'Word document ready' : 'Document ready'}</span>
              )}
            </div>
            {(isPdfFile || isPptFile) && numPages > 0 && (
              <div className={`text-xs font-medium px-3 py-1.5 rounded-full ${theme.badge}`}>
                {numPages} {numPages === 1 ? 'page' : 'pages'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;