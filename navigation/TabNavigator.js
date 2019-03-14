import { createBottomTabNavigator } from 'react-navigation';
import { Home } from '../screens/Home';
import { People } from '../screens/People';
import { Upload } from '../screens/Upload';

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
    },
    People: {
      screen: People,
    },
    Upload: {
      screen: Upload,
    },
  },
  {}
);
