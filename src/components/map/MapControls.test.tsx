import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MapControls } from './MapControls';
import { LIGHT } from '../../theme/colors';

jest.mock('../ui/Icon', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Text } = require('react-native');
  return {
    Icon: ({ name }: { name: string }) => <Text testID={`icon-${name}`} />,
  };
});

describe('MapControls', () => {
  it('renders zoom in and zoom out buttons', () => {
    const { getByTestId } = render(
      <MapControls onZoomIn={jest.fn()} onZoomOut={jest.fn()} C={LIGHT} />,
    );
    expect(getByTestId('icon-add')).toBeTruthy();
    expect(getByTestId('icon-remove')).toBeTruthy();
  });

  it('calls onZoomIn when + is pressed', () => {
    const onZoomIn = jest.fn();
    const { getByTestId } = render(
      <MapControls onZoomIn={onZoomIn} onZoomOut={jest.fn()} C={LIGHT} />,
    );
    fireEvent.press(getByTestId('icon-add'));
    expect(onZoomIn).toHaveBeenCalledTimes(1);
  });

  it('calls onZoomOut when - is pressed', () => {
    const onZoomOut = jest.fn();
    const { getByTestId } = render(
      <MapControls onZoomIn={jest.fn()} onZoomOut={onZoomOut} C={LIGHT} />,
    );
    fireEvent.press(getByTestId('icon-remove'));
    expect(onZoomOut).toHaveBeenCalledTimes(1);
  });
});
