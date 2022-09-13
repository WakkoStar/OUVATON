export interface GooglePhotoLocation {
  photo_reference: string;
}

export interface Geometry {
  location: LatLng;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface GoogleLocation {
  business_status: string;
  name: string;
  photos: GooglePhotoLocation[];
  rating: number;
  geometry: Geometry;
  types: string[];
  user_ratings_total: number;
  opening_hours: {open_now: boolean};
  place_id: string;
}

export interface AllLocation {
  searchResults: {
    results: GoogleLocation[];
    type: string[] | undefined;
    label: string;
    keyword: string;
  }[];
  categoryName: string;
}

export interface Location {
  title: string;
  placeId: string;
  distance: string;
  coords: LatLng;
  avis: Avis;
  thumbnail: string;
  isOpen: boolean;
  images: string[];
}

export interface Avis {
  rank: number;
  occur: string;
}

export interface SearchList {
  categoryName: string;
  categoryValues: {type?: string[]; keyword: string; label: string}[];
  typesToExclude: string[];
}

export type RankBy = 'prominence' | 'distance';

export interface BaseSearch {
  location: {
    lat: number;
    lng: number;
  };
  radius: number;
  type: string;
  keyword: string;
  rankby: RankBy;
  pagetoken: string;
}

export interface FilterType {
  firstFilter?: string;
  secondFilter?: string;
}

export type NetworkStatus = 'empty' | 'loading' | 'error' | 'success';
