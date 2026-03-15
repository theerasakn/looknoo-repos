import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TopBar } from './TopBar';
import { LIGHT } from '../../theme/colors';

const insets = { top: 0, bottom: 0, left: 0, right: 0, frame: { x: 0, y: 0, width: 0, height: 0 } };

const wrap = (ui: React.ReactElement) => (
  <SafeAreaProvider initialMetrics={{ insets, frame: insets.frame }}>
    {ui}
  </SafeAreaProvider>
);

describe('TopBar', () => {
  it('renders the title', () => {
    const { getByText } = render(wrap(<TopBar title="My Screen" C={LIGHT} />));
    expect(getByText('My Screen')).toBeTruthy();
  });

  it('calls onBack when back button is pressed', () => {
    const onBack = jest.fn();
    const { UNSAFE_getAllByType } = render(
      wrap(<TopBar title="Detail" onBack={onBack} C={LIGHT} />),
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const TO = require('react-native').TouchableOpacity;
    const touchables = UNSAFE_getAllByType(TO);
    fireEvent.press(touchables[0]);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders right slot when provided', () => {
    const { getByText } = render(
      wrap(<TopBar title="Title" right={<Text>Action</Text>} C={LIGHT} />),
    );
    expect(getByText('Action')).toBeTruthy();
  });
});
