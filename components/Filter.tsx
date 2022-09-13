import React, {useCallback, useEffect} from 'react';
import {
  BackHandler,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {deleteFirstFilter, deleteSecondFilter} from '../redux/filter';

import {useAppDispatch, useAppSelector} from '../redux/hooks';

interface Props {}

const Filter: React.FC<Props> = ({}) => {
  const filter = useAppSelector(state => state.filter.value);
  const dispatch = useAppDispatch();

  const handleFilter = useCallback(() => {
    switch (true) {
      case filter?.secondFilter !== undefined:
        dispatch(deleteSecondFilter());
        return;

      case filter?.firstFilter !== undefined:
        dispatch(deleteFirstFilter());
        return;
    }
  }, [filter, dispatch]);

  useEffect(() => {
    const backAction = () => {
      handleFilter();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [handleFilter]);

  return filter ? (
    <View style={styles.container}>
      {filter.firstFilter && (
        <View style={styles.firstFilterWrapper}>
          <Text style={styles.text}>{filter.firstFilter}</Text>
          <Pressable
            style={styles.btn}
            onPress={() => dispatch(deleteFirstFilter())}>
            <Image
              source={require('../assets/cancel.png')}
              style={styles.logo}
            />
          </Pressable>
        </View>
      )}
      {filter.firstFilter && filter.secondFilter && (
        <View style={styles.secondFilterWrapper}>
          <Text style={[styles.text, {marginLeft: 20}]}>
            {filter.secondFilter}
          </Text>
          <Pressable onPress={() => dispatch(deleteSecondFilter())}>
            <Image
              source={require('../assets/cancel.png')}
              style={styles.logo}
            />
          </Pressable>
        </View>
      )}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
  },
  btn: {
    paddingVertical: 5,
  },
  firstFilterWrapper: {
    backgroundColor: 'lightblue',
    borderWidth: 0,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  secondFilterWrapper: {
    backgroundColor: 'aquamarine',
    borderWidth: 0,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -30,
    zIndex: 1,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
    paddingVertical: 10,
    paddingRight: 5,
    opacity: 0.5,
    paddingLeft: 20,
  },
  logo: {
    width: 20,
    opacity: 0.5,
    height: 20,
    marginHorizontal: 10,
  },
});

export default Filter;
