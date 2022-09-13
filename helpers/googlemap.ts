import axios from 'axios';
import {
  AllLocation,
  BaseSearch,
  GoogleLocation,
  GooglePhotoLocation,
  SearchList,
} from '../types';

const API_KEY = '';

const initialState: BaseSearch = {
  location: {
    lat: 0,
    lng: 0,
  },
  radius: 1500,
  type: '',
  keyword: '',
  rankby: 'prominence',
  pagetoken: '',
};

/*
 * Get nearby results with one type or keyword
 */
export const getGoogleNearbySearch = async (
  search: BaseSearch = initialState,
): Promise<GoogleLocation[]> => {
  const {location, radius, type, keyword, pagetoken} = search;

  var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat}%2C${location.lng}&radius=${radius}&type=${type}&keyword=${keyword}&key=${API_KEY}&language=fr&pagetoken=${pagetoken}`,
    headers: {},
  };

  return axios(config)
    .then(function (response) {
      const results = JSON.parse(JSON.stringify(response.data)).results || [];
      return results;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};

/*
 * Get nearby results based on a search list
 */
export const getAllGoogleNearbySearchs = async (
  baseSearch = initialState,
  categoriesWrapper: SearchList[],
): Promise<AllLocation[]> => {
  return Promise.all(
    categoriesWrapper.map(
      async ({categoryName, categoryValues, typesToExclude}) => {
        return Promise.all(
          categoryValues.map(async ({type, keyword, label}) => {
            return {
              results: await parseResult(
                keyword,
                baseSearch,
                type || [],
                typesToExclude,
              ),
              label,
              type,
              keyword,
            };
          }),
        ).then(searchResults => {
          return {searchResults, categoryName};
        });
      },
    ),
  ).then(searchResultsWrapper => {
    return searchResultsWrapper;
  });
};

const parseResult = async (
  keyword: string,
  baseSearch: BaseSearch,
  type: string[],
  typesToExclude: string[],
) => {
  //search with type property if keyword is empty
  if (keyword === '' && type) {
    let results = await getGoogleNearbySearch({
      ...baseSearch,
      type: type[0],
    });
    return filterLocationTypes(results, typesToExclude);
  }

  const results = await getGoogleNearbySearch({
    ...baseSearch,
    keyword,
    type: '',
  });
  return filterLocationTypes(results, typesToExclude);
};

const filterLocationTypes = (
  results: GoogleLocation[],
  typesToExclude: string[],
) => {
  return results.filter(({types}) =>
    //if all the types aren't incuded in types to exclude => good
    types.every(type => !typesToExclude.includes(type)),
  );
};

export const getMapPhotos = (photos: GooglePhotoLocation[], width = 400) => {
  return photos?.map(({photo_reference}) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photo_reference=${photo_reference}&key=${API_KEY}`;
  });
};

export const getDetailPlace = async (
  place_id: string,
): Promise<GoogleLocation> => {
  var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${API_KEY}&language=fr`,
    headers: {},
  };

  return axios(config)
    .then(function (response) {
      const result = JSON.parse(JSON.stringify(response.data)).result || {};
      return result;
    })
    .catch(function (error) {
      console.log(error);
      return {};
    });
};
