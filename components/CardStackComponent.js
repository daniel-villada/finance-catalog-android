import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import Carousel from 'react-native-snap-carousel';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CardStackComponent = ({ items, swiperRef, carouselRef, setActiveSlide, handlePrev, handleNext }) => {
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
            onSnapToItem={(index) => setActiveSlide(index)}
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
    <View style={styles.contentContainer}>
      <CardStack
        style={styles.content}
        renderNoMoreCards={() => <Text style={styles.noMoreCardsText}>No more cards</Text>}
        ref={swiperRef}
        onSwipedLeft={() => console.log('NextCard')}
        onSwipedRight={() => console.log('NextCard')}
        onSwipedTop={() => console.log('SharePostAttempt')}
      >
        {items.map((item) => (
          <Card key={item.id} style={styles.card}>
            <View style={styles.imageContainer}>
              {item.attributes.image && item.attributes.image.data.length > 0 ? (
                <Carousel
                  ref={carouselRef}
                  data={item.attributes.image.data}
                  renderItem={renderCarouselItem}
                  sliderWidth={width * 0.75}
                  itemWidth={width * 0.75}
                  loop
                  onSnapToItem={(index) => setActiveSlide(index)}
                  useScrollView={false}
                  removeClippedSubviews={false}
                />
              ) : (
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{
                    uri: 'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image-300x225.png',
                  }}
                />
              )}
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.attributes.title}</Text>
              </View>
              <View style={styles.arrowContainer}>
                <TouchableOpacity style={styles.arrowButton} onPress={handlePrev}>
                  <MaterialIcons name="keyboard-arrow-left" size={32} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
                  <MaterialIcons name="keyboard-arrow-right" size={32} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        ))}
      </CardStack>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (swiperRef.current) {
              swiperRef.current.goBackFromTop();
            }
          }}
        >
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (swiperRef.current) {
              swiperRef.current.swipeRight();
            }
          }}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 45,
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
  noMoreCardsText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  card: {
    width: width * 0.75,
    height: height * 0.65,
    backgroundColor: '#fff',
    borderRadius: 25,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 10,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 56,
  },
  button: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  carouselItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CardStackComponent;
