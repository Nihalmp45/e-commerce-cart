import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Index from './Pages/Index';

const Stack = createNativeStackNavigator();

export default function RootLayout(){
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={Index}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};