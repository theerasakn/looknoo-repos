import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Card } from './Card';
import { LIGHT } from '../../theme/colors';

describe('Card', () => {
  it('renders children content', () => {
    const { getByText } = render(
      <Card C={LIGHT}><Text>Card content</Text></Card>,
    );
    expect(getByText('Card content')).toBeTruthy();
  });

  it('renders as View when no onPress', () => {
    const { queryByText } = render(
      <Card C={LIGHT}><Text>Static</Text></Card>,
    );
    expect(queryByText('Static')).toBeTruthy();
  });

  it('calls onPress when pressable', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Card C={LIGHT} onPress={onPress}><Text>Tap me</Text></Card>,
    );
    fireEvent.press(getByText('Tap me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
