import React, { useState, useEffect } from 'react';

interface HistoryViewerProps {
  onSelect: (pdfUrl: string) => void;
  history: string[]
}

const HistoryViewer: React.FC<HistoryViewerProps> = ({ onSelect, history }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);



  const handleSelect = (base64String: string, index: number) => {
    const blob = fetch(base64String)
      .then((res) => res.blob())
      .then((blob) => {
        const pdfUrl = URL.createObjectURL(blob);
        onSelect(pdfUrl);
      });
    setActiveIndex(index);
  };

  return (
    <div className="history bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Conversion History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No history available</p>
      ) : (
        <ul className="list-none">
          {history.map((base64String: string, index: number) => (
            <li
              key={index}
              onClick={() => handleSelect(base64String, index)}
              className={`cursor-pointer p-2 rounded ${index === activeIndex
                  ? 'bg-blue-200 text-blue-800'
                  : 'hover:bg-gray-100'
                }`}
            >
              Document {index + 1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryViewer;
