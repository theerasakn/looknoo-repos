# CLAUDE.md — PawTrip Development Guide

> **For Claude Code and AI Coding Agents**
> Reference: `pawtrip-functional-spec.docx` + `pawtrip-agent-best-practice.docx`
> Prototype: `pawtrip-app-prototype.jsx` (approved UI reference)
> Version: 1.0 | March 2026

---

## 1. Project Overview

**PawTrip** is a React Native mobile app (iOS + Android) for planning dog-friendly trips. It helps users discover pet-friendly restaurants, parks, accommodations, and vets — and plan full road trips with their dogs.

**Your job:** Build the production React Native app using the approved prototype as the visual reference and the Functional Spec as the behavioral contract.

---

## 2. Golden Rules

```
🔴 NEVER start a screen without reading its Functional Spec section first
🔴 NEVER use 'any' TypeScript type — every prop, state, and function must be typed
🔴 NEVER push directly to main or develop — always use feature branches
🔴 NEVER hardcode color values — always use theme tokens (C.primary, C.bgCard, etc.)
🟡 ALWAYS run lint + type-check before committing: npm run lint && npx tsc --noEmit
🟡 ALWAYS write at least 1 render test + 1 interaction test per component
🟢 DO keep files under 150 lines — split into sub-components if larger
🟢 DO add JSDoc comments to every exported function and component
🟢 DO handle: loading state, empty state, error state on every data-driven screen
```

---

## 3. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React Native | 0.73+ |
| Language | TypeScript (strict) | 5.x |
| Navigation | React Navigation (Stack + Bottom Tabs) | 6.x |
| State | Zustand + MMKV persist | 4.x |
| Maps | react-native-maps + Google Maps SDK | 1.x |
| Auth | Google Identity Services (OAuth 2.0) | Latest |
| HTTP | Axios | 1.x |
| Images | react-native-image-picker | 7.x |
| Fonts | Noto Sans Thai + DM Sans | Google Fonts |

---

## 4. Project Setup

### 4.1 Initialize

```bash
npx react-native@latest init PawTrip --template react-native-template-typescript
cd PawTrip

# Core dependencies
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-maps react-native-image-picker
npm install zustand axios react-native-mmkv
npm install react-native-reanimated react-native-gesture-handler

# Dev dependencies
npm install -D @types/react @types/react-native eslint prettier
npm install -D jest @testing-library/react-native

# iOS
cd ios && pod install && cd ..
```

### 4.2 Folder Structure

```
src/
  assets/                   # Fonts, images, icons
  components/
    ui/                     # Btn, Card, Badge, Toggle, StarRating, Icon
    layout/                 # TopBar, BottomNav, FadeIn
    map/                    # MapMarker, MapControls, SOSModal
  screens/
    SplashScreen.tsx
    WelcomeScreen.tsx
    LoginScreen.tsx
    DogProfileScreen.tsx
    HomeMapScreen.tsx
    SearchScreen.tsx
    PlaceDetailScreen.tsx
    TripScreen.tsx
    ReviewScreen.tsx
    ProfileScreen.tsx
  navigation/
    RootNavigator.tsx       # Auth stack vs Main tabs
    BottomTabNavigator.tsx
    types.ts                # Navigation param types
  hooks/
    useGoogleAuth.ts
    useLocation.ts
    useTheme.ts
  store/
    authStore.ts            # User + auth state
    dogStore.ts             # Dog profiles
    placeStore.ts           # Places + bookmarks
    themeStore.ts           # Dark/light mode (persisted)
  services/
    api.ts                  # Axios instance + interceptors
    authService.ts
    placeService.ts
    reviewService.ts
    mapService.ts
  theme/
    colors.ts               # LIGHT + DARK palettes (see Section 5)
    typography.ts
    spacing.ts
    index.ts                # ThemeProvider + useTheme hook
  types/
    user.ts
    dog.ts
    place.ts
    review.ts
    trip.ts
  utils/
    jwt.ts                  # Decode Google JWT
    distance.ts
    openMaps.ts             # Google Maps URL builder
```

---

## 5. Design System

### 5.1 Color Tokens

Create `src/theme/colors.ts` **before any component**:

