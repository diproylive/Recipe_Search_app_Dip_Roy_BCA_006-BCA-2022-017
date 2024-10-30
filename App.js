import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/AppNavigator';
import { auth } from './firebase/firebase';

// Importing the AppNavigator component


export default function App() {
  return (
    <AppNavigator/>
  );
}

const styles = StyleSheet.create({
  
});
