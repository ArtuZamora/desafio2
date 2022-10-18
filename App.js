import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Calculator from './screens/Calculator';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Conversor from './screens/Conversor';
import TiendaRopa from './screens/Tienda de ropa';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Inicio"
          component={Home}
          options={{
            drawerIcon: ({ focused, size }) => {
              let colorIcon = focused ? '#007AFF' : 'black';
              return (<FontAwesome name='home' size={32} color={colorIcon} />);
            },
          }} />
        <Drawer.Screen
          name="Calculadora"
          component={Calculator}
          options={{
            drawerIcon: ({ focused, size }) => {
              let colorIcon = focused ? '#007AFF' : 'black';
              return (<FontAwesome name='calculator' size={32} color={colorIcon} />);
            },
          }} />
        <Drawer.Screen
          name="Conversor"
          component={Conversor}
          options={{
            drawerIcon: ({ focused, size }) => {
              let colorIcon = focused ? '#007AFF' : 'black';
              return (<FontAwesome name='money' size={32} color={colorIcon} />);
            },
          }} />
        <Drawer.Screen
          name="Tienda de ropa"
          component={TiendaRopa}
          options={{
            drawerIcon: ({ focused, size }) => {
              let colorIcon = focused ? '#007AFF' : 'black';
              return (<FontAwesome name='shopping-cart' size={32} color={colorIcon} />);
            },
          }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}