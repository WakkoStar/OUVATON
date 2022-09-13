import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import NavBar from '../components/NavBar';
import {getAllGoogleNearbySearchs} from '../helpers/googlemap';
import {searchList} from '../helpers/data';
import {AllLocation, NetworkStatus} from '../types';
import Filter from '../components/Filter';
import Wrapper from '../components/Location/Wrapper';
import {useAppSelector} from '../redux/hooks';
import Sort from './Sort';
import ScreenHandler from '../components/ScreenHandler';
import Search from './Search';

const Main: React.FC = () => {
  const screenHeight = Dimensions.get('window').height;

  const [places, setPlaces] = useState<AllLocation[] | null>(null);
  const [status, setStatus] = useState<NetworkStatus>('loading');
  const [modalSortVisible, setModalSortVisible] = useState(false);
  const [modalSearchVisible, setModalSearchVisible] = useState(false);
  const config = useAppSelector(state => state.config);

  useEffect(() => {
    setStatus('loading');

    if (isNaN(config.location.lat) || isNaN(config.location.lng)) {
      return;
    }

    getAllGoogleNearbySearchs(config, searchList)
      .then(nearbyPlaces => {
        const noResults =
          nearbyPlaces
            .map(({searchResults}) => searchResults.map(({results}) => results))
            .flat()
            .flat().length === 0;

        if (noResults) {
          setStatus('empty');
          return;
        }
        setPlaces(nearbyPlaces);
        setStatus('success');
      })
      .catch(() => {
        setStatus('error');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.location, config.radius]);

  return (
    <View style={styles.main}>
      <NavBar
        setModalSortVisible={() => setModalSortVisible(true)}
        setModalSearchVisible={() => setModalSearchVisible(true)}
      />
      <View style={[styles.container, {height: screenHeight}]}>
        <Sort
          setStatus={newStatus => setStatus(newStatus)}
          setModalVisible={setModalSortVisible}
          modalVisible={modalSortVisible}
        />
        <Search
          setStatus={newStatus => setStatus(newStatus)}
          setModalVisible={setModalSearchVisible}
          modalVisible={modalSearchVisible}
        />
        {/* <ViewSwitch /> */}
        <Filter />
        <ScreenHandler status={status}>
          <Wrapper
            currentLocation={config.location}
            places={places}
            rankby={config.rankby}
          />
        </ScreenHandler>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
});

export default Main;
