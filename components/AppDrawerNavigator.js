import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';

import PasswordReset from '../screens/PasswordReset';


import {Icon} from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator({
  UserHome : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="Home" type ="fontawesome5" />
    }
    },
  AllUsers : {
    screen : AppStackNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="gift" type ="font-awesome" />,
      drawerLabel : "All Users"
    }
  },
  PasswordReset : {
    screen : PasswordReset,
    navigationOptions:{
      drawerIcon : <Icon name="settings" type ="fontawesome5" />,
      drawerLabel : "Change Password"
    }
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
