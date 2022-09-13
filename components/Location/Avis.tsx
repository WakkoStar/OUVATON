import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Avis} from '../../types';

const AvisWrapper: React.FC<Avis> = ({rank, occur}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rankWrapper}>
        <Text style={styles.title}>{rank}</Text>
        <Image source={require('../../assets/star.png')} style={styles.img} />
      </View>
      <View>
        <Text style={styles.text}>({occur})</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingBottom: 2,
    marginTop: -25,
    borderWidth: 0,
    marginBottom: 5,
    borderRadius: 100,
    alignSelf: 'flex-end',
    alignItems: 'center',
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  rankWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 15,
    width: 15,
    marginTop: -5,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 14,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 14,
    marginLeft: 2,
    color: '#000000',
  },
});

export default AvisWrapper;
