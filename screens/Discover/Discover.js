import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

import { Constants } from 'expo';

// galio components
import { Block, Card, Text, Icon, NavBar } from 'galio-framework';
import theme from '../../config/theme';

const { width, height } = Dimensions.get('screen');

const bgImage =
  'https://images.unsplash.com/photo-1503631285924-e1544dce8b28?fit=crop&w=900&q=80';

const Article = props => (
  <Block>
    <StatusBar barStyle="light-content" />
    <Block style={styles.navbar}>
      <NavBar
        transparent
        leftIconColor={theme.COLORS.WHITE}
        onLeftPress={() => props.navigation.openDrawer()}
      />
    </Block>

    <Image
      source={{ uri: bgImage }}
      resizeMode="cover"
      style={{
        width,
        height: height * 0.55,
      }}
    />

    <Block center style={{ marginTop: -theme.SIZES.BASE * 2 }}>
      <Block flex style={styles.header}>
        <Block>
          <Text size={theme.SIZES.BASE * 1.875}>Name: Blah</Text>
          <Text
            muted
            t
            size={theme.SIZES.BASE * 0.875}
            style={{ marginTop: theme.SIZES.BASE, fontWeight: '500' }}
          >
            Description: blah
          </Text>
        </Block>

        <Block center>
          <Card
            borderless
            style={styles.stats}
            title="Christopher Moon"
            caption="Plant Enthusiast"
            avatar="http://i.pravatar.cc/100?id=article"
            location={(
<Block row right>
  <Block
                  row
                  middle
                  style={{ marginHorizontal: theme.SIZES.BASE }}
                >
                  <Icon
      name="location"
      family="EvilIcons"
      color={theme.COLORS.MUTED}
      size={theme.SIZES.FONT * 0.875}
    />
                  <Text
      p
      color={theme.COLORS.MUTED}
      size={theme.SIZES.FONT * 0.875}
      style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
    >
                    Irvine, CA
    </Text>
                </Block>
  <Block row middle>
                  <Icon
      name="share-2"
      family="Feather"
      color={theme.COLORS.MUTED}
      size={theme.SIZES.FONT * 0.875}
    />
                  <Text
      p
      color={theme.COLORS.MUTED}
      size={theme.SIZES.FONT * 0.875}
      style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
    >
                    936
    </Text>
                </Block>
</Block>
)}
          />
        </Block>

        <ScrollView>
          <Text style={styles.text} />
          <Text style={styles.text}>
            {"A lot of Bacon. I'd really like to eat like a LOT of Bacon :(."}
          </Text>
        </ScrollView>
      </Block>
    </Block>
  </Block>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    width,
  },
  navbar: {
    top: Constants.statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: 'absolute',
  },
  stats: {
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  title: {
    justifyContent: 'center',
    paddingLeft: theme.SIZES.BASE / 2,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
  },
});

export default Article;
