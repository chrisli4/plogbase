import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const RootNavigator = createSwitchNavigator(
  {
    Auth: {
      screen: AuthNavigator,
    },
    Drawer: {
      screen: DrawerNavigator,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

export default createAppContainer(RootNavigator);
