import React, {useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import Carousel from 'react-native-snap-carousel';
import {MaterialIcons} from '@expo/vector-icons';
import {useTypeSafeQuery} from "@/hooks/useTypeSafeQuery";
import useWishlist from "@/hooks/useWishlist";
import {useToast} from "@/hooks/useToast";
import {getImageUrlByItem} from "@/helpers"
import Logo from '@/components/Logo';
import FastImage from 'react-native-fast-image';
import useWebApi from "@/hooks/useWebApi";

const {width, height} = Dimensions.get('window');

const Catalog = ({navigation}) => {

    const {user} = useWebApi()

    const [currentPage, setCurrentPage] = useState(1)

    const {data: items, isLoading, error} = useTypeSafeQuery({
        queryKey: ['getCatalog', currentPage],
        queryParams: {
            page: currentPage
        }
    });


    const [currentItemIndex, setCurrentItemIndex] = useState(0)


    const {addWishlistItemById} = useWishlist()

    const toast = useToast()


    const swiperRef = useRef(null);
    const carouselRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const navigateToGallery = () => {
        navigation.navigate('Gallery');
    };
    const navigateToProfile = (item) => {
        navigation.navigate('Profile', {item});
    };
    const navigateToWishlist = (item) => {
        navigation.navigate('Wishlist');
    };

    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.snapToNext();
        }
    };

    const handlePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.snapToPrev();
        }
    };


    const renderCarouselItem = ({item}) => {
        return (
            <View style={styles.carouselItem}>
                <FastImage
                    style={styles.image}
                    resizeMode='cover'
                    source={{uri: getImageUrlByItem(item)}}
                />
            </View>
        );
    };

    const handleGoBackFromTop = () => {
        swiperRef.current?.goBackFromTop()
        if (currentItemIndex > 0) {
            setCurrentItemIndex(idx => idx - 1)
        }
    }


    const handleSwipeRight = () => {
        swiperRef.current?.swipeRight();
    }

    const handleChangePage = () => {
        if (items.length === 0) {
            return
        }

        setCurrentPage(currentPage + 1)
    }


    const addToWishlist = async () => {
        const item = items[currentItemIndex]
        if (!item) {
            toast.error("No se puede anadir este elemento")
            return
        }
        addWishlistItemById(item.id, item)
        handleSwipeRight()
    };

    return (<View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={24} color="white"/>
            </TouchableOpacity>
            <Logo navigation={navigation}/>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={navigateToWishlist} style={{marginRight: 5}}>
                    <MaterialIcons name="favorite" size={24} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToGallery}>
                    <MaterialIcons name="auto-awesome-mosaic" size={24} color="#fff"/>
                </TouchableOpacity>
            </View>
        </View>
        {isLoading ? (<Text style={styles.loadingText}>Cargando...</Text>) : (<View style={styles.contentContainer}>
            <CardStack
                style={styles.content}
                renderNoMoreCards={() => <TouchableOpacity onPress={handleChangePage}>
                    <Text style={styles.noMoreCardsText}>Siguiente página</Text>
                </TouchableOpacity>}
                ref={swiperRef}
                onSwiped={(idx) => {
                    setCurrentItemIndex(idx + 1)
                }}
                verticalSwipe={false}
            >
                {items?.map((item) => {

                    const image = item.attributes?.image;

                    const hasImages = image && image.data.length > 0;


                    return (<Card key={item.id} style={styles.card}>
                        <View style={styles.imageContainer}>
                            {hasImages ? (<Carousel
                                ref={carouselRef}
                                data={item.attributes.image.data}
                                renderItem={renderCarouselItem}
                                sliderWidth={width * 0.75}
                                itemWidth={width * 0.75}
                                loop
                                onSnapToItem={(index) => setActiveSlide(index)}
                                useScrollView={false}
                                removeClippedSubviews={false}
                            />) : (<Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{
                                    uri: 'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image-300x225.png',
                                }}
                            />)}
                            <View style={styles.overlay}>
                                <TouchableOpacity onPress={() => navigateToProfile(item)}>
                                    <Text style={styles.title}>{item.attributes.title}</Text><Text
                                    style={styles.subtitle}>Ver Perfil</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.arrowContainer}>
                                <TouchableOpacity style={styles.arrowButton} onPress={handlePrev}>
                                    <MaterialIcons name="keyboard-arrow-left" size={32} color="#fff"/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
                                    <MaterialIcons name="keyboard-arrow-right" size={32} color="#fff"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>)
                })}
            </CardStack>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleGoBackFromTop}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={32} color="#000"/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={addToWishlist}
                >
                    <MaterialIcons name="favorite" size={32} color="#FF375F"/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSwipeRight}
                >
                    <MaterialIcons name="keyboard-arrow-right" size={32} color="#000"/>
                </TouchableOpacity>
            </View>
        </View>)}
    </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#000',
    }, header: {
        flexDirection: 'row',
        paddingTop: 30,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
    }, headerLogo: {
        width: 82, height: 82, borderRadius: 50,
    }, backButton: {
        marginRight: 10,
    }, galleryContainer: {
        paddingTop: 10, paddingBottom: 56, paddingHorizontal: 10, justifyContent: 'center',
    }, galleryCard: {
        width: width / 3 - 20, height: width / 3 - 20, margin: 5, borderRadius: 10,
    }, galleryImage: {
        width: '100%', height: '100%', borderRadius: 10,
    }, contentContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    }, content: {
        flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 40,
    }, imageContainer: {
        flex: 1, position: 'relative', width: '100%', height: '100%', borderRadius: 25, overflow: 'hidden',
    }, image: {
        width: '100%', height: '100%',
    }, noMoreCardsText: {
        fontSize: 18, fontWeight: 'bold', color: 'white', alignSelf: 'center', textDecorationLine: 'underline',
    }, card: {
        width: width * 0.75,
        height: height * 0.65,
        backgroundColor: '#fff',
        borderRadius: 25,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 10, height: 1,
        },
        shadowOpacity: 0.5,
    }, overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 16,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    }, title: {
        fontSize: 18, fontWeight: 'bold', color: '#fff',
    }, subtitle: {
        fontSize: 18, color: '#fff',
    }, arrowContainer: {
        position: 'absolute',
        top: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
    }, arrowButton: {
        padding: 8,
    }, buttonContainer: {
        flexDirection: 'row', justifyContent: 'center', paddingBottom: 56,
    }, button: {
        padding: 20, backgroundColor: '#fff', borderRadius: 50, marginHorizontal: 8,
    }, buttonText: {
        fontSize: 16, fontWeight: 'bold', color: '#000',
    }, addToWishlistButton: {
        padding: 12, backgroundColor: '#fff', borderRadius: 8, marginHorizontal: 8, marginTop: 16, alignSelf: 'center',
    }, addToWishlistText: {
        fontSize: 16, fontWeight: 'bold', color: '#000',
    }, carouselItem: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    }, loadingText: {
        fontSize: 18, fontWeight: 'bold', color: 'white', alignSelf: 'center', marginTop: 25
    },
});

export default Catalog;