```typescript
export const LIGHT = {
  primary:       '#2979FF',
  primaryLight:  '#E3F2FD',
  primaryGlow:   'rgba(41,121,255,0.2)',
  secondary:     '#00C853',
  secondaryLight:'#E8F5E9',
  orange:        '#FF9100',
  orangeLight:   '#FFF3E0',
  red:           '#FF1744',
  redLight:      '#FCE4EC',
  purple:        '#AA00FF',
  purpleLight:   '#F3E5F5',
  white:         '#FFFFFF',
  bgGray:        '#F5F7FA',
  bgCard:        '#FFFFFF',
  textPrimary:   '#1A1A2E',
  textSecondary: '#6B7280',
  border:        '#E5E7EB',
} as const;

export const DARK = {
  primary:       '#448AFF',
  primaryLight:  '#1A2744',
  primaryGlow:   'rgba(68,138,255,0.3)',
  secondary:     '#69F0AE',
  secondaryLight:'#1B3A2A',
  orange:        '#FFAB40',
  orangeLight:   '#3D2E1A',
  red:           '#FF5252',
  redLight:      '#3A1A1A',
  purple:        '#E040FB',
  purpleLight:   '#2A1A3A',
  white:         '#1E1E2E',
  bgGray:        '#16162A',
  bgCard:        '#252540',
  textPrimary:   '#EAEAFF',
  textSecondary: '#9CA3AF',
  border:        '#374151',
} as const;

export type Theme = typeof LIGHT;
```

### 5.2 Typography

- **Headings / Buttons:** DM Sans, weight 700–900
- **Body / Thai text:** Noto Sans Thai, weight 400–700

### 5.3 Spacing & Radius

| Token | Value |
|---|---|
| Button border radius | 28dp |
| Card border radius | 20dp |
| Input border radius | 14dp |
| Tag border radius | 24dp |
| Min touch target | 44×44dp |
| Card shadow | `0 2px 8px rgba(0,0,0,0.08)` |
| Modal shadow | `0 8px 30px rgba(0,0,0,0.12)` |

---

## 6. Coding Standards

### 6.1 TypeScript — Mandatory

```typescript
// ✅ CORRECT
interface BtnProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'sos';
  size?: 'md' | 'lg';
  icon?: IconName;
  full?: boolean;
  disabled?: boolean;
  onPress: () => void;
}
export const Btn: React.FC<BtnProps> = ({ children, variant = 'primary', ...props }) => { ... };

// ❌ WRONG — never do this
export const Btn = (props: any) => { ... };
```

### 6.2 Component Rules

| Rule | Detail |
|---|---|
| Max 150 lines per file | Split into sub-components if larger |
| One component per file | Exception: tiny internal-only helpers |
| Named exports for components | Default export only for screens |
| Props destructuring | Always in function params |
| No inline styles > 3 props | Use StyleSheet.create() |
| Hooks at top of component | Before any conditionals or returns |
| Memoize list items | `React.memo` for place cards, markers |

### 6.3 State Management

| State Type | Where |
|---|---|
| UI-only (searchOpen, zoom, selectedMarker) | `useState` in component |
| Screen-local form (rating, toggles, photos) | `useState` in screen |
| Shared app state (user, dogs, theme, bookmarks) | Zustand store |
| Persisted settings (darkMode, onboarding) | Zustand + MMKV persist |
| Navigation params (placeId → PlaceDetail) | React Navigation params |

### 6.4 Zustand Store Template

```typescript
// src/store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from './mmkvStorage';

interface User {
  name: string;
  email: string;
  picture?: string;
  sub: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(persist(
  (set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
  }),
  { name: 'auth-store', storage: createJSONStorage(() => storage) }
));
```

---

## 7. File Naming Conventions

| Type | Pattern | Example |
|---|---|---|
| Screen | PascalCase + Screen | `HomeMapScreen.tsx` |
| Component | PascalCase | `MapMarker.tsx`, `Btn.tsx` |
| Hook | camelCase + use prefix | `useGoogleAuth.ts` |
| Store | camelCase + Store suffix | `authStore.ts` |
| Service | camelCase + Service suffix | `placeService.ts` |
| Type/Interface | PascalCase | `Place.ts`, `Review.ts` |
| Util | camelCase | `openMaps.ts`, `decodeJwt.ts` |
| Test | Same name + .test suffix | `MapMarker.test.tsx` |

---

## 8. Screen Specifications

