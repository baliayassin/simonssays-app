
import React from 'react';
import { render } from '@testing-library/react-native';
import Highscores from '../src/components/Highscores';

describe('Highscores component', () => {
  it('renders title correctly', () => {
    const { getByText } = render(<Highscores />);
    const titleElement = getByText('Highscores');
    expect(titleElement).toBeDefined();
  });

  it('renders "Play Again" button correctly', () => {
    const { getByText } = render(<Highscores />);
    const playAgainButton = getByText('Play Again');
    expect(playAgainButton).toBeDefined();
  });

});
