import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TextInput,
} from 'react-native';
import {updateLocation} from '../redux/config';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {LatLng, NetworkStatus} from '../types';

interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setStatus?: (status: NetworkStatus) => void;
}

const Search: React.FC<Props> = ({
  modalVisible,
  setModalVisible,
  setStatus,
}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [location, setLocation] = useState<{lat: string; lng: string}>({
    lat: '0',
    lng: '0',
  });
  const oldLocation = useAppSelector(state => state.config.location);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLocation({lat: `${oldLocation.lat}`, lng: `${oldLocation.lng}`});
  }, [oldLocation]);

  const saveAndExit = () => {
    const parsedLocation: LatLng = {
      lat: Number(location.lat),
      lng: Number(location.lng),
    };

    if (oldLocation !== parsedLocation) {
      if (setStatus) {
        setStatus('loading');
      }

      dispatch(updateLocation({location: parsedLocation}));

      if (route?.name !== 'Main') {
        //@ts-ignore
        navigation?.navigate('Main');
      }
    }

    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => saveAndExit()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>Recherche</Text>
            <Pressable onPress={() => saveAndExit()}>
              <Image
                source={require('../assets/cancel.png')}
                style={styles.logo}
              />
            </Pressable>
          </View>
          <View style={styles.searchWrapper}>
            <Text style={styles.label}>Latitude</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text: string) =>
                setLocation({...location, lat: text})
              }
              value={`${location.lat}`}
              placeholder="Saisissez lat."
              keyboardType="numeric"
            />
            <Text style={styles.label}>Longitude</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text: string) =>
                setLocation({...location, lng: text})
              }
              value={`${location.lng}`}
              placeholder="Saisissez lon."
              keyboardType="numeric"
            />
            <Pressable onPress={() => saveAndExit()}>
              <View style={styles.btnPrimary}>
                <Text style={styles.btnPrimaryText}>Appliquer</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 10,
  },
  slider: {
    paddingVertical: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 20,
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 18,
    lineHeight: 22,
  },
  searchWrapper: {
    width: '100%',
    paddingVertical: 20,
  },
  label: {
    fontFamily: 'Poppins-Light',
    color: '#000000',
    fontSize: 10,
    lineHeight: 12,
    marginTop: 10,
    padding: 0,
  },
  input: {
    paddingHorizontal: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    marginVertical: 2,
    backgroundColor: '#eeeeee',
    fontSize: 14,
    lineHeight: 18,
  },
  btnPrimary: {
    borderWidth: 0,
    borderRadius: 100,
    backgroundColor: 'lightblue',
    marginBottom: 0,
    marginTop: 50,
    alignItems: 'center',
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

export default Search;
