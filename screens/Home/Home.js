import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, ScrollView, View, Text } from 'react-native';
import { CacheManager, Image } from 'react-native-expo-image-cache';
import { POSTS } from '../../constants/types';
import { fetchPosts } from '../../actions/posts';

const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };

class Home extends PureComponent {
  onFetch = () => {
    const { fetchPosts, postsKey } = this.props;
    fetchPosts('/posts', postsKey, POSTS, false);
  };

  onNav = post => {
    const { navigation } = this.props;
    navigation.navigate('Plant', { post });
  }

  render() {
    const { posts } = this.props;
    return (
      <ScrollView>
        {posts.map(post => (
          <View
            key={`${post.id}`}
            style={{ padding: 1, margin: 1, borderWidth: 1 }}
          >
            <Image style={{ height: 200, width: 300 }} {...{preview, uri: post.uri}} />
            <Text>
              {post.id}
              {post.name}
            </Text>
        <Button title="nav" onPress={() => this.onNav(post)}>
          <Text>NAV</Text>
        </Button>
          </View>
        ))}
        <Button title="fetch" onPress={this.onFetch}>
          <Text>FETCH</Text>
        </Button>
      </ScrollView>
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
)(Home);
