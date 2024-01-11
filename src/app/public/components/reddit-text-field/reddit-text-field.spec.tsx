import { render } from '@testing-library/react';

import RedditTextField from './reddit-text-field';

describe('RedditTextField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RedditTextField />);
    expect(baseElement).toBeTruthy();
  });
});
