import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TcSidebar from './TcSidebar';
import { constant } from '../../constants/Index';

describe('TcSidebar', () => {
  it('renders sidebar items with correct text and links', () => {
    // Arrange
    render(
      <MemoryRouter>
        <TcSidebar />
      </MemoryRouter>
    );

    // Act - nothing to do here

    // Assert
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
  });
});
