import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';

import CustomSideBarMenu  from './CustomSideBarMenu';
import NewUserscreen from '../screens/NewUsers'
import PasswordReset from '../screens/PasswordReset';
import {Icon} from 'react-native-elements';
import AllUsersScreen from '../screens/AllUsers';
import NewUsersScreen from '../screens/NewUsers';

export const AppDrawerNavigator = createDrawerNavigator({
  UserHome : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="home" type ="fontawesome5" />
    }
    },
  AllUsers : {
    screen : AllUsersScreen,
    navigationOptions:{
       drawerIcon : <Icon name="bell" type ="font-awesome" />,
      drawerLabel : "All Users"
    }
  },
  NewUsers : {
    screen : NewUsersScreen,
    navigationOptions:{
      drawerIcon : <Icon name="gift" type ="font-awesome" />,
      drawerLabel : "New Users"
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
