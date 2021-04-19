import React from 'react';
import { Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import CalendarList from '../components/CalendarList';
import HomeScreen from '../screens/HomeScreen';
import Colors from '../utils/colors'
import EventDetails from '../components/EventDetails';

const Stack = createStackNavigator();
const defaultStackNavOptions = {
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerTitleStyle: {
      fontFamily: 'bebas-neue'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: Colors.coral
};

const CalendarNavigator = ()=>{
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={defaultStackNavOptions}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Home' }}
            />
            <Stack.Screen name="Agenda" component={CalendarList} />
            <Stack.Screen name="Add" component={EventDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      );
};

export default CalendarNavigator;