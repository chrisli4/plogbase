import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { MenuIcon } from '../components/Icon';
import { Drawer } from '../components/View';

import { Home } from '../screens/Home';
import { Discover } from '../screens/Discover';
import { Upload } from '../screens/Upload';
import theme from '../config/theme';

export default createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: props => (
          <MenuIcon name="ui-04" family="Galio" focused={props.focused} />
        ),
      },
    },
    Discover: {
      screen: Discover,
      navigationOptions: {
        drawerlabel: 'Discover',
        drawerIcon: props => (
          <MenuIcon name="ui-04" family="Galio" focused={props.focused} />
        ),
      },
    },
    Upload: {
      screen: Upload,
      navigationOptions: {
        drawerlabel: 'Upload',
        drawerIcon: props => (
          <MenuIcon name="ui-04" family="Galio" focused={props.focused} />
        ),
      },
    },
  },
  {
    contentComponent: props => <Drawer {...props} />,
    contentOptions: {
      labelStyle: {
        fontWeight: '500',
        color: theme.COLORS.GREY,
        fontSize: theme.SIZES.FONT * 0.875,
        marginLeft: theme.SIZES.BASE * 0.75,
      },
      activeLabelStyle: {
        color: theme.COLORS.WHITE,
      },
      activeBackgroundColor: theme.COLORS.THEME,
      itemsContainerStyle: {
        paddingVertical: 0,
      },
      iconContainerStyle: {
        marginHorizontal: 0,
        marginLeft: theme.SIZES.BASE * 1.65,
        // marginRight: theme.SIZES.BASE * 0.76,
      },
    },
  }
);
