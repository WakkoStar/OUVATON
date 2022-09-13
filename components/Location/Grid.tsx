import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, FlatList, StyleSheet} from 'react-native';
import {Location} from '../../types';
import Element from './Element';
import {LogBox} from 'react-native';

interface Props {
  title: string;
  locations: Location[];
}

type categoryValue = {
  type?: string[] | undefined;
  keyword: string;
  label: string;
};

const Grid: React.FC<Props> = ({title = '', locations = []}) => {
  const [allLocations, setAllLocations] = useState<Location[]>([]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    setAllLocations(locations);
  }, [locations]);

  const renderItem = ({item}: {item: Location}) => {
    return <Element {...item} seeAlso={locations} />;
  };

  const getHeader = () => {
    return (
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  // const getNextSearch = async () => {
  //   let selectedSearchList: categoryValue = {
  //     type: undefined,
  //     keyword: '',
  //     label: '',
  //   };

  //   searchList.forEach(({categoryValues}) => {
  //     const selection = categoryValues.find(({label}) => label === title);
  //     if (selection) {
  //       selectedSearchList = selection;
  //     }
  //   });

  //   const newLocations = await getGoogleNearbySearch({
  //     ...config,
  //     pagetoken: '',
  //     type:
  //       selectedSearchList.keyword === ''
  //         ? selectedSearchList.type?.[0] || ''
  //         : '',
  //     keyword:
  //       selectedSearchList.keyword === '' ? '' : selectedSearchList.keyword,
  //   });
  // };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          style={styles.locationWrapper}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={true}
          data={allLocations}
          renderItem={renderItem}
          keyExtractor={item => item.placeId}
          ListHeaderComponent={getHeader}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    width: '100%',
    marginVertical: 30,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllWrapper: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 18,
    lineHeight: 22,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 16,
    color: 'grey',
  },
  locationWrapper: {},
});

export default Grid;
