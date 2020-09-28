import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('zip based search', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/zip/i);
  expect(linkElement).toBeInTheDocument();
});
