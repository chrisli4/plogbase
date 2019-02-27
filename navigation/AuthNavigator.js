import { createStackNavigator } from 'react-navigation';

import { Login, SignUp } from '../screens/Auth';

export default createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);
