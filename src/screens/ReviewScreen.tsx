/**
 * ReviewScreen — Star rating, pet toggles, photo upload, and submit.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../theme';
import { TYPOGRAPHY } from '../theme/typography';
import { RADIUS, SHADOW } from '../theme/spacing';
import { FadeIn } from '../components/layout/FadeIn';
import { Card } from '../components/ui/Card';
import { Btn } from '../components/ui/Btn';
import { Icon } from '../components/ui/Icon';
import { Toggle } from '../components/ui/Toggle';

const STAR_LABELS = ['', '\u0E41\u0E22\u0E48\u0E21\u0E32\u0E01', '\u0E41\u0E22\u0E48', '\u0E1E\u0E2D\u0E43\u0E0A\u0E49', '\u0E14\u0E35', '\u0E14\u0E35\u0E21\u0E32\u0E01!'];
const MAX_PHOTOS = 5;

/** Review creation screen with rating, toggles, and photos. */
export default function ReviewScreen() {
  const C = useTheme();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [leash, setLeash] = useState(false);
  const [water, setWater] = useState(false);
  const [shade, setShade] = useState(false);
  const [fenced, setFenced] = useState(false);

  const handleAddPhoto = () => {
    if (photos.length >= MAX_PHOTOS) return;

    Alert.alert(
      '\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E23\u0E39\u0E1B',
      '',
      [
        {
          text: '\u0E16\u0E48\u0E32\u0E22\u0E23\u0E39\u0E1B',
          onPress: () => {
            launchCamera({ mediaType: 'photo' }, (res) => {
              if (res.assets?.[0]?.uri) {
                setPhotos((prev) => [...prev, res.assets![0].uri!]);
              }
            });
          },
        },
        {
          text: '\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E04\u0E25\u0E31\u0E07',
          onPress: () => {
            launchImageLibrary({ mediaType: 'photo' }, (res) => {
              if (res.assets?.[0]?.uri) {
                setPhotos((prev) => [...prev, res.assets![0].uri!]);
              }
            });
          },
        },
        { text: '\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01', style: 'cancel' },
      ],
    );
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('\u0E01\u0E23\u0E38\u0E13\u0E32\u0E43\u0E2B\u0E49\u0E04\u0E30\u0E41\u0E19\u0E19');
      return;
    }
    Alert.alert('\u0E2A\u0E48\u0E07\u0E23\u0E35\u0E27\u0E34\u0E27\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08!');
    // In production: call submitReview service
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: C.bgGray }]}
      contentContainerStyle={styles.content}
    >
      <FadeIn>
        <Text style={[TYPOGRAPHY.h2, { color: C.textPrimary }]}>
          {'\u0E40\u0E02\u0E35\u0E22\u0E19\u0E23\u0E35\u0E27\u0E34\u0E27'}
        </Text>
      </FadeIn>

      {/* Star Rating */}
      <FadeIn delay={100}>
        <Card C={C} style={styles.ratingCard}>
          <Text style={[TYPOGRAPHY.label, { color: C.textPrimary }]}>
            {'\u0E43\u0E2B\u0E49\u0E04\u0E30\u0E41\u0E19\u0E19'}
          </Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <TouchableOpacity key={s} onPress={() => setRating(s)}>
                <Icon
                  name={s <= rating ? 'star' : 'starOutline'}
                  size={36}
                  color={s <= rating ? C.orange : C.border}
                />
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <Text
              style={[
                TYPOGRAPHY.bodyMedium,
                { color: C.orange, textAlign: 'center' },
              ]}
            >
              {STAR_LABELS[rating]}
            </Text>
          )}
        </Card>
      </FadeIn>

      {/* Pet Toggles */}
      <FadeIn delay={200}>
        <Card C={C} style={styles.toggleCard}>
          <Text style={[TYPOGRAPHY.label, { color: C.textPrimary }]}>
            {'\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E31\u0E15\u0E27\u0E4C\u0E40\u0E25\u0E35\u0E49\u0E22\u0E07'}
          </Text>
          {[
            { label: '\u0E08\u0E39\u0E07\u0E2A\u0E32\u0E22\u0E08\u0E39\u0E07', on: leash, toggle: () => setLeash(!leash) },
            { label: '\u0E0A\u0E32\u0E21\u0E19\u0E49\u0E33', on: water, toggle: () => setWater(!water) },
            { label: '\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E23\u0E48\u0E21', on: shade, toggle: () => setShade(!shade) },
            {
              label: '\u0E2A\u0E19\u0E32\u0E21\u0E27\u0E34\u0E48\u0E07\u0E40\u0E25\u0E48\u0E19\u0E25\u0E49\u0E2D\u0E21\u0E23\u0E31\u0E49\u0E27\u0E21\u0E34\u0E14\u0E0A\u0E34\u0E14',
              on: fenced,
              toggle: () => setFenced(!fenced),
            },
          ].map((item) => (
            <View key={item.label} style={styles.toggleRow}>
              <Text
                style={[
                  TYPOGRAPHY.body,
                  { color: C.textPrimary, flex: 1 },
                ]}
              >
                {item.label}
              </Text>
              <Toggle on={item.on} onToggle={item.toggle} C={C} />
            </View>
          ))}
        </Card>
      </FadeIn>

      {/* Comment */}
      <FadeIn delay={300}>
        <Card C={C}>
          <Text style={[TYPOGRAPHY.label, { color: C.textPrimary }]}>
            {'\u0E04\u0E27\u0E32\u0E21\u0E04\u0E34\u0E14\u0E40\u0E2B\u0E47\u0E19'}
          </Text>
          <TextInput
            style={[
              styles.textArea,
              {
                color: C.textPrimary,
                borderColor: `${C.border}50`,
              },
            ]}
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={4}
            placeholder={'\u0E40\u0E25\u0E48\u0E32\u0E1B\u0E23\u0E30\u0E2A\u0E1A\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13...'}
            placeholderTextColor={C.textSecondary}
          />
        </Card>
      </FadeIn>

      {/* Photos */}
      <FadeIn delay={400}>
        <Card C={C}>
          <View style={styles.photoHeader}>
            <Text style={[TYPOGRAPHY.label, { color: C.textPrimary }]}>
              {'\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E'}
            </Text>
            <Text style={[TYPOGRAPHY.caption, { color: C.textSecondary }]}>
              {photos.length}/{MAX_PHOTOS}
            </Text>
          </View>
          <View style={styles.photoGrid}>
            {photos.map((uri, i) => (
              <View key={i} style={styles.photoWrap}>
                <Image source={{ uri }} style={styles.photo} />
                <TouchableOpacity
                  style={styles.photoRemove}
                  onPress={() => removePhoto(i)}
                >
                  <Icon name="close" size={14} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
            {photos.length < MAX_PHOTOS && (
              <TouchableOpacity
                style={[
                  styles.photoAdd,
                  { borderColor: `${C.border}50` },
                ]}
                onPress={handleAddPhoto}
              >
                <Icon name="add" size={28} color={C.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </Card>
      </FadeIn>

      <FadeIn delay={500}>
        <Btn
          variant="primary"
          size="lg"
          full
          onPress={handleSubmit}
          C={C}
        >
          {'\u0E2A\u0E48\u0E07\u0E23\u0E35\u0E27\u0E34\u0E27'}
        </Btn>
      </FadeIn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 16 },
  ratingCard: { alignItems: 'center', gap: 12 },
  starRow: { flexDirection: 'row', gap: 8 },
  toggleCard: { gap: 8 },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: RADIUS.input,
    padding: 12,
    marginTop: 8,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  photoWrap: { position: 'relative' },
  photo: { width: 88, height: 88, borderRadius: 12 },
  photoRemove: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF1744',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoAdd: {
    width: 88,
    height: 88,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
