import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  Linking,
} from 'react-native';
import Avis from '../components/Location/Avis';
import LocationViewList from '../components/Location/List';
import NavBar from '../components/NavBar';
import {getDetailPlace, getMapPhotos} from '../helpers/googlemap';
import {Location} from '../types';
import Search from './Search';

interface RouteParams extends Location {
  seeAlso: Location[];
}

const Detail: React.FC = () => {
  const {title, distance, coords, avis, seeAlso, placeId} = useRoute()
    .params as RouteParams;

  const [photos, setPhotos] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>();
  const [modalSearchVisible, setModalSearchVisible] = useState(false);

  useEffect(() => {
    getDetailPlace(placeId).then(result => {
      setPhotos(getMapPhotos(result.photos, 900));
      setTypes(result.types);
    });
  }, [placeId]);

  const parseSeeAlso = (places: Location[]) => {
    return places.filter(place => place.placeId !== placeId);
  };

  return (
    <View style={styles.main}>
      <NavBar setModalSearchVisible={() => setModalSearchVisible(true)} />
      <Search
        setModalVisible={setModalSearchVisible}
        modalVisible={modalSearchVisible}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.infosWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{title || ''}</Text>
            <Text style={styles.text}>{distance || ''}</Text>
            <Text style={styles.text}>{types?.join(', ') || ''}</Text>
          </View>
          <Avis rank={avis.rank || 0} occur={avis.occur || '0'} />
        </View>
        <ScrollView horizontal>
          {photos?.map((image, index) => {
            return (
              <Image
                source={{uri: image}}
                style={styles.imgWrapper}
                key={index}
              />
            );
          })}
        </ScrollView>

        <Pressable
          onPress={() =>
            Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query=${coords.lat}%2C${coords.lng}&query_place_id=${placeId}`,
            )
          }>
          <View style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryText}>Ouvrir dans Maps</Text>
          </View>
        </Pressable>
        <LocationViewList
          title="Voir aussi"
          locations={parseSeeAlso(seeAlso)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  infosWrapper: {
    width: '100%',
    flexDirection: 'row',
    arginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgWrapper: {
    height: 275,
    width: 175,
    marginHorizontal: 2,
    marginVertical: 5,
    backgroundColor: 'grey',
    borderWidth: 0,
    borderRadius: 10,
  },
  textWrapper: {
    width: '70%',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 14,
    lineHeight: 17,
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    lineHeight: 15,
    color: 'grey',
  },
  btnPrimary: {
    borderWidth: 0,
    borderRadius: 100,
    backgroundColor: 'lightblue',
    marginVertical: 10,
  },
  btnPrimaryText: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 14,
    lineHeight: 18,
  },
});

export default Detail;
