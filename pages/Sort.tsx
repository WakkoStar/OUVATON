import {Slider} from '@miblanchard/react-native-slider';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';
import {updateRadius, updateRankBy} from '../redux/config';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {NetworkStatus, RankBy} from '../types';

interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setStatus: (status: NetworkStatus) => void;
}

const Sort: React.FC<Props> = ({modalVisible, setModalVisible, setStatus}) => {
  const [radius, setRadius] = useState(20000);
  const [rankby, setRankBy] = useState<RankBy>('distance');
  const oldRadius = useAppSelector(state => state.config.radius);
  const dispatch = useAppDispatch();
  const oldRankBy = useAppSelector(state => state.config.rankby);

  useEffect(() => {
    setRadius(oldRadius);
    setRankBy(oldRankBy);
  }, [oldRadius, oldRankBy]);

  const saveAndExit = () => {
    if (oldRadius !== radius) {
      setStatus('loading');
      dispatch(updateRadius({radius}));
    }
    if (oldRankBy !== rankby) {
      setStatus('loading');
      dispatch(updateRankBy({rankby}));
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
            <Text style={styles.title}>Filtres</Text>
            <Pressable onPress={() => saveAndExit()}>
              <Image
                source={require('../assets/cancel.png')}
                style={styles.logo}
              />
            </Pressable>
          </View>
          <View style={styles.radiusWrapper}>
            <View style={styles.radiusText}>
              <Text style={styles.label}>Rayon de recherche : </Text>
              <Text style={styles.text}>{Math.round(radius / 1000)} km</Text>
            </View>
            <Slider
              value={radius}
              maximumValue={50000}
              minimumValue={2000}
              thumbTintColor={'lightblue'}
              trackStyle={styles.slider}
              maximumTrackTintColor={'grey'}
              minimumTrackTintColor={'lightblue'}
              onValueChange={value => setRadius(value)}
              containerStyle={styles.sliderContainer}
            />
            <View style={styles.radiusValues}>
              <Text style={styles.valueTxt}>2 km</Text>
              <Text style={styles.valueTxt}>50 km</Text>
            </View>
          </View>
          <View style={styles.sortByWrapper}>
            <Text style={styles.label}>Trier par : </Text>
            <View style={styles.sortBySelector}>
              <Pressable
                style={[
                  styles.sortByBtn,
                  {
                    backgroundColor:
                      rankby === 'prominence' ? 'lightblue' : 'white',
                  },
                ]}
                onPress={() => setRankBy('prominence')}>
                <Text style={styles.sortByTxt}>Popularité</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.sortByBtn,
                  {
                    backgroundColor:
                      rankby === 'distance' ? 'lightblue' : 'white',
                  },
                ]}
                onPress={() => setRankBy('distance')}>
                <Text style={styles.sortByTxt}>Distance</Text>
              </Pressable>
            </View>
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
  radiusWrapper: {
    width: '100%',
    paddingVertical: 20,
  },
  sortByWrapper: {
    width: '100%',
    paddingVertical: 20,
  },
  sortBySelector: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 10,
    marginVertical: 10,
  },
  sortByBtn: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderWidth: 0,
    borderRadius: 10,
  },
  sortByTxt: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 14,
    lineHeight: 18,
  },
  radiusText: {
    flexDirection: 'row',
  },
  label: {
    fontFamily: 'Poppins-Light',
    color: '#000000',
    fontSize: 14,
    lineHeight: 18,
  },
  text: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 14,
    lineHeight: 18,
  },
  radiusValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueTxt: {
    fontFamily: 'Poppins-Light',
    color: 'grey',
    fontSize: 12,
    lineHeight: 14,
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

export default Sort;
