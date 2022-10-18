import React from "react";
import {View, Text} from 'react-native'

const Home =({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Desafío Práctico 2</Text>
        <Text>Realizado por: Rafael Arturo Zamora Aguilar ZA190386</Text>
        <Text>En el menú lateral se encuentra:</Text>
        <Text>1 - Calculadora</Text>
        <Text>2 - Conversión de monedas</Text>
        <Text>3 - Gestión de compras en tienda</Text>
      </View>
    );
  }

  export default Home;