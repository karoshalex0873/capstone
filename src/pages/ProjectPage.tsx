import React, { useState } from 'react';
import { projectMenu } from '@/constants/projectData';
import type { FileItem, MenuItem } from '@/types/project';
import {
  FaFilePdf,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaPlay,
  FaFilePowerpoint,
  FaGithub,
  FaLinkedin,
  FaFileAlt,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaGraduationCap,
  FaUniversity,
  FaIdCard,
  FaBook,
  FaCalendar,
  FaUserCircle,
  FaLanguage,
  FaGlobe,
  FaLightbulb,
  FaCamera,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import VideoModal from '@/components/VideoPlayer/VideoModal';
import DocumentViewer from '@/components/DocumentViewer/DocumentViewer';
import ImageGallery from '@/components/ImageGallery/ImageGallery';

const ProjectPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("resumes");
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [videoModal, setVideoModal] = useState<FileItem | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeMenu = projectMenu.find((item: MenuItem) => item.key === activeSection);
  const activeContent = activeMenu?.content || [];
  const activeGallery = activeMenu?.gallery || null;

  // Get icon for each section
  const getSectionIcon = (key: string) => {
    switch (key) {
      case 'resumes': return <FaIdCard className="text-emerald-600" />;
      case 'autobiography': return <FaBook className="text-blue-600" />;
      case 'innovation': return <FaLightbulb className="text-orange-600" />;
      case 'culture': return <FaUsers className="text-purple-600" />;
      case 'challenge': return <FaChartLine className="text-red-600" />;
      case 'photo_essay': return <FaCamera className="text-pink-600" />;
      case 'online_platforms': return <FaGlobe className="text-emerald-600" />;
      default: return <FaFileAlt className="text-gray-600" />;
    }
  };

  const handleFileClick = (file: FileItem): void => {
    if (file.type === 'link') {
      window.open(file.href, '_blank', 'noopener,noreferrer');
    } else if (file.type === 'video') {
      setVideoModal(file);
    } else if (file.type === 'pdf' || file.type === 'ppt') {
      setPreviewFile(file);
    } else {
      window.open(file.href, '_blank');
    }
  };

  const closePreviews = () => {
    setPreviewFile(null);
    setVideoModal(null);
  };

  const handleMenuClick = (key: string) => {
    setActiveSection(key);
    setSidebarOpen(false);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FaFilePdf className="text-red-600" />;
      case 'ppt':
        return <FaFilePowerpoint className="text-orange-600" />;
      case 'video':
        return <FaPlay className="text-blue-600" />;
      case 'link':
        return <FaExternalLinkAlt className="text-emerald-600" />;
      default:
        return <FaFileAlt className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 lg:hidden shadow-sm">
        <div className="flex items-center justify-between h-14 px-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? (
              <FaTimes className="text-xl text-gray-900" />
            ) : (
              <FaBars className="text-xl text-gray-900" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-gray-900 tracking-wide uppercase">Portfolio</span>
          </div>

          <Link
            to="/"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Back to home"
          >
            <FaArrowLeft className="text-sm text-gray-900" />
          </Link>
        </div>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 shrink-0 bg-linear-to-r from-emerald-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse"></div>
              <span className="text-sm font-bold text-gray-900 tracking-wide">Dashboard</span>
            </div>
            <Link
              to="/"
              className="hidden lg:flex items-center gap-2 text-xs text-gray-600 hover:text-emerald-700 transition-colors font-medium"
            >
              <FaArrowLeft className="text-[10px]" />
              <span>Back</span>
            </Link>
          </div>

          {/* Student Profile Card */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="bg-linear-to-br from-white to-emerald-50 rounded-xl border border-emerald-100 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-emerald-100 border border-emerald-200">
                  <FaUserCircle className="text-lg text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{activeMenu?.label || "Alex Karobia Njoki"}</h3>
                  <p className="text-xs text-emerald-700 font-medium">Capstone Project</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <FaUniversity className="text-emerald-600" />
                  <span className="text-gray-700 font-medium">DeKUT</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <FaBook className="text-emerald-600" />
                  <span className="text-gray-700 font-medium">Information Technology</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <FaCalendar className="text-emerald-600" />
                  <span className="text-gray-700 font-medium">Year 4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4 px-4 bg-gray-50/50">
            <div className="space-y-1">
              {projectMenu.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-sm transition-all duration-200 group ${activeSection === item.key
                    ? 'bg-white shadow-sm border border-emerald-100'
                    : 'hover:bg-white hover:shadow-sm hover:border hover:border-gray-200'
                    }`}
                >
                  <div className={`p-2 rounded-lg ${activeSection === item.key ? 'bg-emerald-50' : 'bg-gray-100 group-hover:bg-emerald-50'} transition-colors`}>
                    {getSectionIcon(item.key)}
                  </div>
                  <div className="flex flex-col items-start gap-0.5 flex-1">
                    <span className={`font-semibold text-left ${activeSection === item.key ? 'text-emerald-800' : 'text-gray-800'}`}>
                      {item.label}
                    </span>
                    <span className={`text-xs ${activeSection === item.key ? 'text-emerald-600' : 'text-gray-500'}`}>
                      {item.gallery ? `${item.gallery.length} photos` : `${item.content?.length || 0} item${(item.content?.length || 0) !== 1 ? 's' : ''}`}
                    </span>
                  </div>
                  <FaChevronRight
                    className={`text-xs transition-transform ${activeSection === item.key ? 'text-emerald-600 translate-x-0.5' : 'text-gray-400 group-hover:text-emerald-500'
                      }`}
                  />
                </button>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="shrink-0 border-t border-gray-200 p-4 bg-white">
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="p-1.5 rounded bg-emerald-100 border border-emerald-200">
                  <FaGraduationCap className="text-xs text-emerald-700" />
                </div>
                <span className="text-xs font-bold text-gray-900">Final Year Project</span>
              </div>
              <p className="text-[10px] text-gray-600 font-medium">DeKUT • Information Technology</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen flex flex-col bg-gray-50">
        {/* Desktop Header - Matches your screenshot */}
        <header className="hidden lg:block sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  {getSectionIcon(activeSection)}
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">{activeMenu?.label}</h1>
                  <p className="text-sm text-gray-600 mt-0.5">{activeMenu?.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-sm font-bold text-emerald-700 tabular-nums">
                  {activeContent.length} {activeContent.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <FaArrowLeft className="text-xs" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Content Area - Scrollable but footer stays at bottom */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Mobile Section Header */}
            <div className="lg:hidden mb-6 bg-linear-to-r from-emerald-50 to-white rounded-xl border border-emerald-100 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white border border-emerald-200">
                  {getSectionIcon(activeSection)}
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">{activeMenu?.label}</h1>
                  <p className="text-sm text-gray-600 mt-0.5">{activeMenu?.description}</p>
                </div>
              </div>
              <div className="px-3 py-1.5 bg-white rounded-lg w-fit border border-emerald-200">
                <span className="text-sm font-bold text-emerald-700">
                  {activeContent.length} {activeContent.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            {/* Photo Essay - Gallery View */}
            {activeSection === 'photo_essay' && activeGallery && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <h2 className="text-base font-bold text-gray-900">Photo Gallery</h2>
                </div>
                <ImageGallery images={activeGallery} />
              </div>
            )}

            {/* Language indicator for resumes */}
            {activeSection === 'resumes' && (
              <div className="mb-6 p-4 bg-linear-to-r from-emerald-50 to-white rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2 mb-2">
                  <FaLanguage className="text-emerald-600" />
                  <h3 className="text-sm font-bold text-gray-900">Multilingual Resumes</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Professional resumes available in multiple languages as per project requirements
                </p>
              </div>
            )}

            {/* Content Grid - Improved styling to match screenshot */}
            {activeContent.length === 0 && !activeGallery ? (
              <div className="bg-white rounded-xl p-12 sm:p-16 text-center border-2 border-dashed border-gray-300">
                <div className="text-4xl sm:text-5xl mb-4 opacity-40">📁</div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No items available</h3>
                <p className="text-xs sm:text-sm text-gray-600">Content will appear here once uploaded.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {activeContent.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => handleFileClick(file)}
                    className="group bg-white rounded-xl border border-gray-200 hover:border-emerald-300 p-5 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  >
                    {/* Header with language indicator for resumes */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2.5 rounded-lg bg-gray-50 group-hover:bg-emerald-50 transition-colors border border-gray-200 group-hover:border-emerald-200">
                        <div className="text-xl text-gray-600 group-hover:text-emerald-600 transition-colors">
                          {getFileIcon(file.type)}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${file.type === 'pdf' ? 'bg-red-50 text-red-700 border border-red-200' :
                          file.type === 'ppt' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                            file.type === 'video' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                          {file.type}
                        </span>

                        {/* Language badge for resumes */}
                        {activeSection === 'resumes' && file.title.includes('English') && (
                          <span className="text-[10px] font-medium px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                            ENGLISH
                          </span>
                        )}
                        {activeSection === 'resumes' && file.title.includes('Kiswahili') && (
                          <span className="text-[10px] font-medium px-2 py-0.5 bg-green-50 text-green-700 rounded border border-green-200">
                            KISWAHILI
                          </span>
                        )}
                        {activeSection === 'resumes' && file.title.includes('Kikuyu') && (
                          <span className="text-[10px] font-medium px-2 py-0.5 bg-purple-50 text-purple-700 rounded border border-purple-200">
                            KIKUYU
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-semibold text-gray-900 mb-2 transition-colors line-clamp-2 text-base leading-snug">
                      {file.title}
                    </h3>
                    {file.description && (
                      <p className="text-sm text-gray-600 line-clamp-3 mb-3 leading-relaxed">
                        {file.description}
                      </p>
                    )}

                    {/* Duration badge for videos */}
                    {file.duration && (
                      <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium mb-3 bg-emerald-50 px-2.5 py-1.5 rounded-lg w-fit border border-emerald-100">
                        <FaPlay className="text-[10px]" />
                        <span>{file.duration}</span>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-700 group-hover:text-emerald-700 transition-colors">
                          {file.type === 'link' ? 'Open Link' : file.type === 'video' ? 'Watch Video' : 'View Document →'}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                          <FaChevronRight className="text-xs text-gray-500 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </div>

                    {/* Platform Icons */}
                    {activeSection === 'online_platforms' && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        {file.title.includes('GitHub') && (
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded bg-gray-100">
                              <FaGithub className="text-base text-gray-800" />
                            </div>
                            <span className="text-xs text-gray-600 font-medium">GitHub Repository</span>
                          </div>
                        )}
                        {file.title.includes('LinkedIn') && (
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded bg-blue-100">
                              <FaLinkedin   className="text-base text-blue-600" />
                            </div>
                            <span className="text-xs text-gray-600 font-medium">LinkedIn Profile</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Fixed Footer - Matches your screenshot styling */}
        <footer className="border-t border-gray-200 bg-white py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-gray-900 text-sm font-semibold mb-1">
                  © {new Date().getFullYear()} Alex Karobia Njoki
                </p>
                <p className="text-gray-600 text-xs font-medium">
                  Dedan Kimathi University of Technology • Information Technology
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="font-medium">Final Year Capstone Project</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Modals */}
      {previewFile && (
        <DocumentViewer
          src={previewFile.href}
          title={previewFile.title}
          type={previewFile.type as 'pdf' | 'ppt'}
          onClose={closePreviews}
        />
      )}

      {videoModal && (
        <VideoModal
          src={videoModal.href}
          title={videoModal.title}
          description={videoModal.description}
          duration={videoModal.duration}
          onClose={closePreviews}
        />
      )}
    </div>
  );
};

export default ProjectPage;