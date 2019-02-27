import React, { PureComponent } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Block, Button, Input, NavBar, Text } from 'galio-framework';
import theme from '../../config/theme';

import { signUp } from '../../actions/auth';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
});

class SignUp extends PureComponent {
  static propTypes = {
    signUp: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  onEditEmail = email => {
    this.setState({
      email,
    });
  };

  onEditPassword = password => {
    this.setState({
      password,
    });
  };

  onSignUp = () => {
    const { email, password } = this.state;
    const { signUp } = this.props;
    signUp(email, password);
  };

  onRedirect = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  };

  render() {
    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <NavBar
          title="Sign Up"
          leftIconColor="transparent"
          style={
            Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null
          }
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="height"
          enabled
        >
          <Block
            flex
            center
            style={{
              marginTop: theme.SIZES.BASE * 1.875,
              marginBottom: height * 0.1,
            }}
          >
            <Text
              muted
              center
              size={theme.SIZES.FONT * 0.875}
              style={{ paddingHorizontal: theme.SIZES.BASE * 2.3 }}
            >
              This is the perfect place to write a short description of this
              step and even the next steps ahead
            </Text>
          </Block>

          <Block flex={2} center space="evenly">
            <Block flex={2}>
              <Input
                rounded
                type="email-address"
                placeholder="Email"
                autoCapitalize="none"
                style={{ width: width * 0.9 }}
                onChangeText={this.onEditEmail}
              />
              <Input
                rounded
                password
                viewPass
                placeholder="Retype Password"
                style={{ width: width * 0.9 }}
                onChangeText={this.onEditPassword}
              />
            </Block>
            <Block flex middle>
              <Button round color="error" onPress={this.onSignUp}>
                Sign Up
              </Button>
              <Button color="transparent" onPress={this.onRedirect} shadowless>
                <Text
                  center
                  color={theme.COLORS.ERROR}
                  size={theme.SIZES.FONT * 0.75}
                >
                  {'Already have an account? Sign In'}
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const mapDispatchToProps = {
  signUp,
};

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(SignUp));
