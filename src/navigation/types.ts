/**
 * Navigation type definitions for type-safe navigation.
 */

export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  DogProfile: undefined;
};

export type MainTabParamList = {
  HomeMap: undefined;
  Search: undefined;
  Trip: undefined;
  Review: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMap: undefined;
  PlaceDetail: { placeId: number };
};

export type SearchStackParamList = {
  Search: undefined;
  PlaceDetail: { placeId: number };
};
