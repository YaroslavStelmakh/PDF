import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HistoryViewer from '../components/HistoryViewer';

describe('HistoryViewer Component', () => {
    const mockOnSelect = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('відображає повідомлення, коли історія порожня', () => {
        render(<HistoryViewer onSelect={mockOnSelect} history={[]} />);
        expect(screen.getByText('No history available')).toBeInTheDocument();
    });

    test('відображає список історії, коли є дані', () => {
        const mockHistory = ['data:application/pdf;base64,abcd1234', 'data:application/pdf;base64,efgh5678'];
        render(<HistoryViewer onSelect={mockOnSelect} history={mockHistory} />);

        expect(screen.getByText('Document 1')).toBeInTheDocument();
        expect(screen.getByText('Document 2')).toBeInTheDocument();
    });

    test('викликає onSelect з правильним pdfUrl при натисканні на елемент історії', () => {
        const mockHistory = ['data:application/pdf;base64,abcd1234'];
        render(<HistoryViewer onSelect={mockOnSelect} history={mockHistory} />);

        const documentItem = screen.getByText('Document 1');
        fireEvent.click(documentItem);

        expect(mockOnSelect).toHaveBeenCalled();
        expect(mockOnSelect).toHaveBeenCalledWith('data:application/pdf;base64,abcd1234');
    });

    test('підсвічує активний елемент при натисканні', () => {
        const mockHistory = ['data:application/pdf;base64,abcd1234'];
        render(<HistoryViewer onSelect={mockOnSelect} history={mockHistory} />);

        const documentItem = screen.getByText('Document 1');
        fireEvent.click(documentItem);

        expect(documentItem).toHaveClass('bg-blue-200');
    });
});
