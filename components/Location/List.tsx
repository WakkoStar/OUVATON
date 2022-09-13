import React from 'react';
import {Pressable, View, Text, FlatList, StyleSheet} from 'react-native';
import {Location} from '../../types';
import Element from './Element';

interface Props {
  title: string;
  isParent?: boolean;
  locations: Location[];
  setFilter?: (filter: string) => void;
}

const List: React.FC<Props> = ({
  title = '',
  isParent = false,
  locations = [],
  setFilter,
}) => {
  const renderItem = ({item}: {item: Location}) => {
    return <Element {...item} seeAlso={locations} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        {isParent && (
          <Pressable
            style={styles.seeAllWrapper}
            // @ts-ignore
            onPress={() => setFilter(title)}>
            <Text style={styles.text}>Voir tout</Text>
          </Pressable>
        )}
      </View>
      <FlatList
        style={styles.locationWrapper}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={true}
        data={locations}
        renderItem={renderItem}
        keyExtractor={item => item.placeId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default List;
