import React from 'react';
import Homepage from './Homepage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;