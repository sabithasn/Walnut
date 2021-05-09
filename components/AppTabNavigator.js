import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import HomeScreen from '../screens/HomeScreen';


export const AppTabNavigator = createBottomTabNavigator({
  Details : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/viewall.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "All Users",
    }
  },
  UserHome: {
    screen: HomeScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/mydetails.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "My Details",
    }
  }
});
