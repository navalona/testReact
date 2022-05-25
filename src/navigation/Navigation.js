
import React from 'react';
import { HomeScreen } from '../screens/Home';

import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

export const RootNavigator = () => {
  return (

    <Navigator >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, }}
      />

    </Navigator>
  );
}