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

class SignUp extends PureComponent {
  render() {
    return <View />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
