import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useCallback, useState} from 'react';
import Geocoder from '@timwangdev/react-native-geocoder';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {useAppSelector} from '../redux/hooks';

interface Props {
  setModalSortVisible?: () => void;
  setModalSearchVisible: () => void;
}

const NavBar: React.FC<Props> = ({
  setModalSortVisible,
  setModalSearchVisible,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const location = useAppSelector(state => state.config.location);

  const [cityName, setCityName] = useState('');

  const handleNavigation = useCallback(() => {
    if (route?.name === 'Detail') {
      //@ts-ignore
      navigation?.navigate('Main');
    } else {
      navigation.goBack();
    }
  }, [navigation, route?.name]);

  useEffect(() => {
    const backAction = () => {
      handleNavigation();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [handleNavigation]);

  useEffect(() => {
    if (isNaN(location.lat) || isNaN(location.lng)) {
      return;
    }

    Geocoder.geocodePosition(location, {locale: 'fr'})
      .then(place => {
        if (!place.length) {
          return;
        }
        setCityName(place[0].locality + ', ' + place[0].streetName);
      })
      .catch(() => {
        console.log('Unable to find a place');
        setCityName('');
      });
  }, [location]);

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        {route?.name !== 'Main' && (
          <Pressable onPress={() => handleNavigation()}>
            <Image source={require('../assets/back.png')} style={styles.back} />
          </Pressable>
        )}
        <View>
          <Text style={styles.title}>Autour de moi</Text>
          <Text style={styles.subtitle}>{cityName}</Text>
        </View>
      </View>
      <View style={styles.btnWrapper}>
        <Pressable onPress={setModalSearchVisible}>
          <Image source={require('../assets/search.png')} style={styles.logo} />
        </Pressable>
        {route?.name === 'Main' && (
          <Pressable
            onPress={setModalSortVisible ? () => setModalSortVisible() : null}>
            <Image
              source={require('../assets/filter.png')}
              style={styles.logo}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  flexRow: {
    flexDirection: 'row',
  },
  btnWrapper: {
    flexDirection: 'row',
  },
  back: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  logo: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 18,
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 11,
    lineHeight: 13,
    color: '#000000',
  },
});

export default NavBar;
