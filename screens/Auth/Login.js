import React, { PureComponent } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Block, Button, Input, NavBar, Text } from 'galio-framework';
import theme from '../../config/theme';

import { login } from '../../actions/auth';

const { width } = Dimensions.get('window');

class Login extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    signUpSuccess: PropTypes.bool.isRequired,
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

  onLogin = () => {
    const { email, password } = this.state;
    const { login } = this.props;
    login(email, password);
  };

  onRedirect = () => {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  };

  render() {
    const { errorMessage, signUpSuccess } = this.props;
    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <NavBar
          title="Sign In"
          leftIconColor="transparent"
          style={
            Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null
          }
        />
        <Block
          flex
          center
          style={{
            marginVertical: theme.SIZES.BASE * 1.875,
          }}
        >
          <Text
            muted
            center
            size={theme.SIZES.FONT * 0.875}
            style={{ paddingHorizontal: theme.SIZES.BASE * 2.3 }}
          >
            This is the perfect place to write a short description of this step
            and even the next steps ahead
          </Text>
        </Block>
        <Block>
          <Text
            color={errorMessage ? theme.COLORS.ERROR : theme.COLORS.SUCCESS}
            size={theme.SIZES.FONT * 0.75}
            style={{
              alignSelf: 'center',
              lineHeight: theme.SIZES.FONT * 2,
            }}
          >
            {errorMessage || (signUpSuccess || ' ')}
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
              placeholder="Password"
              style={{ width: width * 0.9 }}
              onChangeText={this.onEditPassword}
            />
            <Text
              color={theme.COLORS.ERROR}
              size={theme.SIZES.FONT * 0.75}
              style={{
                alignSelf: 'flex-end',
                lineHeight: theme.SIZES.FONT * 2,
              }}
            >
              Forgot your password?
            </Text>
          </Block>
          <Block flex middle>
            <Button round color="error" onPress={this.onLogin}>
              Sign In
            </Button>
            <Button color="transparent" onPress={this.onRedirect} shadowless>
              <Text
                center
                color={theme.COLORS.ERROR}
                size={theme.SIZES.FONT * 0.75}
              >
                {"Don't have an account? Sign Up"}
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
  signUpSuccess: state.auth.signUpSuccess,
});

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Login));
