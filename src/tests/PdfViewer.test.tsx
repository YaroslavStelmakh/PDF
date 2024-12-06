import React from 'react';
import { render, screen } from '@testing-library/react';
import PdfViewer from '../components/PdfViewer';

describe('PdfViewer Component', () => {
  const mockPdfUrl = 'data:application/pdf;base64,examplebase64data';

  test('відображає повідомлення, коли немає PDF', () => {
    render(<PdfViewer pdfUrl={null} />);
    expect(screen.getByText('No PDF available')).toBeInTheDocument();
  });

  test('відображає компонент Viewer, коли є pdfUrl', () => {
    render(<PdfViewer pdfUrl={mockPdfUrl} />);

    const viewerElement = screen.getByText('Loading...');
    expect(viewerElement).toBeInTheDocument();
  });

  test('відображає правильний контейнер для перегляду PDF', () => {
    render(<PdfViewer pdfUrl={mockPdfUrl} />);
    const pdfViewerContainer = screen.getByRole('region');

    expect(pdfViewerContainer).toHaveClass('pdf-viewer bg-gray-100 p-4 rounded');
  });
});
