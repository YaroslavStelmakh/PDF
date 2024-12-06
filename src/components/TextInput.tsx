import React, { useState } from 'react';
import axios from 'axios';

interface TextInputProps {
  onPdfGenerated: (pdfUrl: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ onPdfGenerated }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    if (!text.trim()) {
      setError('Text input cannot be empty');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://95.217.134.12:4010/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4',
        { text },
        { responseType: 'blob' }
      );

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onPdfGenerated(base64String);

        let pdfHistory = JSON.parse(localStorage.getItem('pdfHistory') || '[]');
        pdfHistory.push(base64String);
        localStorage.setItem('pdfHistory', JSON.stringify(pdfHistory));
      };

      reader.readAsDataURL(response.data);
    } catch (error) {
      setError('Error generating PDF');
      console.error('Error generating PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter text to convert to PDF"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded p-2 mb-2"
      />
      <button
        onClick={handleConvert}
        disabled={isLoading}
        className={`w-full bg-blue-500 text-white py-2 rounded ${
          isLoading ? 'opacity-50' : 'hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Converting...' : 'Convert to PDF'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default TextInput;
