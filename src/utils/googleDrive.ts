// Google Drive utility functions for handling file URLs

/**
 * Check if a URL is a Google Drive link
 */
export const isGoogleDriveUrl = (url: string): boolean => {
  return url.includes('drive.google.com') || url.includes('docs.google.com');
};

/**
 * Extract file ID from various Google Drive URL formats
 */
export const extractFileId = (url: string): string | null => {
  // Handle different Google Drive URL formats
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,  // /file/d/FILE_ID
    /\/d\/([a-zA-Z0-9_-]+)/,         // /d/FILE_ID
    /id=([a-zA-Z0-9_-]+)/,           // id=FILE_ID
    /\/open\?id=([a-zA-Z0-9_-]+)/    // /open?id=FILE_ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
};

/**
 * Convert Google Drive URL to embeddable preview URL
 */
export const getGoogleDriveEmbedUrl = (url: string): string => {
  const fileId = extractFileId(url);

  if (!fileId) {
    return url; // Return original if can't extract ID
  }

  return `https://drive.google.com/file/d/${fileId}/preview`;
};

/**
 * Get direct download URL for Google Drive file
 */
export const getGoogleDriveDownloadUrl = (url: string): string => {
  const fileId = extractFileId(url);

  if (!fileId) {
    return url;
  }

  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

/**
 * Get direct image URL for Google Drive images (works with img tags)
 */
export const getGoogleDriveImageUrl = (url: string): string => {
  const fileId = extractFileId(url);

  if (!fileId) {
    return url;
  }

  // This format allows direct embedding in img tags
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
};

/**
 * Get Google Docs viewer URL for viewing documents
 */
export const getGoogleDocsViewerUrl = (url: string): string => {
  if (isGoogleDriveUrl(url)) {
    return url;
  }

  // For external URLs, use Google Docs viewer
  return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
};

/**
 * Get file type from Google Drive URL or filename
 */
export const getFileTypeFromUrl = (url: string): 'pdf' | 'ppt' | 'doc' | 'image' | 'video' | 'other' => {
  const urlLower = url.toLowerCase();

  if (urlLower.includes('.pdf') || urlLower.includes('application/pdf')) {
    return 'pdf';
  } else if (urlLower.includes('.ppt') || urlLower.includes('.pptx') || urlLower.includes('presentation')) {
    return 'ppt';
  } else if (urlLower.includes('.doc') || urlLower.includes('.docx') || urlLower.includes('document')) {
    return 'doc';
  } else if (urlLower.includes('.jpg') || urlLower.includes('.jpeg') || urlLower.includes('.png') || urlLower.includes('.gif')) {
    return 'image';
  } else if (urlLower.includes('.mp4') || urlLower.includes('.mov') || urlLower.includes('.avi')) {
    return 'video';
  }

  return 'other';
};

/**
 * Generate proper Google Drive links based on file type
 */
export const getOptimalGoogleDriveUrl = (url: string, type: 'pdf' | 'ppt' | 'doc'): string => {
  const fileId = extractFileId(url);

  if (!fileId) {
    return url;
  }

  switch (type) {
    case 'pdf':
      return `https://drive.google.com/file/d/${fileId}/preview`;
    case 'ppt':
      // PowerPoint files can be viewed with preview
      return `https://drive.google.com/file/d/${fileId}/preview`;
    case 'doc':
      // Word documents use Google Docs viewer
      return `https://docs.google.com/document/d/${fileId}/preview`;
    default:
      return `https://drive.google.com/file/d/${fileId}/preview`;
  }
};
