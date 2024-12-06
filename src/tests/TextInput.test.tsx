import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import TextInput from '../components/TextInput';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TextInput Component', () => {
  const mockOnPdfGenerated = jest.fn();

  beforeEach(() => {
    mockOnPdfGenerated.mockClear();
    mockedAxios.post.mockReset();
  });

  test('відображає інпут і кнопку', () => {
    render(<TextInput onPdfGenerated={mockOnPdfGenerated} />);
    expect(screen.getByPlaceholderText('Enter text to convert to PDF')).toBeInTheDocument();
    expect(screen.getByText('Convert to PDF')).toBeInTheDocument();
  });

  test('відображає помилку, якщо інпут порожній', () => {
    render(<TextInput onPdfGenerated={mockOnPdfGenerated} />);
    fireEvent.click(screen.getByText('Convert to PDF'));
    expect(screen.getByText('Text input cannot be empty')).toBeInTheDocument();
  });

  test('відправляє запит і викликає onPdfGenerated при успіху', async () => {
    const mockPdfData = new Blob(['test pdf data'], { type: 'application/pdf' });
    mockedAxios.post.mockResolvedValueOnce({ data: mockPdfData });

    render(<TextInput onPdfGenerated={mockOnPdfGenerated} />);
    const input = screen.getByPlaceholderText('Enter text to convert to PDF');

    fireEvent.change(input, { target: { value: 'Test PDF Content' } });
    fireEvent.click(screen.getByText('Convert to PDF'));

    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalled());

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://95.217.134.12:4010/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4',
      { text: 'Test PDF Content' },
      { responseType: 'blob' }
    );
    expect(mockOnPdfGenerated).toHaveBeenCalled();
  });

  test('відображає помилку при невдалому запиті', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Error generating PDF'));

    render(<TextInput onPdfGenerated={mockOnPdfGenerated} />);
    const input = screen.getByPlaceholderText('Enter text to convert to PDF');

    fireEvent.change(input, { target: { value: 'Test PDF Content' } });
    fireEvent.click(screen.getByText('Convert to PDF'));

    await waitFor(() => expect(screen.getByText('Error generating PDF')).toBeInTheDocument());
  });

  test('відображає стан "Converting..." під час запиту', async () => {
    const mockPdfData = new Blob(['test pdf data'], { type: 'application/pdf' });
    mockedAxios.post.mockResolvedValueOnce({ data: mockPdfData });

    render(<TextInput onPdfGenerated={mockOnPdfGenerated} />);
    const input = screen.getByPlaceholderText('Enter text to convert to PDF');

    fireEvent.change(input, { target: { value: 'Test PDF Content' } });
    fireEvent.click(screen.getByText('Convert to PDF'));

    expect(screen.getByText('Converting...')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText('Converting...')).not.toBeInTheDocument());
  });
});
