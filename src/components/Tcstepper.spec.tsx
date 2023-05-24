import { render, screen } from '@testing-library/react';
import TcStepper from './TcStepper';

describe('TcStepper', () => {
  const labels = ['Step One', 'Step Two', 'Step Three'];

  it('renders all steps with correct labels', () => {
    render(<TcStepper labels={labels} />);

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
