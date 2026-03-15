import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from './Badge';
import { LIGHT } from '../../theme/colors';

describe('Badge', () => {
  it('renders text content', () => {
    const { getByText } = render(<Badge text="restaurant" C={LIGHT} />);
    expect(getByText('restaurant')).toBeTruthy();
  });

  it('uses primary color by default', () => {
    const { getByText } = render(<Badge text="test" C={LIGHT} />);
    const textEl = getByText('test');
    expect(textEl.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: LIGHT.primary })]),
    );
  });

  it('uses custom color when provided', () => {
    const { getByText } = render(
      <Badge text="urgent" color="#FF0000" C={LIGHT} />,
    );
    const textEl = getByText('urgent');
    expect(textEl.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#FF0000' })]),
    );
  });
});
