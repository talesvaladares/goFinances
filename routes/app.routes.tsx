import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {useTheme} from 'styled-components';
import {MaterialIcons} from '@expo/vector-icons';

//telas
import {Dashboard} from '../src/pages/Dashboard';
import {Register} from '../src/pages/Register';
import {Resume} from '../src/pages/Resume';
import { Platform } from 'react-native';

const {Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes(){

  const theme = useTheme();

  return(
    //configuração dos botôes de navegação que ficam no final da tela
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: 'beside-icon',
        style:{
          paddingVertical: Platform.OS === 'ios'? 20 : 0,
          height: 88,
        }
      }}
    >
     <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: (({size, color}) => (
            <MaterialIcons
              size={size}
              color={color}
              name="format-list-bulleted"
            />
          ))
        }} 
      />
     <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: (({size, color}) => (
            <MaterialIcons
              size={size}
              color={color}
              name="attach-money"
            />
          ))
        }}  
      />
      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: (({size, color}) => (
            <MaterialIcons
              size={size}
              color={color}
              name="pie-chart"
            />
          ))
        }}  
      />
    </Navigator>
  )
}