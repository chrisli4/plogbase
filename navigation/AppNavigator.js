import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const RootNavigator = createSwitchNavigator(
  {
    Drawer: {
      screen: DrawerNavigator,
    },
    Auth: {
      screen: AuthNavigator,
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
