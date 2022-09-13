import {GoogleLocation, LatLng, Location, RankBy} from '../types';
import {getMapPhotos} from './googlemap';

export const parseLocations = (
  places: GoogleLocation[],
  currentLocation: LatLng,
): Location[] => {
  return places
    .filter(({business_status}) => {
      return business_status === 'OPERATIONAL' || business_status === undefined;
    })
    .map(
      ({
        name,
        photos,
        rating,
        user_ratings_total,
        opening_hours,
        place_id,
        geometry,
      }) => {
        const images = getMapPhotos(photos);
        return {
          title: name,
          placeId: place_id,
          distance: parseDistance(currentLocation, geometry.location),
          coords: geometry.location,
          avis: {rank: rating || 0, occur: parseOccur(user_ratings_total || 0)}, //TODO PARSE
          thumbnail: images?.[0],
          isOpen: opening_hours?.open_now || false,
          images: images,
        };
      },
    );
};

export const parseDistance = (
  currentLocation: LatLng,
  targetLocation: LatLng,
): string => {
  const R = 6378.137; // Radius of earth in KM
  var dLat =
    (currentLocation.lat * Math.PI) / 180 -
    (targetLocation.lat * Math.PI) / 180;
  var dLon =
    (currentLocation.lng * Math.PI) / 180 -
    (targetLocation.lng * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((currentLocation.lat * Math.PI) / 180) *
      Math.cos((targetLocation.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  const distance = Math.round(d * 1000);
  if (distance > 1000) {
    return (distance / 1000).toFixed(1) + ' km';
  }
  return distance + ' m';
};

const calculateDistance = (distanceParsed: string): number => {
  const distance = parseFloat(
    distanceParsed.replace(' km', '').replace(' m', ''),
  );
  const scale = distanceParsed.includes('km') ? 1000 : 1;

  return distance * scale;
};

const parseOccur = (occur: number): string => {
  if (occur > 1000) {
    return (occur / 1000).toFixed(1) + ' k';
  }
  return `${occur}`;
};

const calculateOccur = (occurParsed: string): number => {
  const occur = parseFloat(occurParsed.replace(' k', ''));
  const scale = occurParsed.includes(' k') ? 1000 : 1;
  return occur * scale;
};

export const displayLocations = (
  places: Location[],
  rankby: RankBy = 'prominence',
): Location[] => {
  //get distinct values
  places.forEach((place, _, self) => {
    const clonedPlaces = self.filter(value => value.placeId === place.placeId);
    if (clonedPlaces.length > 1) {
      clonedPlaces.forEach((clonedPlace, index) => {
        //don't delete all cloned places, keep one
        if (index === 0) {
          return;
        }
        const indexToDelete = self.findIndex(
          value => value.placeId === clonedPlace.placeId,
        );
        places.splice(indexToDelete, 1);
      });
    }
  });

  return rankby === 'prominence'
    ? places.sort(
        (a, b) => calculateOccur(b.avis.occur) - calculateOccur(a.avis.occur),
      )
    : places.sort(
        (a, b) => calculateDistance(a.distance) - calculateDistance(b.distance),
      );
};
