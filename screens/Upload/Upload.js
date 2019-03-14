import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, View, Text } from 'react-native';
import { pickImage } from '../../actions/image';
import { addPost } from '../../actions/posts';

class Upload extends PureComponent {
  onUpload = () => {
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
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Upload" onPress={this.onUpload}>
          <Text>UPLOAD</Text>
        </Button>
        <Button title="Add" onPress={this.onAddPost}>
          <Text>ADD</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  pickImage,
  addPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
