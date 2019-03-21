import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Home } from '../screens/Home';
import { Plant } from '../screens/Plant';
import { People } from '../screens/People';
import { Upload } from '../screens/Upload';

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
  },
  Plant: {
    screen: Plant,
  },
}, {
  lazy: true,
});

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
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
