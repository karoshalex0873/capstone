export type FileType = 'pdf' | 'link' | 'video' | 'photo' | 'ppt';

export interface FileItem {
  id: number;
  title: string;
  type: FileType;
  href: string;
  description?: string;
  thumbnail?: string; // For videos and photos
  duration?: string; // For videos
}

export interface MenuItem {
  key: string;
  label: string;
  description: string;
  content: FileItem[];
  gallery?: { src: string; title?: string; description?: string }[]; // For photo gallery carousel
}

export interface Student {
  full_name: string;
  reg_no: string;
  institution: string;
  course: string;
  department: string;
  year: string;
}

export interface PortfolioStats {
  totalSections: number;
  totalFiles: number;
  languages: number;
  pages: number;
  description: string;
}