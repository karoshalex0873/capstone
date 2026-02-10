import type { MenuItem, Student, PortfolioStats } from "@/types/project";

import {
  RESUMES,
  AUTOBIOGRAPHY,
  AUTO_PRESENTATION,
  INNOVATION,
  AFRICAN_CULTURE,
  MODERN_CHALLENGE,
  PHOTO_ESSAY,
  ONLINE_PLATFORMS
} from "./assets";




// Student information - used in Hero
export const studentInfo: Student = {
  full_name: "Alex Karobia Njoki",
  reg_no: "C025-01-0873/2022",
  institution: "Dedan Kimathi University of Technology",
  course: "BSc Information Technology",
  department: "Information Technology",
  year: "Year 4"
};

// Portfolio statistics - Aligned with rubric requirements
export const portfolioStats: PortfolioStats = {
  totalSections: 8, // 8 major rubric sections
  totalFiles: 30,   // Comprehensive deliverables count
  languages: 3,     // English, Kiswahili, Kikuyu
  pages: 30,        // Autobiographical essay pages
  description: "Comprehensive Capstone Portfolio - 100% Rubric Aligned"
};

// Quick stats for hero - Updated to reflect rubric alignment
export const heroStats = [
  { label: "Deliverables", value: "10", color: "bg-blue-500" },
  { label: "Videos (20min)", value: "3", color: "bg-purple-500" },
  { label: "Languages", value: "3", color: "bg-emerald-500" },
  { label: "Platforms", value: "8+", color: "bg-amber-500" }
];

// Student info items with icons and order
export const studentInfoItems = [
  { key: 'reg_no' as const, label: 'Registration Number', icon: 'FaIdCard' },
  { key: 'course' as const, label: 'Course', icon: 'FaBook' },
  { key: 'institution' as const, label: 'Institution', icon: 'FaUniversity' },
  { key: 'year' as const, label: 'Year of Study', icon: 'FaCalendar' }
];

// ============================================================================
// PROJECT MENU - STRUCTURED EXACTLY PER MARKING RUBRIC
// ============================================================================
// Each section represents one rubric requirement for maximum score alignment