Refer to `pawtrip-functional-spec.docx` Section 2 for full specs. Key details below:

### 8.1 Screen Inventory (10 total)

| Screen | Route | Spec Section |
|---|---|---|
| SplashScreen | /splash | 2.1 |
| WelcomeScreen | /welcome | 2.2 |
| LoginScreen | /login | 2.3 |
| DogProfileScreen | /dog-profile | 2.4 |
| HomeMapScreen | /home | 2.5 |
| SearchScreen | /search | 2.6 |
| PlaceDetailScreen | /place/:id | 2.7 |
| TripScreen | /trip | 2.8 |
| ReviewScreen | /review | 2.9 |
| ProfileScreen | /profile | 2.10 |

### 8.2 Key Behavioral Rules per Screen

**SplashScreen**
- Auto-navigate to Welcome after exactly **2.8 seconds**
- Logo scales in with `cubic-bezier(0.34,1.56,0.64,1)` over 0.8s
- Animated dots cycle 0→3 every 350ms

**WelcomeScreen**
- 3 slides with swipe + clickable dot indicators
- Skip button top-right navigates directly to Login
- Emoji container: 180×180dp circle with `color+15%` opacity background

**LoginScreen**
- Google OAuth: load `accounts.google.com/gsi/client` → `prompt()` → fallback `renderButton()`
- Decode JWT → extract `{ name, email, picture, sub }` → store in authStore
- If `GOOGLE_CLIENT_ID` is placeholder → show setup instructions + "ข้ามไปก่อน" demo button
- Loading spinner on Google button while authenticating

**DogProfileScreen**
- 3-step stepper with 4dp progress bar segments
- Size selector: 2×2 grid cards, selected = `scale(1.03)` + Primary border 2.5px
- Health toggles: 52×30dp Toggle component, green when on
- Step 3 submit = "บันทึก 🎉" with paw icon; steps 1–2 = "ถัดไป"

**HomeMapScreen**
- Search bar: collapsed pill → expanded with back + input + clear X
- Real-time filter MARKERS array by label text
- 5 filter chips: ทั้งหมด / ร้านอาหาร / ที่พัก / สวน / สัตวแพทย์
- Selected marker: `scale(1.3) + translateY(-8px)` + tooltip with name/dist
- SOS button: bottom-right, 64×64dp, red gradient, pulse ring animation
- SOS modal: shows nearest vet (type==='vet') with navigate + call buttons
- All navigate buttons → `openGoogleMaps(destination)` URL pattern

**ReviewScreen**
- 5-star rating required before submit
- 4 pet toggles: จูงสายจูง / ชามน้ำ / พื้นที่ร่ม / สนามวิ่งเล่นล้อมรั้วมิดชิด
- Photo upload: max 5 photos, bottom sheet with camera (capture=environment) + gallery
- Photo preview: 88×88dp, red X button to remove, count display (e.g. 2/5)

**ProfileScreen**
- Show Google user picture/name/email if OAuth user exists
- Dark mode toggle: sun/moon icon + Toggle component + 0.4s transition
- Dog card with breed, size, vaccine status badge

---

## 9. Reusable Components

All components in the prototype (`pawtrip-app-prototype.jsx`) are the approved UI reference. Rebuild them as typed TypeScript components:

| Component | Props Interface | Notes |
|---|---|---|
| `Icon` | `{ name: IconName; size?: number; color?: string }` | 30+ SVG paths |
| `Btn` | `{ children; variant; size; onClick; icon?; full?; C: Theme }` | 4 variants |
| `Card` | `{ children; style?; onClick?; C: Theme }` | |
| `Badge` | `{ text; color?; C: Theme }` | Auto bg at 18% opacity |
| `StarR` | `{ rating; size?; C: Theme }` | Half-star support |
| `TopBar` | `{ title; onBack?; right?; C: Theme }` | |
| `BottomNav` | `{ active; onNav; C: Theme }` | 5 tabs, active bar indicator |
| `Toggle` | `{ on; onToggle; C: Theme; color? }` | 52×30dp, animated thumb |
| `FadeIn` | `{ children; delay?; style? }` | opacity + translateY animation |
| `MapMarker` | `{ m: Place; zoom; selected; onClick; C: Theme }` | 5 type colors |

---

## 10. Navigation Architecture

