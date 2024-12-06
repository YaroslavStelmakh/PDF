import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

interface PdfViewerProps {
  pdfUrl: string | null;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const workerUrl = 'https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js';
  
  return (
    <div className="pdf-viewer bg-gray-100 p-4 rounded">
      {pdfUrl ? (
        <Worker workerUrl={workerUrl}>
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      ) : (
        <p className="text-gray-500">No PDF available</p>
      )}
    </div>
  )
}

export default PdfViewer;
