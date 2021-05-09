import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import AllUsersScreen from '../screens/AllUsers';
import DetailsScreen  from '../screens/DetailsScreen';




export const AppStackNavigator = createStackNavigator({
  AllUsers : {
    screen : AllUsersScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  Details : {
    screen : DetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'AllUsers'
  }
);
