import React from 'react';
import { TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Toggle } from './Toggle';
import { LIGHT } from '../../theme/colors';

describe('Toggle', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <Toggle on={false} onToggle={jest.fn()} C={LIGHT} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('calls onToggle when pressed', () => {
    const onToggle = jest.fn();
    const { UNSAFE_getAllByType } = render(
      <Toggle on={false} onToggle={onToggle} C={LIGHT} />,
    );
    const touchables = UNSAFE_getAllByType(TouchableOpacity);
    fireEvent.press(touchables[0]);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