### 10.1 Auth Stack (before login)
```
Splash → Welcome → Login → DogProfile → [replace with Main Tabs]
```

### 10.2 Main Bottom Tabs (after login)
```
แผนที่ (map)  |  ค้นหา (search)  |  ทริป (explore)  |  รีวิว (review)  |  โปรไฟล์ (person)
```

### 10.3 Stack within Tabs
- Home → PlaceDetail (slide up / bottom sheet)
- Search → PlaceDetail (slide right)

### 10.4 Active Tab Indicator
- 24×3dp horizontal bar, Primary color, positioned -10px above icon
- Slide transition 0.3s ease between tabs

---

## 11. External Integrations

### Google Maps Navigation URL
All navigate buttons must use this pattern:
```
https://www.google.com/maps/dir/?api=1&destination={encodeURIComponent(name)}&travelmode=driving
```
Opens via `Linking.openURL()`. Used in: Map Quick Actions, Place Detail, Trip Planner, SOS Modal.

### Google OAuth Flow
1. Load script: `https://accounts.google.com/gsi/client`
2. `google.accounts.id.initialize({ client_id, callback, ux_mode: 'popup' })`
3. Call `google.accounts.id.prompt()` → One Tap
4. Fallback: `renderButton()` if One Tap skipped/blocked
5. Decode JWT credential → `{ name, email, picture, sub }`
6. Store in authStore → navigate to DogProfile

### Google Maps SDK (react-native-maps)
- Provider: `PROVIDER_GOOGLE`
- Current location dot: 22dp blue circle, white border 3px, pulsing ring animation 2s
- Zoom controls: right-side column, 40×40dp buttons, borderRadius 12dp

---

## 12. Data Models

### Place (for markers)
```typescript
interface Place {
  id: number;
  type: 'restaurant' | 'park' | 'accommodation' | 'vet' | 'gas';
  label: string;
  latitude: number;
  longitude: number;
  dist: string;           // e.g. "1.2 กม."
  rating: number;         // 1–5
  petPolicy: {
    sizeAccepted: string;
    leashRequired: boolean;
    waterBowl: boolean;
    shade: boolean;
    fencedArea: boolean;
  };
  hours?: string;
  phone?: string;
}
```

### Dog
```typescript
interface Dog {
  id: string;
  userId: string;
  name: string;
  breed?: string;
  size: 'S' | 'M' | 'L' | 'XL';
  photo?: string;
  vaccineComplete: boolean;
  vaccineBooklet: boolean;
  fleaPrevention: boolean;
  allergies?: string;
}
```

### Review
```typescript
interface Review {
  id: string;
  placeId: number;
  userId: string;
  rating: number;         // 1–5, required
  text?: string;
  photos: string[];       // max 5 URIs
  petToggles: {
    leash: boolean;
    water: boolean;
    shade: boolean;
    fenced: boolean;
  };
  dogName?: string;
  createdAt: string;
}
```

---

## 13. Error Handling Requirements

| Scenario | UI Response |
|---|---|
| Network failure | Error card + retry button "ลองใหม่" |
| Google OAuth popup blocked | Fallback to renderButton() in container div |
| Google CLIENT_ID not set | Setup instructions card + demo skip button |
| Location permission denied | Toast: "กรุณาเปิดตำแหน่งเพื่อดูสถานที่ใกล้คุณ" + default Bangkok coords |
| Empty search results | EmptyState: 🐾 + "ไม่พบสถานที่" + retry CTA |
| Photo upload fail | Toast: "ไม่สามารถเลือกรูปได้ กรุณาลองใหม่" |
| Max 5 photos reached | Hide "+" button, count shows "5/5" |
| JWT decode fail | Red error card below Google button |
| Map load failure | Placeholder: map icon + "โหลดแผนที่ไม่ได้" + retry |
| No markers in view | "ไม่มีสถานที่ในบริเวณนี้" + expand search CTA |

---

## 14. Development Order

Develop in this order — each phase is a dependency for the next:

### Phase 1 — Foundation (start here)
1. Project init + folder structure
2. Theme system (`src/theme/colors.ts` first)
3. Icon component (30+ SVG paths from prototype)
4. Base UI components: Btn, Card, Badge, Toggle, StarR
5. Layout components: TopBar, BottomNav, FadeIn
6. Navigation setup (AuthStack + BottomTabs)
7. Zustand stores: authStore, dogStore, themeStore

