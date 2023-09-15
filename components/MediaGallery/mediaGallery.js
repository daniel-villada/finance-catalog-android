import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, shadow, sizes, spacing} from '../../constants/theme';
// import FavoriteButton from './FavoriteButton';
import CardStack, { Card } from 'react-native-card-stack-swiper';

const MediaGallery = () => {
  return (
            <View style={styles.container}>
              <View style={{flex:1}}>
                <CardStack
                  style={styles.content}
                  renderNoMoreCards={() => <Text style={{fontWeight: "bold", fontSize:18, color:'white'}}>No more cards :(</Text>}
                  ref={swiper => {
                    this.swiper = swiper
                  }}
                  onSwipedLeft={() => console.log('NextCard')}
                  onSwipedRight={() => console.log('NextCard')}
                  onSwipedTop={() => console.log('SharePostAttempt')}
                >
                  <Card style={[styles.card, styles.card1]}><Text style={styles.label}>A</Text></Card>
                  <Card style={[styles.card, styles.card2]}><Text style={styles.label}>B</Text></Card>
                  <Card style={[styles.card, styles.card1]}><Text style={styles.label}>C</Text></Card>
                  <Card style={[styles.card, styles.card2]}><Text style={styles.label}>D</Text></Card>
                  <Card style={[styles.card, styles.card1]}><Text style={styles.label}>E</Text></Card>
                </CardStack>
              </View>
            </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 312,
    height: 476,
    backgroundColor: '#fff',
    borderRadius: 25,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 10,
      height: 1
    },
    shadowOpacity:0.5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#808080'
  },
  content:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  favorite: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 1,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default MediaGallery;
