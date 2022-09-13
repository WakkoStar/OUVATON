import React from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {NetworkStatus} from '../types';

interface Props {
  status: NetworkStatus;
  children: JSX.Element;
  openFilters?: () => void;
  changeLocation?: () => void;
}

const ScreenHandler: React.FC<Props> = ({
  status,
  children,
  openFilters,
  changeLocation,
}) => {
  const filter = useAppSelector(state => state.filter.value);

  const ScreenOverlay = () => {
    if (status === 'empty') {
      return (
        <View style={[styles.container, styles.alignToCenter]}>
          <Image style={styles.logo} source={require('../assets/empty.png')} />
          <Text style={styles.text}>
            Nous n’avons rien trouvé avec cette localisation ainsi qu’avec les
            filtres appliqués.
          </Text>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Changer ma localisation</Text>
          </Pressable>
          <Pressable style={styles.btnSecondary}>
            <Text style={styles.btnText}>Modifier les filtres</Text>
          </Pressable>
        </View>
      );
    }

    if (status === 'error') {
      return (
        <View style={[styles.container, styles.alignToCenter]}>
          <Image style={styles.logo} source={require('../assets/bad.png')} />
          <Text style={styles.text}>
            Vérifiez votre connexion réseau. Impossible de récupéréer les
            données.
          </Text>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Relancer la recherche</Text>
          </Pressable>
        </View>
      );
    }

    if (status === 'loading') {
      return (
        <View
          style={[
            styles.container,
            {
              marginTop: filter?.firstFilter ? 150 : 100,
            },
          ]}>
          <View style={styles.skeletonContainer}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonWrapper}>
              <View style={styles.skeletonElement} />
              <View style={styles.skeletonElement} />
              <View style={styles.skeletonElement} />
            </View>
          </View>
          <View style={styles.skeletonContainer}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonWrapper}>
              <View style={styles.skeletonElement} />
              <View style={styles.skeletonElement} />
              <View style={styles.skeletonElement} />
            </View>
          </View>
          <View style={styles.skeletonContainer}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonWrapper}>
              <View style={styles.skeletonElement} />
              <View style={styles.skeletonElement} />
              <View style={styles.skeletonElement} />
            </View>
          </View>
        </View>
      );
    }
    return null;
  };
  return (
    <>
      <ScreenOverlay />
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 2000,
    zIndex: 2,
    paddingTop: 40,
    width: '100%',
    marginTop: 120,
  },
  alignToCenter: {
    alignItems: 'center',
  },
  skeletonContainer: {
    paddingBottom: 100,
  },
  skeletonTitle: {
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: 'lightgrey',
    width: '70%',
    height: 25,
    marginVertical: 5,
  },
  skeletonWrapper: {
    flexDirection: 'row',
  },
  skeletonElement: {
    width: 150,
    height: 150,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: 'lightgrey',
  },
  logo: {
    width: 50,
    height: 50,
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    lineHeight: 15,
    width: '80%',
    textAlign: 'center',
    paddingVertical: 20,
    color: 'grey',
  },
  btn: {
    borderWidth: 0,
    borderRadius: 100,
    backgroundColor: 'lightblue',
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  btnSecondary: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'lightblue',
    marginVertical: 10,
    backgroundColor: 'white',
    width: '80%',
    alignItems: 'center',
  },
  btnText: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 14,
    lineHeight: 18,
  },
});

export default ScreenHandler;
