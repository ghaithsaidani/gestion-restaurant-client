import { render } from '@testing-library/react';

import HorizontalLinearStepper from './horizontal-linear-stepper';

describe('HorizontalLinearStepper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HorizontalLinearStepper />);
    expect(baseElement).toBeTruthy();
  });
});
