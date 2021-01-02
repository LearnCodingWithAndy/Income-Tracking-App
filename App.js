import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SaveAreaView } from 'react-native';

export default function App() {
  return (
    <SaveAreaView style={styles.container}>
      <Text>Hello React Native</Text>
      <StatusBar style="auto" />
    </SaveAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