### Phase 2 — Onboarding
8. SplashScreen
9. WelcomeScreen
10. useGoogleAuth hook
11. LoginScreen
12. DogProfileScreen

### Phase 3 — Core App
13. MapMarker component
14. HomeMapScreen (Map area → Search → Quick Actions + SOS)
15. SearchScreen
16. PlaceDetailScreen

### Phase 4 — Features
17. TripScreen
18. ReviewScreen (Core → Photo upload)
19. ProfileScreen + Dark mode integration
20. Google Maps deep linking audit (all navigate buttons)

---

## 15. Git Workflow

```bash
# Per feature
git checkout -b feat/SCREEN-NAME

# Before every commit
npm run lint && npx tsc --noEmit
npm test -- --watchAll=false

# Commit format (conventional commits)
git commit -m "feat(home-map): add SOS modal with nearest vet navigation"

# PR to develop (never to main)
git push origin feat/SCREEN-NAME
```

### Branch Naming
| Pattern | Example |
|---|---|
| `feat/SCREEN-NAME` | `feat/home-map` |
| `feat/COMPONENT-NAME` | `feat/map-marker` |
| `fix/ISSUE-DESC` | `fix/sos-modal-crash` |
| `refactor/SCOPE` | `refactor/theme-provider` |

---

## 16. PR Checklist

Before opening any PR, verify:

- [ ] TypeScript strict, zero `any` types
- [ ] Theme tokens used everywhere — no hardcoded colors
- [ ] Works in both Light and Dark mode
- [ ] All interactions from Functional Spec implemented
- [ ] All navigate buttons open Google Maps correctly
- [ ] Tests written and passing
- [ ] `npm run lint && npx tsc --noEmit` passes
- [ ] Files under 150 lines (split if larger)
- [ ] Loading, empty, and error states handled
- [ ] JSDoc on all exported functions/components
- [ ] Screenshots: Light mode + Dark mode attached to PR

### Auto-reject criteria
- Any `any` TypeScript type
- Hardcoded color values instead of theme tokens
- No test file
- Component over 150 lines without splitting
- Push to main or develop directly
- Missing elements vs Functional Spec
- Dark mode broken
- Navigate buttons don't open Google Maps

---

## 17. Acceptance Criteria (Final Integration)

| Area | Must Pass |
|---|---|
| All screens | Dark mode toggle → 0.4s transition on all elements |
| Splash | Auto-redirect 2.8s, animation plays |
| Welcome | 3 slides swipeable, dots clickable, skip navigates |
| Login | Google OAuth popup, JWT decoded, user stored; demo fallback works |
| Dog Profile | 3-step stepper, progress bar, toggles, size selector, skip |
| Home/Map | Search filters markers real-time, zoom works, SOS shows nearest vet |
| Search | Categories grid tappable, text filter works, tap → PlaceDetail |
| Place Detail | Pet Policy card prominent, reviews show, navigate opens Google Maps |
| Trip Planner | Timeline renders all stops, navigate opens Google Maps |
| Review | Star rating + labels, 4 pet toggles, photo upload/preview/delete, max 5 |
| Profile | Google user data shown, dark mode toggle works, menu renders |
| Bottom Nav | All 5 tabs switch, active indicator animates |
| Google OAuth | Popup opens, profile picture/name/email displayed in ProfileScreen |

---

## 18. Prototype Reference

The file `pawtrip-app-prototype.jsx` is the **approved visual reference**. When in doubt about layout, colors, animations, or component structure:

1. Read the Functional Spec section for behavioral intent
2. Match the prototype visually
3. Rewrite as typed TypeScript with proper architecture

Key patterns from the prototype to preserve:
- `FadeIn` wrapper on all screen content with staggered `delay` props
- Marker color map: `{ restaurant: orange, accommodation: purple, park: secondary, vet: red, gas: primary }`
- All cards use `border: 1px solid ${C.border}30` (30% opacity border)
- Dark mode transition: `transition: 'background 0.4s'` on all container elements
- SOS pulse animation: `sosPulse` keyframe on the red glow ring
- Location dot: `locPulse` keyframe with expanding box-shadow

---

*Keep this file open while developing. When Functional Spec and prototype conflict, the Functional Spec wins for behavior; the prototype wins for visual design.*
