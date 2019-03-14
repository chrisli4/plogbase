import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, View, Text } from 'react-native';
import { PEOPLE } from '../../constants/types';
import { fetchPosts } from '../../actions/posts';

class People extends PureComponent {
  onFetch = () => {
    const { fetchPosts, peopleKey, uid } = this.props;
    fetchPosts(`/people/${uid}/posts`, peopleKey, PEOPLE);
  };

  render() {
    const { posts } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {posts.map(post => (
          <View
            key={`${post.id}`}
            style={{ padding: 1, margin: 1, borderWidth: 1 }}
          >
            <Text>
              {post.id}
              {post.name}
            </Text>
          </View>
        ))}
        <Button title="fetch" onPress={this.onFetch}>
          <Text>FETCH</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.auth.user.uid,
  posts: state.posts.PEOPLE,
  peopleKey: state.cursors.PEOPLE,
});

const mapDispatchToProps = {
  fetchPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
