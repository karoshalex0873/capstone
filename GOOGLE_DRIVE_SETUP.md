/\*\*

- GOOGLE DRIVE SETUP GUIDE
- =========================
-
- To use Google Drive for hosting your documents:
-
- 1.  UPLOAD YOUR DOCUMENTS FOLDER TO GOOGLE DRIVE
- - Keep the same folder structure as your local "documents" folder
- - Upload all PDFs, presentations, resumes, abstracts, etc.
- - Your folder link: https://drive.google.com/drive/folders/16HFjSZfH8qFIMvmaruQ9O1JFuPAYl75H
-
- 2.  MAKE FILES PUBLICLY ACCESSIBLE
- - Right-click on your main "documents" folder
- - Click "Share" > "Anyone with the link"
- - Set permission to "Viewer"
- - This will apply to all files in the folder
-
- 3.  GET INDIVIDUAL FILE IDs
- For each file you want to display:
- a) Right-click the file > "Get link" or "Share"
- b) Copy the link that looks like:
-       https://drive.google.com/file/d/FILE_ID_HERE/view?usp=sharing
- c) Extract the FILE_ID_HERE part
-
- Example:
- Link: https://drive.google.com/file/d/1a2B3c4D5e6F7g8H9i0J/view?usp=sharing
- File ID: 1a2B3c4D5e6F7g8H9i0J
-
- 4.  UPDATE assets.ts
- Replace local paths with Google Drive links:
-
- Before:
- ENGLISH: "/documents/resumes/resume-en.pdf"
-
- After:
- ENGLISH: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing"
-
- 5.  EXAMPLE UPDATED assets.ts STRUCTURE:
      \*/

export const EXAMPLE_ASSETS = {
RESUMES: {
ENGLISH: "https://drive.google.com/file/d/1AbCdEfGhIjKlMnOp/view?usp=sharing",
KISWAHILI: "https://drive.google.com/file/d/2QrStUvWxYzAbCdEf/view?usp=sharing",
KIKUYU: "https://drive.google.com/file/d/3GhIjKlMnOpQrStUv/view?usp=sharing",
},

AUTOBIOGRAPHY: {
ESSAY_PDF: "https://drive.google.com/file/d/4WxYzAbCdEfGhIjKl/view?usp=sharing",
},

AUTO_PRESENTATION: {
PDF: "https://drive.google.com/file/d/5MnOpQrStUvWxYzAb/view?usp=sharing",
},

INNOVATION: {
VIDEO: "https://drive.google.com/file/d/6CdEfGhIjKlMnOpQr/view?usp=sharing",
ABSTRACT: "https://drive.google.com/file/d/7StUvWxYzAbCdEfGh/view?usp=sharing",
PRESENTATION: "https://drive.google.com/file/d/8IjKlMnOpQrStUvWx/view?usp=sharing",
},

PHOTO_ESSAY: {
PHOTO1: "https://drive.google.com/file/d/9YzAbCdEfGhIjKlMn/view?usp=sharing",
PHOTO2: "https://drive.google.com/file/d/0OpQrStUvWxYzAbCd/view?usp=sharing",
PHOTO3: "https://drive.google.com/file/d/1EfGhIjKlMnOpQrSt/view?usp=sharing",
PHOTO4: "https://drive.google.com/file/d/2UvWxYzAbCdEfGhIj/view?usp=sharing",
},
};

/\*\*

- QUICK STEPS TO GET FILE IDs FROM YOUR FOLDER:
- ==============================================
-
- 1.  Open your folder: https://drive.google.com/drive/folders/16HFjSZfH8qFIMvmaruQ9O1JFuPAYl75H
-
- 2.  For each subfolder (resumes, abstracts, ppts, photos, auto_essy):
- - Navigate into it
- - For each file, right-click > "Get link"
- - Copy the file ID from the URL
- - Replace the corresponding path in assets.ts
-
- 3.  YOUR FOLDER STRUCTURE SHOULD MAP LIKE THIS:
-
- documents/
- ├── resumes/
- │ ├── resume-en.pdf → Get file ID → Update RESUMES.ENGLISH
- │ ├── resume_swahili.pdf → Get file ID → Update RESUMES.KISWAHILI
- │ └── resume_kikuyu.pdf → Get file ID → Update RESUMES.KIKUYU
- │
- ├── abstracts/
- │ ├── ABSTRACT 1 Inovation.pdf → Get file ID → Update INNOVATION.ABSTRACT
- │ ├── ABSTRACT 2 culture.pdf → Get file ID → Update AFRICAN_CULTURE.ABSTRACT
- │ └── ABSTRACT 3...pdf → Get file ID → Update MODERN_CHALLENGE.ABSTRACT
- │
- ├── ppts/
- │ ├── Presentation - M-Pesa...pdf → Get file ID → Update INNOVATION.PRESENTATION
- │ ├── Presentation - Irua...pdf → Get file ID → Update AFRICAN_CULTURE.PRESENTATION
- │ └── Presentation - Tech...pdf → Get file ID → Update MODERN_CHALLENGE.PRESENTATION
- │
- ├── photos/
- │ ├── photo_essay_1.JPG → Get file ID → Update PHOTO_ESSAY.PHOTO1
- │ ├── photo_essay_2.jpg → Get file ID → Update PHOTO_ESSAY.PHOTO2
- │ ├── photo_essay_3.jpg → Get file ID → Update PHOTO_ESSAY.PHOTO3
- │ └── photo_essay_4.JPG → Get file ID → Update PHOTO_ESSAY.PHOTO4
- │
- └── auto_essy/
-        ├── autobio essy.pdf            → Get file ID → Update AUTOBIOGRAPHY.ESSAY_PDF
-        └── Presentation - From...pdf  → Get file ID → Update AUTO_PRESENTATION.PDF
-
-
- TIPS:
- =====
- - The system will automatically detect Google Drive URLs and handle them properly
- - Videos and documents will be embedded using iframe
- - No need to change the format - just replace the paths with Google Drive links
- - Make sure to set sharing to "Anyone with the link" for all files
- - Keep the same structure in your assets.ts, just change the URLs
    \*/

// After getting all file IDs, your assets.ts should look like this:

/\*
export const RESUMES = {
ENGLISH: "https://drive.google.com/file/d/YOUR_RESUME_EN_FILE_ID/view?usp=sharing",
KISWAHILI: "https://drive.google.com/file/d/YOUR_RESUME_SW_FILE_ID/view?usp=sharing",
KIKUYU: "https://drive.google.com/file/d/YOUR_RESUME_KI_FILE_ID/view?usp=sharing",
} as const;

export const AUTOBIOGRAPHY = {
ESSAY_PDF: "https://drive.google.com/file/d/YOUR_ESSAY_FILE_ID/view?usp=sharing",
} as const;

export const AUTO_PRESENTATION = {
PDF: "https://drive.google.com/file/d/YOUR_PRESENTATION_FILE_ID/view?usp=sharing",
} as const;

export const INNOVATION = {
VIDEO: "https://drive.google.com/file/d/YOUR_VIDEO_FILE_ID/view?usp=sharing",
ABSTRACT: "https://drive.google.com/file/d/YOUR_ABSTRACT_FILE_ID/view?usp=sharing",
PRESENTATION: "https://drive.google.com/file/d/YOUR_PRESENTATION_FILE_ID/view?usp=sharing",
} as const;

// ... and so on for all other files
\*/
