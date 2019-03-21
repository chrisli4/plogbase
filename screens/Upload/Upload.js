import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Image,
  Dimensions,
  Platform,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import { Block, Button, Input, NavBar } from 'galio-framework';
import theme from '../../config/theme';

import { pickImage } from '../../actions/image';
import { addPost } from '../../actions/posts';

const { width, height } = Dimensions.get('screen');

class Upload extends PureComponent {
  static propTypes = {
    uri: PropTypes.string,
    pickImage: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
  };

  onPickImage = () => {
    const { pickImage } = this.props;
    pickImage();
  };

  onAddPost = () => {
    const { addPost } = this.props;
    addPost({
      name: 'Bob',
      species: 'Piranha',
      genus: 'Cactus',
    });
  };

  render() {
    const { uri } = this.props;
    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <NavBar
          title="Home"
          onLeftPress={this.toggleDrawer}
          style={
            Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null
          }
        />
        <Block card shadow center height={250} width={width * 0.9}>
          {uri && (
            <Image
              source={{ uri }}
              style={{ height: 250, width: width * 0.9 }}
            />
          )}
        </Block>
        <Block center space="evenly">
          <Input
            type="default"
            placeholder="Name"
            autoCapitalize="none"
            style={{ width: width * 0.9 }}
            onChangeText={this.onEditName}
          />
          <Input
            type="default"
            placeholder="Species"
            autoCapitalize="none"
            style={{ width: width * 0.9 }}
            onChangeText={this.onEditSpecies}
          />
          <Input
            type="numeric"
            placeholder="Age"
            autoCapitalize="none"
            style={{ width: width * 0.9 }}
            onChangeText={this.onEditAge}
          />
        </Block>
        <Block flex middle space="evenly">
          <Button color="primary" onPress={this.onPickImage}>
            Select Image
          </Button>
          <Button color="error" onPress={this.onAddPost}>
            Upload
          </Button>
        </Block>
      </Block>
    );
  }
}

const mapStateToProps = state => ({
  uri: state.image.result.uri,
});

const mapDispatchToProps = {
  pickImage,
  addPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
