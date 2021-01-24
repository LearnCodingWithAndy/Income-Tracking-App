import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './Homepage';
import Login from './Login';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Home' component={Homepage} />
        <Stack.Screen name='Login' component={Login} options={{
          title: 'Sign in or Sign up'
        }} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

export default App;