import {AllLocation, LatLng, RankBy} from '../../types';
import React from 'react';
import {displayLocations, parseLocations} from '../../helpers/dataparser';
import LocationViewList from './List';
import {StyleSheet, ScrollView} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setFirstFilter, setSecondFilter} from '../../redux/filter';
import LocationViewGrid from './Grid';

interface Props {
  currentLocation: LatLng;
  places: AllLocation[] | null;
  rankby: RankBy;
}

const Wrapper: React.FC<Props> = ({currentLocation, places, rankby}) => {
  const filter = useAppSelector(state => state.filter.value);
  const dispatch = useAppDispatch();

  const setLocationList = () => {
    const selectedPlaces = places?.find(
      ({categoryName}) => categoryName === filter?.firstFilter,
    );
    switch (true) {
      case filter?.firstFilter === undefined:
        return places?.map(({searchResults, categoryName}) => {
          return (
            <LocationViewList
              title={categoryName}
              isParent
              locations={displayLocations(
                parseLocations(
                  searchResults.map(({results}) => results).flat(),
                  currentLocation,
                ),
                rankby,
              )}
              key={categoryName}
              setFilter={(title: string) =>
                dispatch(setFirstFilter({firstFilter: title}))
              }
            />
          );
        });
      case filter?.secondFilter !== undefined:
        const selectedResults = selectedPlaces?.searchResults.find(
          ({label}) => label === filter?.secondFilter,
        );
        return (
          <LocationViewGrid
            title={selectedResults?.label || ''}
            locations={displayLocations(
              parseLocations(selectedResults?.results || [], currentLocation),
              rankby,
            )}
          />
        );

      case filter?.firstFilter !== undefined:
        return selectedPlaces?.searchResults.map(({results, label}) => {
          if (results.length === 0) {
            return null;
          }
          return (
            <LocationViewList
              title={label}
              locations={displayLocations(
                parseLocations(results, currentLocation),
                rankby,
              )}
              key={label}
              isParent
              setFilter={(title: string) =>
                dispatch(setSecondFilter({secondFilter: title}))
              }
            />
          );
        });
    }
  };

  return (
    places && (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.locationWrapper}>
        {setLocationList()}
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  locationWrapper: {
    paddingBottom: 50,
  },
});

export default Wrapper;
