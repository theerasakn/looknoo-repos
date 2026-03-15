import { distanceKm, formatDistThai } from './distance';

describe('distanceKm', () => {
  it('returns 0 for same coordinates', () => {
    expect(distanceKm(13.75, 100.5, 13.75, 100.5)).toBe(0);
  });

  it('calculates roughly correct distance Bangkok-ChiangMai (~600km)', () => {
    const d = distanceKm(13.7563, 100.5018, 18.7883, 98.9853);
    expect(d).toBeGreaterThan(550);
    expect(d).toBeLessThan(700);
  });

  it('is symmetric', () => {
    const d1 = distanceKm(13.75, 100.5, 14.0, 100.8);
    const d2 = distanceKm(14.0, 100.8, 13.75, 100.5);
    expect(d1).toBeCloseTo(d2, 5);
  });
});

describe('formatDistThai', () => {
  it('formats distance under 1km in meters', () => {
    expect(formatDistThai(0.5)).toBe('500 ม.');
  });

  it('formats distance over 1km in kilometers', () => {
    expect(formatDistThai(2.3)).toBe('2.3 กม.');
  });

  it('rounds meters to nearest integer', () => {
    expect(formatDistThai(0.123)).toBe('123 ม.');
  });
});
