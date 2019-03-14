import { createDrawerNavigator } from 'react-navigation';
import { Home } from '../screens/Home';

export default createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {}
);
