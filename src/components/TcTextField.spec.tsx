import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TcTextField from './TcTextField';

describe('TcTextFiel component', () => {
  it('should change label color on click!', () => {
    render(<TcTextField label="Email" />);

    const label = screen.getByLabelText('Email');
    expect(label).toHaveStyle('color: grey[100]');
  });
});
