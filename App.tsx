import React from 'react';
import {StatusBar} from 'react-native';
import AppLoading  from 'expo-app-loading';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

//navegação
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import {ThemeProvider} from 'styled-components';
import {AuthProvider} from './src/contexts/AuthContext';

import theme from './src/styles/theme';
import {AppRoutes} from './routes/app.routes';
import {SignIn} from './src/pages/SignIn';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
        <AuthProvider>
          <SignIn/>
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
