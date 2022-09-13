import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';

const ViewSwitch = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.switch}>
        <Text style={[styles.text, {color: 'black'}]}>Vue liste</Text>
        <Text style={[styles.text, {color: 'grey'}]}>Vue carte</Text>
        <View style={styles.selectionWrapper} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    marginTop: -2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  switch: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    borderWidth: 0,
    borderRadius: 100,
  },
  text: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 14,
    marginHorizontal: 25,
    paddingVertical: 15,
    zIndex: 2,
  },
  selectionWrapper: {
    width: '50%',
    marginLeft: '0%', //used for animation
    height: '100%',
    backgroundColor: 'white',
    zIndex: 1,
    top: 0,
    left: 0,
    position: 'absolute',
    borderWidth: 0,
    borderRadius: 100,
  },
});

export default ViewSwitch;
