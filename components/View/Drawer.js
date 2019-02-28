import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image, StyleSheet, ScrollView, SafeAreaView, Platform,
} from 'react-native';
import { DrawerItems } from 'react-navigation';
import { Block, Text } from 'galio-framework';
import theme from '../../config/theme';
import { logout } from '../../actions/auth';

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 0.6875,
    paddingBottom: theme.SIZES.BASE * 1.6875,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 0.5,
    marginTop: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : null,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: 'center',
  },
});

class Drawer extends Component {
  onLogout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    return (
  <SafeAreaView style={styles.drawer} forceInset={{ top: 'always', horizontal: 'never' }}>
    <Block space="between" row style={styles.header}>
      <Block flex={0.3}><Image source={{ uri: 'http://i.pravatar.cc/100' }} style={styles.avatar} /></Block>
      <Block flex style={styles.middle}>
        <Text size={theme.SIZES.FONT * 0.875}>Galio Framework</Text>
        <Text muted size={theme.SIZES.FONT * 0.875}>React Native</Text>
      </Block>
    </Block>
    <ScrollView>
      <DrawerItems {...this.props} />
    </ScrollView>
  </SafeAreaView>
    );
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(
  null,
  mapDispatchToProps
)(Drawer);
