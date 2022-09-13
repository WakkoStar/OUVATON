import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Image, Text, StyleSheet, Pressable} from 'react-native';
import {Location} from '../../types';
import Avis from './Avis';

interface Props extends Location {
  seeAlso: Location[];
}

const Element: React.FC<Props> = ({
  title = '',
  distance = '',
  avis = {rank: 0, occur: '0'},
  thumbnail = '',
  isOpen = false,
  coords = {lat: 0, lng: 0},
  seeAlso = [],
  placeId = '',
}) => {
  const navigation = useNavigation();
  const parseTitle = (str: string) => {
    return str.length > 30 ? str.slice(0, 30) + '...' : str;
  };

  return (
    <Pressable
      onPress={() =>
        //@ts-ignore
        navigation?.push('Detail', {
          title,
          distance,
          coords,
          avis,
          isOpen,
          seeAlso,
          placeId,
        })
      }>
      <View style={styles.container}>
        <Image
          // @ts-ignore
          source={thumbnail !== '' ? {uri: thumbnail} : null}
          style={styles.imgWrapper}
        />
        <Avis {...avis} />
        <View>
          <Text style={styles.title}>{parseTitle(title)}</Text>
          <Text style={styles.text}>{distance}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 210,
    marginHorizontal: 10,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  imgWrapper: {
    height: 150,
    backgroundColor: 'grey',
    borderWidth: 0,
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    fontSize: 12,
    lineHeight: 14,
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    lineHeight: 15,
    color: 'grey',
  },
});

export default Element;
