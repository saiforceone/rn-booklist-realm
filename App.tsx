/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import bookContext from './src/db';
import AppNav from './src/navigation/AppNav';
const {RealmProvider} = bookContext;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <RealmProvider>
      <PaperProvider>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppNav />
        </SafeAreaView>
      </PaperProvider>
    </RealmProvider>
  );
};

export default App;
