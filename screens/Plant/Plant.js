import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, ScrollView, View, Text } from 'react-native';
import { CacheManager, Image } from 'react-native-expo-image-cache';
import { POSTS } from '../../constants/types';
import { fetchPosts } from '../../actions/posts';

const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };

class Plant extends PureComponent {
  onFetch = () => {
    const { fetchPosts, postsKey } = this.props;
    fetchPosts('/posts', postsKey, POSTS, false);
  };
  
  render() {
    const { navigation } = this.props;
    const post = navigation.getParam('post');
    return (
      <View>
        <Image style={{ height: 200, width: 300 }} {...{preview, uri: post.uri}} />
        <Text>{post.id}</Text>
        <Text>{post.name}</Text>
        <Text>{post.species}</Text>
        <Text>{post.genus}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.POSTS,
  postsKey: state.cursors.POSTS,
});

const mapDispatchToProps = {
  fetchPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plant);
