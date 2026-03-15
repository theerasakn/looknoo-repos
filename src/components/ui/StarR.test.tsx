import React from 'react';
import { render } from '@testing-library/react-native';
import { StarR } from './StarR';
import { LIGHT } from '../../theme/colors';

jest.mock('./Icon', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Text } = require('react-native');
  return {
    Icon: ({ name, color }: { name: string; color: string }) => (
      <Text testID={`icon-${name}`}>{color}</Text>
    ),
  };
});

describe('StarR', () => {
  it('renders 5 full stars for rating 5', () => {
    const { getAllByTestId } = render(<StarR rating={5} C={LIGHT} />);
    const fullStars = getAllByTestId('icon-star');
    expect(fullStars).toHaveLength(5);
  });

  it('renders correct mix for rating 3.5', () => {
    const { getAllByTestId } = render(<StarR rating={3.5} C={LIGHT} />);
    expect(getAllByTestId('icon-star')).toHaveLength(3);
    expect(getAllByTestId('icon-starHalf')).toHaveLength(1);
    expect(getAllByTestId('icon-starOutline')).toHaveLength(1);
  });

  it('renders 5 outline stars for rating 0', () => {
    const { getAllByTestId } = render(<StarR rating={0} C={LIGHT} />);
    expect(getAllByTestId('icon-starOutline')).toHaveLength(5);
  });
});
