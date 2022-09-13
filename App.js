/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import Main from './pages/Main';
import Detail from './pages/Detail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import store from './redux';
import {Provider} from 'react-redux';
import GeoLocationHandler from './components/Location/GeoLocationHandler';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const customTheme = {
    colors: {
      background: 'white',
    },
  };

  return (
    <Provider store={store}>
      <GeoLocationHandler />
      <NavigationContainer theme={customTheme}>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
