import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Btn } from './Btn';
import { LIGHT } from '../../theme/colors';

describe('Btn', () => {
  it('renders children text', () => {
    const { getByText } = render(
      <Btn onPress={jest.fn()} C={LIGHT}>Click me</Btn>,
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Btn onPress={onPress} C={LIGHT}>Press</Btn>,
    );
    fireEvent.press(getByText('Press'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Btn onPress={onPress} disabled C={LIGHT}>Disabled</Btn>,
    );
    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    const { queryByText } = render(
      <Btn onPress={jest.fn()} loading C={LIGHT}>Text</Btn>,
    );
    expect(queryByText('Text')).toBeNull();
  });
});
