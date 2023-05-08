import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import TcSidebar from './TcSidebar';

describe('TcSidebar', () => {
  it('renders sidebar items', () => {
    // Arrange
    render(
      <MemoryRouter>
        <TcSidebar />
      </MemoryRouter>
    );

    // Act - nothing to do here

    // Assert
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toBeInTheDocument();

    const sidebarItems = screen.getAllByRole('listitem');
    expect(sidebarItems.length).toBeGreaterThan(0);
  });
});
