import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import TcSidebarItem from './TcSidebarItem';

describe('TcSidebarItem', () => {
  it('Renders sidebar items', () => {
    // Arrange
    const sidebarMenuItems = [
      {
        name: 'Item 1',
        path: '/item1',
        icon: 'icon1',
      },
      {
        name: 'Item 2',
        path: '/item2',
        icon: 'icon2',
        isDisabledRoute: true,
      },
    ];

    // Act
    render(
      <MemoryRouter>
        <TcSidebarItem sidebarMenuItems={sidebarMenuItems} />
      </MemoryRouter>
    );

    // Assert
    const item1Element = screen.getByText('Item 1');
    const item2Element = screen.getByText('Item 2');
    expect(item1Element).toBeInTheDocument();
    expect(item2Element).toBeInTheDocument();
  });
});
