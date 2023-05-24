import { describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TcButton from './TcButton';

describe('TcButton', () => {
  it('Fires click event on button click', () => {
    // Arrange
    const label = 'Click me!';
    const handleClick = vi.fn();

    // Act
    render(<TcButton label={label} onClick={handleClick} />);
    const buttonElement = screen.getByText(label);
    fireEvent.click(buttonElement);

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
