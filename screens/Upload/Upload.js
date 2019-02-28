import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, Dimensions, Platform, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Block, Button, Input, NavBar } from 'galio-framework';
import theme from '../../config/theme';
import { plantUpload } from '../../actions/upload';
import { pickImage } from '../../actions/image';

const { width, height } = Dimensions.get('screen');

class Upload extends PureComponent {
  static propTypes = {
    uri: PropTypes.string,
    pickImage: PropTypes.func.isRequired,
    plantUpload: PropTypes.func.isRequired,
    uploading: PropTypes.bool.isRequired,
  };

  state = {
    name: '',
    species: '',
    age: null,
  };

  onEditName = name => {
    this.setState({ name });
  };

  onEditSpecies = species => {
    this.setState({ species });
  };

  onEditAge = age => {
    this.setState({ age });
  };

  onPickImage = () => {
    const { pickImage } = this.props;
    pickImage();
  };

  onUpload = () => {
    const { plantUpload } = this.props;
    const { name, species, age } = this.state;
    plantUpload(name, species, age);
  };

  render() {
    const { uri, uploading } = this.props;
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
            <Image source={{ uri }} style={{ height: 250, width: width * 0.9 }}/>
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
          <Button color="error" onPress={this.onUpload}>
            Upload
          </Button>
        </Block>
      </Block>
    );
  }
}
Upload.propTypes = {};

Upload.defaultProps = {
  uri: null,
};

const mapStateToProps = state => ({
  uri: state.image.image.uri,
  uploading: state.upload.uploading,
});

const mapDispatchToProps = {
  plantUpload,
  pickImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
