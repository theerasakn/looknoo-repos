/**
 * PawTrip typography tokens.
 * Headings/Buttons: DM Sans (700–900)
 * Body/Thai text: Noto Sans Thai (400–700)
 */

import { TextStyle } from 'react-native';

export const FONTS = {
  heading: 'DMSans-Bold',
  headingBlack: 'DMSans-Black',
  body: 'NotoSansThai-Regular',
  bodyMedium: 'NotoSansThai-Medium',
  bodyBold: 'NotoSansThai-Bold',
} as const;

export const TYPOGRAPHY: Record<string, TextStyle> = {
  h1: { fontFamily: FONTS.headingBlack, fontSize: 28, lineHeight: 36 },
  h2: { fontFamily: FONTS.heading, fontSize: 22, lineHeight: 28 },
  h3: { fontFamily: FONTS.heading, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: FONTS.body, fontSize: 16, lineHeight: 24 },
  bodyMedium: { fontFamily: FONTS.bodyMedium, fontSize: 16, lineHeight: 24 },
  bodyBold: { fontFamily: FONTS.bodyBold, fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: FONTS.body, fontSize: 13, lineHeight: 18 },
  button: { fontFamily: FONTS.heading, fontSize: 16, lineHeight: 20 },
  buttonLg: { fontFamily: FONTS.heading, fontSize: 18, lineHeight: 22 },
  label: { fontFamily: FONTS.bodyMedium, fontSize: 14, lineHeight: 20 },
} as const;
