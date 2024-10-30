import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './Screens/Welcome';
import Home from './Screens/Home';
import Search from './Screens/Search';
import Details from './Screens/Details';
import RecipeByCategory from './Screens/RecipeByCategory';
import AddRecipe from './Screens/AddRecipe';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="Search" component={Search} options={{headerShown: false}} />
        <Stack.Screen name="Details" component={Details} options={{headerShown: false}} />
        <Stack.Screen name="RecipeByCategory" component={RecipeByCategory} options={{headerShown: false}} />
        <Stack.Screen name="AddRecipe" component={AddRecipe} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});