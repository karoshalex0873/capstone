import React, { useState, useMemo, useEffect } from 'react';
import { FaTimes, FaDownload, FaExpand, FaExclamationTriangle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import pdfWorkerSrc from 'react-pdf/dist/pdf.worker.entry.js?url';

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
        badge: 'bg-blue-100 text-blue-700 border-blue-200'
      };
    } else if (isPptFile) {
      return {
        primary: 'orange',
        bgFrom: 'from-orange-50',
        bgTo: 'to-white',
        text: 'text-orange-600',
        buttonHover: 'hover:bg-orange-100',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-700 border-orange-200'
      };
    } else {
      return {
        primary: 'emerald',
        bgFrom: 'from-emerald-50',
        bgTo: 'to-white',
        text: 'text-emerald-600',
        buttonHover: 'hover:bg-emerald-100',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-700 border-emerald-200'
      };
    }
  };

  const theme = getThemeColors();

  useEffect(() => {
    setIsLoading(true);
    setLoadError(false);
    setPageNumber(1);
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

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFullscreen = () => {
    window.open(src, '_blank');
  };

  const renderFileTypeBadge = () => {
    if (isDocxFile) return 'DOCUMENT';
    if (isPptFile) return 'PRESENTATION';
    return 'PDF';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${theme.border} bg-linear-to-r ${theme.bgFrom} ${theme.bgTo}`}>
          <div className="flex-1 min-w-0 mr-4">
            <h3 className="text-base font-medium text-gray-900 truncate">{title}</h3>
            <p className={`text-xs font-medium ${theme.text}`}>
              {renderFileTypeBadge()}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleDownload}
              className={`p-2 rounded ${theme.buttonHover} transition-colors`}
              title="Download"
            >
              <FaDownload className={`text-gray-600 ${theme.text}`} />
            </button>

            <button
              onClick={handleFullscreen}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              title="Open in new tab"
            >
              <FaExpand className="text-gray-600" />
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded hover:bg-red-100 transition-colors ml-1"
                title="Close"
              >
                <FaTimes className="text-gray-600 hover:text-red-600" />
              </button>
            )}
          </div>
        </div>

        {/* Document Preview Area */}
        <div className="flex-1 overflow-hidden bg-gray-50 flex flex-col min-h-0">
          {loadError ? (
            <div className="flex items-center justify-center h-full flex-col gap-4 p-4">
              <div className="p-4 rounded-full bg-amber-100">
                <FaExclamationTriangle className="text-3xl text-amber-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Unable to Load File</h3>
              <p className="text-sm text-gray-600 text-center max-w-md">
                The document could not be loaded. Please check the file path or try downloading it.
              </p>
              <div className="flex gap-2 mt-2">
                {onClose && (
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-800 text-white rounded text-sm font-medium hover:bg-gray-900 transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          ) : isPdfFile || isPptFile ? (
            // PDF Viewer for both PDF and PPT (assuming PPT is converted to PDF)
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
                        <div className="text-center space-y-3">
                          <div className="animate-spin rounded-full h-12 w-12 border-3 border-gray-300 border-t-gray-600 mx-auto"></div>
                          <p className="text-sm text-gray-600">Loading document...</p>
                        </div>
                      </div>
                    }
                  >
                    <div className="bg-white rounded border border-gray-200 p-2">
                      <Page
                        pageNumber={pageNumber}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="mx-auto"
                        width={Math.min(window.innerWidth - 96, 800)}
                        loading={
                          <div className="flex items-center justify-center min-h-150">
                            <div className="animate-pulse h-4 w-24 bg-gray-200 rounded"></div>
                          </div>
                        }
                      />
                    </div>
                  </Document>
                </div>
              </div>

              {/* Navigation */}
              {numPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-200 bg-white">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={goToPrevPage}
                      disabled={pageNumber <= 1}
                      className={`p-2 rounded disabled:opacity-30 ${theme.buttonHover}`}
                    >
                      <FaChevronLeft className={theme.text} />
                    </button>

                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Page {pageNumber}</span>
                      <span className="text-gray-500"> / {numPages}</span>
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={pageNumber >= numPages}
                      className={`p-2 rounded disabled:opacity-30 ${theme.buttonHover}`}
                    >
                      <FaChevronRight className={theme.text} />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : isDocxFile ? (
            // DOCX Preview
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="max-w-md w-full">
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📄</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Word Document</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    This document is available for download. For best viewing, open with Microsoft Word or Google Docs.
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2.5 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors"
                    >
                      Download Document
                    </button>
                    <button
                      onClick={() => window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(src)}`, '_blank')}
                      className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
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
        <div className={`px-4 py-2 border-t ${theme.border} bg-linear-to-r ${theme.bgFrom} ${theme.bgTo}`}>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">
              {isPdfFile || isPptFile ? (
                <>
                  {isLoading ? 'Loading...' : `Page ${pageNumber} of ${numPages}`}
                </>
              ) : (
                <span>Document ready</span>
              )}
            </div>
            {(isPdfFile || isPptFile) && numPages > 0 && (
              <div className={`text-xs font-medium px-2 py-1 rounded ${theme.badge}`}>
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