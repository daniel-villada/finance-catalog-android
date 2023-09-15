import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import Carousel from 'react-native-snap-carousel';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const GalleryViewComponent = ({ items }) => {
  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image style={styles.image} resizeMode="cover" source={{ uri: `http://164.92.74.136${item.attributes.url}` }} />
    </View>
  );

  const renderItem = ({ item }) => (
    <Card key={item.id} style={styles.galleryCard}>
      <View style={styles.imageContainer}>
        {item.attributes.image && item.attributes.image.data.length > 0 ? (
          <Carousel
            data={item.attributes.image.data}
            renderItem={renderCarouselItem}
            sliderWidth={width / 3 - 20}
            itemWidth={width / 3 - 20}
            loop
            useScrollView={false}
          />
        ) : (
          <Image
            style={styles.galleryImage}
            resizeMode="cover"
            source={{
              uri: `http://164.92.74.136${item.attributes.url}`,
            }}
          />
        )}
      </View>
    </Card>
  );

  return (
    <View style={styles.galleryContainer}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.galleryContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    paddingTop: 10,
    paddingBottom: 56,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  galleryCard: {
    width: width / 3 - 20,
    height: width / 3 - 20,
    margin: 5,
    borderRadius: 10,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  carouselItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  arrowContainer: {
    position: 'absolute',
    top: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  arrowButton: {
    padding: 8,
  },
});

export default GalleryViewComponent;