export const projectMenu: MenuItem[] = [
  // ========================================================================
  // RUBRIC ITEM 1: Professional Resumes (3 Languages)
  // Requirement: English, Kiswahili, and one indigenous African language
  // ========================================================================
  {
    key: "resumes",
    label: "1. Professional Resumes",
    description: "Up-to-date resumes in English, Kiswahili & Kikuyu",
    content: [
      {
        id: 1,
        title: "Resume - English",
        type: "pdf" as const,
        href: RESUMES.ENGLISH,
        description: "Professional resume in English"
      },
      {
        id: 2,
        title: "Resume - Kiswahili",
        type: "pdf" as const,
        href: RESUMES.KISWAHILI,
        description: "Professional resume in Kiswahili"
      },
      {
        id: 3,
        title: "Resume - Kikuyu",
        type: "pdf" as const,
        href: RESUMES.KIKUYU,
        description: "Professional resume in Kikuyu language"
      }
    ],
  },

  // ========================================================================
  // RUBRIC ITEM 2 & 3: Autobiographical Essay (20-30 pages) + Presentation
  // Requirement: Well-structured essay meeting academic standards with presentation
  // ========================================================================
  {
    key: "autobiography",
    label: "2. Autobiographical Essay",
    description: "20-30 page life story with presentation",
    content: [
      {
        id: 4,
        title: "Autobiographical Essay",
        type: "pdf" as const,
        href: AUTOBIOGRAPHY.ESSAY_PDF,
        description: "Complete 20-30 page autobiographical essay documenting life journey, achievements, and experiences"
      },
      {
        id: 5,
        title: "Essay Summary Presentation (PDF)",
        type: "pdf" as const,
        href: AUTO_PRESENTATION.PDF,
        description: "PDF version of the presentation summary"
      }
    ],
  },

  // ========================================================================
  // RUBRIC ITEM 4: Innovation/Invention in Field of Study
  // Requirement: 20-minute video + abstracts (3 languages) + presentation
  // ========================================================================
  {
    key: "innovation",
    label: "3. Innovation & Invention",
    description: "M-Pesa innovation - 20-min video with abstracts",
    content: [
      {
        id: 7,
        title: "Innovation Video Presentation (20 minutes)",
        type: "video" as const,
        href: INNOVATION.VIDEO,
        description: "20-minute video on M-Pesa innovation in IT",
        duration: "20:00"
      },
      {
        id: 8,
        title: "Innovation Presentation Slides",
        type: "pdf" as const,
        href: INNOVATION.PRESENTATION,
        description: "PowerPoint: M-Pesa Innovation - Simple Tech, Massive Impact"
      },
      {
        id: 9,
        title: "Innovation Abstract (All Languages)",
        type: "pdf" as const,
        href: INNOVATION.ABSTRACT,
        description: "Complete abstract in English, Kiswahili & Kikuyu"
      }
    ],
  },

  // ========================================================================
  // RUBRIC ITEM 5: African Culture with Gender Awareness
  // Requirement: 20-minute video + gender discussion + abstracts (3 languages) + presentation
  // ========================================================================
  {
    key: "culture",
    label: "4. African Culture & Gender",
    description: "Kikuyu rite of passage - 20-min video with gender awareness",
    content: [
      {
        id: 12,
        title: "African Culture Video (20 minutes)",
        type: "video" as const,
        href: AFRICAN_CULTURE.VIDEO,
        description: "20-minute video on Kikuyu culture with gender awareness discussion",
        duration: "20:00"
      },
      {
        id: 13,
        title: "Culture Presentation Slides",
        type: "pdf" as const,
        href: AFRICAN_CULTURE.PRESENTATION,
        description: "PowerPoint: Irua - The Kikuyu Rite of Passage"
      },
      {
        id: 14,
        title: "Culture Abstract (All Languages)",
        type: "pdf" as const,
        href: AFRICAN_CULTURE.ABSTRACT,
        description: "Complete abstract with gender discussion in English, Kiswahili & Kikuyu"
      }
    ],
  },

  // ========================================================================
  // RUBRIC ITEM 6: Modern Societal Challenge + Solution
  // Requirement: 20-minute video + feasible solution + abstracts (3 languages)
  // ========================================================================
  {
    key: "challenge",
    label: "5. Modern Challenge & Solution",
    description: "Technology as solution - 20-min video with abstracts",
    content: [
      {
        id: 17,
        title: "Challenge Solution Video (20 minutes)",
        type: "video" as const,
        href: MODERN_CHALLENGE.VIDEO,
        description: "20-minute video presenting societal challenge and feasible solution",
        duration: "20:00"
      },
      {
        id: 18,
        title: "Solution Presentation Slides",
        type: "pdf" as const,
        href: MODERN_CHALLENGE.PRESENTATION,
        description: "PowerPoint: Technology as a Solution to Modern Challenges"
      },
      {
        id: 19,
        title: "Challenge Abstract (All Languages)",
        type: "pdf" as const,
        href: MODERN_CHALLENGE.ABSTRACT,
        description: "Complete challenge/solution abstract in English, Kiswahili & Kikuyu"
      }
    ],
  },

  // ========================================================================
  // RUBRIC ITEM 7: Photographic Essay
  // Requirement: Addressing significant African community issue
  // ========================================================================
  {
    key: "photo_essay",
    label: "6. Photographic Essay",
    description: "Visual essay on African community issue",
    content: [],
    // Photo gallery data for carousel
    gallery: [
      {
        src: PHOTO_ESSAY.PHOTO1,
        title: "Community Issue - Image 1",
        description: "Photographic documentation of community issue"
      },
      {
        src: PHOTO_ESSAY.PHOTO2,
        title: "Community Issue - Image 2",
        description: "Supporting visual evidence"
      },
      {
        src: PHOTO_ESSAY.PHOTO3,
        title: "Community Issue - Image 3",
        description: "Community impact illustration"
      },
      {
        src: PHOTO_ESSAY.PHOTO4,
        title: "Community Issue - Image 4",
        description: "Additional context photograph"
      }
    ]
  },

  // ========================================================================
  // RUBRIC ITEM 8: Online Professional Platforms
  // Requirement: Verifiable professional presence on digital platforms
  // ========================================================================
  {
    key: "online_platforms",
    label: "7. Online Platforms",
    description: "Professional digital presence",
    content: [
      {
        id: 28,
        title: "GitHub Portfolio",
        type: "link" as const,
        href: ONLINE_PLATFORMS.GITHUB,
        description: "Code repositories and technical projects"
      },
      {
        id: 29,
        title: "LinkedIn Profile",
        type: "link" as const,
        href: ONLINE_PLATFORMS.LINKEDIN,
        description: "Professional networking profile"
      },
      {
        id: 30,
        title: "LinkedIn Profile",
        type: "link" as const,
        href: ONLINE_PLATFORMS.FACEBOOK,
        description: "Professional networking profile"
      },
      {
        id: 31,
        title: "Instagram Profile",
        type: "link" as const,
        href: ONLINE_PLATFORMS.INSTAGRAM,
        description: "Professional networking profile"
      }
    ],
  },
];