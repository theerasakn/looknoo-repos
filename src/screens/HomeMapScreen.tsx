/**
 * HomeMapScreen — Map with markers, search, filter chips, and SOS button.
 */

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { Place } from '../types/place';
import { useLocation } from '../hooks/useLocation';
import { findNearestByType } from '../services/mapService';
import { Icon } from '../components/ui/Icon';
import { MapMarker } from '../components/map/MapMarker';
import { MapControls } from '../components/map/MapControls';
import { CurrentLocationDot } from '../components/map/CurrentLocationDot';
import { SearchOverlay, FilterKey } from '../components/map/SearchOverlay';
import { SOSModal } from '../components/map/SOSModal';

const ZOOM_DELTA = 0.005;
const DEFAULT_DELTA = { latitudeDelta: 0.015, longitudeDelta: 0.015 };

/** Demo markers for development */
const DEMO_MARKERS: Place[] = [
  {
    id: 1, type: 'restaurant', label: '\u0E23\u0E49\u0E32\u0E19\u0E2D\u0E32\u0E2B\u0E32\u0E23 Dog Cafe',
    latitude: 13.7563, longitude: 100.5018, dist: '0.5 \u0E01\u0E21.',
    rating: 4.5, petPolicy: { sizeAccepted: 'S-L', leashRequired: true,
    waterBowl: true, shade: true, fencedArea: false },
  },
  {
    id: 2, type: 'park', label: '\u0E2A\u0E27\u0E19\u0E2A\u0E38\u0E19\u0E31\u0E02 Paw Park',
    latitude: 13.758, longitude: 100.505, dist: '1.2 \u0E01\u0E21.',
    rating: 4.8, petPolicy: { sizeAccepted: 'All', leashRequired: false,
    waterBowl: true, shade: true, fencedArea: true },
  },
  {
    id: 3, type: 'vet', label: '\u0E2A\u0E31\u0E15\u0E27\u0E41\u0E1E\u0E17\u0E22\u0E4C Pet Care',
    latitude: 13.754, longitude: 100.499, dist: '0.8 \u0E01\u0E21.',
    rating: 4.2, petPolicy: { sizeAccepted: 'All', leashRequired: true,
    waterBowl: false, shade: true, fencedArea: false },
    phone: '02-123-4567',
  },
  {
    id: 4, type: 'accommodation', label: '\u0E42\u0E23\u0E07\u0E41\u0E23\u0E21 Pet Stay',
    latitude: 13.76, longitude: 100.495, dist: '2.0 \u0E01\u0E21.',
    rating: 4.0, petPolicy: { sizeAccepted: 'S-M', leashRequired: true,
    waterBowl: true, shade: true, fencedArea: false },
  },
];

/** Home map screen with search, filters, and SOS. */
export default function HomeMapScreen() {
  const C = useTheme();
  const insets = useSafeAreaInsets();
  const { location } = useLocation();
  const mapRef = useRef<MapView>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [sosVisible, setSosVisible] = useState(false);
  const [zoom, setZoom] = useState(15);

  const filteredMarkers = useMemo(() => {
    let result: Place[] = DEMO_MARKERS;
    if (activeFilter !== 'all') {
      result = result.filter((m) => m.type === activeFilter);
    }
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      result = result.filter((m) => m.label.toLowerCase().includes(q));
    }
    return result;
  }, [activeFilter, searchText]);

  const nearestVet = useMemo(
    () => findNearestByType(DEMO_MARKERS, 'vet', location.latitude, location.longitude),
    [location],
  );

  const handleMarkerPress = useCallback((id: number) => {
    setSelectedMarkerId((prev) => (prev === id ? null : id));
  }, []);

  const handleRegionChange = useCallback((region: Region) => {
    const z = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
    setZoom(z);
  }, []);

  const animateToRegion = useCallback((delta: number) => {
    mapRef.current?.getCamera().then((cam) => {
      if (cam.center) {
        mapRef.current?.animateToRegion({
          latitude: cam.center.latitude,
          longitude: cam.center.longitude,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }, 300);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          ...DEFAULT_DELTA,
        }}
        showsUserLocation={false}
        showsMyLocationButton={false}
        onRegionChangeComplete={handleRegionChange}
        onPress={() => setSelectedMarkerId(null)}
      >
        {/* Current location marker */}
        <Marker
          coordinate={location}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <CurrentLocationDot color={C.primary} />
        </Marker>

        {/* Place markers */}
        {filteredMarkers.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            anchor={{ x: 0.5, y: 1 }}
            onPress={() => handleMarkerPress(m.id)}
          >
            <MapMarker
              m={m}
              zoom={zoom}
              selected={selectedMarkerId === m.id}
              onPress={() => handleMarkerPress(m.id)}
              C={C}
            />
          </Marker>
        ))}
      </MapView>

      <SearchOverlay
        topOffset={insets.top}
        searchOpen={searchOpen}
        searchText={searchText}
        activeFilter={activeFilter}
        onSearchOpen={() => setSearchOpen(true)}
        onSearchClose={() => setSearchOpen(false)}
        onSearchChange={setSearchText}
        onFilterChange={setActiveFilter}
        C={C}
      />

      <MapControls
        onZoomIn={() => animateToRegion(ZOOM_DELTA)}
        onZoomOut={() => animateToRegion(0.05)}
        C={C}
      />

      {/* SOS button */}
      <TouchableOpacity
        style={[styles.sosBtn, { bottom: insets.bottom + 24 }]}
        onPress={() => setSosVisible(true)}
        activeOpacity={0.8}
      >
        <View style={styles.sosPulse} />
        <View style={styles.sosInner}>
          <Icon name="sos" size={28} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      <SOSModal
        visible={sosVisible}
        nearestVet={nearestVet}
        onClose={() => setSosVisible(false)}
        C={C}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  sosBtn: {
    position: 'absolute',
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosPulse: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,23,68,0.2)',
  },
  sosInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF1744',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
