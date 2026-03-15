import React from 'react';
import { render } from '@testing-library/react-native';
import { MapMarker } from './MapMarker';
import { LIGHT } from '../../theme/colors';
import { Place } from '../../types/place';

jest.mock('../ui/Icon', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Text } = require('react-native');
  return {
    Icon: ({ name }: { name: string }) => <Text testID={`icon-${name}`} />,
  };
});

const mockPlace: Place = {
  id: 1,
  type: 'restaurant',
  label: 'Dog Cafe',
  latitude: 13.75,
  longitude: 100.5,
  dist: '0.5 กม.',
  rating: 4.5,
  petPolicy: {
    sizeAccepted: 'S-L',
    leashRequired: true,
    waterBowl: true,
    shade: true,
    fencedArea: false,
  },
};

describe('MapMarker', () => {
  it('renders the marker icon', () => {
    const { getByTestId } = render(
      <MapMarker m={mockPlace} zoom={15} selected={false} C={LIGHT} />,
    );
    expect(getByTestId('icon-restaurant')).toBeTruthy();
  });

  it('shows tooltip when selected', () => {
    const { getByText } = render(
      <MapMarker m={mockPlace} zoom={15} selected={true} C={LIGHT} />,
    );
    expect(getByText('Dog Cafe')).toBeTruthy();
    expect(getByText('0.5 กม.')).toBeTruthy();
  });

  it('does not show tooltip when not selected', () => {
    const { queryByText } = render(
      <MapMarker m={mockPlace} zoom={15} selected={false} C={LIGHT} />,
    );
    expect(queryByText('Dog Cafe')).toBeNull();
  });
});
