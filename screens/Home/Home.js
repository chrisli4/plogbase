import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, View, Text } from 'react-native';
import { fetchPosts } from '../../actions/posts';

class Home extends PureComponent {
  onFetchPosts = () => {
    const { fetchPosts } = this.props;
    fetchPosts();
  };

  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home</Text>
        <Button title="fetch" onPress={this.onFetchPosts} />
      </View>
    );
  }
}

const mapDispatchToProps = {
  fetchPosts,
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
