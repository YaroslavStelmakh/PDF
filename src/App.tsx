import React, { useState, useEffect } from 'react';
import TextInput from './components/TextInput';
import PdfViewer from './components/PdfViewer';
import HistoryViewer from './components/HistoryViewer';

const App: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('pdfHistory') || '[]');
    setHistory(savedHistory);
  }, []);

  const handlePdfGenerated = (newPdfUrl: string) => {
    setPdfUrl(newPdfUrl);
    const newHistory = [newPdfUrl, ...history];
    setHistory(newHistory);
    localStorage.setItem('pdfHistory', JSON.stringify(newHistory));
  };

  const handlePdfSelect = (pdfUrl: string) => {
    setPdfUrl(pdfUrl);
  };

  return (
    <div className="p-4">
      <h1>Text to PDF Converter</h1>
      <TextInput onPdfGenerated={handlePdfGenerated} />
      <PdfViewer pdfUrl={pdfUrl} />
      <HistoryViewer history={history} onSelect={handlePdfSelect} />
    </div>
  );
};

export default App;
