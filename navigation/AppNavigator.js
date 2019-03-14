import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

const RootNavigator = createSwitchNavigator(
  {
    Auth: {
      screen: AuthNavigator,
    },
    Tab: {
      screen: TabNavigator,
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
